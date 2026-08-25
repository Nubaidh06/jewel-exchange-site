import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

// Redesigned mobile layout applied

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Row */}
      <div className="footer__newsletter">
        <div className="container footer__newsletter-inner">
          <div>
            <h3 className="footer__newsletter-title">Stay in the Loop</h3>
            <p className="footer__newsletter-desc">Be the first to know about new collections and exclusive offers.</p>
          </div>
          <div className="footer__newsletter-form-wrapper">
            <form className="footer__newsletter-form" action="#">
              <input
                type="email"
                placeholder="Your email address"
                className="form-input footer__newsletter-input"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn--sm">Subscribe</button>
            </form>
            <p className="footer__newsletter-consent" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
              By subscribing, you agree to our <Link href="/privacy" style={{ textDecoration: 'underline', color: 'rgba(255,255,255,0.8)' }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" className="footer__logo-link" aria-label="Jewel Exchange Home">
            <Image
              src="/images/logo-transparent.png"
              alt="Jewel Exchange"
              width={125}
              height={55}
              style={{ objectFit: "contain", width: "auto", height: "46px" }}
            />
          </Link>
          <p className="footer__tagline">
            Curated fine jewelry and rare natural gemstones. Colombo, Sri Lanka.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Collections</h4>
          <nav className="footer__nav">
            <Link href="/jewelry">Jewelry</Link>
            <Link href="/gemstones">Gemstones</Link>
            <Link href="/bespoke">Bespoke</Link>
          </nav>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <nav className="footer__nav">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Legal</h4>
          <nav className="footer__nav">
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refunds">Refunds & Returns</Link>
            <Link href="/shipping">Shipping & Delivery</Link>
          </nav>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Connect</h4>
          <nav className="footer__nav">
            <a href="https://www.instagram.com/jewelexchange_sl/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/p/Jewel-Exchange-100063528752599/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="mailto:info@jewelexchange.lk">info@jewelexchange.lk</a>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} Jewel Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
