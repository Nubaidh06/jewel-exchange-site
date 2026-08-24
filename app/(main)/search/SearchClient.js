"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import "./search.css";

const ITEMS_PER_PAGE = 12;

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();

  // Sync state when URL params change
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCurrentPage(1);
  }, [searchParams]);

  // Fetch real-time products
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        params.set("limit", "60");

        const res = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });

        if (res.ok && !isCancelled) {
          const data = await res.json();
          setItems(data.products || []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search client error:", err);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }, 180);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const updateUrl = useCallback((newQ) => {
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [router]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    updateUrl(val);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === safeCurrentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
      const section = document.getElementById("search-results-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 180);
  };

  return (
    <div className="search-page">
      {/* Clean Hero Section */}
      <div className="search-hero">
        <div className="search-hero__bg">
          <Image
            src="/images/banners/banner 1.png"
            alt="Search Fine Jewelry & Gemstones"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="search-hero__overlay" />
        <div className="container search-hero__content">
          <span className="search-hero__label">Discover Creations</span>
          <h1 className="search-hero__title">Catalog Search</h1>
          
          {/* Main Search Input */}
          <div className="search-hero__input-wrap">
            <svg className="search-hero__input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <circle cx="10.5" cy="10.5" r="7" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-hero__input"
              placeholder="Search fine jewelry, sapphire rings, rare gemstones..."
              value={query}
              onChange={handleQueryChange}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="search-hero__clear"
                onClick={() => {
                  setQuery("");
                  updateUrl("");
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Meta */}
      <div className="search-meta-bar">
        <div className="container">
          <div className="search-meta-bar__inner">
            <span className="search-meta-bar__count">
              {loading
                ? "Searching catalog..."
                : items.length > 0
                ? `${items.length} piece${items.length !== 1 ? "s" : ""} found${query.trim() ? ` for "${query}"` : ""}`
                : `No pieces found${query.trim() ? ` for "${query}"` : ""}`}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <section id="search-results-section" className="search-grid-section">
        <div className="container">
          {loading ? (
            <div className="search-loading-state">
              <div className="search-page-spinner" />
              <p>Searching through our atelier collections...</p>
            </div>
          ) : paginatedItems.length > 0 ? (
            <>
              <div className={`search-product-grid ${isTransitioning ? "search-product-grid--fading" : ""}`}>
                {paginatedItems.map((item) => {
                  const saved = isInWishlist(item.slug);
                  const itemUrl = item.url || (item.type === "Gemstones" ? `/gemstones/${item.slug}` : `/jewelry/${item.slug}`);

                  return (
                    <Link
                      key={item._id || item.slug}
                      href={itemUrl}
                      className="search-product-card"
                    >
                      <div className="search-product-card__img-wrap">
                        <Image
                          src={item.img || "/images/models_and_shots/20.png"}
                          alt={item.name || "Product"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="search-product-card__img"
                        />
                      </div>
                      <div className="search-product-card__info">
                        <div className="search-product-card__meta">
                          <span className="search-product-card__type">{item.type || "Fine Piece"}</span>
                          {item.category && (
                            <span className="search-product-card__category">• {item.category}</span>
                          )}
                        </div>
                        <h3 className="search-product-card__title">{item.name}</h3>
                        <button
                          type="button"
                          className={`btn ${saved ? "btn--outline" : "btn--full"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist({ ...item, type: item.type || "Jewelry" });
                          }}
                          style={{ marginTop: "auto", width: "100%", fontSize: "0.75rem", padding: "0.6rem" }}
                        >
                          {saved ? "Added to Inquiry" : "Add to Inquiry"}
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="search-pagination">
                  <button
                    type="button"
                    className="search-pagination__btn"
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                  >
                    ← Previous
                  </button>
                  <span className="search-pagination__info">
                    Page {safeCurrentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="search-pagination__btn"
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Clean Empty State */
            <div className="search-no-results">
              <h2 className="search-no-results__title">
                {query.trim() ? `No matches found for "${query}"` : "Search our collections"}
              </h2>
              <p className="search-no-results__text">
                Explore our catalog of handcrafted jewelry and certified Ceylon gemstones.
              </p>
              <div className="search-no-results__actions">
                <Link href="/jewelry" className="btn btn--outline">
                  Browse All Jewelry
                </Link>
                <Link href="/gemstones" className="btn btn--full">
                  Browse Gemstones
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
