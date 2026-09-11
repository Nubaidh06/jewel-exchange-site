"use client";
import Image from "next/image";

export default function ShowroomGrid({
  items,
  gridDensity,
  setGridDensity,
  onOpenGalleryAt,
  isItemInTray,
  onToggleTray,
}) {
  return (
    <div className="showroom-grid-section">
      {/* Density / Zoom Control */}
      <div className="grid-density-bar">
        <span className="grid-density-label">Grid Scale:</span>
        <div className="density-toggle">
          <button
            type="button"
            className={`density-btn ${gridDensity === "standard" ? "density-btn--active" : ""}`}
            onClick={() => setGridDensity("standard")}
            title="Standard Scale (3 Columns)"
          >
            Standard
          </button>
          <button
            type="button"
            className={`density-btn ${gridDensity === "compact" ? "density-btn--active" : ""}`}
            onClick={() => setGridDensity("compact")}
            title="Compact Overview (4 Columns)"
          >
            Compact (Zoom Out)
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`showroom-grid showroom-grid--${gridDensity}`}>
        {items.map((item, index) => {
          const inTray = isItemInTray(item.id);
          const displayImg = item.img || (item.images && item.images[0]) || "/images/models_and_shots/20.png";

          return (
            <article
              key={item.id}
              className={`showroom-item ${inTray ? "showroom-item--in-tray" : ""}`}
              onClick={() => onOpenGalleryAt(index)}
            >
              <div className="showroom-item__media">
                <Image
                  src={displayImg}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="showroom-item__img"
                  loading="lazy"
                />

                {item.isArchive && (
                  <span className="showroom-item__archive-tag">Archive</span>
                )}

                <button
                  type="button"
                  className={`showroom-item__tray-trigger ${inTray ? "showroom-item__tray-trigger--active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTray(item);
                  }}
                  aria-label={inTray ? "Remove from tray" : "Add to tray"}
                  title={inTray ? "In Tray" : "Add to Tray"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={inTray ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
              </div>

              <div className="showroom-item__body">
                <span className="showroom-item__category">{item.category}</span>
                <h3 className="showroom-item__title">{item.name}</h3>
                <span className="showroom-item__specs">
                  {item.summarySpecs?.stone || item.stone} · {item.summarySpecs?.metal || item.metal}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="showroom-empty-state">
          <p className="showroom-empty-state__msg">No creations match the selected filter combination.</p>
        </div>
      )}
    </div>
  );
}
