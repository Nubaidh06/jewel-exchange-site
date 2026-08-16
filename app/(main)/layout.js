import Script from 'next/script';
import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppWidget from '../components/WhatsAppWidget';
import ScrollToTop from '../components/ScrollToTop';
import { WishlistProvider } from '../../lib/WishlistContext';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type':    'JewelryStore',
  '@id':      'https://jewelexchange.lk/#store',
  'name':     'Jewel Exchange',
  'alternateName': 'Jewel Exchange Sri Lanka',
  'url':      'https://jewelexchange.lk',
  'logo':     'https://jewelexchange.lk/images/logo-transparent.png',
  'image': [
    'https://jewelexchange.lk/images/banners/banner%201.png',
    'https://jewelexchange.lk/images/models_and_shots/02.png',
    'https://jewelexchange.lk/images/models_and_shots/20.png',
  ],
  'description': 'Premier bespoke jewelry atelier and certified Ceylon gemstone specialists based in Colombo, Sri Lanka.',
  'telephone':   '+94 11 250 5020',
  'email':       'info@jewelexchange.lk',
  'priceRange':  '$$$$',
  'currenciesAccepted': 'LKR, USD, EUR, GBP, AUD',
  'paymentAccepted':    'Cash, Credit Card, Bank Transfer',
  'address': {
    '@type':           'PostalAddress',
    'streetAddress':   '514A, R.A. De Mel Mawatha',
    'addressLocality': 'Colombo',
    'addressRegion':   'Western Province',
    'postalCode':      '00300',
    'addressCountry':  'LK',
  },
  'geo': { '@type': 'GeoCoordinates', 'latitude': 6.8996, 'longitude': 79.8553 },
  'openingHoursSpecification': [{
    '@type':      'OpeningHoursSpecification',
    'dayOfWeek':  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    'opens':      '10:00',
    'closes':     '18:00',
  }],
  'sameAs': ['https://www.instagram.com/jewelexchange_sl/'],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name':  'Jewelry & Gemstone Collections',
    'itemListElement': [
      { '@type': 'OfferCatalog', 'name': 'Bespoke Custom Jewelry' },
      { '@type': 'OfferCatalog', 'name': 'Ceylon Sapphires & Rare Gemstones' },
      { '@type': 'OfferCatalog', 'name': 'Fine Engagement Rings & Wedding Bands' },
    ],
  },
};

export default function MainLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      <WishlistProvider>
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <WhatsAppWidget />
        <ScrollToTop />
        <Footer />
      </WishlistProvider>
    </>
  );
}
