package com.msppyropark.repository;

import com.msppyropark.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Optional<ProductEntity> findByProductCode(Integer productCode);

    Optional<ProductEntity> findBySlug(String slug);

    List<ProductEntity> findByCategorySlug(String categorySlug);

    List<ProductEntity> findByIsGiftPackTrue();

    List<ProductEntity> findByVerificationStatus(String status);

    @Query("SELECT p FROM ProductEntity p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.tamilName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "CAST(p.productCode AS string) = :query")
    List<ProductEntity> searchProducts(@Param("query") String query);
}
