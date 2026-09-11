"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function SwipeGallery({
  items,
  currentIndex,
  onIndexChange,
  onCloseToGrid,
  isItemInTray,
  onToggleTray,
}) {
  const [showInfoModal, setShowInfoModal] = useState(false); // For mobile/tablet modal
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(true); // For desktop sidebar
  const [activeGalleryImgIdx, setActiveGalleryImgIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrubberRef = useRef(null);

  const currentItem = items[currentIndex] || items[0];

  // Reset secondary view when item changes
  useEffect(() => {
    setActiveGalleryImgIdx(0);
    setDragOffset(0);
  }, [currentIndex]);

  // Scroll active thumbnail into center of filmstrip scrubber
  useEffect(() => {
    if (scrubberRef.current) {
      const activeThumb = scrubberRef.current.querySelector(`[data-index="${currentIndex}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        if (showInfoModal) {
          setShowInfoModal(false);
        } else {
          onCloseToGrid();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length, showInfoModal]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(items.length - 1);
    }
  };

  // ── Touch Gesture Tracking (Real-time drag with inertia) ──
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // If horizontal movement is greater than vertical, track drag
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    // Fast flick or distance threshold
    const isFastFlick = duration < 250 && Math.abs(diffX) > 30;
    const isPassedDistance = Math.abs(diffX) > 60;

    if ((isFastFlick || isPassedDistance) && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (diffY > 90 && Math.abs(diffY) > Math.abs(diffX) * 1.5) {
      // Pull down to dismiss back to grid
      onCloseToGrid();
    }

    setDragOffset(0);
  };

  if (!currentItem) return null;

  const inTray = isItemInTray(currentItem.id);
  const images = (currentItem.images && currentItem.images.length > 0)
    ? currentItem.images
    : [currentItem.img || "/images/models_and_shots/20.png"];
  const displayImage = images[activeGalleryImgIdx] || images[0];

  const handleWhatsAppInquiry = () => {
    const phone = "94773534538";
    const text = `Hello Jewel Exchange, I am viewing "${currentItem.name}" on your showroom gallery. Could you please provide consultation on this piece?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="gallery-theater">
      {/* ── Top Bar ── */}
      <div className="gallery-theater__top">
        <button
          type="button"
          className="gallery-back-btn"
          onClick={onCloseToGrid}
          title="Zoom out to Grid View (Esc)"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>All Pieces</span>
        </button>

        <div className="gallery-counter">
          {currentIndex + 1} / {items.length}
        </div>

        <div className="gallery-top-actions">
          {/* Info toggle: on desktop toggles sidebar, on mobile opens bottom sheet */}
          <button
            type="button"
            className="gallery-action-btn"
            onClick={() => {
              setShowInfoModal(true);
              setShowDesktopSidebar(!showDesktopSidebar);
            }}
            title="View Piece Details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Details</span>
          </button>

          <button
            type="button"
            className={`gallery-action-btn gallery-action-btn--tray ${inTray ? "gallery-action-btn--in-tray" : ""}`}
            onClick={() => onToggleTray(currentItem)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={inTray ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{inTray ? "In Tray" : "Add to Tray"}</span>
          </button>
        </div>
      </div>

      {/* ── Main Stage ── */}
      <div className="gallery-theater__stage">
        {/* Desktop Left Arrow */}
        <button
          type="button"
          className="gallery-nav-arrow gallery-nav-arrow--left desktop-only"
          onClick={handlePrev}
          aria-label="Previous Creation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Hero Photo & Swipe Container */}
        <div
          className="gallery-hero-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate3d(${dragOffset}px, 0, 0)`,
            transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="gallery-hero-img-wrap">
            <Image
              src={displayImage}
              alt={currentItem.name}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="gallery-hero-img"
              priority
              draggable={false}
            />

            {currentItem.isArchive && (
              <span className="gallery-archive-badge">Bespoke Archive</span>
            )}
          </div>

          {/* Secondary views if item has multiple photos */}
          {images.length > 1 && (
            <div className="gallery-sub-views">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gallery-sub-thumb ${activeGalleryImgIdx === i ? "gallery-sub-thumb--active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryImgIdx(i);
                  }}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill sizes="40px" style={{ objectFit: "cover" }} draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Right Arrow */}
        <button
          type="button"
          className="gallery-nav-arrow gallery-nav-arrow--right desktop-only"
          onClick={handleNext}
          aria-label="Next Creation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Desktop Right Sidebar (Only on screens > 900px when toggled) */}
        {showDesktopSidebar && (
          <aside className="gallery-info-drawer desktop-only">
            <div className="gallery-info-header">
              <span className="gallery-info-category">{currentItem.category}</span>
              <h2 className="gallery-info-title">{currentItem.name}</h2>
            </div>

            <div className="gallery-specs-ledger">
              <div className="gallery-spec-row">
                <span className="gallery-spec-k">Gemstone</span>
                <span className="gallery-spec-v">{currentItem.summarySpecs?.stone || currentItem.stone}</span>
              </div>
              <div className="gallery-spec-row">
                <span className="gallery-spec-k">Precious Metal</span>
                <span className="gallery-spec-v">{currentItem.summarySpecs?.metal || currentItem.metal}</span>
              </div>
              <div className="gallery-spec-row">
                <span className="gallery-spec-k">Silhouette</span>
                <span className="gallery-spec-v">{currentItem.style}</span>
              </div>
              <div className="gallery-spec-row">
                <span className="gallery-spec-k">Certification</span>
                <span className="gallery-spec-v">{currentItem.summarySpecs?.cert || "Natural Certified"}</span>
              </div>
            </div>

            {currentItem.description && (
              <p className="gallery-info-desc">{currentItem.description}</p>
            )}

            <div className="gallery-info-actions">
              <button
                type="button"
                className="gallery-whatsapp-inquiry-btn"
                onClick={handleWhatsAppInquiry}
              >
                Inquire on This Piece
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* ── Mobile & Tablet Discreet Caption Overlay (Above scrubber, non-overlapping) ── */}
      <div className="gallery-mobile-caption mobile-tablet-only">
        <div className="gallery-mobile-caption__text" onClick={() => setShowInfoModal(true)}>
          <span className="gallery-mobile-caption__title">{currentItem.name}</span>
          <span className="gallery-mobile-caption__specs">
            {currentItem.summarySpecs?.stone || currentItem.stone} · {currentItem.summarySpecs?.metal || currentItem.metal}
          </span>
        </div>
        <button
          type="button"
          className="gallery-mobile-caption__btn"
          onClick={() => setShowInfoModal(true)}
        >
          Details →
        </button>
      </div>

      {/* ── Signature Apple Photos Filmstrip Scrubber (Always at bottom, non-overlapping) ── */}
      <div className="gallery-scrubber" ref={scrubberRef}>
        <div className="gallery-scrubber__track">
          {items.map((item, idx) => {
            const thumbImg = item.img || (item.images && item.images[0]) || "/images/models_and_shots/20.png";
            const isActive = idx === currentIndex;

            return (
              <button
                key={item.id}
                data-index={idx}
                type="button"
                className={`scrubber-thumb ${isActive ? "scrubber-thumb--active" : ""}`}
                onClick={() => onIndexChange(idx)}
                aria-label={`View ${item.name}`}
              >
                <Image
                  src={thumbImg}
                  alt={item.name}
                  fill
                  sizes="52px"
                  style={{ objectFit: "cover" }}
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mobile & Tablet Detail Bottom Sheet Modal (Slides up only on demand) ── */}
      {showInfoModal && (
        <div className="gallery-modal-overlay mobile-tablet-only">
          <div className="gallery-modal-backdrop" onClick={() => setShowInfoModal(false)} />
          <div className="gallery-bottom-sheet">
            <div className="gallery-bottom-sheet__header">
              <div>
                <span className="gallery-info-category">{currentItem.category}</span>
                <h3 className="gallery-bottom-sheet__title">{currentItem.name}</h3>
              </div>
              <button
                type="button"
                className="gallery-bottom-sheet__close"
                onClick={() => setShowInfoModal(false)}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="gallery-bottom-sheet__content">
              <div className="gallery-specs-ledger">
                <div className="gallery-spec-row">
                  <span className="gallery-spec-k">Gemstone</span>
                  <span className="gallery-spec-v">{currentItem.summarySpecs?.stone || currentItem.stone}</span>
                </div>
                <div className="gallery-spec-row">
                  <span className="gallery-spec-k">Precious Metal</span>
                  <span className="gallery-spec-v">{currentItem.summarySpecs?.metal || currentItem.metal}</span>
                </div>
                <div className="gallery-spec-row">
                  <span className="gallery-spec-k">Silhouette &amp; Setting</span>
                  <span className="gallery-spec-v">{currentItem.style}</span>
                </div>
                <div className="gallery-spec-row">
                  <span className="gallery-spec-k">Certification</span>
                  <span className="gallery-spec-v">{currentItem.summarySpecs?.cert || "Natural Certified"}</span>
                </div>
              </div>

              {currentItem.description && (
                <p className="gallery-info-desc">{currentItem.description}</p>
              )}

              <div className="gallery-bottom-sheet__actions">
                <button
                  type="button"
                  className={`tray-btn ${inTray ? "tray-btn--secondary" : "tray-btn--primary"}`}
                  onClick={() => onToggleTray(currentItem)}
                  style={{ width: "100%", marginBottom: "0.75rem" }}
                >
                  {inTray ? "Remove from Tray" : "Add to Showroom Tray"}
                </button>

                <button
                  type="button"
                  className="gallery-whatsapp-inquiry-btn"
                  onClick={handleWhatsAppInquiry}
                  style={{ width: "100%" }}
                >
                  Inquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
