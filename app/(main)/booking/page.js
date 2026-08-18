"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./booking.css";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "Showroom Visit",
    preferredDate: "",
    preferredTime: "Morning (10AM - 12PM)",
    message: "",
    jewelry_type: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xwvrebqo", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Booking: ${formData.name} - ${formData.appointmentType}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was an issue submitting your request. Please try again or reach us on WhatsApp.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Unable to submit booking right now. Please reach us on WhatsApp or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      {/* ── Cinematic Hero ── */}
      <section className="booking-hero">
        <div className="booking-hero__bg">
          <Image
            src="/images/banners/experience-hero.png"
            alt="Book an appointment at Jewel Exchange"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="booking-hero__overlay" />
        </div>
        <div className="container booking-hero__content">
          <span className="booking-hero__label reveal">Private Appointments</span>
          <h1 className="booking-hero__title reveal reveal-delay-1">
            Book Your<br />Experience
          </h1>
          <p className="booking-hero__subtitle reveal reveal-delay-2">
            Schedule a private consultation with our jewelry experts, arrange a showroom viewing, or begin your bespoke journey.
          </p>
        </div>
      </section>

      {/* ── Experience Highlights ── */}
      <section className="booking-highlights">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-item reveal">
              <div className="highlight-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="highlight-item__title">One-on-One Consultation</h3>
              <p className="highlight-item__desc">Dedicated time with our master jewelers to explore your vision</p>
            </div>
            <div className="highlight-item reveal reveal-delay-1">
              <div className="highlight-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="highlight-item__title">Private, Unhurried Viewing</h3>
              <p className="highlight-item__desc">A relaxed, intimate setting to browse our collections at your pace</p>
            </div>
            <div className="highlight-item reveal reveal-delay-2">
              <div className="highlight-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="highlight-item__title">Complimentary Design Sketches</h3>
              <p className="highlight-item__desc">Walk away with bespoke design concepts tailored to your brief</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Appointment Form Section ── */}
      <section className="booking-form-section">
        <div className="container">
          <div className="booking-form-layout">
            {/* Left - Context Container */}
            <div className="booking-intro-wrapper reveal">
              <div className="booking-intro-card">
                <div className="booking-intro-card__accent-bar" />
                <span className="section-label">Schedule Your Visit</span>
                <h2 className="booking-form-intro__title">Reserve Your <br />Private Appointment</h2>
                <div className="ornament" style={{ margin: "var(--space-xs) 0 var(--space-md)", maxWidth: "100px" }}>
                  <span className="ornament__diamond" />
                </div>
                <p className="booking-form-intro__text">
                  Every visit to Jewel Exchange is a curated experience. Select your preferred date and time, and our team will prepare a personalized selection for your arrival.
                </p>

                <div className="booking-types">
                  <div className="booking-type">
                    <h4 className="booking-type__title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Showroom Visit
                    </h4>
                    <p className="booking-type__desc">Browse our latest jewelry and gemstone collections in person.</p>
                  </div>
                  <div className="booking-type">
                    <h4 className="booking-type__title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      Bespoke Consultation
                    </h4>
                    <p className="booking-type__desc">Discuss your custom design ideas with our artisans and designers.</p>
                  </div>
                  <div className="booking-type">
                    <h4 className="booking-type__title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>
                      Gemstone Sourcing
                    </h4>
                    <p className="booking-type__desc">View and select rare Ceylon gemstones with expert guidance.</p>
                  </div>
                  <div className="booking-type">
                    <h4 className="booking-type__title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      Virtual Meeting
                    </h4>
                    <p className="booking-type__desc">Connect with us remotely via Zoom or Google Meet from anywhere.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="booking-form-wrapper reveal reveal-delay-2">
              {isSubmitted ? (
                <div className="booking-success">
                  <div className="booking-success__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="booking-success__title">Request Received</h2>
                  <p className="booking-success__desc">
                    Thank you, {formData.name}. Your appointment request has been received. Our team will contact you shortly at <strong>{formData.email}</strong> to confirm your booking.
                  </p>
                  <button className="btn btn--outline" onClick={() => setIsSubmitted(false)}>
                    Book Another Appointment <span className="btn-arrow">→</span>
                  </button>
                </div>
              ) : (
                <form 
                  className="booking-form"
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xwvrebqo"
                  method="POST"
                >
                  <div className="booking-form__heading">
                    <h3>Appointment Details</h3>
                    <p>Provide your information below to secure a time.</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-name" className="form-label">Full Name</label>
                      <input type="text" id="booking-name" name="name" className="form-input" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-phone" className="form-label">Phone Number</label>
                      <input type="tel" id="booking-phone" name="phone" className="form-input" placeholder="+94 XX XXX XXXX" required value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-email" className="form-label">Email Address</label>
                    <input type="email" id="booking-email" name="email" className="form-input" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-type" className="form-label">Appointment Type</label>
                    <select id="booking-type" name="appointmentType" className="form-select" value={formData.appointmentType} onChange={handleChange}>
                      <option value="Showroom Visit">Showroom Visit & Browsing</option>
                      <option value="Bespoke Consultation">Bespoke Design Consultation</option>
                      <option value="Gemstone Sourcing">Gemstone Sourcing & Selection</option>
                      <option value="Virtual Consultation">Virtual Consultation (Zoom/Google Meet)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-date" className="form-label">Preferred Date</label>
                      <input type="date" id="booking-date" name="preferredDate" className="form-input" required value={formData.preferredDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-time" className="form-label">Preferred Time</label>
                      <select id="booking-time" name="preferredTime" className="form-select" value={formData.preferredTime} onChange={handleChange}>
                        <option value="Morning (10AM - 12PM)">Morning (10:00 AM – 12:00 PM)</option>
                        <option value="Early Afternoon (12PM - 3PM)">Early Afternoon (12:00 PM – 3:00 PM)</option>
                        <option value="Late Afternoon (3PM - 6PM)">Late Afternoon (3:00 PM – 6:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {formData.appointmentType === "Bespoke Consultation" && (
                    <div className="form-row" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="form-group">
                        <label htmlFor="jewelry-type" className="form-label">Jewelry Type</label>
                        <select id="jewelry-type" name="jewelry_type" className="form-select" value={formData.jewelry_type} onChange={handleChange} required>
                          <option value="" disabled>Select type</option>
                          <option value="ring">Ring</option>
                          <option value="necklace">Necklace</option>
                          <option value="earrings">Earrings</option>
                          <option value="bracelet">Bracelet</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="budget" className="form-label">Budget Range</label>
                        <select id="budget" name="budget" className="form-select" value={formData.budget} onChange={handleChange} required>
                          <option value="" disabled>Select budget</option>
                          <option value="under-500">Under $500</option>
                          <option value="500-1000">$500 – $1,000</option>
                          <option value="1000-5000">$1,000 – $5,000</option>
                          <option value="5000+">$5,000+</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="booking-message" className="form-label">Additional Details <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--color-text-light)' }}>(Optional)</span></label>
                    <textarea 
                      id="booking-message" 
                      name="message" 
                      className="form-textarea" 
                      rows="4" 
                      placeholder="Let us know if you're interested in specific pieces, or if you have a particular design in mind…"
                      value={formData.message} 
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn--full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Request…" : "Request Appointment"} {!isSubmitting && <span className="btn-arrow">→</span>}
                  </button>
                  <p className="booking-form__note">
                    Submitting this form requests an appointment. Our team will contact you to confirm the final date and time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / What to Expect ── */}
      <section className="booking-expect">
        <div className="container">
          <div className="booking-expect__header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>What to Expect</span>
            <h2 className="section-title">Your Visit, Step by Step</h2>
            <p className="section-subtitle">From the moment you walk through our doors, every detail is curated for you.</p>
          </div>

          <div className="expect-timeline">
            <div className="expect-step reveal">
              <div className="expect-step__number">01</div>
              <div className="expect-step__content">
                <h3 className="expect-step__title">Welcome & Refreshments</h3>
                <p className="expect-step__desc">You&apos;ll be warmly greeted and seated in our private viewing salon with complimentary refreshments.</p>
              </div>
            </div>
            <div className="expect-step reveal reveal-delay-1">
              <div className="expect-step__number">02</div>
              <div className="expect-step__content">
                <h3 className="expect-step__title">Guided Discovery</h3>
                <p className="expect-step__desc">A dedicated consultant will walk you through our collections or discuss your bespoke vision in detail.</p>
              </div>
            </div>
            <div className="expect-step reveal reveal-delay-2">
              <div className="expect-step__number">03</div>
              <div className="expect-step__content">
                <h3 className="expect-step__title">Expert Consultation</h3>
                <p className="expect-step__desc">Our gemologists and designers will provide expert guidance, answer questions, and explore possibilities.</p>
              </div>
            </div>
            <div className="expect-step reveal reveal-delay-3">
              <div className="expect-step__number">04</div>
              <div className="expect-step__content">
                <h3 className="expect-step__title">Next Steps</h3>
                <p className="expect-step__desc">Leave with a clear plan - whether it&apos;s a purchase, a bespoke design brief, or a gemstone selection to consider.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
