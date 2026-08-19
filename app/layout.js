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
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'] });
const outfit   = Outfit({ variable: '--font-outfit',   subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://www.jewelexchange.lk'),
  title: {
    default: 'Jewel Exchange | Bespoke Fine Jewelry & Ceylon Gemstones',
    template: '%s | Jewel Exchange',
  },
  description: 'Colombo’s premier jewelry atelier and Ceylon gemstone specialists. Handcrafted fine rings, necklaces, bracelets, and unheated sapphires in Sri Lanka.',
  keywords: [
    'Jewel Exchange',
    'Jewel Exchange Colombo',
    'Jewel Exchange Sri Lanka',
    'Bespoke Jewelry Sri Lanka',
    'Custom Jewelry Sri Lanka',
    'Custom Ring Sri Lanka',
    'Ceylon Sapphires',
    'Pink Sapphire Sri Lanka',
    

    'Padparadscha Sapphire Sri Lanka',
    'Fine Jewelry Colombo',
    'Custom Engagement Rings Sri Lanka',
  ],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://www.jewelexchange.lk',
  },
  verification: {
    google: 'e5gAbbpjDuKqyw2ruxtVgdfrvUgXlSwDhAmBghWtbE8',
  },
  openGraph: {
    title: 'Jewel Exchange | Bespoke Fine Jewelry & Ceylon Gemstones',
    description: 'Colombo’s premier jewelry atelier and Ceylon gemstone specialists. Handcrafted fine jewelry in Sri Lanka.',
    url: 'https://www.jewelexchange.lk',
    siteName: 'Jewel Exchange',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Jewel Exchange - Bespoke Fine Jewelry & Ceylon Gemstones' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewel Exchange | Bespoke Fine Jewelry & Ceylon Gemstones',
    description: 'Colombo’s premier jewelry atelier and Ceylon gemstone specialists. Handcrafted fine jewelry in Sri Lanka.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${outfit.variable}`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
