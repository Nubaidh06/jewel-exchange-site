/**
 * app/layout.js  —  Root Shell Layout
 *
 * The root layout is intentionally minimal — it only renders <html> and <body>.
 * All site chrome (Navbar, Footer, WhatsApp widget, etc.) lives in:
 *   app/(main)/layout.js  →  wraps all public customer routes
 *
 * The coming-soon page at app/coming-soon/ inherits this bare root layout
 * only, giving it a completely standalone, full-screen experience.
 */

import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'] });
const outfit   = Outfit({ variable: '--font-outfit',   subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://jewelexchange.lk'),
  title:       'Jewel Exchange | Bespoke Jewelry & Gemstones - Sri Lanka',
  description: 'Exquisite bespoke jewelry and premium gemstones crafted to perfection in Sri Lanka. Discover our collections or create your own masterpiece.',
  openGraph: {
    title:       'Jewel Exchange | Bespoke Jewelry & Gemstones - Sri Lanka',
    description: 'Exquisite bespoke jewelry, rare Ceylon sapphires, and handcrafted fine jewelry atelier in Colombo, Sri Lanka.',
    url:         'https://jewelexchange.lk',
    siteName:    'Jewel Exchange',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Jewel Exchange - Bespoke Jewelry & Gemstones' }],
    locale: 'en_US',
    type:   'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Jewel Exchange | Bespoke Jewelry & Gemstones - Sri Lanka',
    description: 'Exquisite bespoke jewelry, rare Ceylon sapphires, and handcrafted fine jewelry atelier in Colombo, Sri Lanka.',
    images:      ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
