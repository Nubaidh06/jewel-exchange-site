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

const batch2Gems = [
  {
    sku: "GEM-009",
    name: "Royal Ceylon Crown — 5.82ct Cushion Cut",
    slug: "royal-ceylon-crown-blue-sapphire-5-82ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/blue-sapphires/gemstone-ceylon-royal-crown-blue-sapphire-cushion-5.82ct.png",
    description: "A commanding cornflower-to-royal blue with exceptional optical brilliance, lively crystal fire, and a velvety yet saturated tone that reads as classic Ceylon. Mined in Sri Lanka, this is a natural, 100% unheated sapphire of high clarity with a clean, luminous crystal. Ideal as the center of a platinum solitaire or a sculptural cocktail ring that lets the color dominate.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 5.82 Carats (10.85 x 9.90 x 6.40 mm)",
      "Color Grade: Vivid Royal Blue",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-010",
    name: "Lotus Dawn — 4.15ct Cushion Cut",
    slug: "lotus-dawn-padparadscha-sapphire-4-15ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Padparadscha",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/padparadscha-sapphires/gemstone-ceylon-padparadscha-lotus-dawn-cushion-4.15ct.png",
    description: "A rare lotus-blossom blend of soft pink and warm orange with a silky, even glow and refined crystal fire rather than harsh sparkle. Natural Ceylon origin, unheated, with excellent clarity that preserves the stone’s delicate, romantic hue. Best realized in a rose-gold or platinum pendant, or as the heart of a bespoke trilogy ring.",
    specifications: [
      "Origin & Variety: Natural Corundum — Padparadscha (Ceylon, Sri Lanka)",
      "Carat Weight: 4.15 Carats (9.40 x 8.65 x 5.85 mm)",
      "Color Grade: Pinkish Orange (Padparadscha)",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-011",
    name: "Golden Ceylon Sun — 6.24ct Cushion Cut",
    slug: "golden-ceylon-sun-yellow-sapphire-6-24ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/yellow-sapphires/gemstone-ceylon-yellow-sapphire-golden-sun-cushion-6.24ct.png",
    description: "A vivid, sunlit golden yellow with high brilliance, crisp facet play, and a clean, cheerful crystal fire. Natural Sri Lankan sapphire, unheated, with strong clarity and even color saturation. Striking as a yellow-gold cocktail ring or a bright solitaire that reads as both joyful and luxurious.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 6.24 Carats (11.10 x 10.20 x 6.55 mm)",
      "Color Grade: Vivid Yellow",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-012",
    name: "Blush Ceylon Rose — 3.88ct Cushion Cut",
    slug: "blush-ceylon-rose-pink-sapphire-3-88ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/pink-sapphires/gemstone-ceylon-pink-sapphire-blush-rose-cushion-3.88ct.png",
    description: "A refined, saturated pink with soft-to-vivid tone, lively brilliance, and a feminine yet confident crystal fire. Natural unheated Ceylon sapphire of high clarity, with even color and a clean, luminous body. Perfectly suited to a rose-gold solitaire or a delicate platinum pendant.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 3.88 Carats (8.95 x 8.20 x 5.50 mm)",
      "Color Grade: Vivid Pink",
      "Clarity & Treatment: Eye Clean · 100% Unheated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-013",
    name: "Honey Ceylon Eye — 8.10ct Cabochon",
    slug: "honey-ceylon-eye-cats-eye-chrysoberyl-8-10ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-cats-eye-chrysoberyl-honey-eye-cabochon-8.10ct.png",
    description: "A rich honey-golden chrysoberyl with a sharp, centered chatoyant eye and a silky, luminous surface sheen. Natural Sri Lankan origin, untreated, with a well-defined eye and classic Ceylon character. Made for a men’s signet or a bold platinum cocktail ring that showcases the moving eye.",
    specifications: [
      "Origin & Variety: Natural Chrysoberyl Cat’s Eye (Ceylon, Sri Lanka)",
      "Carat Weight: 8.10 Carats (14.20 x 10.80 x 7.15 mm)",
      "Color Grade: Honey Yellow Chatoyant",
      "Clarity & Treatment: Eye Clean (for type) · Untreated",
      "Certification: GRS Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-014",
    name: "Cobalt Ceylon Flame — 4.72ct Cushion Cut",
    slug: "cobalt-ceylon-flame-blue-spinel-4-72ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-blue-spinel-cobalt-flame-cushion-4.72ct.png",
    description: "A vivid cobalt-to-violet blue with electric brilliance, high transparency, and a crisp, modern crystal fire. Natural Sri Lankan spinel, untreated, with excellent clarity and a clean, lively crystal. Exceptional as a platinum solitaire alternative to sapphire, or in a contemporary cocktail setting.",
    specifications: [
      "Origin & Variety: Natural Spinel (Ceylon, Sri Lanka)",
      "Carat Weight: 4.72 Carats (9.85 x 9.10 x 6.05 mm)",
      "Color Grade: Vivid Cobalt Blue",
      "Clarity & Treatment: Eye Clean · Untreated",
      "Certification: GIA Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-015",
    name: "Ceylon Chameleon — 2.95ct Cushion Cut",
    slug: "ceylon-chameleon-alexandrite-2-95ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-alexandrite-chameleon-cushion-2.95ct.png",
    description: "A rare color-change alexandrite showing bluish-green in daylight with strong crystal fire and a sophisticated, shifting personality. Natural Sri Lankan origin, untreated, with good clarity for the species and classic Ceylon change. Best reserved for a discreet platinum solitaire or a collector’s bespoke ring that rewards close viewing.",
    specifications: [
      "Origin & Variety: Natural Alexandrite (Ceylon, Sri Lanka)",
      "Carat Weight: 2.95 Carats (8.40 x 7.65 x 5.20 mm)",
      "Color Grade: Color Change — Bluish Green to Purplish Red",
      "Clarity & Treatment: Slightly Included (typical) · Untreated",
      "Certification: Gübelin Certified · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-016",
    name: "Ceylon Cinnamon — 7.35ct Cushion Cut",
    slug: "ceylon-cinnamon-hessonite-garnet-7-35ct",
    type: "Gemstones",
    catalog_type: "Gemstones",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-ceylon-hessonite-garnet-cinnamon-cushion-7.35ct.png",
    description: "A warm cinnamon-to-honey orange with rich body color, lively facet play, and a natural, glowing crystal character. Natural Sri Lankan hessonite, untreated, with attractive clarity and classic Ceylon warmth. Beautiful in a yellow-gold cocktail ring or as a distinctive solitaire with an earthy, luxurious presence.",
    specifications: [
      "Origin & Variety: Natural Grossular Garnet — Hessonite (Ceylon, Sri Lanka)",
      "Carat Weight: 7.35 Carats (12.05 x 10.90 x 6.80 mm)",
      "Color Grade: Cinnamon Orange",
      "Clarity & Treatment: Eye Clean · Untreated",
      "Certification: NGJA Certified · Bespoke Setting Available"
    ]
  }
];

async function run() {
  console.log('--- Uploading Batch 2 Gemstones to Sanity ---');

  for (let i = 0; i < batch2Gems.length; i++) {
    const item = batch2Gems[i];
    console.log(`\n[${i + 1}/${batch2Gems.length}] Processing: "${item.name}" (${item.sku})...`);

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

  console.log('\n--- Batch 2 Gemstones Upload Complete! ---');

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
