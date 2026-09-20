import Image from 'next/image';
import Link from 'next/link';
import BespokeGallery from './BespokeGallery';
import BespokeWizard from './BespokeWizard';
import './page.css';

export const metadata = {
  title: 'Bespoke Jewelry',
  description: 'Commission a one-of-a-kind piece with our master craftsmen in Colombo. Custom engagement rings, heirloom remodeling, and rare gemstone settings. Book a free consultation.',
  alternates: {
    canonical: '/bespoke',
  },
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
              From imagination to a timeless heirloom. Your vision, brought to life through dedicated bench artistry.
            </p>
            <a href="#wizard" className="btn btn--primary">
              Commission a Piece
            </a>
          </div>
        </div>
        <div className="bespoke-hero__image">
          <Image
            src="/images/models_and_shots/gem-setting.webp"
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
            <h2 className="section-title">The Bespoke Process</h2>
            <p className="section-subtitle">
              Every custom creation follows a seamless three-stage path from concept to finished treasure.
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
                Meet with our design team to share your inspirations, stone preferences, and budget goals.
              </p>
            </div>

            <div className="bespoke-timeline__step">
              <div className="bespoke-timeline__dot">
                <span className="bespoke-timeline__number">02</span>
              </div>
              <h3 className="bespoke-timeline__heading">Design &amp; 3D Render</h3>
              <p className="bespoke-timeline__text">
                We present custom sketches and photorealistic 3D CAD renders for your precise review.
              </p>
            </div>

            <div className="bespoke-timeline__step">
              <div className="bespoke-timeline__dot">
                <span className="bespoke-timeline__number">03</span>
              </div>
              <h3 className="bespoke-timeline__heading">Bench Crafting</h3>
              <p className="bespoke-timeline__text">
                Our in-house setters and goldsmiths cast, set, and hand-polish your piece to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Wizard ── */}
      <section className="section bespoke-wizard-section" id="wizard">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Design Your Piece</span>
            <h2 className="section-title">Commission a Bespoke Creation</h2>
            <p className="section-subtitle">
              Tell us your vision in a few steps. Our design team will reach out within one business day to begin your journey.
            </p>
          </div>
          <div className="bespoke-wizard-wrap">
            <BespokeWizard />
          </div>
        </div>
      </section>

      {/* ── Past Bespoke Creations Gallery ── */}
      <section className="section bg-surface">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Past Bespoke Creations</h2>
            <p className="section-subtitle">
              A glimpse into the unique pieces we have brought to life for our discerning clients.
            </p>
          </div>

          <BespokeGallery />
        </div>
      </section>

      {/* ── Booking CTA Section ── */}
      <section className="bespoke-cta-section" id="booking">
        <div className="container">
          <div className="bespoke-cta-box">
            <div className="bespoke-cta-box__image">
              <Image
                src="/images/models_and_shots/15.webp"
                alt="Book a bespoke consultation"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="bespoke-cta-box__content">
              <span className="section-label">The Showroom</span>
              <h2 className="bespoke-cta-box__title">Want to visit us?</h2>
              <p className="bespoke-cta-box__text">
                We invite you to our Colombo showroom for a deeply personal bespoke experience. Sit down with our design experts to view our curated gemstone collection, sketch out your ideas, and begin the creation of your timeless heirloom.
              </p>
              <Link href="/booking" className="btn btn--primary">
                Book a Showroom Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
