package com.msppyropark.controller;

import com.msppyropark.dto.ProductDto;
import com.msppyropark.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/catalog")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(catalogService.getAllProducts());
    }

    @GetMapping("/products/{code}")
    public ResponseEntity<ProductDto> getProductByCode(@PathVariable Integer code) {
        return ResponseEntity.ok(catalogService.getProductByCode(code));
    }

    @GetMapping("/categories/{slug}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String slug) {
        return ResponseEntity.ok(catalogService.getProductsByCategory(slug));
    }

    @GetMapping("/gift-boxes")
    public ResponseEntity<List<ProductDto>> getGiftBoxes() {
        return ResponseEntity.ok(catalogService.getGiftBoxes());
    }
}
