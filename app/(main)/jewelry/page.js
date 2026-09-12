import JewelryClient from "./JewelryClient";
import { getJewelry } from "@/lib/sanity";

export const metadata = {
  title: 'Fine Jewelry Sri Lanka — Rings, Necklaces & Bracelets',
  description: 'Shop handcrafted fine rings, necklaces, earrings, and bracelets at Jewel Exchange — Colombo\'s premier jewelry atelier since 2008. Bespoke commissions welcome.',
  alternates: {
    canonical: '/jewelry',
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function JewelryPage() {
  const items = await getJewelry();
  return <JewelryClient initialItems={items} />;
}
