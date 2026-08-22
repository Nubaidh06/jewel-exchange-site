"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { wishlist } = useWishlist();

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Magnetic hover effect for desktop
  const handleMagneticMove = useCallback((e) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const handleMagneticLeave = useCallback((e) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  const handleMouseEnter = (name) => {
    if (window.matchMedia("(hover: hover)").matches) {
      setActiveDropdown(name);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownClick = (e, name) => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Floating wrapper for pill effect */}
      <div className={`nav-wrapper ${scrolled ? "nav-wrapper--scrolled" : ""} ${mounted ? "nav-wrapper--mounted" : ""}`}>
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <div className="nav__inner">

            {/* Mobile Left: Hamburger Menu */}
            <div className="nav__mobile-left">
              <button
                className={`hamburger ${mobileOpen ? "hamburger--active" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="hamburger__line"></span>
                <span className="hamburger__line"></span>
                <span className="hamburger__line"></span>
              </button>
            </div>

            {/* Left Links */}
            <div className="nav__links nav__links--left">
              <Link
                href="/"
                className={`nav__link ${isActive("/") ? "nav__link--active" : ""}`}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={{ "--stagger": 1 }}
              >
                Home
              </Link>

              {/* Jewelry Dropdown */}
              <div
                className="nav__dropdown"
                onMouseEnter={() => handleMouseEnter("jewelry")}
                onMouseLeave={handleMouseLeave}
                style={{ "--stagger": 2 }}
              >
                <Link
                  href="/jewelry"
                  className={`nav__link nav__link--dropdown ${pathname === "/jewelry" ? "nav__link--active" : ""}`}
                  onClick={(e) => handleDropdownClick(e, "jewelry")}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  aria-expanded={activeDropdown === "jewelry"}
                >
                  Jewelry
                  <svg className={`nav__chevron ${activeDropdown === "jewelry" ? "nav__chevron--open" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className={`nav__dropdown-menu ${activeDropdown === "jewelry" ? "nav__dropdown-menu--open" : ""}`}>
                  <div className="nav__dropdown-menu-inner" style={{ minWidth: '200px' }}>
                    <Link href="/jewelry" className="nav__dropdown-item">View All Jewelry</Link>
                    <Link href="/jewelry?category=Rings" className="nav__dropdown-item">Rings</Link>
                    <Link href="/jewelry?category=Necklaces" className="nav__dropdown-item">Necklaces</Link>
                    <Link href="/jewelry?category=Earrings" className="nav__dropdown-item">Earrings</Link>
                    <Link href="/jewelry?category=Bracelets" className="nav__dropdown-item">Bracelets</Link>
                    <Link href="/jewelry?category=Pendants" className="nav__dropdown-item">Pendants</Link>
                  </div>
                </div>
              </div>

              {/* Gemstones Dropdown */}
              <div
                className="nav__dropdown"
                onMouseEnter={() => handleMouseEnter("gemstones")}
                onMouseLeave={handleMouseLeave}
                style={{ "--stagger": 2.5 }}
              >
                <Link
                  href="/gemstones"
                  className={`nav__link nav__link--dropdown ${pathname === "/gemstones" ? "nav__link--active" : ""}`}
                  onClick={(e) => handleDropdownClick(e, "gemstones")}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  aria-expanded={activeDropdown === "gemstones"}
                >
                  Gemstones
                  <svg className={`nav__chevron ${activeDropdown === "gemstones" ? "nav__chevron--open" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className={`nav__dropdown-menu ${activeDropdown === "gemstones" ? "nav__dropdown-menu--open" : ""}`}>
                  <div className="nav__dropdown-menu-inner" style={{ minWidth: '210px' }}>
                    <Link href="/gemstones" className="nav__dropdown-item">View All Gemstones</Link>
                    <Link href="/gemstones?category=Sapphires" className="nav__dropdown-item">Sapphires</Link>
                    <Link href="/gemstones?category=Padparadscha" className="nav__dropdown-item">Padparadscha</Link>
                    <Link href="/gemstones?category=Rubies" className="nav__dropdown-item">Rubies</Link>
                    <Link href="/gemstones?category=Emeralds" className="nav__dropdown-item">Emeralds</Link>
                    <Link href="/gemstones?category=Diamonds" className="nav__dropdown-item">Diamonds</Link>
                    <Link href="/gemstones?category=Rare Gems" className="nav__dropdown-item">Rare & Collector Gems</Link>
                  </div>
                </div>
              </div>

              <Link
                href="/bespoke"
                className={`nav__link ${isActive("/bespoke") ? "nav__link--active" : ""}`}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={{ "--stagger": 3 }}
              >
                Bespoke
              </Link>
            </div>

            {/* Center Logo */}
            <Link href="/" className="nav__logo" style={{ "--stagger": 0 }}>
              <div className={`nav__logo-img ${scrolled ? "nav__logo-img--scrolled" : ""}`}>
                <Image
                  src="/images/logo-transparent.png"
                  alt="Jewel Exchange"
                  width={140}
                  height={70}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  priority
                />
              </div>
              <span className="nav__logo-est">SINCE 2008</span>
            </Link>

            {/* Right Links */}
            <div className="nav__links nav__links--right">
              <div className="nav__links-group">
                <Link
                  href="/booking"
                  className={`nav__link ${isActive("/booking") ? "nav__link--active" : ""}`}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ "--stagger": 4 }}
                >
                  Book Appointment
                </Link>
                <Link
                  href="/about"
                  className={`nav__link ${isActive("/about") ? "nav__link--active" : ""}`}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ "--stagger": 5 }}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`nav__link ${isActive("/contact") ? "nav__link--active" : ""}`}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ "--stagger": 6 }}
                >
                  Contact
                </Link>
              </div>

              {/* Desktop Actions: Search & Inquiry Cart on the Right */}
              <div className="nav__actions">
                <button
                  type="button"
                  className="nav__search-btn"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search creations"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ "--stagger": 6.5 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="18" height="18">
                    <circle cx="10.5" cy="10.5" r="7" />
                    <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
                  </svg>
                </button>

                <Link
                  href="/wishlist"
                  className="nav__wishlist-link"
                  aria-label="View Inquiry Cart"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ "--stagger": 7 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="19" height="19" style={{ display: "block" }}>
                    <path d="M5 8.5h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8.5z" />
                    <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" strokeLinecap="round" />
                  </svg>
                  {wishlist.length > 0 && <span className="nav__wishlist-badge">{wishlist.length}</span>}
                </Link>
              </div>
            </div>

            {/* Mobile Right: Search + Inquiry Cart */}
            <div className="nav__mobile-right">
              <button
                type="button"
                className="nav__mobile-search-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="18" height="18">
                  <circle cx="10.5" cy="10.5" r="7" />
                  <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
                </svg>
              </button>
              <Link href="/wishlist" className="nav__wishlist-link" aria-label="View Inquiry Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="19" height="19" style={{ display: "block" }}>
                  <path d="M5 8.5h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8.5z" />
                  <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" strokeLinecap="round" />
                </svg>
                {wishlist.length > 0 && <span className="nav__wishlist-badge">{wishlist.length}</span>}
              </Link>
            </div>

          </div>
        </nav>
      </div>

      {/* Luxury Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__content">
          
          {/* Header */}
          <div className="mobile-menu__header">
            <div className="mobile-menu__header-left">
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="mobile-menu__cart-btn"
                aria-label="View Inquiry Cart"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="16" height="16">
                  <path d="M5 8.5h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8.5z" />
                  <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" strokeLinecap="round" />
                </svg>
                {wishlist.length > 0 && <span className="mobile-menu__cart-badge">{wishlist.length}</span>}
              </Link>
            </div>

            <Link href="/" onClick={() => setMobileOpen(false)} className="mobile-menu__logo">
              <div className="mobile-menu__logo-img">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Jewel Exchange"
                  width={110}
                  height={48}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  priority
                />
              </div>
              <span className="mobile-menu__logo-est">SINCE 2008</span>
            </Link>

            <div className="mobile-menu__header-right">
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
          </div>

          {/* Main Navigation List */}
          <nav className="mobile-menu__nav" aria-label="Mobile Navigation">
            {/* Home */}
            <div className="mobile-menu__item" style={{ "--i": 0 }}>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`mobile-menu__link ${pathname === "/" ? "mobile-menu__link--active" : ""}`}
              >
                <span>Home</span>
              </Link>
            </div>

            {/* Jewelry with Expandable Accordion */}
            <div className="mobile-menu__item" style={{ "--i": 1 }}>
              <button
                type="button"
                className={`mobile-menu__link mobile-menu__link--expandable ${pathname.startsWith("/jewelry") ? "mobile-menu__link--active" : ""}`}
                onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "jewelry" ? null : "jewelry")}
                aria-expanded={mobileActiveDropdown === "jewelry"}
              >
                <span>Jewelry</span>
                <span className="mobile-menu__toggle-icon">
                  {mobileActiveDropdown === "jewelry" ? "−" : "+"}
                </span>
              </button>
              <div className={`mobile-menu__subnav ${mobileActiveDropdown === "jewelry" ? "mobile-menu__subnav--open" : ""}`}>
                <Link href="/jewelry" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Discover All Jewelry
                </Link>
                <Link href="/jewelry?category=Rings" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Rings
                </Link>
                <Link href="/jewelry?category=Necklaces" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Necklaces
                </Link>
                <Link href="/jewelry?category=Earrings" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Earrings
                </Link>
                <Link href="/jewelry?category=Bracelets" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Bracelets
                </Link>
                <Link href="/jewelry?category=Pendants" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Pendants
                </Link>
              </div>
            </div>

            {/* Gemstones with Expandable Accordion */}
            <div className="mobile-menu__item" style={{ "--i": 2 }}>
              <button
                type="button"
                className={`mobile-menu__link mobile-menu__link--expandable ${pathname.startsWith("/gemstones") ? "mobile-menu__link--active" : ""}`}
                onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "gemstones" ? null : "gemstones")}
                aria-expanded={mobileActiveDropdown === "gemstones"}
              >
                <span>Gemstones</span>
                <span className="mobile-menu__toggle-icon">
                  {mobileActiveDropdown === "gemstones" ? "−" : "+"}
                </span>
              </button>
              <div className={`mobile-menu__subnav ${mobileActiveDropdown === "gemstones" ? "mobile-menu__subnav--open" : ""}`}>
                <Link href="/gemstones" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Discover All Gemstones
                </Link>
                <Link href="/gemstones?category=Sapphires" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Ceylon Sapphires
                </Link>
                <Link href="/gemstones?category=Padparadscha" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Padparadscha
                </Link>
                <Link href="/gemstones?category=Rubies" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Rubies
                </Link>
                <Link href="/gemstones?category=Emeralds" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Emeralds
                </Link>
                <Link href="/gemstones?category=Diamonds" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Diamonds
                </Link>
                <Link href="/gemstones?category=Rare Gems" onClick={() => setMobileOpen(false)} className="mobile-menu__sublink">
                  Rare & Collector Gems
                </Link>
              </div>
            </div>

            {/* Bespoke */}
            <div className="mobile-menu__item" style={{ "--i": 3 }}>
              <Link
                href="/bespoke"
                onClick={() => setMobileOpen(false)}
                className={`mobile-menu__link ${pathname === "/bespoke" ? "mobile-menu__link--active" : ""}`}
              >
                <span>Bespoke</span>
              </Link>
            </div>

            {/* About Us */}
            <div className="mobile-menu__item" style={{ "--i": 4 }}>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`mobile-menu__link ${pathname === "/about" ? "mobile-menu__link--active" : ""}`}
              >
                <span>About Us</span>
              </Link>
            </div>

            {/* Contact */}
            <div className="mobile-menu__item" style={{ "--i": 5 }}>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`mobile-menu__link ${pathname === "/contact" ? "mobile-menu__link--active" : ""}`}
              >
                <span>Contact</span>
              </Link>
            </div>
          </nav>

          {/* Booking Action */}
          <div className="mobile-menu__concierge">
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mobile-menu__booking-btn"
            >
              Book Appointment
            </Link>
          </div>

          {/* Understated Luxury Footer */}
          <div className="mobile-menu__footer">
            <p className="mobile-menu__location">Colombo • Sri Lanka</p>
            <p className="mobile-menu__address">514A, R.A. De Mel Mawatha, Colombo 03</p>
          </div>
        </div>
      </div>

      {/* Global Real-Time Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

