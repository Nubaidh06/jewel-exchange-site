import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'

export async function getJewelry() {
  try {
    return await client.fetch(`*[_type == "product" && type == "Jewelry"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": img.asset->url
    }`)
  } catch (error) {
    console.error("Error fetching jewelry from Sanity:", error);
    return [];
  }
}

export async function getGemstones() {
  try {
    return await client.fetch(`*[_type == "product" && type == "Gemstones"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": img.asset->url
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
      "img": img.asset->url
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
      "img": img.asset->url
    }`)
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error);
    return [];
  }
}
