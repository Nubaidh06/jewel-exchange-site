"use client";
import { useState, useEffect, useCallback, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import "./search.css";

const CATEGORIES = [
  "All",
  "Jewelry",
  "Gemstones",
  "Rings",
  "Sapphires",
  "Diamonds",
  "Necklaces",
  "Earrings",
  "Pendants",
  "Padparadscha",
];

const SORT_OPTIONS = [
  "Default",
  "Name: A to Z",
  "Name: Z to A",
];

const POPULAR_SEARCHES = [
  "Ceylon Sapphire",
  "Solitaire Diamond",
  "Emerald Drop",
  "Tennis Bracelet",
  "Padparadscha",
  "Gold Necklace",
];

const ITEMS_PER_PAGE = 12;

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState("Default");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();

  // Sync state when URL params change
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setActiveCategory(searchParams.get("category") || "All");
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
        if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);
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
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, activeCategory]);

  const updateUrl = useCallback((newQ, newCat) => {
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    if (newCat && newCat !== "All") params.set("category", newCat);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [router]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    updateUrl(val, activeCategory);
    setCurrentPage(1);
  };

  const handleCategoryClick = (cat) => {
    const newCat = cat === activeCategory ? "All" : cat;
    setActiveCategory(newCat);
    updateUrl(query, newCat);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setIsTransitioning(true);
    const val = e.target.value;
    setTimeout(() => {
      setActiveSort(val);
      setCurrentPage(1);
      setIsTransitioning(false);
    }, 200);
  };

  // Sorting
  let sortedItems = [...items];
  if (activeSort === "Name: A to Z") {
    sortedItems.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else if (activeSort === "Name: Z to A") {
    sortedItems.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
  }

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

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
    }, 200);
  };

  return (
    <div className="search-page">
      {/* Hero Section */}
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
              placeholder="Search sapphire rings, diamond pendants, rare gemstones..."
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
                  updateUrl("", activeCategory);
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="search-filters">
        <div className="container">
          <div className="search-filters__row">
            <div className="search-filters__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`search-filter-pill ${activeCategory === cat ? "search-filter-pill--active" : ""}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-filters__right">
              <span className="search-filters__count">
                {loading ? "Searching..." : `${sortedItems.length} piece${sortedItems.length !== 1 ? "s" : ""}`}
              </span>
              <select className="search-sort-select" value={activeSort} onChange={handleSortChange}>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
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
                          <span className="search-product-card__type">{item.type}</span>
                          {item.category && (
                            <span className="search-product-card__category">• {item.category}</span>
                          )}
                        </div>
                        <h3 className="search-product-card__title">{item.name}</h3>
                        <p className="search-product-card__price">
                          {item.price && !item.price.includes("$") && !item.price.toLowerCase().includes("inquiry")
                            ? item.price
                            : "Price on Inquiry"}
                        </p>
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
            /* Empty State */
            <div className="search-no-results">
              <h2 className="search-no-results__title">
                No matches found for &ldquo;{query}&rdquo;{activeCategory !== "All" ? ` in ${activeCategory}` : ""}
              </h2>
              <p className="search-no-results__text">
                Please check your search term or select another category above.
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
