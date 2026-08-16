import "@/app/legal.css";

export const metadata = {
  title: "Terms & Conditions | Jewel Exchange",
  description: "Terms and conditions for using the Jewel Exchange website and purchasing our bespoke jewelry and gemstones.",
};

export default function TermsPage() {
  return (
    <main className="container pt-nav">
      <div className="page-header">
        <h1 className="page-header__title">Terms & Conditions</h1>
        <p className="page-header__subtitle">Please read these terms carefully before using our website or making a purchase.</p>
      </div>

      <div className="legal-content">
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <p>Welcome to Jewel Exchange. By accessing or using our website, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.</p>

        <h2>1. Natural Variations in Gemstones</h2>
        <p>Precious gemstones are natural products. As such, variations in color, clarity, tone, and inclusions are natural and to be expected. While we make every effort to display the colors and details of our gemstones and jewelry accurately, the actual colors you see will depend on your monitor and lighting conditions. Jewel Exchange cannot guarantee that your monitor&apos;s display of any color will be completely accurate.</p>

        <h2>2. Pricing, Fluctuations & Quote Validity</h2>
        <p>We strive to provide accurate product and pricing information; however, pricing or typographical errors may occur. In the event that an item is listed at an incorrect price or with incorrect information due to an error, Jewel Exchange shall have the right, at our sole discretion, to refuse or cancel any orders placed for that item.</p>
        <p>Precious metal and gemstone markets fluctuate daily. Due to recent high market volatility, all personalized price quotes involving gold and precious metals provided via our inquiry channels, email, or WhatsApp are strictly valid for <strong>24 hours</strong> from the time of issue. Re-confirmation of pricing is required before placing a deposit or finalizing an order once this period has elapsed.</p>

        <h2>3. Bespoke & Custom Orders</h2>
        <p>Custom-made, bespoke, and personalized jewelry pieces require a non-refundable deposit to commence production. Once production has begun or gemstones have been set, the order cannot be canceled, refunded, or significantly altered without incurring additional costs.</p>

        <h2>4. Intellectual Property</h2>
        <p>All content included on this site, such as jewelry designs, text, graphics, logos, images, audio clips, and digital downloads, is the property of Jewel Exchange or its content suppliers and protected by international copyright laws. Our bespoke designs remain the intellectual property of Jewel Exchange unless explicitly transferred in writing.</p>

        <h2>5. Governing Law</h2>
        <p>These Terms & Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law principles.</p>

        <h2>6. Contact Information</h2>
        <p>Questions about the Terms & Conditions should be sent to us at <strong>info@jewelexchange.lk</strong>.</p>
      </div>
    </main>
  );
}
