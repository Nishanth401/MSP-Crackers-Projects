-- ============================================================================
-- MSP PYRO PARK CRACKERS E-COMMERCE DATABASE SCHEMA (MySQL 8.0+)
-- Flyway Migration: V1__init_schema.sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    tamil_name VARCHAR(200),
    description TEXT,
    banner_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_slug (slug),
    INDEX idx_category_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_code INT NOT NULL UNIQUE,
    slug VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    tamil_name VARCHAR(255),
    category_id BIGINT NOT NULL,
    pack_unit VARCHAR(50) NOT NULL DEFAULT '1 Box',
    pieces_count VARCHAR(50) DEFAULT '1 Pce',
    list_price DECIMAL(10, 2) NULL,
    selling_price DECIMAL(10, 2) NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    discount_percentage INT NULL,
    is_gift_pack BOOLEAN DEFAULT FALSE,
    item_count INT NULL,
    inventory_quantity INT DEFAULT 100,
    availability_status VARCHAR(50) DEFAULT 'IN_STOCK',
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    source_document VARCHAR(100) DEFAULT 'MSP Retail List 2026.pdf',
    source_page INT NOT NULL,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'VERIFIED',
    verification_notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
    INDEX idx_product_code (product_code),
    INDEX idx_product_slug (slug),
    INDEX idx_product_category (category_id),
    INDEX idx_product_status (verification_status),
    INDEX idx_product_availability (availability_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_variants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    variant_name VARCHAR(100) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    pack_unit VARCHAR(50),
    pieces VARCHAR(50),
    list_price DECIMAL(10, 2) NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    inventory_quantity INT DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_variant_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_reference VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(150),
    delivery_type VARCHAR(50) NOT NULL DEFAULT 'SHOWROOM_PICKUP',
    delivery_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100) DEFAULT 'Tamil Nadu',
    pincode VARCHAR(20),
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'SHOWROOM_SETTLEMENT',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    order_status VARCHAR(50) NOT NULL DEFAULT 'RECEIVED',
    safety_acknowledged BOOLEAN NOT NULL DEFAULT TRUE,
    legal_age_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_ref (order_reference),
    INDEX idx_order_phone (customer_phone),
    INDEX idx_order_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_code INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    pack_unit VARCHAR(50),
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    line_total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_item_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customer_enquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enquiry_reference VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    cart_summary_json JSON NULL,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_enquiry_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT,
    actor VARCHAR(100) DEFAULT 'SYSTEM',
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
