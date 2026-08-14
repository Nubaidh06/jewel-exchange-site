import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";
import "./thank-you.css";

export const metadata = {
  title: "Thank You | Jewel Exchange",
  description: "Thank you for reaching out to Jewel Exchange. Our atelier team will be in touch shortly.",
  robots: {
    index: false, // Don't index thank-you pages in search engines
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="thank-you-loading"><div className="ornament__diamond"></div></div>}>
      <ThankYouClient />
    </Suspense>
  );
}
