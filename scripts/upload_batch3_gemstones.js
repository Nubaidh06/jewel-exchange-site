import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rrsnwe4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const batch3Gems = [
  {
    sku: "GEM-017",
    name: "Ceylon Crimson Crown — 4.68ct Cushion Cut",
    slug: "ceylon-crimson-crown-ruby-4-68ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rubies",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rubies/gemstone-ceylon-crimson-crown-ruby-cushion-4.68ct.png",
    description: "A vivid, slightly pinkish-red ruby with rich saturation, lively optical brilliance, and refined crystal fire that feels classic yet vibrant. Natural Sri Lankan origin, unheated, with strong clarity and a clean, luminous crystal. Ideal as the centerpiece of a platinum or rose-gold cocktail ring, or a bold solitaire.",
    specifications: [
      "Origin & Variety: Natural Corundum — Ruby (Ceylon, Sri Lanka)",
      "Carat Weight: 4.68 Carats (9.95 x 9.15 x 5.90 mm)",
      "Color Grade: Vivid Red",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-018",
    name: "Ceylon Neon — 5.10ct Cushion Cut",
    slug: "ceylon-neon-blue-zircon-5-10ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-neon-blue-zircon-cushion-5.10ct.png",
    description: "An electric, neon-blue zircon with unusually high brilliance, lively dispersion, and a clean, glassy crystal fire. Natural Sri Lankan origin, typically heat-treated to achieve this vivid blue, with excellent clarity. Striking in a platinum or white-gold solitaire that lets the color and sparkle dominate.",
    specifications: [
      "Origin & Variety: Natural Zircon (Ceylon, Sri Lanka)",
      "Carat Weight: 5.10 Carats (10.20 x 9.35 x 6.15 mm)",
      "Color Grade: Vivid Blue",
      "Clarity & Treatment: Eye Clean · Heated (standard for blue zircon)",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-019",
    name: "Ceylon Flame Spinel — 3.92ct Cushion Cut",
    slug: "ceylon-flame-red-spinel-3-92ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-flame-red-spinel-cushion-3.92ct.png",
    description: "A bright, clean red spinel with high transparency, lively brilliance, and a pure, fiery tone that rivals ruby without the typical inclusions. Natural Sri Lankan origin, untreated, with excellent clarity and a luminous crystal. Exceptional as a platinum solitaire or a contemporary cocktail ring.",
    specifications: [
      "Origin & Variety: Natural Spinel (Ceylon, Sri Lanka)",
      "Carat Weight: 3.92 Carats (9.15 x 8.40 x 5.55 mm)",
      "Color Grade: Vivid Red",
      "Clarity & Treatment: Eye Clean · Untreated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-020",
    name: "Ceylon Violet — 3.55ct Cushion Cut",
    slug: "ceylon-violet-purple-sapphire-3-55ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/purple-sapphires/gemstone-ceylon-violet-purple-sapphire-cushion-3.55ct.png",
    description: "A rich violet-purple sapphire with even saturation, strong brilliance, and a regal crystal fire that sits between sapphire and amethyst in mood. Natural Sri Lankan origin, unheated, with high clarity and a clean, luminous body. Beautiful in a platinum or white-gold solitaire, or a distinctive cocktail ring.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 3.55 Carats (8.70 x 8.00 x 5.35 mm)",
      "Color Grade: Vivid Purple",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-021",
    name: "Ceylon Ice — 4.20ct Cushion Cut",
    slug: "ceylon-ice-white-sapphire-4-20ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/white-sapphires/gemstone-ceylon-ice-white-sapphire-cushion-4.20ct.png",
    description: "A colorless white sapphire with sharp brilliance, clean crystal, and lively facet play that reads as a refined diamond alternative. Natural Sri Lankan origin, unheated, with excellent clarity and a bright, transparent body. Ideal for a platinum solitaire, bridal setting, or everyday luxury ring.",
    specifications: [
      "Origin & Variety: Natural Corundum — White Sapphire (Ceylon, Sri Lanka)",
      "Carat Weight: 4.20 Carats (9.30 x 8.55 x 5.70 mm)",
      "Color Grade: Colorless",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-022",
    name: "The Northern Star — 2.15ct Round Brilliant",
    slug: "the-northern-star-diamond-round-2-15ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Diamonds",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/diamonds/gemstone-the-northern-star-diamond-round-2.15ct.png",
    description: "A colorless round brilliant with exceptional optical brilliance, tight scintillation, and a clean, icy crystal fire. Natural diamond of high clarity, untreated, with classic proportions that maximize light return. The definitive platinum solitaire, or the center of a bespoke engagement setting.",
    specifications: [
      "Origin & Variety: Natural Diamond",
      "Carat Weight: 2.15 Carats (8.30 x 8.28 x 5.10 mm)",
      "Color Grade: D–E Colorless",
      "Clarity & Treatment: VS1 · Untreated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-023",
    name: "The Manor Cushion — 3.02ct Cushion Cut",
    slug: "the-manor-cushion-diamond-3-02ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Diamonds",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/diamonds/gemstone-the-manor-cushion-diamond-3.02ct.png",
    description: "A generous cushion-cut diamond with a soft outline, lively brilliance, and a warmer, more romantic sparkle than a round. Natural diamond of high clarity, untreated, with well-balanced proportions. Ideal for a vintage-inspired platinum solitaire or a bespoke halo setting.",
    specifications: [
      "Origin & Variety: Natural Diamond",
      "Carat Weight: 3.02 Carats (8.90 x 8.35 x 5.45 mm)",
      "Color Grade: F–G Near Colorless",
      "Clarity & Treatment: VS2 · Untreated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-024",
    name: "The East–West Oval — 1.71ct Oval Brilliant",
    slug: "the-east-west-oval-diamond-1-71ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Diamonds",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/diamonds/gemstone-the-east-west-oval-diamond-1.71ct.png",
    description: "An elegant oval diamond with a graceful outline, bright scintillation, and a finger-lengthening presence. Natural diamond of high clarity, untreated, with a well-cut bow-tie that stays subtle. Perfect for an east–west platinum setting, a slim solitaire, or a modern trilogy.",
    specifications: [
      "Origin & Variety: Natural Diamond",
      "Carat Weight: 1.71 Carats (9.15 x 6.40 x 3.85 mm)",
      "Color Grade: E–F Near Colorless",
      "Clarity & Treatment: VS1 · Untreated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  }
];

async function run() {
  console.log('--- Uploading Batch 3 Gemstones to Sanity ---');

  for (let i = 0; i < batch3Gems.length; i++) {
    const item = batch3Gems[i];
    console.log(`\n[${i + 1}/${batch3Gems.length}] Processing: "${item.name}" (${item.sku})...`);

    if (!fs.existsSync(item.imagePath)) {
      console.error(`Error: File not found: ${item.imagePath}`);
      continue;
    }

    const imageBuffer = fs.readFileSync(item.imagePath);
    const filename = path.basename(item.imagePath);

    console.log(`Uploading asset: ${filename}...`);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
      contentType: 'image/png',
    });
    console.log(`Uploaded asset ID: ${asset._id}`);

    const existing = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: item.slug });

    const docData = {
      _type: 'product',
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      sku: item.sku,
      type: item.type,
      catalog_type: item.catalog_type,
      category: item.category,
      price: item.price,
      featured: item.featured,
      description: item.description,
      specifications: item.specifications,
      img: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    };

    if (existing) {
      console.log(`Updating existing document (${existing._id})...`);
      await client.patch(existing._id).set(docData).commit();
      console.log(`Updated document: ${existing._id}`);
    } else {
      console.log(`Creating new document in Sanity...`);
      const created = await client.create(docData);
      console.log(`Created document: ${created._id}`);
    }
  }

  console.log('\n--- Batch 3 Gemstones Upload Complete! ---');

  // Refetch full catalog to sanity_products.json
  const allProducts = await client.fetch(`*[_type == "product"] {
    _id,
    sku,
    name,
    "slug": slug.current,
    type,
    catalog_type,
    category,
    price,
    featured,
    description,
    specifications,
    "img": coalesce(img.asset->url, image.asset->url),
    "imageFilename": coalesce(img.asset->originalFilename, image.asset->originalFilename)
  }`);

  fs.writeFileSync(
    path.resolve(__dirname, '../../sanity_products.json'),
    JSON.stringify(allProducts, null, 2)
  );

  console.log(`Refetched total active products in Sanity: ${allProducts.length} (Saved to sanity_products.json)`);
}

run().catch(console.error);
