import JewelryClient from "./JewelryClient";
import { getJewelry } from "../../lib/sanity";

export const metadata = {
  title: 'High Jewelry | Jewel Exchange',
  description: 'Explore our collection of high jewelry, featuring masterworks designed to be treasured across generations.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function JewelryPage() {
  const items = await getJewelry();
  return <JewelryClient initialItems={items} />;
}
