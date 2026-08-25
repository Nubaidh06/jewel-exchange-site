import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { JEWELRY_ITEMS, GEMSTONE_ITEMS } from '@/lib/data';

// Combine static items with catalog type identification
const STATIC_PRODUCTS = [
  ...JEWELRY_ITEMS.map(item => ({
    ...item,
    type: 'Jewelry',
    catalog_type: 'Jewelry',
    url: `/jewelry/${item.slug}`,
  })),
  ...GEMSTONE_ITEMS.map(item => ({
    ...item,
    type: 'Gemstones',
    catalog_type: 'Gemstones',
    url: `/gemstones/${item.slug}`,
  })),
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();
  const category = (searchParams.get('category') || '').trim();
  const type = (searchParams.get('type') || '').trim();
  const limitParam = parseInt(searchParams.get('limit') || '20', 10);
  const limit = isNaN(limitParam) ? 20 : Math.min(Math.max(limitParam, 1), 60);

  try {
    // Attempt Sanity search
    let sanityQuery = `*[_type == "product"`;
    const params = {};

    const filters = [];

    if (q) {
      params.qPattern = `*${q}*`;
      filters.push(`(
        name match $qPattern || 
        category match $qPattern || 
        type match $qPattern || 
        catalog_type match $qPattern || 
        description match $qPattern || 
        specifications match $qPattern
      )`);
    }

    if (category && category !== 'All') {
      if (category === 'Jewelry' || category === 'Gemstones') {
        params.typeFilter = category;
        filters.push(`(type == $typeFilter || catalog_type == $typeFilter)`);
      } else {
        params.categoryFilter = category;
        filters.push(`category == $categoryFilter`);
      }
    }

    if (type && type !== 'All') {
      params.typeFilter = type;
      filters.push(`(type == $typeFilter || catalog_type == $typeFilter)`);
    }

    if (filters.length > 0) {
      sanityQuery += ` && ${filters.join(' && ')}`;
    }

    sanityQuery += `] | order(_updatedAt desc)[0...$limit] {
      _id,
      name,
      "slug": slug.current,
      type,
      category,
      price,
      description,
      specifications,
      "img": coalesce(img.asset->url, image.asset->url) + "?auto=format&w=600"
    }`;

    params.limit = limit;

    let items = [];
    try {
      const sanityResults = await client.fetch(sanityQuery, params);
      if (Array.isArray(sanityResults) && sanityResults.length > 0) {
        items = sanityResults.map(item => {
          const itemType = (item.type === 'Gemstones' || item.type === 'Gemstone' || ['Sapphires', 'Padparadscha', 'Rubies', 'Emeralds', 'Diamonds', 'Rare Gems', 'Semi-Precious'].includes(item.category))
            ? 'Gemstones'
            : 'Jewelry';
          return {
            ...item,
            type: itemType,
            url: itemType === 'Gemstones' ? `/gemstones/${item.slug}` : `/jewelry/${item.slug}`,
          };
        });
      }
    } catch (sanityErr) {
      console.warn("Sanity search fallback to static catalog:", sanityErr?.message || sanityErr);
    }

    // If Sanity returned no results (or errored / offline), search static dataset
    if (items.length === 0) {
      let filtered = STATIC_PRODUCTS;

      if (q) {
        const lowerQ = q.toLowerCase();
        filtered = filtered.filter(item => {
          const nameMatch = item.name?.toLowerCase().includes(lowerQ);
          const catMatch = item.category?.toLowerCase().includes(lowerQ);
          const typeMatch = item.type?.toLowerCase().includes(lowerQ);
          const descMatch = item.description?.toLowerCase().includes(lowerQ);
          const specsMatch = Array.isArray(item.specifications) 
            ? item.specifications.some(s => s.toLowerCase().includes(lowerQ))
            : false;
          return nameMatch || catMatch || typeMatch || descMatch || specsMatch;
        });
      }

      if (category && category !== 'All') {
        if (category === 'Jewelry' || category === 'Gemstones') {
          filtered = filtered.filter(item => item.type === category);
        } else {
          filtered = filtered.filter(item => {
            const catStr = (item.category || '').toLowerCase();
            const target = category.toLowerCase().trim();
            const parts = catStr.split(/[,/&]+/).map(s => s.trim());
            return parts.some(p => p === target || p.includes(target) || target.includes(p)) || catStr === target;
          });
        }
      }

      if (type && type !== 'All') {
        filtered = filtered.filter(item => item.type?.toLowerCase() === type.toLowerCase());
      }

      items = filtered.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      query: q,
      category: category || 'All',
      total: items.length,
      products: items,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to perform search", products: [] },
      { status: 500 }
    );
  }
}
