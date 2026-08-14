# Jewel Exchange Website — Deployment & Handoff Guide

This document contains technical specifications, environment variables, routing notes, and deployment instructions for the **Jewel Exchange** web platform.

---

## 1. Technology Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Client Hooks)
* **Runtime:** Node.js `>= 18.18.0` (or Node.js `20.x LTS` recommended)
* **Package Manager:** `pnpm` (or `npm` / `yarn`)
* **CMS & Content Pipeline:** [Sanity.io](https://www.sanity.io/) (Headless CMS + Edge CDN)
* **Styling:** Vanilla CSS (Global Design System with CSS variables)
* **Form Handling:** Formspree (`https://formspree.io/f/xwvrebqo`)

---

## 2. Environment Variables
The following environment variables must be configured in the deployment environment (e.g. Vercel, AWS Amplify, Docker, or `.env.production`):

| Variable | Required | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes** | Sanity Project ID for inventory and content | `rrsnwe4c` |
| `NEXT_PUBLIC_SANITY_DATASET` | **Yes** | Sanity Dataset name | `production` |
| `SANITY_API_TOKEN` | *Optional* | Read/Write Token for data migration scripts | *(Secret Token)* |

A template file is provided in `.env.example`.

---

## 3. Build & Run Commands

### Installation
```bash
pnpm install
# or
npm install
```

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
# Server listens on PORT 3000 by default (override with -p <port>)
```

---

## 4. Routing & Inventory System Integration Notes

> **Important for Domain & Infrastructure Team:**
> Because the `jewelexchange.lk` domain currently has an existing inventory system connected, please note how the public website routes are structured:

### Public Website Routes:
* `/` — Homepage (Hero, Our Craft, Curated Pieces, Bespoke teaser)
* `/jewelry` & `/jewelry/[slug]` — Jewelry Catalog & Detail Pages
* `/gemstones` & `/gemstones/[slug]` — Gemstone Catalog & Detail Pages
* `/bespoke` — Bespoke Custom Creation Journey
* `/booking` — Private Showroom & Consultation Booking
* `/contact` — Contact Form, Flagship Atelier Details & Interactive Map
* `/about` — Heritage, Story & Brand Values
* `/wishlist` — Client Inquiry Cart & WhatsApp Dispatch
* `/shipping`, `/refunds`, `/terms`, `/privacy` — Legal & Policy Pages
* `/studio` — Embedded Sanity Content Studio (Access control managed via Sanity Auth)
* `/sitemap.xml` & `/robots.txt` — Automated Search Engine indexing

### Coexisting with Existing Systems:
1. **Option A (Recommended):** Host the Next.js website at the root apex domain (`jewelexchange.lk` / `www.jewelexchange.lk`) and point internal inventory/POS systems to a dedicated subdomain (e.g., `inventory.jewelexchange.lk` or `pos.jewelexchange.lk`).
2. **Option B (Reverse Proxy):** If the inventory system lives on a specific subpath (e.g. `/inventory` or `/admin`), configure your reverse proxy (Nginx / Cloudflare / Vercel Rewrites) to proxy that path to your inventory backend while Next.js handles all other public routes.

---

## 5. Contact & Integrations Summary
* **Inquiry Email Formspree:** `https://formspree.io/f/xwvrebqo` (Receives contact messages & consultation booking requests).
* **WhatsApp Concierge:** `+94773534538`
* **Instagram:** `@jewelexchange_sl`
* **Flagship Address:** `514A, R.A. De Mel Mawatha, Colombo 03, Sri Lanka`

---

## 6. Project Directory Structure
```
├── app/                  # Next.js App Router (Pages, Layouts, CSS)
├── lib/                  # Sanity client, Wishlist context, static data
├── public/               # Public assets (images, logos, sizing guide PDF)
├── sanity/               # Sanity schemas and CMS configuration
├── scripts/              # Migration and helper scripts
├── next.config.mjs       # Next.js image domain whitelist and config
├── package.json          # Dependencies and build scripts
└── DEPLOYMENT.md         # This deployment guide
```
