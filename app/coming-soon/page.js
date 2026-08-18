'use client';

import { useState, useEffect, useRef } from 'react';
import './page.css';

// ─── CONFIGURE YOUR LAUNCH DATE HERE ────────────────────────────────
// Set this to your actual launch date (ISO format, local Sri Lanka time).
// Example: '2026-09-15T10:00:00+05:30'
const LAUNCH_DATE = new Date('2026-08-28T10:00:00+05:30');
// ─────────────────────────────────────────────────────────────────────

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function CountdownBlock({ value, label, id }) {
  const ref = useRef(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value && ref.current) {
      ref.current.classList.remove('flip');
      void ref.current.offsetWidth; // reflow
      ref.current.classList.add('flip');
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className="cs-countdown__block">
      <div
        id={id}
        ref={ref}
        className="cs-countdown__number"
        aria-live="polite"
        aria-label={`${value} ${label}`}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="cs-countdown__label">{label}</div>
    </div>
  );
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState(null); // null until client mounts
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error

  // ── Countdown tick ──────────────────────────────────────────────────
  useEffect(() => {
    // Set initial value immediately after mount (client only — avoids SSR mismatch)
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);


  // ── Email submission (Formspree) ────────────────────────────────────
  async function handleNotify(e) {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xwvrebqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Jewel Exchange — Launch Notification Request' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="cs-page">
      {/* Ambient glows */}
      <div className="cs-glow cs-glow--top"  aria-hidden="true" />
      <div className="cs-glow cs-glow--left" aria-hidden="true" />
      <div className="cs-glow cs-glow--right" aria-hidden="true" />

      {/* Film grain */}
      <div className="cs-grain" aria-hidden="true" />

      {/* Edge lines */}
      <div className="cs-line--top"    aria-hidden="true" />
      <div className="cs-line--bottom" aria-hidden="true" />

      <main className="cs-content">

        {/* Logo */}
        <div className="cs-logo" role="banner">
          <span className="cs-logo-text">JEWEL EXCHANGE</span>
        </div>

        {/* Label */}
        <p className="cs-label">Colombo, Sri Lanka · Est. Since 1990</p>

        {/* Headline */}
        <h1 className="cs-headline">
          Something <em>extraordinary</em><br />is coming
        </h1>

        {/* Subtext */}
        <p className="cs-subtext">
          Our new website is being crafted with the same care we bring to
          every jewel — with precision, beauty, and intention. We&apos;ll
          be ready soon.
        </p>

        {/* Ornament */}
        <div className="cs-ornament" aria-hidden="true">
          <div className="cs-ornament__diamond" />
        </div>

        {/* Countdown */}
        {timeLeft === null ? (
          /* Placeholder shown during SSR and before client hydration */
          <div className="cs-countdown" aria-hidden="true">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="cs-countdown__block">
                <div className="cs-countdown__number">--</div>
                <div className="cs-countdown__label">{label}</div>
              </div>
            ))}
          </div>
        ) : !timeLeft.expired ? (
          <div className="cs-countdown" role="timer" aria-label="Countdown to launch">
            <CountdownBlock value={timeLeft.days}    label="Days"    id="cs-days"    />
            <span className="cs-countdown__sep" aria-hidden="true">·</span>
            <CountdownBlock value={timeLeft.hours}   label="Hours"   id="cs-hours"   />
            <span className="cs-countdown__sep" aria-hidden="true">·</span>
            <CountdownBlock value={timeLeft.minutes} label="Minutes" id="cs-minutes" />
            <span className="cs-countdown__sep" aria-hidden="true">·</span>
            <CountdownBlock value={timeLeft.seconds} label="Seconds" id="cs-seconds" />
          </div>
        ) : (
          <div className="cs-countdown" aria-label="Launching now">
            <div className="cs-countdown__block">
              <div className="cs-countdown__number">✦</div>
              <div className="cs-countdown__label">Launching Now</div>
            </div>
          </div>
        )}

        {/* Notify */}
        <div className="cs-notify">
          <span className="cs-notify__label">Be the first to know</span>

          {status === 'success' ? (
            <div className="cs-notify__success visible" role="status">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity=".4"/>
                <path d="M4.5 8l2.5 2.5 4-4" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              You&apos;re on the list — we&apos;ll be in touch.
            </div>
          ) : (
            <form
              id="cs-notify-form"
              className="cs-notify__form"
              onSubmit={handleNotify}
              noValidate
            >
              <label htmlFor="cs-email" className="sr-only">Email address</label>
              <input
                id="cs-email"
                className="cs-notify__input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for launch notification"
              />
              <button
                id="cs-notify-btn"
                className="cs-notify__btn"
                type="submit"
                disabled={status === 'loading'}
                aria-label="Notify me when we launch"
              >
                {status === 'loading' ? '...' : 'Notify Me'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,180,180,0.7)' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Social */}
        <div className="cs-social" aria-label="Social media links">
          <span className="cs-social__label">Follow us</span>

          {/* Instagram */}
          <a
            id="cs-instagram-link"
            href="https://www.instagram.com/jewelexchange_sl/"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-social__link"
            aria-label="Jewel Exchange on Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @jewelexchange_sl
          </a>

          <div className="cs-social__divider" aria-hidden="true" />

          {/* WhatsApp */}
          <a
            id="cs-whatsapp-link"
            href="https://wa.me/94773534538"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-social__link"
            aria-label="Contact Jewel Exchange on WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Footer note */}
        <p className="cs-footer">© {new Date().getFullYear()} Jewel Exchange · Colombo, Sri Lanka</p>

      </main>
    </div>
  );
}
