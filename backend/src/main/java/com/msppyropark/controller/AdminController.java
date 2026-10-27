package com.msppyropark.controller;

import com.msppyropark.dto.PriceVerificationDto;
import com.msppyropark.dto.ProductDto;
import com.msppyropark.dto.OrderResponseDto;
import com.msppyropark.entity.AuditLogEntity;
import com.msppyropark.service.AuditService;
import com.msppyropark.service.CatalogService;
import com.msppyropark.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final CatalogService catalogService;
    private final OrderService orderService;
    private final AuditService auditService;

    @GetMapping("/verification-queue")
    public ResponseEntity<List<ProductDto>> getVerificationQueue() {
        return ResponseEntity.ok(catalogService.getUnverifiedQueue());
    }

    @PutMapping("/products/{code}/price")
    public ResponseEntity<ProductDto> updateProductPrice(
            @PathVariable Integer code,
            @Valid @RequestBody PriceVerificationDto dto) {
        return ResponseEntity.ok(catalogService.updateProductPrice(
                code,
                dto.getListPrice(),
                dto.getSellingPrice(),
                dto.getNotes()
        ));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/orders/{orderReference}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable String orderReference,
            @RequestBody Map<String, String> payload) {
        String newStatus = payload.getOrDefault("status", "CONFIRMED");
        return ResponseEntity.ok(orderService.updateOrderStatus(orderReference, newStatus));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLogEntity>> getAuditLogs() {
        return ResponseEntity.ok(auditService.getRecentLogs());
    }
}
