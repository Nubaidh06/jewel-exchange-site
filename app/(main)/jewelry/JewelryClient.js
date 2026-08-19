"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import "./page.css";

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Pendants"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low"];

const ITEMS_PER_PAGE = 12;

function JewelryCatalog({ initialItems }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveFilter(categoryParam);
      setCurrentPage(1);
    } else if (!categoryParam) {
      setActiveFilter("All");
    }
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

  return (
    <div className="catalog-page">
      {/* Compact Hero */}
      <div className="catalog-hero">
        <div className="catalog-hero__bg">
          <Image
            src="/images/models_and_shots/20.png"
            alt="Jewelry Collection"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="catalog-hero__overlay" />
        <div className="container catalog-hero__content">
          <span className="catalog-hero__label">Collections</span>
          <h1 className="catalog-hero__title">High Jewelry</h1>
          <p className="catalog-hero__subtitle">
            Explore our crafted statement pieces, signature sets, and bespoke creations designed to be treasured across generations.
          </p>
        </div>
      </div>

      {/* Inline Filter Bar */}
      <div className="catalog-filters">
        <div className="container">
          <div className="catalog-filters__row">
            <div className="catalog-filters__categories">
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
                {filteredItems.length} piece{filteredItems.length !== 1 ? "s" : ""}
              </span>
              <select className="sort-select" value={activeSort} onChange={handleSort}>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section id="catalog-products" className="catalog-grid-section">
        <div className="container">
          <div className={`product-grid ${isTransitioning ? "product-grid--fading" : ""}`}>
            {paginatedItems.map((item) => {
              const saved = isInWishlist(item.slug);
              return (
                <Link
                  key={item._id || item.slug}
                  href={`/jewelry/${item.slug}`}
                  className="product-card"
                >
                  <div className="product-card__img-wrap">
                    <Image
                      src={item.img || "/images/models_and_shots/20.png"}
                      alt={item.name || "Jewelry Item"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__info">
                    <span className="product-card__category">{item.category}</span>
                    <h3 className="product-card__title">{item.name}</h3>
                    <p className="product-card__price">Price on Inquiry</p>
                    <button
                      className={`btn ${saved ? "btn--outline" : "btn--full"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist({ ...item, type: 'Jewelry' });
                      }}
                      style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.75rem', padding: '0.6rem' }}
                    >
                      {saved ? "Added to Inquiry" : "Add to Inquiry"}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="product-empty">
              <p>No pieces found in this collection.</p>
            </div>
          )}

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <div className="catalog-pagination">
              <div className="catalog-pagination__info">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} pieces
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

      {/* CTA Banner */}
      <section className="catalog-cta">
        <div className="catalog-cta__bg">
          <div className="catalog-cta__bg-img">
            <Image src="/images/cta/ring-trillion-ceylon-sapphire-ribbon-swirl-01.png" alt="Jewelry Craftsmanship 1" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="catalog-cta__bg-img">
            <Image src="/images/cta/earrings-petite-beaded-gold-huggies-ring-and-bracelet-suite.png" alt="Jewelry Craftsmanship 3" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="catalog-cta__bg-img">
            <Image src="/images/cta/necklace-florentine-ripple-teardrop-gold-01.png" alt="Jewelry Craftsmanship 2" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="catalog-cta__overlay" />
        </div>
        <div className="container catalog-cta__inner reveal">
          <h2 className="catalog-cta__title">Looking for Something Specific?</h2>
          <p className="catalog-cta__desc">In addition to our showroom collections, our master craftsmen create one-of-a-kind bespoke designs tailored entirely to your vision.</p>
          <Link href="/contact" className="btn btn--white">
            Inquire Now <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function JewelryClient({ initialItems }) {
  return (
    <Suspense fallback={<div className="catalog-page" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}></div>}>
      <JewelryCatalog initialItems={initialItems} />
    </Suspense>
  );
}
