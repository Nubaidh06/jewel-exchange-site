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
          <form className="footer__newsletter-form" action="#">
            <input
              type="email"
              placeholder="Your email address"
              className="form-input footer__newsletter-input"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="btn btn--sm">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image
            src="/images/logo-transparent.png"
            alt="Jewel Exchange"
            width={130}
            height={65}
            style={{ objectFit: "contain" }}
          />
          <p className="footer__tagline">
            Exquisite bespoke jewelry and premium gemstones, crafted in the heart of Sri Lanka.
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
          <h4 className="footer__heading">Connect</h4>
          <nav className="footer__nav">
            <a href="https://www.instagram.com/jewelexchange_sl/" target="_blank" rel="noopener noreferrer">Instagram</a>
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
