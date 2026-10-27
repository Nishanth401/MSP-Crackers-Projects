# MSP Pyro Park — 2026 Crackers & Fireworks E-Commerce Platform

A production-oriented, responsive, full-stack e-commerce website and digital catalog built for **MSP Pyro Park** (associated with **Sun Star Fire Works**, Sivakasi, Tamil Nadu).

This system transforms the official **MSP Retail List 2026.pdf** into an interactive catalog and shopping experience with server-validated prices, statutory safety compliance, and direct showroom WhatsApp integration.

---

## 1. Business & Brand Overview

- **Business / Showroom:** MSP Pyro Park (Show Room)
- **Associated Manufacturer:** Sun Star Fire Works
- **Physical Location:** Near AAA College, Virudhunagar – Sivakasi Main Road, Amathur, Sivakasi, Tamil Nadu, India.
- **Showroom Hotline & WhatsApp:** `+91 7339620387`
- **Showroom Banking Reference:** Karur Vysya Bank, S.N.Puram Branch (IFSC: `KVBL0001810`)
  - Ganapathy Traders: `1810280000000336`
  - MSP Pyro Park: `1810283000000030`
  - Sunstar Fireworks: `1810280000000371`

---

## 2. Catalog & Verification Audit Summary

The complete catalog was extracted from the 6 pages of `MSP retail list 2026.pdf` using coordinate-based text extraction:
- **Total Catalog Items:** 131 items (Codes 1 to 131)
- **Categories:** 18 distinct groups (Single Sound Crackers, Ground Chakkers, Flower Pots, Bombs, Crackers, Rockets, Torches, Novelties, Fountains, Tin Fountains, Wheels, Fancy Crackers, Aerial Pipes, Roll Cap, Repeating Shots, Sparklers, Gift Boxes, Family Packs).
- **Verified Items:** 122 items (93.1%) — Confirmed 90% discount on standard crackers (10% of list price) and fixed festival net rates on gift packs.
- **Needs Verification Queue:** 9 items (Codes 26, 27, 28, 34, 36, 38, 52, 101, 120) flagged for showroom price confirmation due to blank cells in the printed PDF.
- **Gift Boxes:** 11 verified festive combos (18 items Dora at ₹2,500 up to Mega VVIP Carnival at ₹25,000, and Family Packs at ₹3,000 & ₹5,000).

Detailed audit report available in [`docs/catalog-verification.md`](file:///c:/Users/anish/OneDrive/Documents/CrackersWebsite/docs/catalog-verification.md).

---

## 3. Project Architecture

```
CrackersWebsite/
├── frontend/                     # React + TypeScript + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Header, Footer, AnnouncementBar, Toast, WhatsAppButton
│   │   │   ├── home/            # HeroSection, FeaturedCategories, BestSelling, GiftBoxShowcase
│   │   │   ├── products/        # ProductCard, ProductDetailModal
│   │   │   ├── catalog/         # CatalogControls, Filters, Sorting
│   │   │   └── cart/            # CartItemRow, CartSummary, EmptyCartView
│   │   ├── pages/               # Home, Products, Category, GiftBoxes, Search, Cart, Checkout, OrderConfirmation, About, Contact, Safety, FAQ, Policies, Admin
│   │   ├── context/             # CartContext (State, LocalStorage, Totals)
│   │   ├── services/            # catalogService.ts (Query, Search, Filter)
│   │   ├── types/               # TypeScript interfaces
│   │   └── data/                # catalog.json (131 verified items)
│   ├── package.json
│   └── vite.config.ts
├── backend/                      # Java 21 + Spring Boot 3 + Spring Data JPA + Security
│   ├── pom.xml
│   └── src/main/java/com/msppyropark/
│       ├── MspPyroParkApplication.java
│       ├── config/              # SecurityConfig (CORS, Stateless) & WebConfig
│       ├── controller/          # CatalogController, OrderController, AdminController
│       ├── dto/                 # ProductDto, OrderRequestDto, OrderResponseDto, PriceVerificationDto
│       ├── entity/              # CategoryEntity, ProductEntity, OrderEntity, OrderItemEntity, AuditLogEntity
│       ├── exception/           # GlobalExceptionHandler & ResourceNotFoundException
│       ├── repository/          # CategoryRepository, ProductRepository, OrderRepository, AuditLogRepository
│       └── service/             # CatalogService, OrderService, AuditService
├── database/
│   └── migrations/              # Flyway V1__init_schema.sql & V2__seed_catalog_2026.sql
├── catalog/
│   ├── MSP retail list 2026.pdf # Source document
│   ├── products.csv             # Structured CSV dataset
│   ├── verification-report.csv  # Verification audit spreadsheet
│   └── products.json            # Parsed JSON catalog
├── docs/
│   ├── requirements.md          # Functional & non-functional requirements
│   ├── api-documentation.md     # REST API specification
│   └── catalog-verification.md  # Detailed catalog audit findings
├── .env.example
└── README.md
```

---

## 4. Getting Started

### Prerequisites
- Node.js v18+ and npm
- Java JDK 21
- Maven 3.8+ (for Spring Boot backend)
- MySQL 8.0+ (optional for production; H2 in-memory configured by default for dev)

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

To run a production build:
```bash
npm run build
```

### Running the Backend
```bash
cd backend
mvn clean spring-boot:run
```
The REST API will be available at `http://localhost:8080/api`.

---

## 5. Security & Legal Compliance Highlights

- **Statutory Age Affirmation:** Mandatory confirmation that customer is 18+ prior to order request submission.
- **Server-Side Price Recalculation:** Prices and order subtotals are validated server-side from confirmed catalog records to prevent client-side manipulation.
- **Safe Transport Fulfillment:** Acknowledges Indian explosives regulations prohibiting courier transit; orders are routed to showroom pickup or licensed heavy transport godown hubs.
- **Admin Portal Security:** Admin dashboard at `/admin` (Default demo password: `msp2026admin`) enables review of the 9 unverified catalog items, manual price adjustments, and audit trail inspection.
- **1-Click WhatsApp Dispatcher:** Pre-formats clean, encrypted order requests with items, quantities, and reference numbers for direct transmission to showroom coordinators.
