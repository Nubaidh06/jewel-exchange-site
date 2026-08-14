import "../legal.css";

export const metadata = {
  title: "Refunds & Returns | Jewel Exchange",
  description: "Our policy regarding returns, refunds, and exchanges for jewelry and gemstones.",
};

export default function RefundsPage() {
  return (
    <main className="container pt-nav">
      <div className="page-header">
        <h1 className="page-header__title">Refunds & Returns</h1>
        <p className="page-header__subtitle">We want you to be absolutely delighted with your Jewel Exchange purchase.</p>
      </div>

      <div className="legal-content">
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <h2>1. Bespoke & Custom Jewelry</h2>
        <p>Because bespoke and custom-made items are crafted specifically to your unique specifications and ring size, <strong>they are strictly non-refundable and non-exchangeable</strong>. This includes engraved items and pieces where a loose gemstone was custom-set into a mounting at your request.</p>
        <p>Once you have approved the final CAD design and production has commenced, deposits and final payments cannot be refunded.</p>

        <h2>2. Ready-to-Wear Stock Items</h2>
        <p>For items purchased directly from our ready-to-wear collections (without any sizing alterations or customizations), we accept returns within <strong>14 days of delivery</strong>.</p>
        <p>To be eligible for a return, the item must be:</p>
        <ul>
          <li>Unworn, in its original, pristine condition without any scratches or signs of wear.</li>
          <li>Returned in its original packaging (boxes, pouches).</li>
          <li>Accompanied by all original Gemstone Certificates and paperwork. A replacement fee will be deducted if certificates are missing.</li>
        </ul>

        <h2>3. Loose Gemstones</h2>
        <p>Loose gemstones may be returned within 14 days of delivery, provided they have not been set, damaged, or altered in any way. The gemstone must be returned with its original laboratory certificate.</p>

        <h2>4. Return Shipping Process</h2>
        <p>To initiate a return, please email us at <strong>info@jewelexchange.lk</strong> with your order number. Customers are responsible for the cost of return shipping and insurance.</p>
        <p>Due to the high value of our products, we strongly recommend using a tracked, fully insured courier service (such as FedEx or DHL). Jewel Exchange is not liable for items lost, stolen, or damaged during transit back to us.</p>

        <h2>5. Refunds</h2>
        <p>Once your return is received and inspected by our gemologists to verify its condition and authenticity, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
      </div>
    </main>
  );
}
