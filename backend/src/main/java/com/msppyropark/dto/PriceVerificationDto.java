package com.msppyropark.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceVerificationDto {
    @NotNull(message = "Product code is required")
    private Integer productCode;

    private BigDecimal listPrice;

    @NotNull(message = "Selling price must be specified")
    private BigDecimal sellingPrice;

    private String notes;
}
