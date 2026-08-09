"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "../../lib/WishlistContext";
import "./page.css";

const CATEGORIES = ["All", "Sapphires", "Rubies", "Emeralds", "Diamonds", "Semi-Precious"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low"];

function GemstoneCatalog({ initialItems }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Default");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveFilter(categoryParam);
    } else if (!categoryParam) {
      setActiveFilter("All");
    }
  }, [categoryParam]);

  const handleFilter = (category) => {
    if (category === activeFilter) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(category);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSort = (e) => {
    setIsTransitioning(true);
    const val = e.target.value;
    setTimeout(() => {
      setActiveSort(val);
      setIsTransitioning(false);
    }, 300);
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

  return (
    <div className="catalog-page">
      {/* Compact Hero */}
      <div className="catalog-hero">
        <div className="catalog-hero__bg">
          <Image
            src="/images/models_and_shots/22.png"
            alt="Gemstones Collection"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="catalog-hero__overlay" />
        <div className="container catalog-hero__content">
          <span className="catalog-hero__label">Collections</span>
          <h1 className="catalog-hero__title">Rare Gemstones</h1>
          <p className="catalog-hero__subtitle">
            Nature's most precious treasures, hand-selected for brilliance and clarity.
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
                {filteredItems.length} stone{filteredItems.length !== 1 ? "s" : ""}
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
      <section className="catalog-grid-section">
        <div className="container">
          <div className={`product-grid ${isTransitioning ? "product-grid--fading" : ""}`}>
            {filteredItems.map((item, index) => {
              const saved = isInWishlist(item.slug);
              return (
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
                        toggleWishlist({ ...item, type: 'Gemstones' });
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
              <p>No stones found in this collection.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="catalog-cta bg-alt">
        <div className="container catalog-cta__inner reveal">
          <h2 className="catalog-cta__title">Searching for the Extraordinary?</h2>
          <p className="catalog-cta__desc">We source rare and exceptional loose gemstones from around the world. Let us know exactly what you are looking for.</p>
          <Link href="/contact" className="btn btn--outline">
            Inquire Now <span className="btn-arrow">→</span>
          </Link>
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
