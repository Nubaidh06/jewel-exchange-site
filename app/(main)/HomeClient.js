"use client";
import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQAccordion from "../components/FAQAccordion";
import "./page.css";

export default function HomeClient({ featuredProducts = [] }) {
  const carouselRef = useRef(null);
  const featuredThumbRef = useRef(null);
  const categoryGridRef = useRef(null);
  const categoryThumbRef = useRef(null);

  // Sync Featured Carousel Scroll with Slider Thumb
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    const thumb = featuredThumbRef.current;
    if (!el || !thumb) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      thumb.style.transform = "translateX(0px)";
      return;
    }
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const track = thumb.parentElement;
    const trackWidth = track ? track.clientWidth : 180;
    const thumbWidth = thumb.clientWidth || 65;
    const maxTranslate = Math.max(trackWidth - thumbWidth, 0);
    thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
  }, []);

  // Sync Category Grid Scroll with Slider Thumb
  const handleCategoryScroll = useCallback(() => {
    const el = categoryGridRef.current;
    const thumb = categoryThumbRef.current;
    if (!el || !thumb) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      thumb.style.transform = "translateX(0px)";
      return;
    }
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const track = thumb.parentElement;
    const trackWidth = track ? track.clientWidth : 180;
    const thumbWidth = thumb.clientWidth || 65;
    const maxTranslate = Math.max(trackWidth - thumbWidth, 0);
    thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
  }, []);

  // Scroll listeners
  useEffect(() => {
    const carouselEl = carouselRef.current;
    const categoryEl = categoryGridRef.current;

    if (carouselEl) {
      carouselEl.addEventListener("scroll", handleCarouselScroll, { passive: true });
    }
    if (categoryEl) {
      categoryEl.addEventListener("scroll", handleCategoryScroll, { passive: true });
    }

    window.addEventListener("resize", handleCarouselScroll, { passive: true });
    window.addEventListener("resize", handleCategoryScroll, { passive: true });

    return () => {
      if (carouselEl) carouselEl.removeEventListener("scroll", handleCarouselScroll);
      if (categoryEl) categoryEl.removeEventListener("scroll", handleCategoryScroll);
      window.removeEventListener("resize", handleCarouselScroll);
      window.removeEventListener("resize", handleCategoryScroll);
    };
  }, [handleCarouselScroll, handleCategoryScroll]);

  // Drag-to-scroll on the carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    const onDown = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onLeave = () => { isDown = false; };
    const onMove = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; const walk = (x - startX) * 1.5; el.scrollLeft = scrollLeft - walk; };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseup", onLeave);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseup", onLeave);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const scrollCarousel = useCallback((dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  return (
    <div className="home">

      {/* ══════════════════════════════════════
          HERO — Clean Editorial Panorama (Inspired by Reference)
          ══════════════════════════════════════ */}
      <section className="hero hero--simple-banner" aria-label="Hero">
        {/* Full-Bleed Panorama Background */}
        <div className="hero__bg-wrap">
          {/* Desktop Visual */}
          <div className="hero__img-desktop">
            <Image
              src="/images/banners/hero-banner-desktop.png"
              alt="Jewel Exchange | Handcrafted Fine Jewelry & Gemstones"
              fill
              sizes="(min-width: 1025px) 100vw, 0vw"
              style={{ objectFit: "cover", objectPosition: "right 10%" }}
              priority
            />
          </div>

          {/* Mobile Visual (Preserved exact version) */}
          <div className="hero__img-mobile">
            <Image
              src="/images/banners/hero-banner.png"
              alt="Jewel Exchange | Handcrafted Fine Jewelry & Gemstones"
              fill
              sizes="(max-width: 1024px) 100vw, 0vw"
              style={{ objectFit: "cover", objectPosition: "74% center" }}
              priority
            />
          </div>

          {/* Subtle directional gradient overlay for flawless contrast */}
          <div className="hero__gradient-overlay" aria-hidden="true" />
        </div>

        {/* Content Container Left-Aligned */}
        <div className="container hero__simple-container">
          <div className="hero__simple-content">
            <h1 className="hero__title">
              Where Elegance<br />Meets Eternity
            </h1>
            <p className="hero__subtitle">
              Curated fine jewelry, rare gemstones, and bespoke creations, handcrafted in Sri Lanka since 2008.
            </p>
            <div className="hero__actions">
              <Link href="/jewelry" className="hero__btn hero__btn--primary">
                Explore Jewelry
              </Link>
              <Link href="/bespoke" className="hero__btn hero__btn--ghost">
                Bespoke Creations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND STATEMENT — Editorial
          ══════════════════════════════════════ */}
      <section className="statement-section">
        <div className="container">
          <div className="reveal">
            <span className="statement__eyebrow">Our Craft</span>
            <h2 className="statement__heading">
              The Art of Fine Jewelry,<br />Rooted in Rare Beauty
            </h2>
            <p className="statement__body">
              From ready-to-wear showroom collections to custom bespoke commissions, brought to life with rare natural gemstones, fine diamonds, and artisanal bench craft in Colombo.
            </p>
            <Link href="/about" className="statement__link">
              Discover Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY GRID — Tiffany-Inspired 5-Column
          ══════════════════════════════════════ */}
      <section className="category-section">
        <div className="container category-container">
          <div className="category-header reveal">
            <h2 className="category-header__title">Shop by Category</h2>
          </div>
          <div className="category-grid reveal reveal-delay-1" ref={categoryGridRef}>
            <Link href="/jewelry?category=Rings" className="category-card">
              <div className="category-card__img">
                <Image
                  src="/images/products/emerald-drop-earrings.png"
                  alt="Fine Rings"
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="category-card__label">Rings</span>
            </Link>

            <Link href="/jewelry?category=Necklaces%20%26%20Pendants" className="category-card">
              <div className="category-card__img">
                <Image
                  src="/images/models_and_shots/14.png"
                  alt="Necklaces & Pendants"
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="category-card__label">Necklaces &amp; Pendants</span>
            </Link>

            <Link href="/jewelry?category=Bracelets" className="category-card">
              <div className="category-card__img">
                <Image
                  src="/images/products/classic-tennis-bracelet.png"
                  alt="Fine Bracelets"
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="category-card__label">Bracelets</span>
            </Link>

            <Link href="/jewelry?category=Earrings" className="category-card">
              <div className="category-card__img">
                <Image
                  src="/images/models_and_shots/01.png"
                  alt="Fine Earrings"
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="category-card__label">Earrings</span>
            </Link>

            <Link href="/gemstones" className="category-card">
              <div className="category-card__img">
                <Image
                  src="/images/models_and_shots/gemstones-category-grid.png"
                  alt="Ceylon Gemstones"
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="category-card__label">Gemstones</span>
            </Link>
          </div>

          {/* Category Slider Progress Track */}
          <div className="slider-track-wrap category-track-wrap reveal">
            <div className="slider-track" aria-hidden="true">
              <div className="slider-track__thumb" ref={categoryThumbRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS — Carousel
          ══════════════════════════════════════ */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-header reveal">
              <div className="featured-header__text">
                <span className="featured-header__eyebrow">Curated Selection</span>
                <h2 className="featured-header__title">Featured Pieces</h2>
              </div>
              <div className="featured-header__nav">
                <button
                  className="featured-nav-btn"
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  className="featured-nav-btn"
                  onClick={() => scrollCarousel(1)}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>

            <div className="featured-carousel reveal reveal-delay-1" ref={carouselRef}>
              {featuredProducts.map((item) => (
                <div key={item._id || item.slug} className="featured-card">
                  <div className="featured-card__img">
                    <Image
                      src={item.img || "/images/models_and_shots/20.png"}
                      alt={item.name || "Featured Piece"}
                      fill
                      sizes="(max-width: 768px) 70vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                    <Link
                      href={`/${item.type ? item.type.toLowerCase() : "jewelry"}/${item.slug}`}
                      className="featured-card__hover"
                    >
                      <span className="featured-card__hover-btn">View Piece</span>
                    </Link>
                  </div>
                  <div className="featured-card__info">
                    <span className="featured-card__category">{item.category}</span>
                    <h3 className="featured-card__name">{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Carousel Slider Progress Track */}
            <div className="slider-track-wrap featured-track-wrap reveal">
              <div className="slider-track" aria-hidden="true">
                <div className="slider-track__thumb" ref={featuredThumbRef} />
              </div>
            </div>

            <div className="featured-cta reveal">
              <Link href="/jewelry" className="btn btn--outline">
                View Full Collection →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          TRUST PILLARS — Minimal Text Grid
          ══════════════════════════════════════ */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-header reveal">
            <span className="trust-header__eyebrow">Our Commitment</span>
            <h2 className="trust-header__title">The Jewel Exchange Promise</h2>
          </div>
          <div className="trust-grid">
            <div className="trust-item reveal">
              <span className="trust-item__number">01</span>
              <h3 className="trust-item__title">Certified Gemstones</h3>
              <p className="trust-item__desc">Natural stones accompanied by recognized gemological reports.</p>
            </div>
            <div className="trust-item reveal reveal-delay-1">
              <span className="trust-item__number">02</span>
              <h3 className="trust-item__title">Bespoke Commissions</h3>
              <p className="trust-item__desc">Custom fine jewelry tailored to your exact style and milestone.</p>
            </div>
            <div className="trust-item reveal reveal-delay-2">
              <span className="trust-item__number">03</span>
              <h3 className="trust-item__title">Ethical Sourcing</h3>
              <p className="trust-item__desc">Responsibly mined gems from trusted, vetted global origins.</p>
            </div>
            <div className="trust-item reveal reveal-delay-3">
              <span className="trust-item__number">04</span>
              <h3 className="trust-item__title">Lifetime Care</h3>
              <p className="trust-item__desc">Complimentary cleaning, polishing, and care on all our creations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LIFESTYLE GRID — Instagram
          ══════════════════════════════════════ */}
      <section className="lifestyle-section">
        <div className="container">
          <div className="lifestyle-header reveal">
            <span className="lifestyle-header__handle">@jewelexchange_sl</span>
            <span className="lifestyle-header__caption">Follow our journey on Instagram</span>
          </div>
        </div>
        <div className="lifestyle-grid reveal reveal-delay-1">
          {[7, 9, 11, 13, 15, 17].map((num) => (
            <a
              key={num}
              href="https://www.instagram.com/jewelexchange_sl/"
              target="_blank"
              rel="noopener noreferrer"
              className="lifestyle__item"
              aria-label="Visit Jewel Exchange on Instagram"
            >
              <Image
                src={`/images/models_and_shots/${num.toString().padStart(2, "0")}.png`}
                alt="Jewel Exchange lifestyle"
                width={400}
                height={400}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div className="lifestyle__overlay">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
          ══════════════════════════════════════ */}
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Clear answers about our bespoke craftsmanship, certified gemstones, international insured shipping, and lifetime care."
      />

    </div>
  );
}
