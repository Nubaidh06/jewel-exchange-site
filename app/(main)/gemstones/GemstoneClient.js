"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import "./page.css";

const CATEGORIES = ["All", "Sapphires", "Padparadscha", "Rubies", "Emeralds", "Diamonds", "Rare Gems"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low"];

const ITEMS_PER_PAGE = 16;

function GemstoneCatalog({ initialItems }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveFilter(categoryParam);
      setCurrentPage(1);
    } else if (!categoryParam) {
      setActiveFilter("All");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [categoryParam]);

  const handleFilter = (category) => {
    if (category === activeFilter) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(category);
      setCurrentPage(1);
      setIsTransitioning(false);
    }, 250);
  };

  const handleSort = (e) => {
    setIsTransitioning(true);
    const val = e.target.value;
    setTimeout(() => {
      setActiveSort(val);
      setCurrentPage(1);
      setIsTransitioning(false);
    }, 250);
  };

  const parsePrice = (priceStr) => {
    return Number(priceStr.replace(/[^0-9.-]+/g, ""));
  };

  let filteredItems = activeFilter === "All"
    ? [...initialItems]
    : initialItems.filter((item) => item.category === activeFilter);

  if (activeSort === "Price: Low to High") {
    filteredItems.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (activeSort === "Price: High to Low") {
    filteredItems.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  // Pagination Calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === safeCurrentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
      const section = document.getElementById("catalog-products");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const getCategoryTitle = () => {
    switch (activeFilter) {
      case "Sapphires": return "Ceylon Blue & Fancy Sapphires";
      case "Padparadscha": return "Lotus Ceylon Padparadscha";
      case "Rubies": return "Pigeon Blood Rubies";
      case "Emeralds": return "Natural Vivid Emeralds";
      case "Diamonds": return "Brilliant Natural Diamonds";
      case "Rare Gems": return "Collector & Rare Gems";
      default: return "Rare Gemstones";
    }
  };

  return (
    <div className="catalog-page">
      {/* Editorial Collection Header (Dinidu-inspired) */}
      <div className="catalog-hero">
        <div className="container catalog-hero__content">
          <span className="catalog-hero__eyebrow">Jewel Exchange Collections</span>
          <h1 className="catalog-hero__title">{getCategoryTitle()}</h1>
          <p className="catalog-hero__subtitle">
            Direct from the legendary gem mines of Ceylon, certified for exceptional color, clarity, and investment provenance.
          </p>
        </div>
      </div>

      {/* Inline Filter Bar */}
      <div className="catalog-filters">
        <div className="container">
          <div className="catalog-filters__row">
            <div className="catalog-filters__categories">
              <span className="catalog-filters__filter-label">Filter By:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? "filter-pill--active" : ""}`}
                  onClick={() => handleFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="catalog-filters__right">
              <span className="catalog-filters__count">
                {filteredItems.length} {filteredItems.length === 1 ? "Stone" : "Stones"}
              </span>
              <div className="sort-wrapper">
                <label htmlFor="sort-select" className="sort-label">Sort By:</label>
                <select id="sort-select" className="sort-select" value={activeSort} onChange={handleSort}>
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section id="catalog-products" className="catalog-grid-section">
        <div className="container">
          <div className={`product-grid ${isTransitioning ? "product-grid--fading" : ""}`}>
            {paginatedItems.map((item) => (
              <Link
                key={item._id || item.slug}
                href={`/gemstones/${item.slug}`}
                className="product-card"
              >
                <div className="product-card__img-wrap">
                  <Image
                    src={item.img || "/images/models_and_shots/28.png"}
                    alt={item.name || "Gemstone Item"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="product-card__img"
                  />
                </div>
                <div className="product-card__info">
                  <span className="product-card__category">{item.category}</span>
                  <h3 className="product-card__title">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="product-empty">
              <p>No stones found in this collection.</p>
            </div>
          )}

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <div className="catalog-pagination">
              <div className="catalog-pagination__info">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} stones
              </div>
              <div className="catalog-pagination__controls">
                <button
                  className="pagination-btn pagination-btn--prev"
                  disabled={safeCurrentPage === 1}
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  aria-label="Previous Page"
                >
                  ← Prev
                </button>
                <div className="pagination-numbers">
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        className={`pagination-num ${safeCurrentPage === page ? "pagination-num--active" : ""}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  className="pagination-btn pagination-btn--next"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  aria-label="Next Page"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clean Editorial Bespoke Banner */}
      <section className="catalog-bespoke-cta">
        <div className="container">
          <div className="catalog-bespoke-card">
            <span className="catalog-bespoke-tag">Gemstone Sourcing</span>
            <h2 className="catalog-bespoke-title">Searching for the Extraordinary?</h2>
            <p className="catalog-bespoke-desc">
              We source certified, investment-grade Ceylon and global gemstones directly from historical mines. Inquire with our gemologists for bespoke sourcing.
            </p>
            <Link href="/booking" className="btn btn--outline">
              Request Sourcing Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GemstoneClient({ initialItems }) {
  return (
    <Suspense fallback={<div className="catalog-page" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}></div>}>
      <GemstoneCatalog initialItems={initialItems} />
    </Suspense>
  );
}
