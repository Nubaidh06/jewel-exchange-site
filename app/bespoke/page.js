import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from '../components/FAQAccordion';
import './page.css';

export const metadata = {
  title: 'Bespoke Jewelry | Jewel Exchange',
  description: 'Create your dream custom jewelry piece with our master craftsmen at Jewel Exchange.',
};

export default function BespokePage() {
  return (
    <div className="bespoke-page">
      {/* ── Hero Section ── */}
      <section className="bespoke-hero">
        <Image
          src="/images/banners/banner 2.png"
          alt="Bespoke jewelry craftsmanship"
          fill
          priority
          sizes="100vw"
          className="bespoke-hero__bg"
        />
        <div className="bespoke-hero__overlay" />
        <div className="bespoke-hero__content container">
          <span className="section-label">Custom Creations</span>
          <h1 className="bespoke-hero__title">The Bespoke Experience</h1>
          <div className="ornament">
            <span className="ornament__diamond" />
          </div>
          <p className="bespoke-hero__subtitle">
            From imagination to a timeless masterpiece. Your vision, our craftsmanship.
          </p>
          <a href="#booking" className="btn btn--ghost">
            Begin Your Journey <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ── Process / Timeline Section ── */}
      <section className="section bg-alt">
        <div className="container">
          <span className="section-label reveal" style={{ textAlign: 'center', display: 'block' }}>How It Works</span>
          <h2 className="section-title reveal">Your Journey, Step by Step</h2>
          <p className="section-subtitle reveal">
            Every bespoke piece follows a meticulous process to ensure perfection at every stage.
          </p>

          <div className="bespoke-timeline reveal">
            <div className="bespoke-timeline__line" />

            <div className="bespoke-timeline__step reveal reveal-delay-1">
              <div className="bespoke-timeline__number">01</div>
              <div className="bespoke-timeline__dot" />
              <h3 className="bespoke-timeline__heading">Consultation</h3>
              <p className="bespoke-timeline__text">
                Meet with our designers to share your vision, inspirations, and preferences.
              </p>
            </div>

            <div className="bespoke-timeline__step reveal reveal-delay-2">
              <div className="bespoke-timeline__number">02</div>
              <div className="bespoke-timeline__dot" />
              <h3 className="bespoke-timeline__heading">Design</h3>
              <p className="bespoke-timeline__text">
                We create detailed sketches and 3D renders for your approval.
              </p>
            </div>

            <div className="bespoke-timeline__step reveal reveal-delay-3">
              <div className="bespoke-timeline__number">03</div>
              <div className="bespoke-timeline__dot" />
              <h3 className="bespoke-timeline__heading">Crafting</h3>
              <p className="bespoke-timeline__text">
                Our master jewelers bring your design to life with the finest materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Past Bespoke Creations Gallery ── */}
      <section className="section">
        <div className="container">
          <span className="section-label reveal" style={{ textAlign: 'center', display: 'block' }}>Portfolio</span>
          <h2 className="section-title reveal">Past Bespoke Creations</h2>
          <p className="section-subtitle reveal">
            A glimpse into the unique pieces we have brought to life for our clients.
          </p>

          <div className="bespoke-gallery">
            {[19, 21, 23, 25].map((num, i) => (
              <div key={num} className={`bespoke-gallery__item reveal reveal-delay-${i + 1}`}>
                <Image
                  src={`/images/models_and_shots/${num}.png`}
                  alt={`Bespoke creation ${num}`}
                  width={600}
                  height={750}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="bespoke-gallery__image"
                />
                <div className="bespoke-gallery__overlay">
                  <span className="bespoke-gallery__label">Bespoke Piece</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bespoke FAQ Section ── */}
      <FAQAccordion
        title="Bespoke & Craftsmanship FAQs"
        subtitle="Clear answers to common questions about custom design timelines, stone certifications, and our atelier's guarantees."
      />

      {/* ── Booking CTA Section ── */}
      <section className="bespoke-cta-section" id="booking">
        <div className="bespoke-cta-section__bg reveal">
          <Image
            src="/images/models_and_shots/15.png"
            alt="Book a bespoke consultation"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="bespoke-cta-section__overlay" />
        </div>
        <div className="container bespoke-cta-section__content reveal reveal-delay-1">
          <span className="bespoke-cta-section__label">Get Started</span>
          <h2 className="bespoke-cta-section__title">Ready to Begin?</h2>
          <div className="ornament">
            <span className="ornament__diamond" style={{ background: 'var(--color-gold-light)' }} />
          </div>
          <p className="bespoke-cta-section__text">
            We invite you to sit down with our design experts in a private consultation. Together, we will sketch, refine, and plan the creation of your perfect bespoke piece.
          </p>
          <Link href="/booking" className="btn btn--white">
            Book a Consultation <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
