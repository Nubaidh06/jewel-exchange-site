"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "general";

  // Dynamic context based on submission type
  const isBooking = type === "booking";
  const isContact = type === "contact";

  const heading = isBooking
    ? "Appointment Request Received"
    : isContact
    ? "Message Received with Care"
    : "Thank You for Reaching Out";

  const badge = isBooking
    ? "Private Consultation"
    : isContact
    ? "General Inquiry"
    : "Confirmed";

  const message = isBooking
    ? "Thank you for scheduling your private consultation. Our senior gemologist and atelier team will review your requested date and contact you shortly to confirm your booking."
    : "Thank you for getting in touch with Jewel Exchange. We have received your inquiry and our team will review the details and respond within 24 hours.";

  return (
    <div className="thank-you-page">
      {/* ── Background Ambiance ── */}
      <div className="thank-you-bg">
        <div className="thank-you-glow" />
      </div>

      <div className="container thank-you-container">
        {/* ── Main Confirmation Card ── */}
        <div className="thank-you-card reveal">
          {/* Animated Gold Check / Crest Icon */}
          <div className="thank-you-badge">
            <span className="thank-you-badge__label">{badge}</span>
          </div>

          <div className="thank-you-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1 className="thank-you-title">{heading}</h1>

          <div className="ornament">
            <div className="ornament__diamond"></div>
          </div>

          <p className="thank-you-desc">{message}</p>

          {/* Quick Info Pill */}
          <div className="thank-you-info-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Expected response time: <strong>Within 24 Hours</strong></span>
          </div>

          {/* ── Action Grid (Next Steps) ── */}
          <div className="thank-you-actions-grid">
            {/* Card 1: Immediate Assistance */}
            <div className="thank-you-action-card">
              <div className="thank-you-action-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="thank-you-action-card__title">Urgent or Direct Inquiry?</h3>
              <p className="thank-you-action-card__desc">Connect instantly with our master gemologist directly on WhatsApp.</p>
              <a
                href="https://wa.me/94773534538?text=Hello%20Jewel%20Exchange%2C%20I%20just%20submitted%20an%20inquiry%20on%20your%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold btn--sm"
              >
                Chat on WhatsApp <span className="btn-arrow">→</span>
              </a>
            </div>

            {/* Card 2: Visit Showroom */}
            <div className="thank-you-action-card">
              <div className="thank-you-action-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="thank-you-action-card__title">Colombo Flagship</h3>
              <p className="thank-you-action-card__desc">514A, R.A. De Mel Mawatha, Colombo 03<br />Mon – Sat: 10 AM – 6 PM</p>
              <a
                href="https://maps.google.com/?q=Jewel+Exchange,+514A+R.A.+De+Mel+Mawatha,+Colombo+03,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                Get Directions <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>

          {/* ── Exploration Footer ── */}
          <div className="thank-you-footer">
            <span className="thank-you-footer__label">Continue Exploring</span>
            <div className="thank-you-footer__links">
              <Link href="/jewelry" className="btn btn--outline">
                Explore Jewelry <span className="btn-arrow">→</span>
              </Link>
              <Link href="/gemstones" className="btn btn--outline">
                Loose Gemstones <span className="btn-arrow">→</span>
              </Link>
              <Link href="/" className="btn btn--white">
                Return to Home <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
