import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'

export async function getJewelry() {
  try {
    return await client.fetch(`*[_type == "product" && type == "Jewelry"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": img.asset->url + "?auto=format"
    }`)
  } catch (error) {
    console.error("Error fetching jewelry from Sanity:", error);
    return [];
  }
}

export async function getGemstones() {
  try {
    return await client.fetch(`*[_type == "product" && type == "Gemstones"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": img.asset->url + "?auto=format"
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
      "img": img.asset->url + "?auto=format"
    }`, { slug })
  } catch (error) {
    console.error("Error fetching product by slug from Sanity:", error);
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    return await client.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "img": img.asset->url + "?auto=format"
    }`)
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error);
    return [];
  }
}

export async function getRelatedProducts(type, category, currentSlug, limit = 8) {
  try {
    return await client.fetch(`*[_type == "product" && type == $type && slug.current != $currentSlug] | order((category == $category) desc, name asc)[0...$limit] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      "img": img.asset->url + "?auto=format"
    }`, { type, category, currentSlug, limit })
  } catch (error) {
    console.error("Error fetching related products from Sanity:", error);
    return [];
  }
}

