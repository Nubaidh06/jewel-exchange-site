"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWishlist } from "../../lib/WishlistContext";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);
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
    } else {
      e.preventDefault();
    }
  };

  const isActive = (path) => pathname === path;
  const isCollectionActive = pathname === "/jewelry" || pathname === "/gemstones";

  return (
    <>
      {/* Floating wrapper for pill effect */}
      <div className={`nav-wrapper ${scrolled ? "nav-wrapper--scrolled" : ""} ${mounted ? "nav-wrapper--mounted" : ""}`}>
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <div className="nav__inner">

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

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="nav__wishlist-link"
                aria-label="View Inquiry Cart"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={{ "--stagger": 7 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" style={{ display: "block" }}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {wishlist.length > 0 && <span className="nav__wishlist-badge">{wishlist.length}</span>}
              </Link>
            </div>

            {/* Mobile: Wishlist + Hamburger */}
            <div className="nav__mobile-right">
              <Link href="/wishlist" className="nav__wishlist-link" aria-label="View Inquiry Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" style={{ display: "block" }}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {wishlist.length > 0 && <span className="nav__wishlist-badge">{wishlist.length}</span>}
              </Link>
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

          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <Link href="/" onClick={() => setMobileOpen(false)} className="mobile-menu__logo">
              <Image
                src="/images/logo-transparent.png"
                alt="Jewel Exchange"
                width={85}
                height={34}
                style={{ objectFit: "contain" }}
              />
              <span className="mobile-menu__logo-est">SINCE 2008</span>
            </Link>
            <button 
              className="mobile-menu__close" 
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mobile-menu__nav">
            <Link href="/" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 0 }}>
              <span>Home</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/jewelry" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/jewelry") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 1 }}>
              <span>Jewelry</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/gemstones" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/gemstones") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 2 }}>
              <span>Gemstones</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/bespoke" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/bespoke") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 3 }}>
              <span>Bespoke</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/booking" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/booking") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 4 }}>
              <span>Book Appointment</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/about") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 5 }}>
              <span>About</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className={`mobile-menu__link ${isActive("/contact") ? "mobile-menu__link--active" : ""}`} style={{ "--i": 6 }}>
              <span>Contact</span>
              <span className="mobile-menu__link-arrow">→</span>
            </Link>
          </div>

          <div className="mobile-menu__footer">
            <p className="mobile-menu__address">
              514A, R.A. De Mel Mawatha, Colombo 03
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
