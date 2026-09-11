import GemstoneClient from "./GemstoneClient";
import { getGemstones } from "@/lib/sanity";

export const metadata = {
  title: 'Rare Gemstones',
  description: 'Certified natural Ceylon sapphires, rubies, emeralds, and rare collector gems sourced directly from Sri Lanka.',
};

export const revalidate = 60;

export default async function GemstonesPage() {
  const items = await getGemstones();
  return <GemstoneClient initialItems={items} />;
}
