package com.msppyropark.service;

import com.msppyropark.dto.OrderRequestDto;
import com.msppyropark.dto.OrderResponseDto;
import com.msppyropark.entity.OrderEntity;
import com.msppyropark.entity.OrderItemEntity;
import com.msppyropark.entity.ProductEntity;
import com.msppyropark.exception.ResourceNotFoundException;
import com.msppyropark.repository.OrderRepository;
import com.msppyropark.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AuditService auditService;

    @Transactional
    public OrderResponseDto createOrderReservation(OrderRequestDto request) {
        if (!Boolean.TRUE.equals(request.getAgeConfirmed())) {
            throw new IllegalArgumentException("Customer must affirm legal age eligibility (18+) to purchase fireworks.");
        }
        if (!Boolean.TRUE.equals(request.getSafetyAgreed())) {
            throw new IllegalArgumentException("Customer must agree to fireworks safety guidelines.");
        }

        String orderRef = generateOrderReference();

        OrderEntity order = OrderEntity.builder()
                .orderReference(orderRef)
                .customerName(request.getCustomerName().trim())
                .customerPhone(request.getCustomerPhone().trim())
                .customerEmail(request.getCustomerEmail() != null ? request.getCustomerEmail().trim() : null)
                .deliveryType(request.getDeliveryMethod())
                .deliveryAddress(request.getAddress())
                .city(request.getCity())
                .pincode(request.getPincode())
                .orderStatus("RECEIVED")
                .paymentStatus("PENDING")
                .paymentMethod("SHOWROOM_SETTLEMENT")
                .safetyAcknowledged(true)
                .legalAgeConfirmed(true)
                .items(new ArrayList<>())
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal listTotal = BigDecimal.ZERO;

        for (OrderRequestDto.OrderItemRequestDto itemReq : request.getItems()) {
            ProductEntity product = productRepository.findByProductCode(itemReq.getProductCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with code #" + itemReq.getProductCode()));

            if (product.getSellingPrice() == null) {
                throw new IllegalArgumentException("Product #" + product.getProductCode() + " requires showroom price verification and cannot be checked out online directly.");
            }

            BigDecimal unitPrice = product.getSellingPrice();
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(lineTotal);

            if (product.getListPrice() != null) {
                listTotal = listTotal.add(product.getListPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
            } else {
                listTotal = listTotal.add(lineTotal);
            }

            OrderItemEntity orderItem = OrderItemEntity.builder()
                    .order(order)
                    .product(product)
                    .productCode(product.getProductCode())
                    .productName(product.getName())
                    .packUnit(product.getPackUnit())
                    .unitPrice(unitPrice)
                    .quantity(itemReq.getQuantity())
                    .lineTotal(lineTotal)
                    .build();

            order.getItems().add(orderItem);
        }

        BigDecimal savings = listTotal.subtract(subtotal);
        if (savings.compareTo(BigDecimal.ZERO) < 0) {
            savings = BigDecimal.ZERO;
        }

        order.setSubtotal(subtotal);
        order.setDiscountAmount(savings);
        order.setTotalAmount(subtotal);

        OrderEntity saved = orderRepository.save(order);

        auditService.logAction(
                "ORDER_RESERVATION_CREATED",
                "Order",
                saved.getId(),
                "New reservation " + orderRef + " from " + saved.getCustomerName() + " (" + saved.getItems().size() + " items, ₹" + subtotal + ")"
        );

        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public OrderResponseDto getOrderByReference(String orderRef) {
        OrderEntity order = orderRepository.findByOrderReference(orderRef)
                .orElseThrow(() -> new ResourceNotFoundException("Order reservation not found with reference " + orderRef));
        return mapToDto(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(String orderRef, String newStatus) {
        OrderEntity order = orderRepository.findByOrderReference(orderRef)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with reference " + orderRef));

        String oldStatus = order.getOrderStatus();
        order.setOrderStatus(newStatus);
        OrderEntity saved = orderRepository.save(order);

        auditService.logAction(
                "ORDER_STATUS_UPDATE",
                "Order",
                saved.getId(),
                "Order " + orderRef + " updated from " + oldStatus + " to " + newStatus
        );

        return mapToDto(saved);
    }

    private String generateOrderReference() {
        int randomNum = 1000 + new Random().nextInt(9000);
        return "MSP-2026-" + randomNum;
    }

    private OrderResponseDto mapToDto(OrderEntity o) {
        return OrderResponseDto.builder()
                .orderReference(o.getOrderReference())
                .customerName(o.getCustomerName())
                .customerPhone(o.getCustomerPhone())
                .deliveryMethod(o.getDeliveryType())
                .address(o.getDeliveryAddress())
                .city(o.getCity())
                .pincode(o.getPincode())
                .subtotal(o.getSubtotal())
                .discountTotal(o.getDiscountAmount())
                .total(o.getTotalAmount())
                .status(o.getOrderStatus())
                .createdAt(o.getCreatedAt())
                .items(o.getItems().stream().map(i -> OrderResponseDto.OrderItemResponseDto.builder()
                        .productCode(i.getProductCode())
                        .productName(i.getProductName())
                        .packUnit(i.getPackUnit())
                        .unitPrice(i.getUnitPrice())
                        .quantity(i.getQuantity())
                        .lineTotal(i.getLineTotal())
                        .build()
                ).collect(Collectors.toList()))
                .build();
    }
}
