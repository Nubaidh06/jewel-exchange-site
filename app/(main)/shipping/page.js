import "@/app/legal.css";

export const metadata = {
  title: "Shipping & Delivery | Jewel Exchange",
  description: "Information on domestic and international shipping, delivery times, and import duties.",
};

export default function ShippingPage() {
  return (
    <main className="container pt-nav">
      <div className="page-header">
        <h1 className="page-header__title">Shipping & Delivery</h1>
        <p className="page-header__subtitle">Secure, fully-insured delivery worldwide from Sri Lanka.</p>
      </div>

      <div className="legal-content">
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <h2>1. Global Insured Shipping</h2>
        <p>We ship our high-value bespoke jewelry and loose gemstones worldwide. Because of the nature of our products, every package is shipped via a premium courier service (such as FedEx Priority or DHL Express) and is <strong>fully insured</strong> for the total value of the item while in transit.</p>

        <h2>2. Delivery Times</h2>
        <ul>
          <li><strong>Ready-to-Wear & Loose Stones:</strong> Dispatched within 2-4 business days. Delivery typically takes 3-7 business days depending on the destination country.</li>
          <li><strong>Bespoke & Custom Orders:</strong> Because these are crafted from scratch, please allow 3-6 weeks for production before the item is dispatched. Your design consultant will provide you with a specific timeline.</li>
        </ul>

        <h2>3. Signature Requirement</h2>
        <p>For your security and the requirements of our insurance, <strong>an adult signature is required upon delivery</strong> for all orders. We cannot ship to P.O. Boxes or freight forwarding addresses.</p>

        <h2>4. Customs, Duties, and Import Taxes</h2>
        <p>Jewel Exchange operates out of Sri Lanka. <strong>International customers are solely responsible for any local customs duties, import taxes, or VAT</strong> levied by their destination country.</p>
        <p>These charges are not included in the item price or shipping cost at checkout. Customs policies vary widely from country to country; please contact your local customs office for further information. Refusal to pay customs duties does not constitute a valid reason for a return, and any costs incurred to return the item will be deducted from your refund.</p>

        <h2>5. Tracking Your Order</h2>
        <p>Once your order is dispatched, you will receive an email containing your tracking number and a link to trace your package&apos;s progress.</p>

        <h2>6. Lost or Damaged Packages</h2>
        <p>In the rare event that a package appears lost or arrives damaged, please contact us immediately at <strong>info@jewelexchange.lk</strong>. Do not discard the packaging if the box appears damaged upon arrival, as it may be required for the insurance claim process.</p>
      </div>
    </main>
  );
}
