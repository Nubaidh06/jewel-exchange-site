"use client";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../../lib/WishlistContext";
import "./page.css";

const WHATSAPP_NUMBER = "+94773534538"; // Updated with actual number

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleWhatsAppInquiry = () => {
    const itemNames = wishlist.map((item, index) => `${index + 1}. ${item.name} (${item.category})`).join("\n");
    const whatsappMessage = `Hello, I am interested in inquiring about the following pieces:\n\n${itemNames}\n\nCan you provide more details on pricing and availability?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  return (
    <div className="wishlist-page">
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title reveal">Inquiry Cart</h1>
          <div className="ornament reveal reveal-delay-1">
            <span className="ornament__diamond"></span>
          </div>
          <p className="page-header__subtitle reveal reveal-delay-2">
            Curate your personal collection. Send an inquiry for your favorite pieces to receive personalized pricing and details.
          </p>
        </div>
      </header>

      <section className="section bg-surface wishlist-section">
        <div className="container">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty reveal reveal-delay-3">
              <div className="wishlist-empty__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h2 className="wishlist-empty__title">Your inquiry cart is empty</h2>
              <p className="wishlist-empty__desc">Explore our collections and add pieces to your cart to request a consultation.</p>
              <div className="wishlist-empty__actions">
                <Link href="/jewelry" className="btn btn--outline">Shop Jewelry</Link>
                <Link href="/gemstones" className="btn btn--outline">Shop Gemstones</Link>
              </div>
            </div>
          ) : (
            <div className="cart-layout reveal reveal-delay-3">
              <div className="cart-items-list">
                <div className="cart-items-header">
                  <span>Product</span>
                  <span>Price</span>
                </div>
                {wishlist.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="cart-item-row">
                    <div className="cart-item-product">
                      <div className="cart-item-img">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <span className="cart-item-category">{item.category}</span>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <Link href={`/${item.type.toLowerCase()}/${item.slug}`} className="link">
                          View Details <span className="link__arrow">→</span>
                        </Link>
                      </div>
                    </div>
                    <div className="cart-item-price-actions">
                      <span className="cart-item-price">{item.price}</span>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeFromWishlist(item.slug)}
                        aria-label="Remove from Cart"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-sidebar">
                <div className="cart-summary bg-alt">
                  <h3 className="cart-summary__title">Inquiry Summary</h3>
                  <div className="cart-summary__row">
                    <span>Items in Cart</span>
                    <span>{wishlist.length}</span>
                  </div>
                  <div className="cart-summary__row cart-summary__total">
                    <span>Estimated Total</span>
                    <span>Price Upon Request</span>
                  </div>
                  <p className="cart-summary__desc">
                    Send a direct message via WhatsApp to our concierge team with your selected items. We'll get back to you with detailed pricing and availability.
                  </p>
                  <button 
                    onClick={handleWhatsAppInquiry}
                    className="btn btn--full"
                    style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff', marginBottom: '1rem' }}
                  >
                    Inquire via WhatsApp
                  </button>
                  <Link 
                    href="/booking" 
                    className="btn btn--outline btn--full"
                  >
                    Book an Appointment Instead
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
