import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search Creations & Gemstones | Jewel Exchange",
  description: "Search our fine jewelry catalog and certified Ceylon gemstone collections in real-time.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
