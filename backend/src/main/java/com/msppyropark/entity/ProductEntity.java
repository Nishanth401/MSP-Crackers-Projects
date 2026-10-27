package com.msppyropark.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code", nullable = false, unique = true)
    private Integer productCode;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "tamil_name", length = 255)
    private String tamilName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @Column(name = "pack_unit", length = 50, nullable = false)
    @Builder.Default
    private String packUnit = "1 Box";

    @Column(name = "pieces_count", length = 50)
    @Builder.Default
    private String piecesCount = "1 Pce";

    @Column(name = "list_price", precision = 10, scale = 2)
    private BigDecimal listPrice;

    @Column(name = "selling_price", precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(length = 10)
    @Builder.Default
    private String currency = "INR";

    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    @Column(name = "is_gift_pack")
    @Builder.Default
    private Boolean isGiftPack = false;

    @Column(name = "item_count")
    private Integer itemCount;

    @Column(name = "inventory_quantity")
    @Builder.Default
    private Integer inventoryQuantity = 100;

    @Column(name = "availability_status", length = 50)
    @Builder.Default
    private String availabilityStatus = "IN_STOCK";

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "source_document", length = 100)
    @Builder.Default
    private String sourceDocument = "MSP Retail List 2026.pdf";

    @Column(name = "source_page", nullable = false)
    private Integer sourcePage;

    @Column(name = "verification_status", length = 50, nullable = false)
    @Builder.Default
    private String verificationStatus = "VERIFIED";

    @Column(name = "verification_notes", columnDefinition = "TEXT")
    private String verificationNotes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
