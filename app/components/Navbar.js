"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWishlist } from "../../lib/WishlistContext";
import SearchModal from "./SearchModal";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path) => pathname === path;

  return (
    <>
      <div className={`nav-wrapper ${scrolled ? "nav-wrapper--scrolled" : ""} ${mounted ? "nav-wrapper--mounted" : ""}`}>

        {/* ── ROW 1: Utility Bar ── */}
        <div className="nav-utility">
          <div className="nav-utility__left">
            <a href="tel:+94776778821" className="nav-utility__item">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +94 77 677 8821
            </a>
            <span className="nav-utility__divider" />
            <Link href="/contact" className="nav-utility__item">
              Colombo, Sri Lanka
            </Link>
          </div>
          <div className="nav-utility__right">
            <Link href="/booking" className="nav-utility__item">
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* ── ROW 2: Brand Bar ── */}
        <div className="nav-brand">
          {/* Left — Desktop nav links start / Mobile hamburger */}
          <div className="nav-brand__left">
            {/* Mobile hamburger */}
            <button
              className={`hamburger ${mobileOpen ? "hamburger--active" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger__line" />
              <span className="hamburger__line" />
              <span className="hamburger__line" />
            </button>

            {/* Desktop search (left of logo for balance) */}
            <button
              type="button"
              className="nav__icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search creations"
              style={{ display: "none" }}
            />
          </div>

          {/* Center — Logo */}
          <Link href="/" className="nav__logo" aria-label="Jewel Exchange – Home">
            <div className="nav__logo-img">
              <Image
                src="/images/logo-transparent.png"
                alt="Jewel Exchange"
                width={140}
                height={60}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                priority
              />
            </div>
            <span className="nav__logo-est">Since 2008</span>
          </Link>

          {/* Right — Icons */}
          <div className="nav-brand__right">
            {/* Search */}
            <button
              type="button"
              className="nav__icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search creations"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="18" height="18">
                <circle cx="10.5" cy="10.5" r="7" />
                <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
              </svg>
            </button>

            {/* Inquiry Cart */}
            <Link href="/wishlist" className="nav__icon-btn" aria-label="View Inquiry Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="19" height="19">
                <path d="M5 8.5h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8.5z" />
                <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" strokeLinecap="round" />
              </svg>
              {wishlist.length > 0 && <span className="nav__wishlist-badge">{wishlist.length}</span>}
            </Link>
          </div>
        </div>

        {/* ── ROW 3: Navigation Links (Desktop only) ── */}
        <nav className="nav-links" aria-label="Main navigation">

          {/* Jewelry dropdown */}
          <div
            className="nav__dropdown"
            onMouseEnter={() => setActiveDropdown("jewelry")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/jewelry"
              className={`nav__link ${pathname.startsWith("/jewelry") ? "nav__link--active" : ""}`}
              onClick={(e) => {
                if (!window.matchMedia("(hover: hover)").matches) {
                  e.preventDefault();
                  setActiveDropdown(activeDropdown === "jewelry" ? null : "jewelry");
                }
              }}
              aria-expanded={activeDropdown === "jewelry"}
            >
              Jewelry
              <svg className={`nav__chevron ${activeDropdown === "jewelry" ? "nav__chevron--open" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className={`nav__dropdown-menu ${activeDropdown === "jewelry" ? "nav__dropdown-menu--open" : ""}`}>
              <div className="nav__dropdown-menu-inner">
                <Link href="/jewelry" className="nav__dropdown-item">View All Jewelry</Link>
                <Link href="/jewelry?category=Rings" className="nav__dropdown-item">Rings</Link>
                <Link href="/jewelry?category=Necklaces%20%26%20Pendants" className="nav__dropdown-item">Necklaces &amp; Pendants</Link>
                <Link href="/jewelry?category=Earrings" className="nav__dropdown-item">Earrings</Link>
                <Link href="/jewelry?category=Bracelets" className="nav__dropdown-item">Bracelets</Link>
              </div>
            </div>
          </div>

          {/* Gemstones dropdown */}
          <div
            className="nav__dropdown"
            onMouseEnter={() => setActiveDropdown("gemstones")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/gemstones"
              className={`nav__link ${pathname.startsWith("/gemstones") ? "nav__link--active" : ""}`}
              onClick={(e) => {
                if (!window.matchMedia("(hover: hover)").matches) {
                  e.preventDefault();
                  setActiveDropdown(activeDropdown === "gemstones" ? null : "gemstones");
                }
              }}
              aria-expanded={activeDropdown === "gemstones"}
            >
              Gemstones
              <svg className={`nav__chevron ${activeDropdown === "gemstones" ? "nav__chevron--open" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className={`nav__dropdown-menu ${activeDropdown === "gemstones" ? "nav__dropdown-menu--open" : ""}`}>
              <div className="nav__dropdown-menu-inner">
                <Link href="/gemstones" className="nav__dropdown-item">View All Gemstones</Link>
                <Link href="/gemstones?category=Sapphires" className="nav__dropdown-item">Sapphires</Link>
                <Link href="/gemstones?category=Padparadscha" className="nav__dropdown-item">Padparadscha</Link>
                <Link href="/gemstones?category=Rubies" className="nav__dropdown-item">Rubies</Link>
                <Link href="/gemstones?category=Emeralds" className="nav__dropdown-item">Emeralds</Link>
                <Link href="/gemstones?category=Diamonds" className="nav__dropdown-item">Diamonds</Link>
                <Link href="/gemstones?category=Rare Gems" className="nav__dropdown-item">Rare &amp; Collector Gems</Link>
              </div>
            </div>
          </div>

          <Link href="/bespoke" className={`nav__link ${isActive("/bespoke") ? "nav__link--active" : ""}`}>Bespoke</Link>
          <Link href="/booking" className={`nav__link ${isActive("/booking") ? "nav__link--active" : ""}`}>Book Appointment</Link>
          <Link href="/about" className={`nav__link ${isActive("/about") ? "nav__link--active" : ""}`}>About Us</Link>
          <Link href="/contact" className={`nav__link ${isActive("/contact") ? "nav__link--active" : ""}`}>Contact</Link>
        </nav>

      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__content">

          {/* Header */}
          <div className="mobile-menu__header">
            <button
              className="mobile-menu__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="mobile-menu__nav" aria-label="Mobile Navigation">

            <div className="mobile-menu__item" style={{ "--i": 0 }}>
              <Link href="/" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/") ? "mobile-menu__link--active" : ""}`}>
                <span>Home</span>
              </Link>
            </div>

            <div className="mobile-menu__item" style={{ "--i": 1 }}>
              <button
                type="button"
                className={`mobile-menu__link ${pathname.startsWith("/jewelry") ? "mobile-menu__link--active" : ""}`}
                onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "jewelry" ? null : "jewelry")}
                aria-expanded={mobileActiveDropdown === "jewelry"}
              >
                <span>Jewelry</span>
                <span className="mobile-menu__toggle-icon">{mobileActiveDropdown === "jewelry" ? "−" : "+"}</span>
              </button>
              <div className={`mobile-menu__subnav ${mobileActiveDropdown === "jewelry" ? "mobile-menu__subnav--open" : ""}`}>
                <Link href="/jewelry" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Discover All</Link>
                <Link href="/jewelry?category=Rings" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Rings</Link>
                <Link href="/jewelry?category=Necklaces%20%26%20Pendants" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Necklaces &amp; Pendants</Link>
                <Link href="/jewelry?category=Earrings" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Earrings</Link>
                <Link href="/jewelry?category=Bracelets" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Bracelets</Link>
              </div>
            </div>

            <div className="mobile-menu__item" style={{ "--i": 2 }}>
              <button
                type="button"
                className={`mobile-menu__link ${pathname.startsWith("/gemstones") ? "mobile-menu__link--active" : ""}`}
                onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "gemstones" ? null : "gemstones")}
                aria-expanded={mobileActiveDropdown === "gemstones"}
              >
                <span>Gemstones</span>
                <span className="mobile-menu__toggle-icon">{mobileActiveDropdown === "gemstones" ? "−" : "+"}</span>
              </button>
              <div className={`mobile-menu__subnav ${mobileActiveDropdown === "gemstones" ? "mobile-menu__subnav--open" : ""}`}>
                <Link href="/gemstones" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Discover All</Link>
                <Link href="/gemstones?category=Sapphires" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Ceylon Sapphires</Link>
                <Link href="/gemstones?category=Padparadscha" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Padparadscha</Link>
                <Link href="/gemstones?category=Rubies" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Rubies</Link>
                <Link href="/gemstones?category=Emeralds" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Emeralds</Link>
                <Link href="/gemstones?category=Diamonds" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Diamonds</Link>
                <Link href="/gemstones?category=Rare Gems" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">Rare &amp; Collector Gems</Link>
              </div>
            </div>

            <div className="mobile-menu__item" style={{ "--i": 3 }}>
              <Link href="/bespoke" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/bespoke") ? "mobile-menu__link--active" : ""}`}>
                <span>Bespoke</span>
              </Link>
            </div>

            <div className="mobile-menu__item" style={{ "--i": 4 }}>
              <Link href="/about" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/about") ? "mobile-menu__link--active" : ""}`}>
                <span>About Us</span>
              </Link>
            </div>

            <div className="mobile-menu__item" style={{ "--i": 5 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/contact") ? "mobile-menu__link--active" : ""}`}>
                <span>Contact</span>
              </Link>
            </div>

          </nav>

          {/* Booking CTA */}
          <div className="mobile-menu__concierge">
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="mobile-menu__booking-btn">
              Book Appointment
            </Link>
          </div>

          {/* Footer */}
          <div className="mobile-menu__footer">
            <span className="mobile-menu__location">Colombo • Sri Lanka</span>
            <span className="mobile-menu__address">514A, R.A. De Mel Mawatha, Colombo 03</span>
          </div>

        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
