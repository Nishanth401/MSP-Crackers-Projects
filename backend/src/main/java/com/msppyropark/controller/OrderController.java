package com.msppyropark.controller;

import com.msppyropark.dto.OrderRequestDto;
import com.msppyropark.dto.OrderResponseDto;
import com.msppyropark.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrderReservation(@Valid @RequestBody OrderRequestDto request) {
        OrderResponseDto response = orderService.createOrderReservation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{orderReference}")
    public ResponseEntity<OrderResponseDto> getOrderReservation(@PathVariable String orderReference) {
        return ResponseEntity.ok(orderService.getOrderByReference(orderReference));
    }
}
