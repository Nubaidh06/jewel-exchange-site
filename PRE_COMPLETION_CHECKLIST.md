# Jewel Exchange — Pre-Completion Checklist & Handoff Reference

This document tracks all completed and pending tasks prior to final handoff and public deployment of the **Jewel Exchange** platform.

---

## 1. Remaining Tasks to Complete

### Section A: Sanity CMS & Catalog Management
- [ ] **Product Specifications:** Update and finalize metal karat, stone weight, lab cert details, and pricing to each piece.


---

### Section C: Legal & Policy Pages
- [ ] **Shipping & Delivery Policy ([/shipping](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/shipping/page.js)):** Confirm courier partners (FedEx/DHL Express), transit times, and international duties.
- [ ] **Refunds & Exchanges Policy ([/refunds](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/refunds/page.js)):** Confirm 14-day exchange terms and bespoke order exclusions.
- [ ] **Terms & Conditions ([/terms](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/terms/page.js)):** Review standard terms of service.
- [ ] **Privacy Policy ([/privacy](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/privacy/page.js)):** Review customer data collection and privacy terms.

---

### Section D: SEO, Google Indexing & Public Launch
- [ ] **Google Search Console Verification:** HTML meta tag verified (`google-site-verification`).
- [ ] **Coming Soon Gate Deactivation (Public Launch):**
  - *Note on Indexing:* While `NEXT_PUBLIC_COMING_SOON=true` is active, Googlebot only indexes the root brand metadata (title, description, favicon) and the coming-soon banner.
  - *To Index Full Catalog (133 products):* When ready for public launch, set `NEXT_PUBLIC_COMING_SOON=false` in Vercel environment variables and redeploy so Googlebot can crawl and index all 22 routes, gemstone pages, and jewelry collections.
- [ ] **Google Sitemap Submission:** After setting coming-soon to `false`, submit `https://www.jewelexchange.lk/sitemap.xml` in Google Search Console and click **Request Indexing** on `https://www.jewelexchange.lk`.
`
- [ ] **Brand Protection (NIPO Sri Lanka):** File formal Trademark registration for "Jewel Exchange" under Class 14 & Class 35 with National Intellectual Property Office, Colombo for nationwide legal exclusivity against imitators.
- [ ] **Mobile Device Smoke Test:** Final verification on physical iOS (Safari) and Android (Chrome) devices.

---



### Environment Variables Template (`.env.production`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=rrsnwe4c
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<YOUR_SANITY_API_WRITE_TOKEN>
```

### Build & Run Commands
```bash
# 1. Install dependencies
pnpm install   # or npm install

# 2. Build for production
npm run build

# 3. Start production server
npm run start
```

---


## 4. Key Integrations Summary
* **Formspree Endpoint:** `https://formspree.io/f/xwvrebqo`
* **WhatsApp Business:** `+94773534538`
* **Instagram:** `@jewelexchange_sl`
* **Showroom Address:** `514A, R.A. De Mel Mawatha, Colombo 03, Sri Lanka`
* **Showroom Hours:** Monday - Saturday, 10:00 AM - 6:00 PM

---


### Step 1: Create the Clean Archive
Open your terminal in the `website` directory and run:
```bash
zip -r jewel_exchange_website.zip . -x "node_modules/*" ".next/*" ".git/*" ".DS_Store"
```
*(This produces a clean, lightweight zip file of ~25MB containing only the source code and static assets).*


