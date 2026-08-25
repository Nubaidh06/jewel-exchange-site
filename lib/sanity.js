import { client } from '../sanity/lib/client.js'
import { urlForImage } from '../sanity/lib/image.js'

export function formatSanityImage(source, width = 800) {
  if (!source) return null;
  if (typeof source === 'string') {
    if (source.startsWith('http') && source.includes('cdn.sanity.io')) {
      return source.includes('?') ? source : `${source}?auto=format&w=${width}`;
    }
    return source;
  }
  if (source.asset || source._ref) {
    try {
      return urlForImage(source).width(width).url();
    } catch {
      return null;
    }
  }
  return null;
}

export async function getJewelry() {
  try {
    const rawItems = await client.fetch(`*[_type == "product" && (type == "Jewelry" || catalog_type == "Jewelry" || category in ["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants", "Necklaces & Pendants"])] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "imgObj": coalesce(img, image),
      "rawImgUrl": coalesce(img.asset->url, image.asset->url)
    }`);

    return (rawItems || []).map((item) => ({
      ...item,
      img: formatSanityImage(item.imgObj, 800) || (item.rawImgUrl ? `${item.rawImgUrl}?auto=format&w=800` : null),
    }));
  } catch (error) {
    console.error("Error fetching jewelry from Sanity:", error);
    return [];
  }
}

export async function getGemstones() {
  try {
    const rawItems = await client.fetch(`*[_type == "product" && (type == "Gemstones" || type == "Gemstone" || catalog_type == "Gemstones" || catalog_type == "Gemstone" || category in ["Sapphires", "Padparadscha", "Rubies", "Emeralds", "Diamonds", "Rare Gems", "Semi-Precious"])] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "imgObj": coalesce(img, image),
      "rawImgUrl": coalesce(img.asset->url, image.asset->url)
    }`);

    return (rawItems || []).map((item) => ({
      ...item,
      img: formatSanityImage(item.imgObj, 800) || (item.rawImgUrl ? `${item.rawImgUrl}?auto=format&w=800` : null),
    }));
  } catch (error) {
    console.error("Error fetching gemstones from Sanity:", error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    if (!slug) return null;
    const rawSlug = String(slug);
    const decodedSlug = decodeURIComponent(rawSlug);
    const kebabSlug = decodedSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const spaceSlug = decodedSlug.toLowerCase().replace(/[-_]+/g, ' ');

    const raw = await client.fetch(`*[_type == "product" && (
      slug.current == $rawSlug ||
      slug.current == $decodedSlug ||
      lower(slug.current) == lower($rawSlug) ||
      lower(slug.current) == lower($decodedSlug) ||
      lower(slug.current) == $kebabSlug ||
      lower(slug.current) == $spaceSlug ||
      _id in [$rawSlug, $decodedSlug]
    )][0] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "mainImageObj": coalesce(img, image),
      "mainImageUrl": coalesce(img.asset->url, image.asset->url),
      "galleryObjs": coalesce(gallery, []),
      "galleryUrls": coalesce(gallery[defined(asset)].asset->url, gallery[].asset->url, [])
    }`, { rawSlug, decodedSlug, kebabSlug, spaceSlug });

    if (!raw) return null;

    const mainImg = formatSanityImage(raw.mainImageObj, 1200) || (raw.mainImageUrl ? `${raw.mainImageUrl}?auto=format&w=1200` : null);

    const gallery = Array.isArray(raw.galleryObjs) && raw.galleryObjs.length > 0
      ? raw.galleryObjs.map((g, idx) => formatSanityImage(g, 1200) || (raw.galleryUrls?.[idx] ? `${raw.galleryUrls[idx]}?auto=format&w=1200` : null)).filter(Boolean)
      : Array.isArray(raw.galleryUrls)
      ? raw.galleryUrls.map((u) => `${u}?auto=format&w=1200`)
      : [];

    const images = mainImg ? [mainImg, ...gallery] : [...gallery];

    return {
      ...raw,
      img: mainImg,
      gallery,
      images,
    };
  } catch (error) {
    console.error("Error fetching product by slug from Sanity:", error);
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    const rawItems = await client.fetch(`*[_type == "product" && featured == true] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "imgObj": coalesce(img, image),
      "rawImgUrl": coalesce(img.asset->url, image.asset->url)
    }`);

    return (rawItems || []).map((item) => ({
      ...item,
      img: formatSanityImage(item.imgObj, 800) || (item.rawImgUrl ? `${item.rawImgUrl}?auto=format&w=800` : null),
    }));
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error);
    return [];
  }
}

export async function getRelatedProducts(type, category, currentSlug, limit = 8) {
  try {
    const rawItems = await client.fetch(`*[_type == "product" && (type == $type || catalog_type == $type) && slug.current != $currentSlug] | order((category == $category) desc, name asc)[0...$limit] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "imgObj": coalesce(img, image),
      "rawImgUrl": coalesce(img.asset->url, image.asset->url)
    }`);

    return (rawItems || []).map((item) => ({
      ...item,
      img: formatSanityImage(item.imgObj, 800) || (item.rawImgUrl ? `${item.rawImgUrl}?auto=format&w=800` : null),
    }));
  } catch (error) {
    console.error("Error fetching related products from Sanity:", error);
    return [];
  }
}

