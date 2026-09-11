"use client";

const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "Rings", label: "Rings" },
  { id: "Necklaces & Pendants", label: "Necklaces & Pendants" },
  { id: "Earrings", label: "Earrings" },
  { id: "Bracelets & Bangles", label: "Bracelets" },
  { id: "Rare Gemstones", label: "Gemstones" },
];

const GEMSTONES = [
  { id: "all", label: "All Stones" },
  { id: "Ceylon Sapphire", label: "Ceylon Sapphire" },
  { id: "Padparadscha", label: "Padparadscha" },
  { id: "Burmese Ruby", label: "Ruby" },
  { id: "Colombian Emerald", label: "Emerald" },
  { id: "Brilliant Diamond", label: "Diamond" },
  { id: "Collector Gemstone", label: "Rare Minerals" },
];

const METALS = [
  { id: "all", label: "All Metals" },
  { id: "18K Yellow Gold", label: "Yellow Gold" },
  { id: "18K White Gold / Platinum", label: "White Gold / Plat" },
  { id: "18K Rose Gold", label: "Rose Gold" },
  { id: "Tri-Color Gold", label: "Tri-Color" },
];

export default function ShowroomFilters({
  activeCollectionTab,
  setActiveCollectionTab,
  activeCategory,
  setActiveCategory,
  activeStone,
  setActiveStone,
  activeMetal,
  setActiveMetal,
  onResetFilters,
  hasActiveFilters,
  counts,
}) {
  return (
    <div className="showroom-filters">
      {/* ── Status Bar ── */}
      <div className="showroom-filters__status-row">
        <div className="status-tabs">
          <button
            type="button"
            className={`status-tab ${activeCollectionTab === "all" ? "status-tab--active" : ""}`}
            onClick={() => setActiveCollectionTab("all")}
          >
            All Masterworks <span className="status-tab__num">{counts.all}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${activeCollectionTab === "showroom" ? "status-tab--active" : ""}`}
            onClick={() => setActiveCollectionTab("showroom")}
          >
            In Showroom <span className="status-tab__num">{counts.showroom}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${activeCollectionTab === "archive" ? "status-tab--active" : ""}`}
            onClick={() => setActiveCollectionTab("archive")}
          >
            Bespoke Archive <span className="status-tab__num">{counts.archive}</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onResetFilters}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ── Editorial Typographic Filters ── */}
      <div className="showroom-filters__pills-row">
        {/* Category Pills */}
        <div className="filter-pill-cluster">
          <span className="cluster-label">Category:</span>
          <div className="cluster-items">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`minimal-pill ${activeCategory === c.id ? "minimal-pill--active" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gemstone Pills */}
        <div className="filter-pill-cluster">
          <span className="cluster-label">Gemstone:</span>
          <div className="cluster-items">
            {GEMSTONES.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`minimal-pill ${activeStone === g.id ? "minimal-pill--active" : ""}`}
                onClick={() => setActiveStone(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metal Pills */}
        <div className="filter-pill-cluster">
          <span className="cluster-label">Metal:</span>
          <div className="cluster-items">
            {METALS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`minimal-pill ${activeMetal === m.id ? "minimal-pill--active" : ""}`}
                onClick={() => setActiveMetal(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
