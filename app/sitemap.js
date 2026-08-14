import { getJewelry, getGemstones } from "../lib/sanity";

export const revalidate = 86400; // Revalidate sitemap every 24 hours

export default async function sitemap() {
  const baseUrl = "https://jewelexchange.lk";

  // Get dynamic product routes
  const jewelry = await getJewelry();
  const gemstones = await getGemstones();

  const jewelryUrls = jewelry.map((product) => ({
    url: `${baseUrl}/jewelry/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const gemstoneUrls = gemstones.map((product) => ({
    url: `${baseUrl}/gemstones/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/bespoke',
    '/booking',
    '/contact',
    '/gemstones',
    '/jewelry',
    '/shipping',
    '/refunds',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...jewelryUrls, ...gemstoneUrls];
}
