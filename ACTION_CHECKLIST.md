# Jewel Exchange — 19-Point Action Checklist

This checklist tracks the 19 standard best-practice items for the Jewel Exchange web platform.

---

## 1. Actionable Pending Items (To Complete One by One)

- [ ] **Item 2: Local Business Schema (JSON-LD Local SEO)**
  - Add structured `JewelryStore` / `LocalBusiness` schema in `layout.js` with address (`514A, R.A. De Mel Mawatha, Colombo 03`), opening hours, geo coordinates, and contact details for Google Maps boost.

- [ ] **Item 3: Client Reviews / Testimonials Section**
  - Add a curated 3-card luxury testimonial section on the homepage or `/about` page highlighting real bespoke client experiences.

- [ ] **Item 4: Case Studies / Bespoke Story Highlights**
  - Enhance the `/bespoke` past creations portfolio with client story tags and design briefs.

- [ ] **Item 5: Dedicated Social Share Card (OpenGraph / Twitter)**
  - Verify and configure a dedicated 1200x630px social card preview for WhatsApp, iMessage, and social link sharing.

- [ ] **Item 6: Dedicated Thank You Page (`/thank-you`)**
  - Create a dedicated luxury confirmation page for ad conversion tracking.

- [ ] **Item 7: Google Analytics (GA4) Integration**
  - Add Google Analytics GA4 measurement ID script when provided.

---

## 2. Completed Items (Verified in Codebase)

- [x] **7. 5 FAQs (Frequently Asked Questions):** Interactive luxury accordion with animated plus/minus icons, gold highlights, direct WhatsApp concierge CTA, and embedded `FAQPage` JSON-LD schema on `/bespoke`.
- [x] **1. Custom 404 Page:** Implemented at `app/not-found.js` with return-to-catalog action.
- [x] **2. CTA Above the Fold:** Hero section buttons (*"Explore Jewelry"*, *"Book Bespoke"*) load immediately in viewport.
- [x] **3. Internal Links:** Full cross-linking between Navbar, Footer, Catalog categories, and related piece carousels.
- [x] **5. Breadcrumbs:** Integrated in `ProductDetail.js` (`Home / Jewelry / Category`).
- [x] **8. Response Time Promise:** In `app/contact/page.js` (*"Our team will get back to you within 24 hours"*).
- [x] **9. Sticky Mobile CTA:** Floating action bar on mobile product detail view for instant WhatsApp inquiry.
- [x] **11. Unique Page Titles:** All static & dynamic routes have distinct SEO titles via `generateMetadata`.
- [x] **12. Meta Descriptions:** All routes have tailored search snippet descriptions.
- [x] **14. Maps + Directions:** Google Maps embed and direct navigation button on `/contact`.
- [x] **16. Alt Text on Images:** Descriptive alt attributes across all imagery.
- [x] **18. Privacy Policy (PP):** Active at `app/privacy/page.js`.
