import { client } from '../sanity/lib/client.js'
import { urlForImage } from '../sanity/lib/image.js'

export async function getJewelry() {
  try {
    return await client.fetch(`*[_type == "product" && (type == "Jewelry" || catalog_type == "Jewelry" || category in ["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants", "Necklaces & Pendants"])] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=800"
    }`)
  } catch (error) {
    console.error("Error fetching jewelry from Sanity:", error);
    return [];
  }
}

export async function getGemstones() {
  try {
    return await client.fetch(`*[_type == "product" && (type == "Gemstones" || type == "Gemstone" || catalog_type == "Gemstones" || catalog_type == "Gemstone" || category in ["Sapphires", "Padparadscha", "Rubies", "Emeralds", "Diamonds", "Rare Gems", "Semi-Precious"])] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=800"
    }`)
  } catch (error) {
    console.error("Error fetching gemstones from Sanity:", error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    return await client.fetch(`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=1200",
      "gallery": gallery[].asset->url + "?auto=format&w=1200",
      "images": [coalesce(img.asset->url, image.asset->url) + "?auto=format&w=1200", ...coalesce(gallery[].asset->url + "?auto=format&w=1200", [])]
    }`, { slug })
  } catch (error) {
    console.error("Error fetching product by slug from Sanity:", error);
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    return await client.fetch(`*[_type == "product" && featured == true] | order(_updatedAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=800"
    }`)
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error);
    return [];
  }
}

export async function getRelatedProducts(type, category, currentSlug, limit = 8) {
  try {
    return await client.fetch(`*[_type == "product" && (type == $type || catalog_type == $type) && slug.current != $currentSlug] | order((category == $category) desc, name asc)[0...$limit] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=800"
    }`, { type, category, currentSlug, limit })
  } catch (error) {
    console.error("Error fetching related products from Sanity:", error);
    return [];
  }
}

