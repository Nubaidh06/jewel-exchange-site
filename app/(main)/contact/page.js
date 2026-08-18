import Image from 'next/image';
import Link from 'next/link';
import './contact.css';

export const metadata = {
  title: 'Contact Us | Jewel Exchange',
  description: 'Get in touch with Jewel Exchange for inquiries, appointments, and bespoke consultations in Colombo, Sri Lanka.',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* ── Cinematic Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero__bg">
          <Image
            src="/images/banners/contact-hero.png"
            alt="Jewel Exchange Showroom & Studio"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="contact-hero__overlay" />
        </div>
        <div className="container contact-hero__content">
          <span className="contact-hero__label reveal">Contact Us</span>
          <h1 className="contact-hero__title reveal reveal-delay-1">
            We&apos;d Love to<br />Hear From You
          </h1>
          <p className="contact-hero__subtitle reveal reveal-delay-2">
            Whether you have a question about our collections, need assistance with a bespoke piece, or simply want to say hello - we&apos;re here for you.
          </p>
        </div>
      </section>

      {/* ── Quick Contact Cards ── */}
      <section className="contact-cards-section">
        <div className="container">
          <div className="contact-cards">
            <a href="mailto:info@jewelexchange.lk" className="contact-card reveal">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
              </div>
              <h3 className="contact-card__title">Email Us</h3>
              <p className="contact-card__detail">info@jewelexchange.lk</p>
              <span className="contact-card__action">Send an email →</span>
            </a>

            <a href="tel:+94112505020" className="contact-card reveal reveal-delay-1">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="contact-card__title">Call Us</h3>
              <p className="contact-card__detail">+94 11 250 5020</p>
              <span className="contact-card__action">Make a call →</span>
            </a>

            <a href="https://www.instagram.com/jewelexchange_sl/" target="_blank" rel="noopener noreferrer" className="contact-card reveal reveal-delay-2">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="contact-card__title">Follow Us</h3>
              <p className="contact-card__detail">@jewelexchange_sl</p>
              <span className="contact-card__action">View Instagram →</span>
            </a>

            <div className="contact-card contact-card--hours reveal reveal-delay-3">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="contact-card__title">Showroom Hours</h3>
              <p className="contact-card__detail">Mon – Sat: 10 AM – 6 PM</p>
              <p className="contact-card__detail contact-card__detail--muted">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form Section ── */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-layout">
            {/* Left - Context */}
            <div className="contact-form-intro reveal">
              <span className="section-label">Send a Message</span>
              <h2 className="contact-form-intro__title">Let&apos;s Start a Conversation</h2>
              <p className="contact-form-intro__text">
                Whether it&apos;s a general question, support request, media inquiry, or the beginning of something bespoke - fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="contact-form-intro__divider" />
              <p className="contact-form-intro__note">
                Looking to book a private showroom viewing or start a custom design project?
              </p>
              <Link href="/booking" className="btn btn--gold" style={{ maxWidth: '280px' }}>
                Book an Appointment <span className="btn-arrow">→</span>
              </Link>
            </div>

            {/* Right - Form */}
            <div className="contact-form-wrapper reveal reveal-delay-2">
              <form
                action="https://formspree.io/f/xwvrebqo"
                method="POST"
                className="form contact-form"
              >
                <input type="hidden" name="_subject" value="New Contact Inquiry - Jewel Exchange" />
                <input type="hidden" name="_next" value="https://jewelexchange.lk/thank-you?type=contact" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="form-input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <select id="contact-subject" name="subject" className="form-select">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Media / Press">Media / Press</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    rows="6"
                    placeholder="Tell us how we can help you…"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn--full">
                  Send Message <span className="btn-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Showroom / Map Section ── */}
      <section className="showroom-section">
        <div className="container">
          <div className="showroom-header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>Our Flagship</span>
            <h2 className="section-title">Visit Our Showroom</h2>
            <p className="section-subtitle">
              Step inside and experience the brilliance of fine craftsmanship and rare Ceylon gemstones in person.
            </p>
          </div>

          <div className="showroom-content reveal reveal-delay-1">
            <div className="showroom-details">
              <div className="showroom-details__header">
                <span className="showroom-details__badge">Flagship Atelier</span>
                <h3 className="showroom-details__title">Colombo Showroom</h3>
              </div>

              <div className="showroom-detail-item">
                <div className="showroom-detail-item__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="showroom-detail-item__content">
                  <h4 className="showroom-detail-item__label">Location & Address</h4>
                  <p>514A, R.A. De Mel Mawatha, Colombo 03, Sri Lanka</p>
                </div>
              </div>

              <div className="showroom-detail-item">
                <div className="showroom-detail-item__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="showroom-detail-item__content">
                  <h4 className="showroom-detail-item__label">Opening Hours</h4>
                  <p>Monday - Saturday: 10:00 AM - 6:00 PM<br /><span className="showroom-detail-item__sub">Sunday: Closed (Private Bookings Only)</span></p>
                </div>
              </div>

              <div className="showroom-detail-item">
                <div className="showroom-detail-item__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="showroom-detail-item__content">
                  <h4 className="showroom-detail-item__label">Concierge & Amenities</h4>
                  <p>Valet Parking Available<br /><span className="showroom-detail-item__sub">Private Viewings by Appointment</span></p>
                </div>
              </div>

              <div className="showroom-details__actions">
                <a
                  href="https://maps.google.com/?q=Jewel+Exchange,+514A+R.A.+De+Mel+Mawatha,+Colombo+03,+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold btn--full showroom-directions-btn"
                >
                  Get Directions <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
            <div className="showroom-map">
              <iframe
                src="https://maps.google.com/maps?q=Jewel%20Exchange%2C%20514A%20R.%20A.%20De%20Mel%20Mawatha%2C%20Colombo%2003%2C%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jewel Exchange Showroom Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
