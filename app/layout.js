import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import WhatsAppWidget from "./components/WhatsAppWidget";
import ScrollToTop from "./components/ScrollToTop";
import { WishlistProvider } from "../lib/WishlistContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://jewelexchange.lk"),
  title: "Jewel Exchange | Bespoke Jewelry & Gemstones - Sri Lanka",
  description:
    "Exquisite bespoke jewelry and premium gemstones crafted to perfection in Sri Lanka. Discover our collections or create your own masterpiece.",
  openGraph: {
    title: "Jewel Exchange | Bespoke Jewelry & Gemstones",
    description: "Exquisite bespoke jewelry and premium gemstones crafted to perfection in Sri Lanka.",
    url: "https://jewelexchange.lk",
    siteName: "Jewel Exchange",
    images: [
      {
        url: "/images/banners/banner%202.png", // fallback image
        width: 1200,
        height: 630,
        alt: "Jewel Exchange Jewelry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewel Exchange | Bespoke Jewelry & Gemstones",
    description: "Exquisite bespoke jewelry and premium gemstones crafted to perfection in Sri Lanka.",
    images: ["/images/banners/banner%202.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": "https://jewelexchange.lk/#store",
  "name": "Jewel Exchange",
  "alternateName": "Jewel Exchange Sri Lanka",
  "url": "https://jewelexchange.lk",
  "logo": "https://jewelexchange.lk/images/logo-transparent.png",
  "image": [
    "https://jewelexchange.lk/images/banners/banner%201.png",
    "https://jewelexchange.lk/images/models_and_shots/02.png",
    "https://jewelexchange.lk/images/models_and_shots/20.png"
  ],
  "description": "Premier bespoke jewelry atelier and certified Ceylon gemstone specialists based in Colombo, Sri Lanka.",
  "telephone": "+94 11 250 5020",
  "email": "info@jewelexchange.lk",
  "priceRange": "$$$$",
  "currenciesAccepted": "LKR, USD, EUR, GBP, AUD",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "514A, R.A. De Mel Mawatha",
    "addressLocality": "Colombo",
    "addressRegion": "Western Province",
    "postalCode": "00300",
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.8996,
    "longitude": 79.8553
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/jewelexchange_sl/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Jewelry & Gemstone Collections",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Bespoke Custom Jewelry"
      },
      {
        "@type": "OfferCatalog",
        "name": "Ceylon Sapphires & Rare Gemstones"
      },
      {
        "@type": "OfferCatalog",
        "name": "Fine Engagement Rings & Wedding Bands"
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${outfit.variable}`}>
        <WishlistProvider>
          <ScrollReveal />
          <Navbar />
          <main>{children}</main>
          <WhatsAppWidget />
          <ScrollToTop />
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
