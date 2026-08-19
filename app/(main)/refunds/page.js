import "@/app/legal.css";

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
        <p>For items purchased directly from our ready-to-wear collections (without any customized sizing alterations, engraving, or bespoke mountings), we accept return requests within <strong>14 days of delivery</strong>.</p>
        <p>To be eligible for a return, the item must be:</p>
        <ul>
          <li>Unworn, in its original pristine condition without scratches, dents, or signs of wear.</li>
          <li>Returned in its complete original packaging (luxury boxes, protective pouches, and documentation).</li>
          <li>Accompanied by all original Gemstone Identification Reports and laboratory certificates.</li>
        </ul>

        <h2>3. Laboratory Certificates & Replacement Fees</h2>
        <p>Laboratory certificates (e.g., GIA, GIC, NGJA) are unique legal documents tied to your specific gemstone. If an item is returned without its original laboratory certificate, a mandatory replacement re-certification fee of <strong>$200 USD</strong> (or equivalent currency) will be deducted from your final refund amount to cover official laboratory re-issuance.</p>

        <h2>4. Ring Resizing & Alterations</h2>
        <p>We want your ring to fit comfortably. For standard ready-to-wear fine rings, we offer one complimentary resizing (within ±1 to 1.5 sizes, subject to the ring&apos;s design and setting limitations) within 30 days of purchase. Full eternity bands and intricate pave mountings cannot be resized and must be custom ordered to exact specifications.</p>

        <h2>5. Hygiene & Non-Returnable Items</h2>
        <p>For hygiene and safety standards, pierced earrings and ear jewelry cannot be returned or exchanged once the safety seal or packaging has been opened, unless found defective upon arrival.</p>

        <h2>6. Loose Gemstones</h2>
        <p>Certified loose Ceylon gemstones may be returned within 14 days of delivery, provided they have not been set, cut, polished, damaged, or altered in any manner. The gemstone must be returned with its intact laboratory certificate and sealed casing (if applicable).</p>

        <h2>7. Return Shipping Process</h2>
        <p>To initiate a return, please email us at <strong>info@jewelexchange.lk</strong> with your order details and invoice. Customers are responsible for the cost of return shipping and full transit insurance.</p>
        <p>Due to the high value of our products, returns must be dispatched via a tracked, fully insured courier service (such as FedEx Priority or DHL Express). Jewel Exchange is not liable for packages lost, stolen, or damaged during return transit.</p>

        <h2>8. Refunds</h2>
        <p>Once your return is received and inspected by our certified gemologists to verify its condition, weight, and authenticity, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 7-10 business days (minus any applicable certificate replacement or shipping fees).</p>
      </div>
    </main>
  );
}
