package com.msppyropark.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private String orderReference;
    private String customerName;
    private String customerPhone;
    private String deliveryMethod;
    private String address;
    private String city;
    private String pincode;
    private BigDecimal subtotal;
    private BigDecimal discountTotal;
    private BigDecimal total;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDto> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemResponseDto {
        private Integer productCode;
        private String productName;
        private String packUnit;
        private BigDecimal unitPrice;
        private Integer quantity;
        private BigDecimal lineTotal;
    }
}
