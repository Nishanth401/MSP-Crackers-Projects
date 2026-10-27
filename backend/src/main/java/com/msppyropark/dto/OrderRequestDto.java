package com.msppyropark.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Valid 10-digit Indian mobile number required")
    private String customerPhone;

    @Email(message = "Email format invalid")
    private String customerEmail;

    @NotBlank(message = "Delivery method must be specified")
    private String deliveryMethod; // SHOWROOM_PICKUP or AUTHORIZED_TRANSPORT

    private String address;
    private String city;
    private String pincode;

    @AssertTrue(message = "Legal confirmation that customer is at least 18 years old is mandatory")
    private Boolean ageConfirmed;

    @AssertTrue(message = "Safety and responsible handling terms must be acknowledged")
    private Boolean safetyAgreed;

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItemRequestDto> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemRequestDto {
        @NotNull(message = "Product code is required")
        private Integer productCode;

        @NotNull(message = "Quantity must be specified")
        @Min(value = 1, message = "Minimum quantity is 1")
        private Integer quantity;
    }
}
