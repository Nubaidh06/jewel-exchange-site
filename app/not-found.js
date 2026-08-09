import Link from "next/link";
import Image from "next/image";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__bg">
        <Image
          src="/images/banners/banner 1.png"
          alt="Jewel Exchange"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className="not-found__overlay" />
      </div>
      
      <div className="container not-found__content">
        <div className="not-found__card glass reveal">
          <span className="section-label">Error 404</span>
          <h1 className="not-found__title">Page Not Found</h1>
          <div className="ornament">
            <div className="ornament__diamond"></div>
          </div>
          <p className="not-found__desc">
            The page you are looking for may have been moved, deleted, or does not exist. 
            Return to our collections to discover timeless masterworks.
          </p>
          <div className="not-found__actions">
            <Link href="/" className="btn">
              Return Home <span className="btn-arrow">→</span>
            </Link>
            <Link href="/jewelry" className="btn btn--outline">
              View Collections <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
