import Image from 'next/image';
import Link from 'next/link';
import './about.css';

export const metadata = {
  title: 'Our Heritage & Craft — Jewel Exchange, Colombo Sri Lanka',
  description: 'Since 1969, three generations of the Ahamed family have been crafting fine jewelry and curating rare Ceylon gemstones. Discover the Jewel Exchange story.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ── Cinematic Hero ── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <Image
            src="/images/models_and_shots/03.webp"
            alt="Jewel Exchange heritage"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div className="about-hero__overlay" />
        </div>
        <div className="container about-hero__content">
          <span className="about-hero__label reveal">Est. 1969</span>
          <h1 className="about-hero__title reveal reveal-delay-1">
            Three Generations<br />of Fine Craft
          </h1>
          <p className="about-hero__subtitle reveal reveal-delay-2">
            What began as a singular passion in 1969 has grown across three generations into one of Sri Lanka&apos;s most trusted names in fine jewelry and natural gemstones.
          </p>
        </div>
      </section>

      {/* ── Heritage / Our Story ── */}
      <section className="about-heritage">
        <div className="container">
          <div className="heritage-layout">
            <div className="heritage-text reveal">
              <span className="section-label">Our Story</span>
              <h2 className="heritage-text__title">Where It All Began</h2>

              <blockquote className="heritage-quote">
                <span className="heritage-quote__mark">&ldquo;</span>
                We believe true luxury lies in the details: the purity of gold, the brilliance of fine diamonds, and the natural beauty of rare gemstones.
              </blockquote>

              <p>
                Our journey began in 1969 with our founder, Hussain Ahamed Udayar, and a singular conviction — to craft fine jewelry of exceptional beauty paired with uncompromising service. What started as a small atelier grew into an international operation, with a workshop employing over 40 skilled craftsmen and becoming a preferred manufacturing partner for renowned jewelry retailers across California, backed by the National Gem and Jewellery Authority.
              </p>
              <p>
                As global appreciation for Ceylon&apos;s exceptional gemstone heritage expanded, the company represented Sri Lankan craftsmanship on the world stage — exhibiting at the 1990 Gem and Jewelry Trade Show in Munich, Germany, and participating in the inaugural FACETS Sri Lanka exhibition, the country&apos;s first international gem showcase.
              </p>
              <p>
                In 1992, his son Nusrath Ahamed joined the business, steering operations and carrying its foundational values into a new era. In 2008, this legacy took its next definitive step with the establishment of the Jewel Exchange flagship showroom on Duplication Road, Colombo-03.
              </p>
            </div>

            <div className="heritage-image reveal reveal-delay-2">
              <div className="heritage-image__wrapper">
                <Image
                  src="/images/models_and_shots/gem-sift.webp"
                  alt="Hand-selecting natural gemstones at Jewel Exchange"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
              <div className="heritage-image__wrapper">
                <Image
                  src="/images/models_and_shots/gem-setting.webp"
                  alt="Master craftsman setting a gemstone"
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

      {/* ── Milestones Timeline ── */}
      <section className="about-milestones">
        <div className="container">
          <div className="milestones-header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>Milestones</span>
            <h2 className="section-title">A Legacy in the Making</h2>
            <div className="ornament">
              <span className="ornament__diamond" />
            </div>
          </div>

          <div className="milestones-track reveal reveal-delay-1">
            <div className="milestones-line" />

            <div className="milestone">
              <span className="milestone__year">1969</span>
              <div className="milestone__dot" />
              <div className="milestone__content">
                <h3 className="milestone__title">The Beginning</h3>
                <p className="milestone__text">
                  Hussain Ahamed Udayar founds the family business with a vision of fine jewelry and exceptional service, growing a workshop of over 40 master craftsmen.
                </p>
              </div>
            </div>

            <div className="milestone">
              <span className="milestone__year">1990</span>
              <div className="milestone__dot" />
              <div className="milestone__content">
                <h3 className="milestone__title">The World Stage</h3>
                <p className="milestone__text">
                  Exhibits at the Gem and Jewelry Trade Show in Munich, Germany, and participates in Sri Lanka&apos;s inaugural FACETS exhibition.
                </p>
              </div>
            </div>

            <div className="milestone">
              <span className="milestone__year">1992</span>
              <div className="milestone__dot" />
              <div className="milestone__content">
                <h3 className="milestone__title">Second Generation</h3>
                <p className="milestone__text">
                  Nusrath Ahamed joins the family business, steering operations and carrying the founding values forward into a new era.
                </p>
              </div>
            </div>

            <div className="milestone">
              <span className="milestone__year">2008</span>
              <div className="milestone__dot" />
              <div className="milestone__content">
                <h3 className="milestone__title">Jewel Exchange, Colombo</h3>
                <p className="milestone__text">
                  The flagship Jewel Exchange showroom opens on Duplication Road, Colombo-03 — a dedicated atelier for Ceylon sapphires and bespoke fine jewelry.
                </p>
              </div>
            </div>

            <div className="milestone">
              <span className="milestone__year">Today</span>
              <div className="milestone__dot" />
              <div className="milestone__content">
                <h3 className="milestone__title">Three Generations Strong</h3>
                <p className="milestone__text">
                  Now welcoming its third generation, Jewel Exchange remains a family maison — where eras change, but devotion to the craft remains timeless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promise & Trust ── */}
      <section className="about-promise">
        <div className="container">
          <div className="promise-layout">
            <div className="promise-image reveal">
              <div className="promise-image__wrapper">
                <Image
                  src="/images/models_and_shots/11.png"
                  alt="Jewel Exchange fine craftsmanship"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="promise-text reveal reveal-delay-1">
              <span className="section-label">Our Promise</span>
              <h2 className="heritage-text__title">Honesty Runs Deep</h2>
              <p>
                Today, Jewel Exchange specializes in rare natural Ceylon sapphires, fine diamonds, and bespoke colored gemstone jewelry. Every commission is approached with reverence for the individual — marrying traditional bench goldsmithing with modern design sensibility, creating pieces meant to be treasured for generations.
              </p>
              <p>
                Honesty and trust have been our compass for over half a century. Every creation features hallmarked precious metals and independently certified, ethically sourced gemstones, giving our clients absolute peace of mind.
              </p>
              <p>
                We stand behind every single piece we create. As testimony to our confidence in our craft, every Jewel Exchange purchase is backed by our lifetime guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Numbers ── */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-item">
              <span className="stat-item__number">55+</span>
              <span className="stat-item__label">Years of Heritage</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">3</span>
              <span className="stat-item__label">Generations of Craft</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">40+</span>
              <span className="stat-item__label">Master Artisans</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">100%</span>
              <span className="stat-item__label">Certified &amp; Ethical</span>
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
              <span className="value-card__number">01</span>
              <h3 className="value-card__title">Exceptional Quality</h3>
              <p className="value-card__desc">
                Every gemstone is hand-selected and every setting meticulously inspected. We uphold the highest standards of craftsmanship, ensuring each piece is worthy of becoming a family heirloom.
              </p>
            </div>

            <div className="value-card reveal reveal-delay-1">
              <span className="value-card__number">02</span>
              <h3 className="value-card__title">Curated &amp; Custom</h3>
              <p className="value-card__desc">
                Whether discovering a finished signature set in our showroom or commissioning a one-of-a-kind bespoke piece, our artisans work closely with you to deliver an unforgettable experience.
              </p>
            </div>

            <div className="value-card reveal reveal-delay-2">
              <span className="value-card__number">03</span>
              <h3 className="value-card__title">Ethical Practice</h3>
              <p className="value-card__desc">
                We source conflict-free diamonds and ethically mined gemstones, partnering with responsible suppliers who share our commitment to sustainability and fair trade.
              </p>
            </div>
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
          <span className="about-cta__label">Atelier &amp; Showroom</span>
          <h2 className="about-cta__title">Ready to Create Something Extraordinary?</h2>
          <p className="about-cta__subtitle">
            Whether exploring our showroom collections or dreaming of a custom commission, we are here to guide you.
          </p>
          <div className="about-cta__actions">
            <Link href="/bespoke" className="btn btn--white">
              Explore Bespoke <span className="btn-arrow">→</span>
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
