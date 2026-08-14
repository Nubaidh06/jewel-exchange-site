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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
