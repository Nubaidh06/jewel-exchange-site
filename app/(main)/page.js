import { getFeaturedProducts } from "../../lib/sanity";
import HomeClient from "./HomeClient";

export const metadata = {
  title: 'Jewel Exchange | Bespoke Jewelry & Rare Gemstones',
  description: 'Bespoke jewelry and premium gemstones, handcrafted in Sri Lanka. Where Elegance Meets Eternity.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  return <HomeClient featuredProducts={featured} />;
}
