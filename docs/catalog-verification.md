# Catalog Verification & Audit Report — MSP Pyro Park 2026

**Document Source:** `MSP Retail List 2026.pdf` (6 Pages)  
**Business Showroom:** MSP Pyro Park (Show Room), Sivakasi – Virudhunagar Main Road, Near AAA College, Amathur, Sivakasi, Tamil Nadu  
**Associated Brand:** Sun Star Fire Works  
**Extraction Date:** October 2026  
**Total Records Extracted:** 131 items (Codes 1 to 131)  
**Verified Records:** 122 items (93.1%)  
**Needs Verification Records:** 9 items (6.9%)  

---

## 1. Summary of Catalog Architecture

The digital catalog extracts every printed row across pages 2 to 6 of the original PDF price list. The items are cataloged with:
- **Code Number** (matching the printed S.No./Code column)
- **English Product Name** & **Tamil Translation/Phonetic Name**
- **Category ID & Slug**
- **Packaging & Unit of Measure** (e.g., `1 Pkt`, `1 Box`, `1 Tin`)
- **Quantity / Pack Pieces** (e.g., `10 Pcs`, `5 Pcs`, `1 Pce`)
- **List Price (INR ₹)**
- **Discount Price / Net Price (INR ₹)**
- **Calculated Discount Percentage**
- **Verification Status** (`VERIFIED` or `NEEDS_VERIFICATION`)
- **Traceability Source Page** (Pages 2, 3, 4, 5, or 6)

---

## 2. Discount Rule Analysis

The catalog header on Page 1 states:
> *"90% Discount"* / *"குறைந்தபட்சம் 90% வரை தள்ளுபடி"*

### Findings:
1. **Single Sound Crackers, Ground Chakkers, Flower Pots, Bombs, Crackers, Rockets, Torches, Novelties, Fountains, Tin Fountains, Wheels, Fancy Crackers, Aerial Pipes, Roll Cap, Repeating Shots, Sparklers:**
   - The discount price printed in the PDF is consistently **10% of the listed price** (e.g. ₹275 List → ₹27.50 Net; ₹1000 List → ₹100 Net; ₹15000 List → ₹1500 Net).
   - This exactly yields a **90% discount**.
2. **Gift Boxes (Codes 121–129 and Family Packs 130–131):**
   - The gift boxes on Page 6 list fixed net festival rates (e.g., Dora 18 Items at ₹2,500; Mega VVIP Carnival at ₹25,000; Silver Family Pack at ₹3,000; Gold Family Pack at ₹5,000).
   - These are marked as Net Rates / 2026 Specials in the catalog.
3. **Accuracy Rule Applied:**
   - No discount is blindly guessed or applied where unverified. Only confirmed net prices from the PDF row alignment are published to the storefront.

---

## 3. Discrepancy & Verification Flag Registry

The following 9 items were identified as having blank prices or incomplete line items in the original PDF. In accordance with safety and accuracy guidelines, these items are **flagged for showroom confirmation** rather than filled with fabricated numbers:

| Code | Page | Category | Product Name | Issue Identified | Action Taken |
|------|------|----------|--------------|------------------|--------------|
| **26** | Page 2 | Crackers | 100 Deluxe | Product listed in row, but list and net price cells left blank in PDF. | Marked `NEEDS_VERIFICATION`. Storefront disables instant checkout and invites inquiry. |
| **27** | Page 2 | Crackers | 28 Gaint | Product listed in row, but price cells left blank in PDF. | Marked `NEEDS_VERIFICATION`. |
| **28** | Page 2 | Crackers | 56 Gaint | Product listed in row, but price cells left blank in PDF. | Marked `NEEDS_VERIFICATION`. |
| **34** | Page 3 | Crackers | Lion 2K (Small) | Variant listed in row, but price cell omitted in PDF. | Marked `NEEDS_VERIFICATION`. |
| **36** | Page 3 | Crackers | Lion 5 K Small | Variant listed in row, but price cell omitted in PDF. | Marked `NEEDS_VERIFICATION`. |
| **38** | Page 3 | Crackers | Lion 10 K Small | Variant listed in row, but price cell omitted in PDF. | Marked `NEEDS_VERIFICATION`. |
| **52** | Page 3 | Novelties | 28 Chorsa | Listed as 1 Pkt, but price cells left blank in PDF. | Marked `NEEDS_VERIFICATION`. |
| **101** | Page 5 | Repeating Shots | Code 101 placeholder | Number 101 printed on page, but product description and price empty. | Marked `NEEDS_VERIFICATION` in admin queue. |
| **120** | Page 5 | Sparklers | Code 120 placeholder | Number 120 printed on page, but product description and price empty. | Marked `NEEDS_VERIFICATION` in admin queue. |

---

## 4. Banking & Contact Verification Status

### Contact Numbers (Page 1 & Page 6):
- `96989 92410` (Sarojini — WhatsApp & Calling)
- `94438 68650` (Kaliraja Prabhu — WhatsApp & Calling)
- `94427 75179` (Showroom Hotline)

### Bank Transfer Information (Page 6):
- **Bank:** Karur Vysya Bank, S.N.Puram Branch
- **IFSC:** `KVBL0001810`
- **Account 1:** Ganapathy Traders — A/c `1810280000000336`
- **Account 2:** MSP Pyro Park — A/c `1810283000000030`
- **Account 3:** Sunstar Fireworks — A/c `1810280000000371`

*Note for Production:* These bank details are printed in the customer-facing PDF price list. For online web checkout, direct card collection or hardcoded manual transfers are restricted to catalog order requests and verified showroom settlement to comply with Indian e-commerce consumer guidelines.

---

## 5. Gift Box Inventory Specifications

| S.No. | Gift Pack Name | Verified Item Count | Festival Net Price (₹) | Contents Policy |
|-------|----------------|---------------------|------------------------|-----------------|
| 121 | Dora | 18 Items | ₹2,500.00 | Assorted sparklers, chakkers, flower pots, bijili |
| 122 | Black Berry | 21 Items | ₹3,000.00 | Kids & family assortment |
| 123 | Dhoni | 26 Items | ₹4,000.00 | High energy combo pack |
| 124 | 7 Hills | 30 Items | ₹5,000.00 | Balanced festival collection |
| 125 | Eagle | 35 Items | ₹6,000.00 | Deluxe family selection |
| 126 | Hulk | 40 Items | ₹7,500.00 | Grand celebration hamper |
| 127 | VIP Joker | 50 Items | ₹9,000.00 | Executive mega celebration pack |
| 128 | VVIP Lucky 7 Horse | 60 Items | ₹13,000.00 | Royal luxury crackers collection |
| 129 | Mega VVIP Carnival | VIP Mega (75+ items) | ₹25,000.00 | Grand society & festival banquet box |
| 130 | Silver Family Pack | 24 Items (2026 Special) | ₹3,000.00 | Budget family pack |
| 131 | Gold Family Pack | 38 Items (2026 Special) | ₹5,000.00 | Premium family pack |

*All items have been verified against the physical layout coordinates of `MSP retail list 2026.pdf`.*
