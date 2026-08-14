# Jewel Exchange — Pre-Completion Checklist & Handoff Reference

This document tracks all completed and pending tasks prior to final handoff and public deployment of the **Jewel Exchange** platform.

---

## 1. Master Task Tracking

### Section A: Forms & Lead Capture
- [x] **Contact Form:** Live Formspree endpoint (`https://formspree.io/f/xwvrebqo`) connected with custom subject line (`New Contact Inquiry - Jewel Exchange`).
- [x] **Booking / Consultation Form:** Connected with asynchronous AJAX submission, live Formspree endpoint, and in-page luxury confirmation view.
- [x] **WhatsApp Direct Routing:** Phone number (`+94773534538`) and pre-filled luxury messages verified across product pages, inquiry cart, and mobile sticky bar.
- [x] **Social & Map Links:** Instagram (`@jewelexchange_sl`), Google Maps flagship location, and phone call triggers (`+94 11 250 5020`).

---

### Section B: Sanity CMS & Catalog Management *(To Do Later)*
- [ ] **Sanity Environment Keys:** Confirm `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in production environment.
- [ ] **Upload Inventory:** Populate live products (rings, necklaces, earrings, bracelets, loose gemstones) in Sanity Studio (`/studio`).
- [ ] **Product Specifications:** Add metal karat, stone weight, lab cert details, and pricing to each piece.
- [ ] **Featured Flag:** Toggle `featured: true` on 4–8 flagship pieces for the homepage curated carousel.
- [ ] **Image Asset Optimization:** Confirm uploaded photos render with `?auto=format` without latency.

---

### Section C: Content, Typography & Copywriting *(To Do Later)*
- [x] **Em Dash Cleanup:** Replaced all em dashes (`—`) with standard hyphens (`-`) across copy, metadata, and alt tags.
- [ ] **Final Text & Story Tweaks:** Final read of About page heritage copy, Bespoke process steps, and FAQs.
- [ ] **Final Photography Swaps:** Replace any remaining placeholder model/craftsmanship photos with finalized brand assets.

---

### Section D: Legal & Policy Pages *(To Do Later)*
- [ ] **Shipping & Delivery Policy ([/shipping](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/shipping/page.js)):** Confirm courier partners (FedEx/DHL Express), transit times, and international duties.
- [ ] **Refunds & Exchanges Policy ([/refunds](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/refunds/page.js)):** Confirm 14-day exchange terms and bespoke order exclusions.
- [ ] **Terms & Conditions ([/terms](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/terms/page.js)):** Review standard terms of service.
- [ ] **Privacy Policy ([/privacy](file:///Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/app/privacy/page.js)):** Review customer data collection and privacy terms.

---

### Section E: SEO, Domain & Search Indexing
- [x] **Production Domain Set:** Configured `https://jewelexchange.lk` in metadata, OpenGraph, sitemap, and robots.
- [x] **Dynamic XML Sitemap:** Generated at `/sitemap.xml` with static and dynamic catalog routes.
- [x] **Search Engine Robots:** Configured `/robots.txt` with `/studio` protected from crawling.
- [ ] **Favicon & Touch Icons:** Confirm high-res gold jewel icon appears in browser tabs and mobile home screen bookmarks.
- [ ] **Social Share (OG) Preview:** Verify preview card image and title when sharing the URL on WhatsApp/iMessage/social media.

---

### Section F: Interactive Tools & UI Polish
- [x] **Mobile Product Slider:** Responsive 1:1 uncropped aspect ratio with swipe snapping and indicator dots.
- [x] **Desktop Product Gallery:** Split layout with left vertical thumbnail track and uncropped main image.
- [x] **Contact Showroom Card:** Elevated atelier container with icons, hours, amenities, and directions.
- [ ] **Printable Ring Sizing PDF:** Verify the downloadable sizing guide PDF in `/public` is the final branded version.
- [ ] **Wishlist Inquiry Cart:** Test adding items, clearing, and dispatching a consolidated multi-item inquiry to WhatsApp.

---

### Section G: Performance & Deployment Validation *(To Do Later)*
- [ ] **Production Build Test:** Run `npm run build` locally to verify 0 errors or warnings.
- [ ] **Mobile Device Smoke Test:** Verify on physical iOS (Safari) and Android (Chrome) devices.
- [ ] **Custom 404 Page:** Verify `/not-found` displays cleanly if a user types a broken URL.

---

## 2. Handoff & Packaging Instructions for Deployment Team

### How to Create the Clean Deployment Zip
Do **NOT** include `node_modules/` or `.next/` in the handoff archive (they will inflate the file size from ~25MB to 500MB+).

To generate the clean zip via terminal:
```bash
cd website
zip -r jewel_exchange_website.zip . -x "node_modules/*" ".next/*" ".git/*" ".DS_Store"
```

### Environment Variables Template (`.env.production`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=rrsnwe4c
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk03RRt4ykmOS2sNK85TJmy8tJ0GuUovsfZZFouqtBy2gcjRSffAudoYKfCTLzNvJDFSMO7ygeeb857uLCJrIaxnWcH35Muk1EI8v3ZU8uSW4HXei5u7i8u6Z2Iv1n17YhQQ7IdhAW6Jf803hqN4zxMvGh4Pctd4rYQDX5OSFKWhv8hWrQL1
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

## 3. Coexisting with Existing Inventory System on Domain

Because the `jewelexchange.lk` domain currently has an inventory system connected:
* **Option A (Subdomain Routing — Recommended):** Host the Next.js website on the root apex domain (`jewelexchange.lk` and `www.jewelexchange.lk`), and route the inventory system to `inventory.jewelexchange.lk` or `pos.jewelexchange.lk`.
* **Option B (Reverse Proxy Path):** If the inventory system lives on a specific subpath (e.g. `/inventory` or `/admin`), configure the reverse proxy (Nginx / Cloudflare / Vercel rewrites) to proxy that path while Next.js handles all public customer routes.

---

## 4. Key Integrations Summary
* **Formspree Endpoint:** `https://formspree.io/f/xwvrebqo`
* **WhatsApp Business:** `+94773534538`
* **Instagram:** `@jewelexchange_sl`
* **Showroom Address:** `514A, R.A. De Mel Mawatha, Colombo 03, Sri Lanka`
* **Showroom Hours:** Monday - Saturday, 10:00 AM - 6:00 PM

---

## 5. Step-by-Step Instructions: Sending Files to Domain Team

When you are ready to hand over the website to the team maintaining the domain and inventory system:

### Step 1: Create the Clean Archive
Open your terminal in the `website` directory and run:
```bash
zip -r jewel_exchange_website.zip . -x "node_modules/*" ".next/*" ".git/*" ".DS_Store"
```
*(This produces a clean, lightweight zip file of ~25MB containing only the source code and static assets).*

### Step 2: Share the File & Variables
Send the `.zip` file over via Google Drive, WeTransfer, Email, or Slack to the team, along with:
1. **The Zip File:** `jewel_exchange_website.zip`
2. **The Environment Variables:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=rrsnwe4c
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=sk03RRt4ykmOS2sNK85TJmy8tJ0GuUovsfZZFouqtBy2gcjRSffAudoYKfCTLzNvJDFSMO7ygeeb857uLCJrIaxnWcH35Muk1EI8v3ZU8uSW4HXei5u7i8u6Z2Iv1n17YhQQ7IdhAW6Jf803hqN4zxMvGh4Pctd4rYQDX5OSFKWhv8hWrQL1
   ```

### Step 3: Message / Email Template to the Domain Team
You can copy & paste this message when sending them the files:

> **Subject:** Jewel Exchange — Next.js Website Files & Deployment Package
>
> Hi Team,
>
> Attached is the complete source code for the new **Jewel Exchange** web platform (`jewel_exchange_website.zip`).
>
> **Key Details for Deployment:**
> 1. **Framework:** Next.js (App Router, Node.js 18.18+ / 20.x).
> 2. **Build Commands:** `npm install` followed by `npm run build` and `npm run start` (or deploy directly to your preferred hosting/Vercel/Docker setup).
> 3. **Environment Variables:** Please set `NEXT_PUBLIC_SANITY_PROJECT_ID=rrsnwe4c` and `NEXT_PUBLIC_SANITY_DATASET=production`.
> 4. **Domain & Routing:** Please refer to **`DEPLOYMENT.md`** inside the folder for routing details and how to point the root domain (`jewelexchange.lk`) to this website while keeping our existing inventory system mapped.
>
> Let us know if you have any questions during setup!

