"use client";

import { useState } from "react";
import "./FAQAccordion.css";

const DEFAULT_FAQS = [
  {
    id: "faq-timeline",
    question: "How long does bespoke jewelry creation take?",
    answer: "Custom commissions typically take 2 to 4 weeks from 3D render approval to final finish. Expedited timelines are available for upcoming weddings and milestone dates upon request."
  },
  {
    id: "faq-certs",
    question: "Are gemstones and diamonds certified for authenticity?",
    answer: "Yes. Premium and high-value gemstones come accompanied by accredited laboratory certificates (such as NGJA, GIA, or GRS). For all other pieces, independent gemological certification can be arranged upon request."
  },
  {
    id: "faq-heirloom",
    question: "Can I use my own heirloom gemstones or gold for a custom design?",
    answer: "Yes. We specialize in heirloom remodeling. Our gemologists will assess your stones, verify setting integrity, and sketch modern concepts to give family heirlooms a fresh new life."
  },
  {
    id: "faq-shipping",
    question: "Do you offer secure, fully insured international delivery?",
    answer: "Yes. We ship worldwide via expedited courier (FedEx & DHL Express) with 100% full-value transit insurance and signature luxury presentation packaging."
  },
  {
    id: "faq-aftercare",
    question: "What aftercare and maintenance services are included?",
    answer: "Every Jewel Exchange creation includes a complimentary initial ring resizing, lifetime ultrasonic cleaning, and annual prong security inspections at our Colombo atelier."
  }
];

export default function FAQAccordion({ items = DEFAULT_FAQS, title = "Frequently Asked Questions", subtitle = "Everything you need to know about our craftsmanship, stone sourcing, and bespoke process." }) {
  // First item open by default for immediate visual context
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  // Structured Data for Google FAQPage Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="faq-section section">
      {/* Inject FAQ Schema for Search Engine SEO Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <div className="faq-header reveal">
          <span className="section-label">Questions & Clarity</span>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="faq-wrapper reveal reveal-delay-1">
          <div className="faq-list">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id || index}
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="faq-question__number">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="faq-question__text">{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <span className="faq-icon__line faq-icon__line--h"></span>
                      <span className="faq-icon__line faq-icon__line--v"></span>
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-footer reveal reveal-delay-2">
            <p className="faq-footer__text">
              Have a specific question about an upcoming custom design or rare gemstone?
            </p>
            <div className="faq-footer__actions">
              <a
                href="https://wa.me/94773534538?text=Hello%20Jewel%20Exchange%2C%20I%20have%20a%20question%20regarding%20a%20bespoke%20piece"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold"
              >
                Inquire on WhatsApp <span className="btn-arrow">→</span>
              </a>
              <a href="/contact" className="btn btn--outline">
                Contact Our Atelier <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
