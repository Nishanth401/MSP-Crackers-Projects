# Business & System Requirements — MSP Pyro Park

## 1. Project Overview
**MSP Pyro Park** is a premier fireworks showroom and retail brand located near AAA College on the Sivakasi-Virudhunagar Main Road in Amathur, Sivakasi, Tamil Nadu. They are associated with the renowned **Sun Star Fire Works** manufacturer.

The objective of this web platform is to transform the physical **MSP Retail List 2026** into a high-converting, trustworthy, accessible, responsive, and legally compliant e-commerce website and digital catalog.

---

## 2. Core Functional Requirements

### 2.1 Catalog Browsing & Search
- **Traceable Products:** 131 line items directly derived from the official PDF price list across 18 distinct categories.
- **Accurate Pricing:** List price, net price (calculated at 90% discount on standard crackers), and special net rates on gift packs.
- **Verification Integrity:** Products with missing or unconfirmed source data (e.g., Codes 26, 27, 28, 34, 36, 38, 52, 101, 120) are explicitly labeled with `Needs Verification` tags and routed to showroom inquiry instead of fabricated charges.
- **Search Engine:** Real-time search across product titles, Tamil names, product codes, categories, and variant specs.
- **Filter & Sort:** Multi-faceted filtering by category, price range, packing type, verification status, and sorting by price, code, or name.

### 2.2 Shopping Cart & Order Request System
- **State Persistence:** Local storage and session-safe cart maintaining selected products, quantities, and real-time total calculations.
- **Compliant Order Workflow:** Given statutory restrictions on explosive transport via ordinary couriers in India, the order system operates as an **Authorized Order Request & Showroom Settlement System**:
  - Customer submits contact details, delivery preference (Showroom Pickup at Amathur or Authorized Transport booking), and safety acknowledgment.
  - Server recalculates prices to prevent client-side price tampering.
  - Generates a verified Order Reference (e.g. `MSP-2026-XXXX`).
  - Provides a direct 1-click **WhatsApp Order Dispatcher** pre-filled with the exact items and order reference to the verified showroom coordinators (`96989 92410`, `94438 68650`).

### 2.3 Legal & Fireworks Safety Compliance
- **Statutory Age Check:** Minimum 18 years legal affirmation prior to order request.
- **Safety Instructions:** Clear manufacturer-compliant handling guidelines (distance, water bucket on standby, adult supervision, no loose storage).
- **No False Marketing:** Zero claims of "100% green without emissions" or fabricated government awards. Factual manufacturer guidance only.

### 2.4 Administrative Controls
- **Review Queue:** Admin interface to review uncertain catalog records, edit prices, update stock, and audit logs.
- **Order Management:** View incoming orders, update fulfillment status (`RECEIVED`, `CONTACTED`, `READY_FOR_PICKUP`, `FULFILLED`), and review enquiries.

---

## 3. Non-Functional Requirements
- **Performance:** Sub-second page loads, lightweight vector assets, zero layout shifts.
- **Responsive Viewports:** Tested and optimized for mobile devices (320px–480px), tablets (768px), and wide desktop displays (1024px+).
- **Accessibility:** High color contrast (WCAG AA compliant), clear keyboard focus rings, screen-reader semantic tags.
