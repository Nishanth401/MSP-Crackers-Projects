package com.msppyropark.service;

import com.msppyropark.dto.ProductDto;
import com.msppyropark.entity.CategoryEntity;
import com.msppyropark.entity.ProductEntity;
import com.msppyropark.exception.ResourceNotFoundException;
import com.msppyropark.repository.CategoryRepository;
import com.msppyropark.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final AuditService auditService;

    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDto getProductByCode(Integer code) {
        ProductEntity entity = productRepository.findByProductCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with code #" + code));
        return mapToDto(entity);
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getProductsByCategory(String slug) {
        return productRepository.findByCategorySlug(slug).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getGiftBoxes() {
        return productRepository.findByIsGiftPackTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getUnverifiedQueue() {
        return productRepository.findByVerificationStatus("NEEDS_VERIFICATION").stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDto updateProductPrice(Integer code, BigDecimal listPrice, BigDecimal sellingPrice, String notes) {
        ProductEntity entity = productRepository.findByProductCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with code #" + code));

        BigDecimal oldPrice = entity.getSellingPrice();
        entity.setListPrice(listPrice);
        entity.setSellingPrice(sellingPrice);

        if (listPrice != null && sellingPrice != null && listPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = listPrice.subtract(sellingPrice)
                    .divide(listPrice, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
            entity.setDiscountPercentage(discount.setScale(0, RoundingMode.HALF_UP).intValue());
        }

        entity.setVerificationStatus(sellingPrice != null ? "VERIFIED" : "NEEDS_VERIFICATION");
        if (notes != null) {
            entity.setVerificationNotes(notes);
        }

        ProductEntity saved = productRepository.save(entity);

        auditService.logAction(
                "PRICE_UPDATE",
                "Product",
                saved.getId(),
                "Updated code #" + code + " from ₹" + oldPrice + " to ₹" + sellingPrice
        );

        return mapToDto(saved);
    }

    private ProductDto mapToDto(ProductEntity e) {
        return ProductDto.builder()
                .id(e.getId())
                .code(e.getProductCode())
                .slug(e.getSlug())
                .name(e.getName())
                .tamil(e.getTamilName())
                .category(e.getCategory() != null ? e.getCategory().getSlug() : "")
                .pack(e.getPackUnit())
                .pieces(e.getPiecesCount())
                .listPrice(e.getListPrice())
                .netPrice(e.getSellingPrice())
                .discountPercent(e.getDiscountPercentage())
                .isGiftPack(e.getIsGiftPack())
                .itemCount(e.getItemCount())
                .status(e.getVerificationStatus())
                .notes(e.getVerificationNotes())
                .page(e.getSourcePage())
                .build();
    }
}
