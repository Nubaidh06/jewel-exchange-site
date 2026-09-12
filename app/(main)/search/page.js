import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search Creations & Gemstones",
  description: "Search our fine jewelry and gemstone catalog at Jewel Exchange.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
