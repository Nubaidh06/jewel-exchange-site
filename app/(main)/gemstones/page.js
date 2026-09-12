import GemstoneClient from "./GemstoneClient";
import { getGemstones } from "@/lib/sanity";

export const metadata = {
  title: 'Rare Gemstones',
  description: 'Certified unheated Ceylon sapphires, padparadscha, rubies, emeralds, and rare collector gems. Sourced direct from Sri Lanka. GIA-grade gemological reports available.',
  alternates: {
    canonical: '/gemstones',
  },
};

export const revalidate = 60;

export default async function GemstonesPage() {
  const items = await getGemstones();
  return <GemstoneClient initialItems={items} />;
}
