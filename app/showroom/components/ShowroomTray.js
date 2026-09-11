"use client";
import { useState } from "react";
import Image from "next/image";

export default function ShowroomTray({
  isOpen,
  onClose,
  trayItems,
  onRemoveFromTray,
  onClearTray,
  onSelectPiece,
}) {
  const [showConsultantCard, setShowConsultantCard] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateWhatsAppUrl = () => {
    const phone = "94773534538";
    let text = "Hello Jewel Exchange, I shortlisted these pieces on the Showroom gallery tray:\n\n";
    trayItems.forEach((item, i) => {
      text += `${i + 1}. *${item.name}*\n`;
      text += `   Stone: ${item.summarySpecs?.stone || item.stone}\n`;
      text += `   Metal: ${item.summarySpecs?.metal || item.metal}\n\n`;
    });
    text += "Could you please confirm viewing availability in the showroom? Thank you.";
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const copyText = () => {
    let text = "Jewel Exchange Showroom Shortlist:\n\n";
    trayItems.forEach((item, i) => {
      text += `${i + 1}. ${item.name} (${item.stone} · ${item.metal})\n`;
    });
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="showroom-tray-overlay">
      <div className="showroom-tray-backdrop" onClick={onClose} />
      <div className="showroom-tray-drawer">
        {/* Header */}
        <div className="showroom-tray-header">
          <div>
            <span className="tray-eyebrow">Client Shortlist</span>
            <h2 className="tray-title">Showroom Tray ({trayItems.length})</h2>
          </div>
          <div className="tray-header-actions">
            {trayItems.length > 0 && (
              <button type="button" className="tray-text-action" onClick={onClearTray}>
                Clear All
              </button>
            )}
            <button type="button" className="tray-close-btn" onClick={onClose} aria-label="Close Tray">
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {trayItems.length === 0 ? (
          <div className="tray-empty">
            <p>Your showroom tray is currently empty.</p>
            <span className="tray-empty-sub">
              Tap the tray icon on any piece while browsing to assemble a shortlist for consultation.
            </span>
          </div>
        ) : showConsultantCard ? (
          /* Consultant Presentation Card */
          <div className="consultant-card-wrap">
            <div className="consultant-card">
              <span className="consultant-card__sub">COLOMBO ATELIER CONSULTATION</span>
              <h3 className="consultant-card__heading">Selected Pieces for In-Person Viewing</h3>
              <p className="consultant-card__intro">
                Show this reference ledger to your jewelry consultant to inspect these creations from the showroom collection.
              </p>

              <div className="consultant-card__items">
                {trayItems.map((item, idx) => (
                  <div key={item.id} className="consultant-item">
                    <span className="consultant-item__num">{String(idx + 1).padStart(2, "0")}</span>
                    <div className="consultant-item__details">
                      <strong className="consultant-item__name">{item.name}</strong>
                      <span className="consultant-item__specs">
                        {item.category} · {item.summarySpecs?.stone || item.stone} · {item.summarySpecs?.metal || item.metal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="tray-btn tray-btn--secondary"
                onClick={() => setShowConsultantCard(false)}
                style={{ marginTop: "1.5rem" }}
              >
                ← Back to Visual Comparison
              </button>
            </div>
          </div>
        ) : (
          /* Visual Comparison Table */
          <div className="tray-items-grid">
            {trayItems.map((item) => (
              <div key={item.id} className="tray-card">
                <button
                  type="button"
                  className="tray-card-remove"
                  onClick={() => onRemoveFromTray(item.id)}
                  aria-label="Remove item"
                  title="Remove from tray"
                >
                  ✕
                </button>

                <div
                  className="tray-card-img-wrap"
                  onClick={() => {
                    onClose();
                    onSelectPiece(item);
                  }}
                >
                  <Image
                    src={item.img || (item.images && item.images[0]) || "/images/models_and_shots/20.png"}
                    alt={item.name}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="tray-card-body">
                  <span className="tray-card-cat">{item.category}</span>
                  <h4
                    className="tray-card-title"
                    onClick={() => {
                      onClose();
                      onSelectPiece(item);
                    }}
                  >
                    {item.name}
                  </h4>

                  <div className="tray-specs-table">
                    <div className="tray-spec-line">
                      <span>Stone</span>
                      <strong>{item.summarySpecs?.stone || item.stone}</strong>
                    </div>
                    <div className="tray-spec-line">
                      <span>Metal</span>
                      <strong>{item.summarySpecs?.metal || item.metal}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="tray-view-link"
                    onClick={() => {
                      onClose();
                      onSelectPiece(item);
                    }}
                  >
                    View in Full Gallery →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {trayItems.length > 0 && (
          <div className="showroom-tray-footer">
            <div className="tray-footer-actions">
              <button
                type="button"
                className="tray-btn tray-btn--secondary"
                onClick={() => setShowConsultantCard(!showConsultantCard)}
              >
                {showConsultantCard ? "Visual Cards" : "Consultant Reference Card"}
              </button>

              <button
                type="button"
                className="tray-btn tray-btn--secondary"
                onClick={copyText}
              >
                {copied ? "Copied" : "Copy List"}
              </button>
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="tray-btn tray-btn--primary"
            >
              Send Shortlist to WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
