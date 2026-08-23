"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import "./SearchModal.css";

const FILTER_PILLS = [
  "All",
  "Jewelry",
  "Gemstones",
  "Rings",
  "Sapphires",
  "Diamonds",
  "Necklaces & Pendants",
  "Earrings",
  "Padparadscha",
];

const SUGGESTED_SEARCHES = [
  "Ceylon Sapphire",
  "Solitaire Diamond",
  "Emerald Drop",
  "Tennis Bracelet",
  "Padparadscha Gem",
  "Heirloom Pendant",
];

export default function SearchModal({ isOpen, onClose, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);

  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Reset and auto-focus when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSelectedIndex(-1);
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Real-time debounced search fetch with AbortController
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = query.trim();
    if (!trimmed && category === "All") {
      setResults([]);
      setTotalCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (trimmed) params.set("q", trimmed);
        if (category && category !== "All") params.set("category", category);
        params.set("limit", "12");

        const res = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
          setTotalCount(data.total || 0);
          setSelectedIndex(-1);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category, isOpen]);

  // Keyboard navigation inside modal (ArrowUp, ArrowDown, Enter)
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        const item = results[selectedIndex];
        onClose();
        router.push(item.url || `/jewelry/${item.slug}`);
      } else if (query.trim()) {
        onClose();
        const catParam = category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
        router.push(`/search?q=${encodeURIComponent(query.trim())}${catParam}`);
      }
    }
  };

  const handleSelectSuggestion = (text) => {
    setQuery(text);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? "All" : cat);
    setSelectedIndex(-1);
  };

  const handleViewAllResults = () => {
    onClose();
    const catParam = category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
    router.push(`/search?q=${encodeURIComponent(query.trim())}${catParam}`);
  };

  if (!isOpen) return null;

  const hasSearchInput = query.trim().length > 0 || category !== "All";

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg
              className={`search-icon ${loading ? "search-icon--spinning" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <circle cx="10.5" cy="10.5" r="7" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search sapphire rings, diamond pendants, gemstones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {loading && <div className="search-spinner" aria-label="Loading" />}

            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClear}
                aria-label="Clear query"
              >
                ✕
              </button>
            )}

            <button
              type="button"
              className="search-close-btn"
              onClick={onClose}
              aria-label="Close search"
            >
              <svg className="search-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="search-category-pills">
            {FILTER_PILLS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`search-pill ${category === cat ? "search-pill--active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Body Content */}
        <div className="search-modal-body" ref={resultsContainerRef}>
          {hasSearchInput ? (
            /* Live Results State */
            <div className="search-results-section">
              <div className="search-results-meta">
                <span className="search-results-count">
                  {loading
                    ? "Searching collection..."
                    : results.length > 0
                    ? `Found ${totalCount || results.length} matching piece${results.length !== 1 ? "s" : ""}`
                    : "No pieces found"}
                </span>
                {results.length > 0 && query.trim() && (
                  <button
                    type="button"
                    className="search-view-all-link"
                    onClick={handleViewAllResults}
                  >
                    View all in catalog →
                  </button>
                )}
              </div>

              {results.length > 0 ? (
                <div className="search-results-list" role="listbox">
                  {results.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const isSaved = isInWishlist(item.slug);
                    const itemUrl = item.url || (item.type === "Gemstones" ? `/gemstones/${item.slug}` : `/jewelry/${item.slug}`);

                    return (
                      <div
                        key={item._id || item.slug || idx}
                        className={`search-item-card ${isSelected ? "search-item-card--selected" : ""}`}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <Link
                          href={itemUrl}
                          className="search-item-main-link"
                          onClick={onClose}
                        >
                          <div className="search-item-thumb">
                            <Image
                              src={item.img || "/images/models_and_shots/20.png"}
                              alt={item.name || "Product"}
                              fill
                              sizes="64px"
                              className="search-item-img"
                            />
                          </div>

                          <div className="search-item-details">
                            <div className="search-item-tags">
                              <span className="search-item-type">{item.type || "Fine Piece"}</span>
                              {item.category && (
                                <span className="search-item-cat">• {item.category}</span>
                              )}
                            </div>
                            <h4 className="search-item-name">{item.name}</h4>
                            <p className="search-item-price">
                              {item.price && !item.price.includes("$") && !item.price.toLowerCase().includes("inquiry")
                                ? item.price
                                : "Price on Inquiry"}
                            </p>
                          </div>
                        </Link>

                        <div className="search-item-actions">
                          <button
                            type="button"
                            className={`search-inquiry-btn ${isSaved ? "search-inquiry-btn--saved" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist({ ...item, type: item.type || "Jewelry" });
                            }}
                            title={isSaved ? "In your inquiry cart" : "Add to inquiry cart"}
                            aria-label={isSaved ? "Saved to inquiries" : "Add to inquiries"}
                          >
                            <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.25" width="15" height="15">
                              <path d="M5 8.5h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8.5z" />
                              <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" strokeLinecap="round" />
                            </svg>
                            <span className="search-inquiry-text">{isSaved ? "Inquired" : "Inquire"}</span>
                          </button>

                          <Link
                            href={itemUrl}
                            className="search-item-arrow"
                            onClick={onClose}
                            aria-label="View piece"
                          >
                            →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : !loading ? (
                /* Empty Results */
                <div className="search-empty-state">
                  <p className="search-empty-text">
                    No matches found for &ldquo;<strong>{query}</strong>&rdquo;{category !== "All" ? ` in ${category}` : ""}.
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            /* Zero State: Popular Searches */
            <div className="search-zero-state">
              <div className="search-quick-section">
                <h4 className="search-section-title">Popular Searches</h4>
                <div className="search-suggestion-chips">
                  {SUGGESTED_SEARCHES.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      className="search-chip"
                      onClick={() => handleSelectSuggestion(sug)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="11" height="11">
                        <circle cx="10.5" cy="10.5" r="7" />
                        <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
                      </svg>
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Clean, no keyboard shortcut hints) */}
        {hasSearchInput && (
          <div className="search-modal-footer">
            <button
              type="button"
              className="search-footer-action-btn"
              onClick={handleViewAllResults}
            >
              Open Full Catalog Search →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
