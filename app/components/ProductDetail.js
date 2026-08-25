"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../../lib/WishlistContext";
import "./ProductDetail.css";

const WHATSAPP_NUMBER = "+94773534538";
const INSTAGRAM_HANDLE = "jewel_exchange";

export default function ProductDetail({ product, type, relatedProducts = [] }) {
  const [activeAccordion, setActiveAccordion] = useState("specifications");
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [ringDiameter, setRingDiameter] = useState(16.5);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const actionsRef = useRef(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbsRef = useRef(null);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  /* ── Mobile sticky bar visibility ── */
  useEffect(() => {
    if (!actionsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(actionsRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Carousel scroll progress ── */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) return null;

  const defaultImg = type === "Jewelry" ? "/images/models_and_shots/20.png" : "/images/models_and_shots/28.png";
  const rawImages = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : (Array.isArray(product.gallery) && product.gallery.length > 0)
    ? [product.img, ...product.gallery]
    : [product.img || defaultImg];
  const galleryImages = rawImages.filter(Boolean);

  /* ── Ultra-Smooth 60fps/120fps Direct-DOM Hover Zoom (Zero React Re-renders) ── */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    e.currentTarget.style.setProperty("--zoom-x", `${x.toFixed(2)}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${y.toFixed(2)}%`);
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    e.currentTarget.style.setProperty("--zoom-x", `${x.toFixed(2)}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${y.toFixed(2)}%`);
    e.currentTarget.classList.add("is-zoomed");
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove("is-zoomed");
    e.currentTarget.style.setProperty("--zoom-x", "50%");
    e.currentTarget.style.setProperty("--zoom-y", "50%");
  };

  const resetAllZoom = () => {
    if (sliderRef.current) {
      const slides = sliderRef.current.querySelectorAll(".product-gallery__slide");
      slides.forEach((s) => {
        s.classList.remove("is-zoomed");
        s.style.setProperty("--zoom-x", "50%");
        s.style.setProperty("--zoom-y", "50%");
      });
    }
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const index = Math.round(sliderRef.current.scrollLeft / sliderRef.current.clientWidth);
    if (index !== activeImageIndex) {
      setActiveImageIndex(index);
      resetAllZoom();
    }
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current || index < 0 || index >= galleryImages.length) return;
    resetAllZoom();
    sliderRef.current.scrollTo({
      left: index * sliderRef.current.clientWidth,
      behavior: "smooth",
    });
    setActiveImageIndex(index);
    if (thumbsRef.current && thumbsRef.current.children[index]) {
      thumbsRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const nextImage = () => {
    if (galleryImages.length <= 1) return;
    resetAllZoom();
    const nextIdx = (activeImageIndex + 1) % galleryImages.length;
    scrollToIndex(nextIdx);
  };

  const prevImage = () => {
    if (galleryImages.length <= 1) return;
    resetAllZoom();
    const prevIdx = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length;
    scrollToIndex(prevIdx);
  };

  const saved = isInWishlist(product.slug);

  /* ── Related items from Sanity ── */
  const relatedItems = relatedProducts;

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const isRing = product.category && product.category.toLowerCase().includes("ring");
  const getRingSize = (mm) => {
    const size = (mm - 11.6) / 0.82;
    let rounded = Math.max(3, Math.round(size * 2) / 2);
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello! I am interested in the ${product.name}. Can you provide more information regarding pricing and availability?`
  )}`;

  return (
    <div className="product-detail-page">
      {/* ═══════ STICKY SPLIT LAYOUT ═══════ */}
      <div className="product-detail-split">
        {/* ── Left: Sticky Gallery ── */}
        <div className="product-gallery">
          {/* Main Showcase Stage */}
          <div className="product-gallery__stage">
            {galleryImages.length > 1 && (
              <button
                type="button"
                className="product-gallery__nav-arrow product-gallery__nav-arrow--prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div 
              className={`product-gallery__slider ${galleryImages.length === 1 ? "product-gallery__slider--single" : ""}`} 
              ref={sliderRef}
              onScroll={handleSliderScroll}
            >
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="product-gallery__slide"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - view ${i + 1}`}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    style={{ objectFit: "contain" }}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            {galleryImages.length > 1 && (
              <button
                type="button"
                className="product-gallery__nav-arrow product-gallery__nav-arrow--next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Row (Always visible to frame the section) */}
          <div className="product-gallery__bottom-bar">
            <button
              type="button"
              className={`product-gallery__thumb-nav-btn product-gallery__thumb-nav-btn--prev ${galleryImages.length <= 1 ? "disabled" : ""}`}
              onClick={prevImage}
              disabled={galleryImages.length <= 1}
              aria-label="Previous thumbnail"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="product-gallery__thumbs" ref={thumbsRef}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`product-gallery__thumb ${activeImageIndex === i ? "active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "contain" }}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`product-gallery__thumb-nav-btn product-gallery__thumb-nav-btn--next ${galleryImages.length <= 1 ? "disabled" : ""}`}
              onClick={nextImage}
              disabled={galleryImages.length <= 1}
              aria-label="Next thumbnail"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="product-info-wrapper">
          <div className="product-info">
            {/* Breadcrumbs */}
            <nav className="product-breadcrumbs reveal" aria-label="Breadcrumb">
              <Link href="/" className="product-breadcrumbs__link">
                Home
              </Link>
              <span className="product-breadcrumbs__separator">/</span>
              <Link
                href={`/${type.toLowerCase()}`}
                className="product-breadcrumbs__link"
              >
                {type}
              </Link>
              <span className="product-breadcrumbs__separator">/</span>
              <span className="product-breadcrumbs__current">
                {product.category}
              </span>
            </nav>

            {/* Category + Title + Wishlist + Price */}
            <div className="product-info__header reveal reveal-delay-1">
              <span className="product-info__category">{product.category}</span>

              <div className="product-info__title-row">
                <h1 className="product-info__title">{product.name}</h1>
              </div>

              <p className="product-info__price">Price on Inquiry</p>

              {isRing && (
                <button 
                  className="product-info__size-guide-btn"
                  onClick={() => setShowSizeGuide(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                    <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
                    <path d="M12 4v16" />
                    <path d="M4 12h16" />
                  </svg>
                  Interactive Size Guide
                </button>
              )}

              <div className="product-info__cta-group" ref={actionsRef}>
                <button
                  className={`btn ${saved ? "btn--outline" : "btn--full"} product-info__cta-btn`}
                  onClick={() => toggleWishlist({ ...product, type })}
                >
                  {saved ? "Added to Inquiry Cart" : "Add to Inquiry Cart"}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--full product-info__cta-btn product-info__btn--whatsapp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Inquire on WhatsApp
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="product-info__description reveal reveal-delay-2">
              <h3 className="product-info__description-header">Description</h3>
              <p>{product.description}</p>
            </div>

            {/* ── Craftsmanship Trust Badges ── */}
            <div className="product-craftsmanship reveal reveal-delay-3">
              {/* Certified Authenticity */}
              <div className="product-craftsmanship__item">
                <div className="product-craftsmanship__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="28"
                    height="28"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="product-craftsmanship__label">
                  Authentic &amp; Certified
                </span>
                <span className="product-craftsmanship__desc">
                  Accompanied by recognized gemological reports
                </span>
              </div>

              {/* Master Craftsmanship */}
              <div className="product-craftsmanship__item">
                <div className="product-craftsmanship__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="28"
                    height="28"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <span className="product-craftsmanship__label">
                  Artisanal Finishing
                </span>
                <span className="product-craftsmanship__desc">
                  Meticulously cast, set, and hand-polished
                </span>
              </div>

              {/* Secure Global Delivery */}
              <div className="product-craftsmanship__item">
                <div className="product-craftsmanship__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="28"
                    height="28"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className="product-craftsmanship__label">
                  Insured Global Delivery
                </span>
                <span className="product-craftsmanship__desc">
                  Doorstep delivery via FedEx &amp; DHL Express
                </span>
              </div>
            </div>

            {/* ── Concierge & Booking Actions ── */}
            <div className="product-info__actions reveal reveal-delay-3">
              <div className="product-info__actions-row">
                <a
                  href={`https://ig.me/m/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--full product-info__btn"
                >
                  Inquire on Instagram
                </a>
                <Link
                  href={`/booking?subject=Viewing for ${product.name}`}
                  className="btn btn--outline btn--full product-info__btn"
                >
                  Book a Viewing
                </Link>
              </div>
            </div>

            {/* ── Accordions ── */}
            <div className="product-accordions reveal reveal-delay-4">
              {/* Specifications */}
              <div
                className={`accordion-item ${activeAccordion === "specifications" ? "active" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion("specifications")}
                  aria-expanded={activeAccordion === "specifications"}
                >
                  <span>Specifications</span>
                  <span className="accordion-icon" />
                </button>
                <div className="accordion-content">
                  <ul className="product-info__specs-list accordion-text">
                    {product.specifications?.map((spec, i) => (
                      <li key={i}>
                        <span className="spec-dot" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div
                className={`accordion-item ${activeAccordion === "shipping" ? "active" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion("shipping")}
                  aria-expanded={activeAccordion === "shipping"}
                >
                  <span>Shipping &amp; Returns</span>
                  <span className="accordion-icon" />
                </button>
                <div className="accordion-content">
                  <div className="accordion-text">
                    <p>
                      <strong>Complimentary Global Shipping:</strong> All orders
                      are shipped via secure, fully insured couriers (FedEx/DHL)
                      and require an adult signature upon delivery.
                    </p>
                    <p>
                      <strong>Returns:</strong> We offer a 14-day exchange
                      policy for ready-to-wear pieces. Bespoke and customized
                      items are non-refundable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Care & Maintenance */}
              <div
                className={`accordion-item ${activeAccordion === "care" ? "active" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion("care")}
                  aria-expanded={activeAccordion === "care"}
                >
                  <span>Care &amp; Maintenance</span>
                  <span className="accordion-icon" />
                </button>
                <div className="accordion-content">
                  <div className="accordion-text">
                    <p>
                      We recommend bringing your piece to our showroom annually
                      for a complimentary professional cleaning and prong
                      inspection.
                    </p>
                    <p>
                      When not wearing, store your jewelry in the provided Jewel
                      Exchange presentation box away from direct sunlight and
                      extreme temperatures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ YOU MAY ALSO LIKE ═══════ */}
      {relatedItems && relatedItems.length > 0 && (
        <section className="pd-related">
          <div className="pd-related__header reveal">
            <span className="section-label">Discover More</span>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              You May Also Like
            </h2>
          </div>

          <div className="pd-related__carousel" ref={carouselRef}>
            {relatedItems.map((item) => (
              <div key={item._id || item.slug} className="pd-related__card">
                <Link
                  href={`/${(item.type || type).toLowerCase()}/${item.slug}`}
                  className="pd-related__link"
                >
                  <div className="pd-related__img-wrap">
                    <Image
                      src={item.img || (type === "Jewelry" ? "/images/models_and_shots/20.png" : "/images/models_and_shots/28.png")}
                      alt={item.name || "Related Item"}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 45vw, 80vw"
                      className="pd-related__img"
                    />
                  </div>
                  <div className="pd-related__meta">
                    <span className="pd-related__category">{item.category}</span>
                    <h3 className="pd-related__name">{item.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll track indicator */}
          <div className="pd-related__track" aria-hidden="true">
            <div
              className="pd-related__thumb"
              style={{ transform: `translateX(${scrollProgress * 150}%)` }}
            />
          </div>
        </section>
      )}

      {/* ═══════ MOBILE STICKY INQUIRY BAR ═══════ */}
      <div
        className={`pd-mobile-bar ${showMobileBar ? "pd-mobile-bar--visible" : ""}`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pd-mobile-bar__btn pd-mobile-bar__btn--whatsapp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
        <Link
          href={`/booking?subject=Viewing for ${product.name}`}
          className="pd-mobile-bar__btn pd-mobile-bar__btn--dark"
        >
          Book Viewing
        </Link>
      </div>

      {/* ═══════ RING SIZING MODAL ═══════ */}
      {isRing && showSizeGuide && (
        <div className="size-guide-modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <button className="size-guide-modal__close" onClick={() => setShowSizeGuide(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 className="size-guide-modal__title">Find Your Ring Size</h2>
            <p className="size-guide-modal__subtitle">Use our interactive tool or download the printable guide.</p>
            
            <div className="size-guide-modal__content">
              <div className="size-guide-modal__interactive">
                <div className="size-guide-circle-wrap">
                  <div 
                    className="size-guide-circle"
                    style={{ width: `${ringDiameter}mm`, height: `${ringDiameter}mm` }}
                  >
                    <div className="size-guide-crosshair" />
                  </div>
                </div>
                <div className="size-guide-controls">
                  <p className="size-guide-instruction">Place your ring on the screen and match the inside edge to the circle.</p>
                  <input 
                    type="range" 
                    min="14" max="22" step="0.1" 
                    value={ringDiameter} 
                    onChange={(e) => setRingDiameter(parseFloat(e.target.value))}
                    className="size-guide-slider"
                  />
                  <div className="size-guide-stats">
                    <div className="size-guide-stat">
                      <span className="stat-label">Diameter</span>
                      <span className="stat-value">{ringDiameter.toFixed(1)} mm</span>
                    </div>
                    <div className="size-guide-stat">
                      <span className="stat-label">US Size</span>
                      <span className="stat-value">{getRingSize(ringDiameter)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="size-guide-modal__print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" style={{ flexShrink: 0 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <div className="print-info">
                  <h4>Printable Guide</h4>
                  <p>Download our PDF sizing chart for accurate physical measurement.</p>
                </div>
                <a href="/Jewel_Exchange_Ring_Sizing_Guide.pdf" download className="btn btn--outline" style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", marginLeft: "auto" }}>Download</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
