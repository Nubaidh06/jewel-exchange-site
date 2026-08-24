"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./SearchModal.css";

const SUGGESTED_SEARCHES = [
  "Ceylon Sapphire",
  "Solitaire Diamond",
  "Emerald Pendant",
  "Tennis Bracelet",
  "Padparadscha",
  "Eternity Ring",
];

export default function SearchModal({ isOpen, onClose, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);

  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const router = useRouter();

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
    if (!trimmed) {
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
        params.set("q", trimmed);
        params.set("limit", "12");

        const res = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
          setTotalCount(data.total || (data.products ? data.products.length : 0));
          setSelectedIndex(-1);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 160);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isOpen]);

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
        const itemUrl = item.url || (item.type === "Gemstones" ? `/gemstones/${item.slug}` : `/jewelry/${item.slug}`);
        onClose();
        router.push(itemUrl);
      } else if (query.trim()) {
        onClose();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
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

  const handleViewAllResults = () => {
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  const hasSearchInput = query.trim().length > 0;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Luxury Search Bar */}
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg
              className={`search-icon ${loading ? "search-icon--spinning" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <circle cx="10.5" cy="10.5" r="7" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search fine jewelry & gemstones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {loading && <div className="search-spinner" aria-label="Searching..." />}

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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Body Content */}
        <div className="search-modal-body" ref={resultsContainerRef}>
          {hasSearchInput ? (
            /* Live Results List */
            <div className="search-results-section">
              <div className="search-results-meta">
                <span className="search-results-count">
                  {loading
                    ? "Searching collection..."
                    : results.length > 0
                    ? `${totalCount || results.length} result${results.length !== 1 ? "s" : ""}`
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
                    const itemUrl = item.url || (item.type === "Gemstones" ? `/gemstones/${item.slug}` : `/jewelry/${item.slug}`);

                    return (
                      <Link
                        key={item._id || item.slug || idx}
                        href={itemUrl}
                        className={`search-item-row ${isSelected ? "search-item-row--selected" : ""}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="search-item-thumb">
                          <Image
                            src={item.img || "/images/models_and_shots/20.png"}
                            alt={item.name || "Product"}
                            fill
                            sizes="56px"
                            className="search-item-img"
                          />
                        </div>

                        <div className="search-item-info">
                          <h4 className="search-item-name">{item.name}</h4>
                          <span className="search-item-meta-text">
                            {item.type || "Fine Piece"}
                            {item.category ? ` • ${item.category}` : ""}
                          </span>
                        </div>

                        <div className="search-item-end">
                          <span className="search-item-arrow">→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : !loading ? (
                /* Clean Empty State */
                <div className="search-empty-state">
                  <p className="search-empty-text">
                    No matches found for &ldquo;<strong>{query}</strong>&rdquo;
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            /* Zero State: Clean Subtle Trending Searches */
            <div className="search-zero-state">
              <span className="search-section-label">Popular Searches</span>
              <div className="search-suggestion-chips">
                {SUGGESTED_SEARCHES.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    className="search-chip"
                    onClick={() => handleSelectSuggestion(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
