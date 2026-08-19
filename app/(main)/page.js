import { getFeaturedProducts } from "../../lib/sanity";
import HomeClient from "./HomeClient";

export const metadata = {
  title: 'Jewel Exchange | Fine Jewelry, Rare Gemstones & Bespoke Creations',
  description: 'Curated fine jewelry, rare gemstones, and bespoke creations, handcrafted in Sri Lanka. Where Elegance Meets Eternity.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  return <HomeClient featuredProducts={featured} />;
}
