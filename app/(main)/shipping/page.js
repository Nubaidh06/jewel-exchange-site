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
        <p>We ship our bespoke jewelry collections and certified Ceylon gemstones to esteemed clients worldwide. Every parcel is dispatched through premier high-security courier partners (<strong>FedEx Priority</strong> or <strong>DHL Express</strong>) and is <strong>fully insured</strong> for 100% of its valuation throughout transit until delivered to your hands.</p>

        <h2>2. Domestic Shipping & Boutique Collection</h2>
        <p>For clients within Sri Lanka, we provide complimentary secure door-to-door courier delivery. Alternatively, you are welcome to pick up your completed piece directly from our flagship Colombo atelier at <strong>514A, R.A. De Mel Mawatha, Colombo 00300</strong> by prior appointment with our concierge.</p>

        <h2>3. Official Export Certification & Compliance</h2>
        <p>Jewel Exchange operates under the regulatory standards of the Sri Lankan gemstone trade. All international gemstone and fine jewelry shipments undergo official inspection, sealing, and export clearance through the <strong>National Gem & Jewellery Authority (NGJA)</strong> and Sri Lanka Customs, guaranteeing legitimate origin and ethical certification.</p>

        <h2>4. Delivery & Production Timelines</h2>
        <ul>
          <li><strong>In-Stock Fine Jewelry & Loose Gemstones:</strong> Dispatched within 2-4 business days following payment confirmation and export clearance. International transit typically takes 3-7 business days.</li>
          <li><strong>Bespoke & Custom Commissions:</strong> Handcrafted to order with individualized gemstone setting and hallmarking. Please allow 3-6 weeks for artisanal creation prior to dispatch.</li>
        </ul>

        <h2>5. Adult Signature & Security Requirements</h2>
        <p>Due to the high valuation of fine jewelry, <strong>an adult signature is mandatory upon delivery</strong>. Couriers will not leave packages unattended at doorsteps. For insurance and security reasons, we do not ship to P.O. Boxes, APO/FPO addresses, or unverified freight forwarders.</p>

        <h2>6. Customs, Duties, and Import Taxes</h2>
        <p>All international orders are exported directly from Colombo, Sri Lanka. <strong>International clients are responsible for any applicable local customs duties, tariffs, VAT, or import taxes</strong> imposed by the destination country.</p>
        <p>These local fees are levied directly by your government and are not included in our item or shipping quotes. Customs procedures vary by region; please consult your local customs authority for specific import thresholds. Refusal to settle local import taxes does not constitute an eligible return.</p>

        <h2>7. Order Tracking & Delivery Support</h2>
        <p>Upon dispatch and export clearance, you will receive a confirmation email with your dedicated tracking number to monitor your shipment in real time.</p>

        <h2>8. Transit Claims & Damaged Shipments</h2>
        <p>In the unlikely event that a parcel arrives with signs of tampering or damage, please document the outer box with photographs immediately and contact our concierge team at <strong>info@jewelexchange.lk</strong> within 24 hours of receipt so our insurance claims department can assist you without delay.</p>
      </div>
    </main>
  );
}
