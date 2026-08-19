import Image from 'next/image';
import Link from 'next/link';
import './about.css';

export const metadata = {
  title: 'About Us | Jewel Exchange',
  description: 'Discover the heritage, craftsmanship, and values behind Jewel Exchange - Sri Lanka\'s premier bespoke jewelry atelier.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ── Cinematic Hero ── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <Image
            src="/images/models_and_shots/03.png"
            alt="Jewel Exchange heritage"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div className="about-hero__overlay" />
        </div>
        <div className="container about-hero__content">
          <span className="about-hero__label reveal">Our Story</span>
          <h1 className="about-hero__title reveal reveal-delay-1">
            A Legacy of<br />Elegance
          </h1>
          <p className="about-hero__subtitle reveal reveal-delay-2">
            Crafted in the heart of Sri Lanka, rooted in generations of artistry, and guided by an unwavering pursuit of perfection.
          </p>
        </div>
      </section>

      {/* ── Heritage Section ── */}
      <section className="about-heritage">
        <div className="container">
          <div className="heritage-layout">
            <div className="heritage-text reveal">
              <span className="section-label">Heritage</span>
              <h2 className="heritage-text__title">Where Tradition Meets Innovation</h2>

              <blockquote className="heritage-quote">
                <span className="heritage-quote__mark">&ldquo;</span>
                We believe true luxury lies in the details - in the purity of the metal, the brilliance of every diamond, and the natural story behind every gemstone.
              </blockquote>

              <p>
                Founded in 2008 in Colombo, Jewel Exchange was established with a dedication to timeless design and authentic craftsmanship. For over 18 years, our collections have spanned classic plain gold essentials, brilliant diamond jewelry, and rare Ceylon gemstone creations - all handcrafted with meticulous care.
              </p>
              <p>
                Every design is brought to life through rigorous attention to detail at every stage of making. Our jewelers carefully inspect each setting, hand-polish every contour, and ensure flawless symmetry - creating jewelry with an unmistakable feel of substance and finesse.
              </p>
              <p>
                Today, Jewel Exchange is trusted by collectors and clients worldwide. Every creation that leaves our hands represents a commitment to ethical integrity, masterful finishing, and beauty designed to last for generations.
              </p>
            </div>

            <div className="heritage-image reveal reveal-delay-2">
              <div className="heritage-image__wrapper">
                <Image
                  src="/images/models_and_shots/26B.png"
                  alt="Where Tradition Meets Innovation - Jewel Exchange Craftsmanship"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Numbers ── */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-item">
              <span className="stat-item__number">18+</span>
              <span className="stat-item__label">Years of Craft</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">5,000+</span>
              <span className="stat-item__label">Pieces Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">30+</span>
              <span className="stat-item__label">Countries Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">100%</span>
              <span className="stat-item__label">Ethically Sourced</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide every decision, every cut, every creation.</p>
          </div>

          <div className="values-grid">
            <div className="value-card reveal">
              <div className="value-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="value-card__number">01</span>
              <h3 className="value-card__title">Exceptional Quality</h3>
              <p className="value-card__desc">
                Every gemstone is hand-selected and every setting meticulously inspected. We uphold the highest standards of craftsmanship, ensuring each piece is worthy of becoming a family heirloom.
              </p>
            </div>

            <div className="value-card reveal reveal-delay-1">
              <div className="value-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="value-card__number">02</span>
              <h3 className="value-card__title">Curated & Custom</h3>
              <p className="value-card__desc">
                Whether discovering a finished signature set in our showroom or commissioning a one-of-a-kind bespoke piece, our artisans work closely with you to deliver an unforgettable experience.
              </p>
            </div>

            <div className="value-card reveal reveal-delay-2">
              <div className="value-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="value-card__number">03</span>
              <h3 className="value-card__title">Ethical Practice</h3>
              <p className="value-card__desc">
                We source conflict-free diamonds and ethically mined gemstones, partnering with responsible suppliers who share our commitment to sustainability and fair trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Behind the Scenes Gallery ── */}
      <section className="about-gallery">
        <div className="container">
          <div className="about-gallery__header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>Our Workshop</span>
            <h2 className="section-title">Behind the Scenes</h2>
            <p className="section-subtitle">
              A glimpse into the artistry, precision, and passion that shape every creation.
            </p>
          </div>

          <div className="gallery-masonry">
            {[
              { src: '/images/models_and_shots/04.png', alt: 'Craftsmanship detail', span: 'tall' },
              { src: '/images/models_and_shots/05.png', alt: 'Workshop artistry', span: '' },
              { src: '/images/models_and_shots/06.png', alt: 'Gemstone selection', span: '' },
              { src: '/images/models_and_shots/07.png', alt: 'Jewelry finishing', span: '' },
              { src: '/images/models_and_shots/09.png', alt: 'Final masterpiece', span: 'tall' },
            ].map((img, idx) => (
              <div
                key={img.src}
                className={`gallery-item ${img.span ? `gallery-item--${img.span}` : ''} reveal reveal-delay-${(idx % 3) + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="gallery-item__img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials / Patron Stories ── */}
      <section className="about-testimonials section bg-alt">
        <div className="container">
          <div className="about-testimonials__header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '0.75rem' }}>Patron Stories</span>
            <h2 className="section-title">Words of Distinction</h2>
            <div className="ornament">
              <span className="ornament__diamond" />
            </div>
            <p className="section-subtitle">
              Reflections from clients who entrusted their most meaningful milestones to Jewel Exchange.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal reveal-delay-1">
              <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="testimonial-card__quote">
                Working with Jewel Exchange to design my fiancé&apos;s sapphire engagement ring was an unforgettable experience. From examining unheated Ceylon sapphires to the final setting, the craftsmanship was beyond anything we imagined.
              </blockquote>
              <div className="testimonial-card__footer">
                <h3 className="testimonial-card__name">Elena &amp; Marcus R.</h3>
                <span className="testimonial-card__meta">London · Custom Engagement Ring</span>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-2">
              <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="testimonial-card__quote">
                I brought in my grandmother&apos;s vintage emerald ring for remodeling. The team treated the piece with immense respect, preserving its sentimental heritage while giving it a timeless, modern setting. It is now my favorite treasure.
              </blockquote>
              <div className="testimonial-card__footer">
                <h3 className="testimonial-card__name">Samantha D.</h3>
                <span className="testimonial-card__meta">Colombo · Heirloom Remodel</span>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-3">
              <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="testimonial-card__quote">
                Living overseas, I was initially nervous about commissioning jewelry remotely. Jewel Exchange made the process completely effortless with 3D renders, video updates, and fully insured delivery right to my door in Dubai.
              </blockquote>
              <div className="testimonial-card__footer">
                <h3 className="testimonial-card__name">Tariq A.</h3>
                <span className="testimonial-card__meta">Dubai · Bespoke Commission</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="about-cta">
        <div className="about-cta__bg">
          <Image
            src="/images/models_and_shots/12.png"
            alt="Begin your journey"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="about-cta__overlay" />
        </div>
        <div className="container about-cta__content reveal">
          <span className="about-cta__label">Begin Your Journey</span>
          <h2 className="about-cta__title">Ready to Create Something Extraordinary?</h2>
          <p className="about-cta__subtitle">
            Whether you&apos;re searching for the perfect piece or dreaming of something entirely your own, we&apos;re here to bring your vision to life.
          </p>
          <div className="about-cta__actions">
            <Link href="/bespoke" className="btn btn--white">
              Start Your Bespoke Journey <span className="btn-arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Get in Touch <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
