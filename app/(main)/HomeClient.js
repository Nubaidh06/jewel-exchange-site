"use client";
import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQAccordion from "../components/FAQAccordion";
import "./page.css";

export default function HomeClient({ featuredProducts = [] }) {
  const carouselRef = useRef(null);
  const trackThumbRef = useRef(null);

  // Carousel scroll track indicator
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    const thumb = trackThumbRef.current;
    if (!el || !thumb) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const maxTranslate = (200 - 80); // track width - thumb width
    thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleCarouselScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleCarouselScroll);
  }, [handleCarouselScroll]);

  return (
    <div className="home">
      {/* ======== HERO ======== */}
      <section className="hero">
        <div className="hero__bg">
          <Image
            src="/images/banners/banner 1.png"
            alt="Jewel Exchange - Bespoke Jewelry"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="hero__overlay" />
        </div>
        <div className="container hero__content">
          <span className="hero__label">Jewel Exchange</span>
          <h1 className="hero__title">Where Elegance<br />Meets Eternity</h1>
          <p className="hero__subtitle">Bespoke jewelry and premium gemstones, handcrafted in Sri Lanka.</p>
          <div className="hero__actions">
            <Link href="/jewelry" className="btn btn--white">
              Explore Jewelry <span className="btn-arrow">→</span>
            </Link>
            <Link href="/bespoke" className="btn btn--ghost">
              Book Bespoke <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ======== INTRO ======== */}
      <section className="intro-section section">
        <div className="container intro">
          <div className="intro__text reveal">
            <span className="section-label">Our Craft</span>
            <h2 className="intro__heading">The Art of Fine Jewelry</h2>
            <div className="ornament">
              <div className="ornament__diamond"></div>
            </div>
            <p>At Jewel Exchange, we believe that every piece of jewelry tells a story. Our master craftsmen combine time-honoured techniques with contemporary design to create pieces that are truly timeless.</p>
            <p>Each creation begins with the finest materials - ethically sourced gemstones, precious metals, and an unwavering commitment to perfection.</p>
            <div style={{ marginTop: "var(--space-md)" }}>
              <Link href="/about" className="btn btn--gold">
                Discover Our Story <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="intro__image-wrap reveal reveal-delay-2">
            <div className="intro__image">
              <Image
                src="/images/models_and_shots/05.png"
                alt="Jewelry Craftsmanship and Workshop Artistry"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======== FEATURED CAROUSEL ======== */}
      <section className="featured-section section bg-alt">
        <div className="container">
          <div className="featured-header reveal">
            <span className="section-label" style={{ display: "block" }}>Curated Selection</span>
            <h2 className="section-title">Featured Pieces</h2>
            <p className="section-subtitle">A glimpse into our most sought-after creations.</p>
          </div>
        </div>

        <div className="featured-carousel-wrap reveal reveal-delay-1">
          <div className="featured-carousel" ref={carouselRef}>
            {featuredProducts.map((item) => (
              <div key={item._id || item.slug} className="featured-card">
                <div className="featured-card__img">
                  <Image
                    src={item.img || "/images/models_and_shots/20.png"}
                    alt={item.name || "Featured Item"}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                  <Link href={`/${item.type ? item.type.toLowerCase() : 'jewelry'}/${item.slug}`} className="featured-card__hover">
                    <span className="btn btn--white btn--sm featured-card__hover-btn">View Piece</span>
                  </Link>
                </div>
                <div className="featured-card__info">
                  <span className="featured-card__category">{item.category}</span>
                  <h3 className="featured-card__name">{item.name}</h3>
                  <span className="featured-card__price">Price on Inquiry</span>
                </div>
              </div>
            ))}
          </div>
          <div className="featured-track">
            <div className="featured-track__thumb" ref={trackThumbRef}></div>
          </div>
        </div>

        <div className="container featured-cta reveal">
          <Link href="/jewelry" className="btn btn--gold">
            View Full Collection <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ======== COLLECTIONS SPLIT ======== */}
      <section className="collections-section">
        <div className="collections-split">
          <Link href="/jewelry" className="split-card reveal">
            <div className="split-card__img">
              <Image src="/images/models_and_shots/26A.png" alt="Jewelry Collection" fill style={{ objectFit: "cover" }} />
              <div className="split-card__overlay" />
            </div>
            <div className="split-card__content">
              <span className="split-card__label">Collection</span>
              <h3 className="split-card__title">Jewelry</h3>
              <span className="split-card__link">
                Explore Collection <span className="split-card__link-arrow">→</span>
              </span>
            </div>
          </Link>
          <Link href="/gemstones" className="split-card reveal reveal-delay-2">
            <div className="split-card__img">
              <Image src="/images/models_and_shots/28.png" alt="Gemstones Collection" fill style={{ objectFit: "cover" }} />
              <div className="split-card__overlay" />
            </div>
            <div className="split-card__content">
              <span className="split-card__label">Collection</span>
              <h3 className="split-card__title">Gemstones</h3>
              <span className="split-card__link">
                Explore Collection <span className="split-card__link-arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ======== TRUST ======== */}
      <section className="trust-section section">
        <div className="container">
          <div className="trust-header reveal">
            <span className="section-label" style={{ display: "block" }}>Why Choose Us</span>
            <h2 className="section-title">A Promise of Excellence</h2>
          </div>
          <div className="trust-grid">
            <div className="trust-item reveal reveal-delay-1">
              <div className="trust-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                </svg>
              </div>
              <h3 className="trust-item__title">Certified Gemstones</h3>
              <p className="trust-item__desc">Every gemstone comes with professional certification from leading global laboratories.</p>
            </div>
            <div className="trust-item reveal reveal-delay-2">
              <div className="trust-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="trust-item__title">Bespoke Design</h3>
              <p className="trust-item__desc">Custom pieces crafted to your exact vision by our master artisans.</p>
            </div>
            <div className="trust-item reveal reveal-delay-3">
              <div className="trust-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c0-5.523-4.477-10-10-10" />
                  <path d="M12 22c0-8.837-7.163-16-16-16" />
                  <path d="M12 22C12 13.163 20.163 6 28 6" />
                  <circle cx="12" cy="22" r="1" fill="currentColor" />
                  <path d="M7 8c1.5-2 3.5-3 5-3s3.5 1 5 3" />
                  <path d="M9 5c1-1.5 2-2 3-2s2 .5 3 2" />
                </svg>
              </div>
              <h3 className="trust-item__title">Ethical Sourcing</h3>
              <p className="trust-item__desc">Responsibly sourced materials from trusted, vetted suppliers worldwide.</p>
            </div>
            <div className="trust-item reveal reveal-delay-4">
              <div className="trust-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="trust-item__title">Lifetime Warranty</h3>
              <p className="trust-item__desc">Comprehensive warranty and complimentary care on all our creations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== LIFESTYLE GRID ======== */}
      <section className="lifestyle-section section bg-alt">
        <div className="container">
          <div className="lifestyle-header reveal">
            <span className="section-label" style={{ display: "block" }}>Follow Us</span>
            <h2 className="section-title">@jewelexchange_sl</h2>
            <p className="section-subtitle">Join our journey on Instagram.</p>
          </div>
          <div className="lifestyle reveal reveal-delay-1">
            {[7, 9, 11, 13, 15, 17].map((num) => (
              <a
                key={num}
                href="https://www.instagram.com/jewelexchange_sl/"
                target="_blank"
                rel="noopener noreferrer"
                className="lifestyle__item"
              >
                <Image
                  src={`/images/models_and_shots/${num.toString().padStart(2, "0")}.png`}
                  alt="Lifestyle"
                  width={400}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div className="lifestyle__overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ SECTION ======== */}
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Clear answers about our bespoke craftsmanship, certified gemstones, international insured shipping, and lifetime care."
      />
    </div>
  );
}
