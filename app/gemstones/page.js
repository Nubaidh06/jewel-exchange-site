import GemstoneClient from "./GemstoneClient";
import { getGemstones } from "../../lib/sanity";

export const metadata = {
  title: 'Rare Gemstones | Jewel Exchange',
  description: 'Nature\'s most precious treasures, hand-selected for brilliance and clarity.',
};

export const revalidate = 60;

export default async function GemstonesPage() {
  const items = await getGemstones();
  return <GemstoneClient initialItems={items} />;
}
