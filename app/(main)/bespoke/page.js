import Image from 'next/image';
import Link from 'next/link';
import './page.css';

export const metadata = {
  title: 'Bespoke Jewelry | Jewel Exchange',
  description: 'Create your dream custom jewelry piece with our master craftsmen at Jewel Exchange.',
};

export default function BespokePage() {
  return (
    <div className="bespoke-page">
      {/* ── Hero Section (Editorial Split) ── */}
      <section className="bespoke-hero">
        <div className="bespoke-hero__text">
          <div className="bespoke-hero__text-inner">
            <span className="section-label">Custom Creations</span>
            <h1 className="bespoke-hero__title">
              The Bespoke<br />
              <em>Experience</em>
            </h1>
            <p className="bespoke-hero__subtitle">
              From imagination to a timeless masterpiece. Your vision, brought to life through exceptional craftsmanship.
            </p>
            <a href="#booking" className="btn btn--primary">
              Begin Your Journey
            </a>
          </div>
        </div>
        <div className="bespoke-hero__image">
          <Image
            src="/images/models_and_shots/gem-setting.png"
            alt="Master craftsman setting a gem"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="bespoke-hero__img"
          />
        </div>
      </section>

      {/* ── Process / Timeline Section ── */}
      <section className="section bespoke-process">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Your Journey, Step by Step</h2>
            <p className="section-subtitle">
              Every bespoke piece follows a meticulous process to ensure perfection at every stage.
            </p>
          </div>

          <div className="bespoke-timeline">
            <div className="bespoke-timeline__line" />

            <div className="bespoke-timeline__step">
              <div className="bespoke-timeline__dot">
                <span className="bespoke-timeline__number">01</span>
              </div>
              <h3 className="bespoke-timeline__heading">Consultation</h3>
              <p className="bespoke-timeline__text">
                Meet with our designers to share your vision, inspirations, and personal style preferences.
              </p>
            </div>

            <div className="bespoke-timeline__step">
              <div className="bespoke-timeline__dot">
                <span className="bespoke-timeline__number">02</span>
              </div>
              <h3 className="bespoke-timeline__heading">Design</h3>
              <p className="bespoke-timeline__text">
                We create detailed hand-drawn sketches and precise 3D renders for your approval.
              </p>
            </div>

            <div className="bespoke-timeline__step">
              <div className="bespoke-timeline__dot">
                <span className="bespoke-timeline__number">03</span>
              </div>
              <h3 className="bespoke-timeline__heading">Crafting</h3>
              <p className="bespoke-timeline__text">
                Our master jewelers bring your design to life using the finest materials and rare gemstones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Past Bespoke Creations Gallery ── */}
      <section className="section bg-warm">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Past Bespoke Creations</h2>
            <p className="section-subtitle">
              A glimpse into the unique pieces we have brought to life for our discerning clients.
            </p>
          </div>

          <div className="bespoke-gallery">
            {[19, 21, 23, 25].map((num) => (
              <div key={num} className="bespoke-gallery__item">
                <Image
                  src={`/images/models_and_shots/${num}.png`}
                  alt={`Bespoke creation ${num}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="bespoke-gallery__image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA Section ── */}
      <section className="bespoke-cta-section" id="booking">
        <div className="container">
          <div className="bespoke-cta-box">
            <div className="bespoke-cta-box__image">
              <Image
                src="/images/models_and_shots/15.png"
                alt="Book a bespoke consultation"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="bespoke-cta-box__content">
              <span className="section-label">Get Started</span>
              <h2 className="bespoke-cta-box__title">Ready to Begin?</h2>
              <p className="bespoke-cta-box__text">
                We invite you to sit down with our design experts in a private consultation. Together, we will sketch, refine, and plan the creation of your perfect bespoke piece.
              </p>
              <Link href="/booking" className="btn btn--primary">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
