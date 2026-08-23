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
        <div className="booking-hero__bg-wrapper">
          <Image
            src="/images/banners/experience-hero-2.png"
            alt="Book an appointment at Jewel Exchange"
            fill
            sizes="100vw"
            className="booking-hero__img"
            priority
          />
          <div className="booking-hero__overlay" />
        </div>
        
        <div className="container booking-hero__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>Private Appointments</span>
          <h1 className="booking-hero__title">
            Book Your <em>Experience</em>
          </h1>
          <p className="booking-hero__subtitle">
            Schedule a private consultation with our jewelry experts, arrange a showroom viewing, or begin your bespoke journey. Every visit is a curated experience.
          </p>
        </div>
      </section>

      {/* ── Overlapping Form & Types Card ── */}
      <section className="booking-overlap-section">
        <div className="container">
          <div className="booking-card">
            
            {/* Highlights / Types Section */}
            <div className="booking-types">
              <div className="booking-type">
                <h4 className="booking-type__title">
                  Showroom Visit
                </h4>
                <p className="booking-type__desc">Browse our latest jewelry and gemstone collections in person.</p>
              </div>
              <div className="booking-type">
                <h4 className="booking-type__title">
                  Bespoke Consultation
                </h4>
                <p className="booking-type__desc">Discuss your custom design ideas with our artisans and designers.</p>
              </div>
              <div className="booking-type">
                <h4 className="booking-type__title">
                  Gemstone Sourcing
                </h4>
                <p className="booking-type__desc">View and select rare Ceylon gemstones with expert guidance.</p>
              </div>
              <div className="booking-type">
                <h4 className="booking-type__title">
                  Virtual Meeting
                </h4>
                <p className="booking-type__desc">Connect with us remotely via Zoom or Google Meet from anywhere.</p>
              </div>
            </div>

            <div className="booking-card__divider" />

            {/* Form Section */}
            <div className="booking-form-wrapper">
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-xl)' }}>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Reservation Details</h2>
                <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>Provide your information below to secure a time.</p>
              </div>

              {isSubmitted ? (
                <div className="booking-success">
                  <div className="booking-success__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="booking-success__title">Request Received</h2>
                  <p className="booking-success__desc">
                    Thank you, {formData.name}. Your appointment request has been received. Our team will contact you shortly at <strong>{formData.email}</strong> to confirm your booking.
                  </p>
                  <button className="btn btn--outline" onClick={() => setIsSubmitted(false)}>
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form
                  className="luxury-form"
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xwvrebqo"
                  method="POST"
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-name" className="form-label">Full Name</label>
                      <input type="text" id="booking-name" name="name" className="form-input" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-phone" className="form-label">Phone Number</label>
                      <input type="tel" id="booking-phone" name="phone" className="form-input" placeholder="+94 77 123 4567" required value={formData.phone} onChange={handleChange} />
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
                        <option value="Morning (10AM - 12PM)">Morning (10:00 AM - 12:00 PM)</option>
                        <option value="Early Afternoon (12PM - 3PM)">Early Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="Late Afternoon (3PM - 6PM)">Late Afternoon (3:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {formData.appointmentType === "Bespoke Consultation" && (
                    <div className="form-row">
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
                          <option value="500-1000">$500 - $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
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
                      rows="3"
                      placeholder="Let us know if you're interested in specific pieces or designs..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Request Appointment"}
                    </button>
                    <p className="booking-form__note">
                      Submitting this form requests an appointment. Our team will contact you to confirm.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline / What to Expect Section ── */}
      <section className="booking-expect">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'var(--space-2xl)' }}>
            <span className="section-label">What to Expect</span>
            <h2 className="section-title">Your Visit, Step by Step</h2>
          </div>

          <div className="expect-timeline">
            <div className="expect-timeline__line" />

            <div className="expect-step">
              <div className="expect-step__dot">
                <span className="expect-step__number">01</span>
              </div>
              <h3 className="expect-step__title">Welcome</h3>
              <p className="expect-step__desc">You&apos;ll be seated in our private viewing salon with refreshments.</p>
            </div>

            <div className="expect-step">
              <div className="expect-step__dot">
                <span className="expect-step__number">02</span>
              </div>
              <h3 className="expect-step__title">Discovery</h3>
              <p className="expect-step__desc">A consultant will walk you through our collections or bespoke process.</p>
            </div>

            <div className="expect-step">
              <div className="expect-step__dot">
                <span className="expect-step__number">03</span>
              </div>
              <h3 className="expect-step__title">Consultation</h3>
              <p className="expect-step__desc">Our experts will provide guidance and answer your questions.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
