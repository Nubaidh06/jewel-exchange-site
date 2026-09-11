'use client';

import { useState, memo } from 'react';
import Image from 'next/image';

const BESPOKE_PIECES = [
  {
    id: 1,
    number: '01',
    image: 'https://cdn.sanity.io/images/rrsnwe4c/production/d7306889c45ebbe9decf222eb6112ffe7b337a33-1080x1350.png',
    title: 'Swiss Blue Topaz Statement Pendant & Ring Duo',
    category: 'Pendant & Ring Suite',
    specs: '8.50ct tw Swiss Blue Topaz · 18K Gold',
    description:
      'Mesmerizing emerald-cut electric blue topaz in an 18K gold diamond halo pendant, paired with a matching emerald-cut solitaire ring.',
  },
  {
    id: 2,
    number: '02',
    image: 'https://cdn.sanity.io/images/rrsnwe4c/production/018db205a9865bc78f8c2cb1b896645f3dfbe297-1080x1350.png',
    title: 'Imperial Pear Cut Emerald Starburst Pendant',
    category: 'Bespoke Pendant',
    specs: '2.60ct Vivid Emerald · 18K White Gold',
    description:
      'Magnificent pear-shaped natural vivid green emerald encircled by inner pavé and an outer marquise-faceted diamond sunburst corona.',
  },
  {
    id: 3,
    number: '03',
    image: 'https://cdn.sanity.io/images/rrsnwe4c/production/a717f45ef4cc67c78ce37213f1cf6c18b2fe27bb-1080x1350.png',
    title: 'Concentric Double Halo Royal Blue Sapphire Stud Earrings',
    category: 'Bespoke Earrings',
    specs: '2.10ct tw Royal Blue Sapphires · 18K White Gold',
    description:
      'Round Ceylon Royal Blue sapphires encircled by double concentric micropavé diamond halos in hand-finished 18K white gold.',
  },
  {
    id: 4,
    number: '04',
    image: 'https://cdn.sanity.io/images/rrsnwe4c/production/39de65d12e43c99f546b4bf18e89a3d60a766b54-1080x1350.png',
    title: 'Hot Pink Sapphire & Baguette Diamond Ring',
    category: 'Bespoke Ring',
    specs: '3.10ct Vivid Pink Sapphire · Platinum 950',
    description:
      'Extraordinary radiant-cut vivid magenta-pink sapphire held by 18K yellow gold prongs within tiered stepped baguette and round diamond arches.',
  },
];

const BespokeFlipCard = memo(function BespokeFlipCard({ piece }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div
      className={`bespoke-flip-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${piece.title} - ${isFlipped ? 'Showing details, tap to view photo' : 'Tap to view details'}`}
      aria-expanded={isFlipped}
    >
      <div className="bespoke-flip-card__inner">
        {/* ── Front Face: Clean Image & Subtle Luxury Badge ── */}
        <div className="bespoke-flip-card__face bespoke-flip-card__face--front">
          <Image
            src={piece.image}
            alt={piece.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="bespoke-flip-card__img"
            priority
          />
          <div className="bespoke-flip-card__overlay">
            <div className="bespoke-flip-card__top-bar">
              <span className="bespoke-flip-card__number">{piece.number}</span>
              <span className="bespoke-flip-card__hint-pill" aria-hidden="true">
                <span>Details</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v-2a8 8 0 0 1 14.93-4" />
                  <polyline points="20 2 20 6 16 6" />
                  <path d="M20 12v2a8 8 0 0 1-14.93 4" />
                  <polyline points="4 22 4 18 8 18" />
                </svg>
              </span>
            </div>

            <div className="bespoke-flip-card__bottom-bar">
              <span className="bespoke-flip-card__category">{piece.category}</span>
              <h3 className="bespoke-flip-card__title">{piece.title}</h3>
            </div>
          </div>
        </div>

        {/* ── Back Face: Clean Description & Material Details ── */}
        <div className="bespoke-flip-card__face bespoke-flip-card__face--back">
          <div className="bespoke-flip-card__back-content">
            <span className="bespoke-flip-card__back-eyebrow">
              {piece.number} · {piece.category}
            </span>

            <h3 className="bespoke-flip-card__back-title">{piece.title}</h3>

            <div className="bespoke-flip-card__divider" aria-hidden="true">
              <span className="bespoke-flip-card__diamond" />
            </div>

            <p className="bespoke-flip-card__back-desc">{piece.description}</p>

            <div className="bespoke-flip-card__specs-box">
              <span className="bespoke-flip-card__specs-label">Crafting Specs</span>
              <span className="bespoke-flip-card__specs-val">{piece.specs}</span>
            </div>

            <div className="bespoke-flip-card__back-action">
              <span className="bespoke-flip-card__flip-back-hint">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v-2a8 8 0 0 1 14.93-4" />
                  <polyline points="20 2 20 6 16 6" />
                  <path d="M20 12v2a8 8 0 0 1-14.93 4" />
                  <polyline points="4 22 4 18 8 18" />
                </svg>
                <span>Tap to view photo</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function BespokeGallery() {
  return (
    <div className="bespoke-flip-grid" role="region" aria-label="Past bespoke creations">
      {BESPOKE_PIECES.map((piece) => (
        <BespokeFlipCard key={piece.id} piece={piece} />
      ))}
    </div>
  );
}
