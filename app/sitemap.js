import { getJewelry, getGemstones } from "../lib/sanity";

export const revalidate = 86400; // Revalidate sitemap every 24 hours

export default async function sitemap() {
  const baseUrl = "https://www.jewelexchange.lk";

  // Get dynamic product routes
  const jewelry = await getJewelry();
  const gemstones = await getGemstones();

  const jewelryUrls = (jewelry || [])
    .filter((product) => product?.slug && typeof product.slug === 'string' && product.slug.trim().length > 0)
    .map((product) => ({
      url: `${baseUrl}/jewelry/${encodeURIComponent(product.slug.trim())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const gemstoneUrls = (gemstones || [])
    .filter((product) => product?.slug && typeof product.slug === 'string' && product.slug.trim().length > 0)
    .map((product) => ({
      url: `${baseUrl}/gemstones/${encodeURIComponent(product.slug.trim())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const staticRoutes = [
    '',
    '/about',
    '/bespoke',
    '/booking',
    '/contact',
    '/gemstones',
    '/jewelry',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...jewelryUrls, ...gemstoneUrls];
}
