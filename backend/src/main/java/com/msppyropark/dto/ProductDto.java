package com.msppyropark.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private Integer code;
    private String slug;
    private String name;
    private String tamil;
    private String category;
    private String pack;
    private String pieces;
    private BigDecimal listPrice;
    private BigDecimal netPrice;
    private Integer discountPercent;
    private Boolean isGiftPack;
    private Integer itemCount;
    private String status;
    private String notes;
    private Integer page;
}
