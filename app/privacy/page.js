import "../legal.css";

export const metadata = {
  title: "Privacy Policy | Jewel Exchange",
  description: "How Jewel Exchange collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="container pt-nav">
      <div className="page-header">
        <h1 className="page-header__title">Privacy Policy</h1>
        <p className="page-header__subtitle">Your privacy is critically important to us.</p>
      </div>

      <div className="legal-content">
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <p>At Jewel Exchange, we respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this Privacy Policy to explain what information may be collected, how we use this information, and under what circumstances we may disclose the information to third parties.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you:</p>
        <ul>
          <li>Create an account or purchase an item.</li>
          <li>Subscribe to our newsletter.</li>
          <li>Submit a bespoke jewelry inquiry or contact form.</li>
          <li>Communicate with us via email or social media.</li>
        </ul>
        <p>The types of information we may collect include your name, email address, postal address, phone number, payment information (processed securely via our payment partners), and any other information you choose to provide.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We may use the information we collect to:</p>
        <ul>
          <li>Process transactions and send you related information, including confirmations and invoices.</li>
          <li>Respond to your comments, questions, and requests, and provide customer service.</li>
          <li>Communicate with you about products, services, offers, and events offered by Jewel Exchange (you can opt-out at any time).</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Website.</li>
        </ul>

        <h2>3. Third-Party Services</h2>
        <p>We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. These include:</p>
        <ul>
          <li>Payment processors (e.g., Stripe, Shopify) to facilitate transactions securely.</li>
          <li>Email marketing platforms (if you have opted-in to our newsletter).</li>
          <li>Shipping and logistics partners (e.g., FedEx, DHL) to deliver your purchases.</li>
          <li>Analytics tools (e.g., Google Analytics) to help us improve our website experience.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All payment transactions are encrypted and processed by PCI-compliant third-party providers.</p>

        <h2>5. Your Rights</h2>
        <p>Depending on your location (such as the EU/UK under GDPR, or California under CCPA), you may have certain rights regarding your personal information, including the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us.</p>

        <h2>6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: <strong>info@jewelexchange.lk</strong>.</p>
      </div>
    </main>
  );
}
