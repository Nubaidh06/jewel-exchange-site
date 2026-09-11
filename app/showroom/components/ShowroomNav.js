"use client";
import { useState } from "react";

export default function ShowroomNav({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  trayCount,
  onOpenTray,
  totalItems,
  filteredItemsCount,
  onToggleFullscreen,
  isFullscreen,
  onLock,
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="showroom-nav-wrapper">
      <div className="showroom-nav">
        {/* Left: Brand */}
        <div className="showroom-nav__left">
          <div className="showroom-brand">
            <span className="showroom-brand__name">JEWEL EXCHANGE</span>
            <span className="showroom-brand__sub">Showroom Collection</span>
          </div>
          <span className="showroom-nav__divider desktop-only" />
          <span className="showroom-nav__count desktop-only">
            {filteredItemsCount} {filteredItemsCount === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        {/* Center: View Switcher (Grid vs Gallery) */}
        <div className="showroom-nav__center">
          <div className="showroom-view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "grid" ? "view-toggle-btn--active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>Grid</span>
            </button>

            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "gallery" ? "view-toggle-btn--active" : ""}`}
              onClick={() => setViewMode("gallery")}
              aria-label="Gallery View"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Gallery</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="showroom-nav__right">
          {/* Desktop Search */}
          <div className="showroom-nav-search desktop-only">
            <svg className="showroom-nav-search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="showroom-nav-search__input"
              placeholder="Search pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="showroom-nav-search__clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            className="showroom-nav-btn showroom-nav-btn--icon mobile-only"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Tray Button */}
          <button
            type="button"
            className="showroom-nav-btn showroom-nav-btn--tray"
            onClick={onOpenTray}
            aria-label="Open Showroom Tray"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span className="tray-text">Tray</span>
            {trayCount > 0 && <span className="tray-badge">{trayCount}</span>}
          </button>

          {/* Lock Showroom Button */}
          <button
            type="button"
            className="showroom-nav-btn showroom-nav-btn--icon"
            onClick={onLock}
            title="Lock Showroom Screen"
            aria-label="Lock Showroom"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            className="showroom-nav-btn showroom-nav-btn--icon desktop-only"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Tablet Mode"}
            aria-label="Toggle Fullscreen"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Row */}
      {mobileSearchOpen && (
        <div className="mobile-search-bar">
          <div className="mobile-search-bar__inner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              autoFocus
              className="mobile-search-bar__input"
              placeholder="Search gemstone, ring, metal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="mobile-search-bar__clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
            <button
              className="mobile-search-bar__close"
              onClick={() => setMobileSearchOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
