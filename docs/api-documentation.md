# REST API Documentation — MSP Pyro Park

**Base URL (Local):** `http://localhost:8080/api`  
**Base URL (Context):** `/api`  
**Security Model:** Public Catalog & Order Submission; API Key/Token on `/admin/**`  
**Content-Type:** `application/json`

---

## 1. Catalog Endpoints

### 1.1 List All Catalog Products
`GET /catalog/products`

Retrieves the complete 131-item catalog extracted from the 2026 Price List.

#### Sample Response:
```json
[
  {
    "id": 1,
    "code": 1,
    "slug": "gold-lakshmi-1",
    "name": "Gold Lakshmi",
    "tamil": "கோல்டு லட்சுமி",
    "category": "single-sound-crackers",
    "pack": "1 Pkt",
    "pieces": "10 Pcs",
    "listPrice": 275.00,
    "netPrice": 27.50,
    "discountPercent": 90,
    "isGiftPack": false,
    "status": "VERIFIED",
    "page": 2
  }
]
```

---

### 1.2 Get Product by Code
`GET /catalog/products/{code}`

#### Path Parameters:
- `code` (integer, e.g., `1`, `10`, `121`)

---

### 1.3 Get Products by Category
`GET /catalog/categories/{slug}`

#### Path Parameters:
- `slug` (string, e.g., `single-sound-crackers`, `flower-pots`, `bombs`, `gift-boxes`)

---

### 1.4 Get Gift Boxes & Family Combos
`GET /catalog/gift-boxes`

Returns the 11 verified gift boxes and special family packs with item counts from 18 to 60 items.

---

## 2. Order Reservation Endpoints

### 2.1 Submit Order Reservation
`POST /orders`

Validates item quantities against server-side confirmed prices. Prevents client-side price tampering. Checks mandatory statutory legal age (18+) and safety affirmations.

#### Request Body:
```json
{
  "customerName": "Ramesh Kumar",
  "customerPhone": "9876543210",
  "customerEmail": "ramesh@example.com",
  "deliveryMethod": "SHOWROOM_PICKUP",
  "address": "123 Main Road",
  "city": "Madurai",
  "pincode": "625001",
  "ageConfirmed": true,
  "safetyAgreed": true,
  "items": [
    {
      "productCode": 1,
      "quantity": 2
    },
    {
      "productCode": 121,
      "quantity": 1
    }
  ]
}
```

#### Response (201 Created):
```json
{
  "orderReference": "MSP-2026-4821",
  "customerName": "Ramesh Kumar",
  "customerPhone": "9876543210",
  "deliveryMethod": "SHOWROOM_PICKUP",
  "subtotal": 2555.00,
  "discountTotal": 23000.00,
  "total": 2555.00,
  "status": "RECEIVED",
  "createdAt": "2026-10-27T21:40:00",
  "items": [
    {
      "productCode": 1,
      "productName": "Gold Lakshmi",
      "packUnit": "1 Pkt",
      "unitPrice": 27.50,
      "quantity": 2,
      "lineTotal": 55.00
    },
    {
      "productCode": 121,
      "productName": "Dora Gift Box",
      "packUnit": "1 Box",
      "unitPrice": 2500.00,
      "quantity": 1,
      "lineTotal": 2500.00
    }
  ]
}
```

---

### 2.2 Get Order by Reference
`GET /orders/{orderReference}`

Returns the immutable order snapshot and settlement status.

---

## 3. Administrative Endpoints

### 3.1 Get Verification Queue
`GET /admin/verification-queue`

Returns catalog items with omitted or unverified source prices requiring showroom review.

---

### 3.2 Update Product Price & Verify
`PUT /admin/products/{code}/price`

#### Request Body:
```json
{
  "productCode": 26,
  "listPrice": 450.00,
  "sellingPrice": 45.00,
  "notes": "Verified by showroom manager for 2026 season"
}
```

---

### 3.3 List All Order Reservations
`GET /admin/orders`

---

### 3.4 Update Order Status
`PUT /admin/orders/{orderReference}/status`

#### Request Body:
```json
{
  "status": "READY_FOR_PICKUP"
}
```

---

### 3.5 View Audit Logs
`GET /admin/audit-logs`
