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

const gemstonesData = [
  {
    sku: "GEM-001",
    name: "Royal Velvet Ceylon Blue Sapphire — 4.80ct Cushion Brilliant",
    slug: "ceylon-royal-blue-sapphire-cushion-4-80ct",
    catalog_type: "Gemstone",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/blue-sapphires/gemstone-ceylon-royal-blue-sapphire-cushion-4.80ct.png",
    description: "An extraordinary unheated Ceylon royal blue sapphire displaying deep velvety saturation and exceptional internal crystal fire. Sourced directly from the legendary gem gravels of Ratnapura, Sri Lanka, and precision-cut into a balanced cushion brilliant. A quintessential centerpiece for an heirloom platinum or white gold bespoke ring.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 4.80 Carats (10.1 x 8.9 x 6.2 mm)",
      "Color Grade: Vivid Royal Blue (Even Saturation)",
      "Clarity & Treatment: Eye Clean · Unheated & Untreated (Natural)",
      "Certification: GRS / GIA Certificate Available · Bespoke Setting Available"
    ]
  },
  {
    sku: "GEM-002",
    name: "Sunset Lotus Ceylon Padparadscha Sapphire — 4.50ct Pear Cut",
    slug: "ceylon-padparadscha-sapphire-pear-4-50ct",
    catalog_type: "Gemstone",
    category: "Padparadscha",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/padparadscha-sapphires/gemstone-ceylon-padparadscha-sapphire-pear-4.50ct.png",
    description: "One of the world’s rarest and most coveted gemstones, featuring the delicate harmonious blend of lotus-blossom pink and tropical sunset orange. Mined in Sri Lanka and faceted into a graceful pear brilliant, it radiates warm celestial brilliance from every facet.",
    specifications: [
      "Origin & Variety: Natural Padparadscha Sapphire (Sri Lanka)",
      "Carat Weight: 4.50 Carats (12.4 x 8.2 x 5.7 mm)",
      "Color Grade: Sunset Lotus (Pink-Orange 50/50 Balance)",
      "Clarity & Treatment: Natural & Unheated (VVS Clarity)",
      "Certification: Gübelin / GRS Verified · Ideal for Bespoke Solitaire Ring or Pendant"
    ]
  },
  {
    sku: "GEM-003",
    name: "Celestial Azure Ceylon Cornflower Sapphire — 3.90ct Round Brilliant",
    slug: "ceylon-cornflower-blue-sapphire-round-3-90ct",
    catalog_type: "Gemstone",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/blue-sapphires/gemstone-ceylon-cornflower-blue-sapphire-round-3.90ct.png",
    description: "Possessing the coveted luminous cornflower blue hue celebrated for its open, daytime brightness and vibrant electric sparkle. Cut to precise diamond-proportioned symmetry, this rare Ceylon jewel captures and refracts light with breathtaking scintillation.",
    specifications: [
      "Origin & Variety: Natural Corundum (Ceylon, Sri Lanka)",
      "Carat Weight: 3.90 Carats (9.2 mm Round Diameter)",
      "Color Grade: Vivid Cornflower Blue (High Luminosity)",
      "Clarity & Treatment: Eye Clean · 100% Unheated Natural",
      "Certification: GIA / National Gem & Jewellery Authority (NGJA) Certified"
    ]
  },
  {
    sku: "GEM-004",
    name: "Imperial Blossom Ceylon Pink Sapphire — 3.60ct Radiant Cut",
    slug: "ceylon-vivid-pink-sapphire-radiant-3-60ct",
    catalog_type: "Gemstone",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/pink-sapphires/gemstone-ceylon-vivid-pink-sapphire-radiant-3.60ct.png",
    description: "A vivid, high-octane magenta pink sapphire exhibiting rare color purity and intense internal luster. Its modern rectangular radiant faceting combines the structured elegance of an emerald cut with the explosive sparkle of a brilliant cut.",
    specifications: [
      "Origin & Variety: Natural Pink Sapphire (Sri Lanka)",
      "Carat Weight: 3.60 Carats (9.4 x 7.3 x 5.4 mm)",
      "Color Grade: Vivid Magenta Hot Pink (Eye Clean)",
      "Clarity & Treatment: Unheated Natural Crystal",
      "Certification: GRS Certified · Bespoke Engagement Ring Recommendation"
    ]
  },
  {
    sku: "GEM-005",
    name: "Crimson Sovereign Pigeon Blood Ruby — 3.50ct Oval Brilliant",
    slug: "crimson-sovereign-pigeon-blood-ruby-oval-3-50ct",
    catalog_type: "Gemstone",
    category: "Rubies",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rubies/gemstone-pigeon-blood-ruby-oval-3.50ct.png",
    description: "A collector’s treasure of the highest echelon, displaying the revered 'Pigeon Blood' red hue characterized by deep crimson saturation with strong red fluorescence under natural light. Elegantly faceted into an oval brilliant with outstanding clarity.",
    specifications: [
      "Origin & Variety: Natural Corundum (Burma / Mozambique Origin)",
      "Carat Weight: 3.50 Carats (9.8 x 7.8 x 5.1 mm)",
      "Color Grade: Vivid Crimson 'Pigeon Blood' Red",
      "Clarity & Treatment: Natural / Minor Traditional Treatment",
      "Certification: SSEF / Gübelin / GRS Certificate Available"
    ]
  },
  {
    sku: "GEM-006",
    name: "Verdant Muzo Colombian Emerald — 4.10ct Classic Step Cut",
    slug: "verdant-muzo-colombian-emerald-step-4-10ct",
    catalog_type: "Gemstone",
    category: "Emeralds",
    price: "Price on Inquiry",
    featured: true,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/emeralds/gemstone-colombian-emerald-octagonal-step-4.10ct.png",
    description: "Originating from Colombia’s famed Muzo mining region, this 4.10-carat emerald boasts the legendary deep, velvety glowing green color found in only the finest beryl crystals. Cut in the timeless octagonal step cut to showcase its subtle natural jardin clarity.",
    specifications: [
      "Origin & Variety: Natural Beryl (Muzo, Colombia)",
      "Carat Weight: 4.10 Carats (10.6 x 8.4 x 5.8 mm)",
      "Color Grade: Vivid Muzo Green (High Transparency)",
      "Clarity & Treatment: Minor Traditional Cedarwood Oil Only",
      "Certification: CDTEC / GRS Certified · Bespoke Trilogy Ring Setting Available"
    ]
  },
  {
    sku: "GEM-007",
    name: "Solaris Golden Ceylon Yellow Sapphire (Pushparaga) — 5.10ct Oval",
    slug: "ceylon-yellow-sapphire-pushparaga-oval-5-10ct",
    catalog_type: "Gemstone",
    category: "Sapphires",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/yellow-sapphires/gemstone-ceylon-yellow-sapphire-pushparaga-oval-5.10ct.png",
    description: "Known traditionally in Sri Lanka as 'Pushparaga', this unheated 5.10-carat yellow sapphire radiates a pure canary golden hue associated with prosperity and brilliance. Exceptional crystal purity ensures remarkable daylight fire and clarity.",
    specifications: [
      "Origin & Variety: Natural Corundum / Pushparaga (Ratnapura, Sri Lanka)",
      "Carat Weight: 5.10 Carats (11.2 x 9.0 x 6.1 mm)",
      "Color Grade: Canary Golden Yellow (VVS Clarity)",
      "Clarity & Treatment: 100% Natural Unheated",
      "Certification: NGJA / GIA Certified · Suitable for Astrological & Fine Jewelry"
    ]
  },
  {
    sku: "GEM-008",
    name: "Electric Verdure Tsavorite Garnet — 3.80ct Cushion Brilliant",
    slug: "electric-verdure-tsavorite-garnet-cushion-3-80ct",
    catalog_type: "Gemstone",
    category: "Rare Gems",
    price: "Price on Inquiry",
    featured: false,
    imagePath: "/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products/gemstones/rare-gems/gemstone-tsavorite-garnet-cushion-3.80ct.png",
    description: "A rare, completely untreated grossular garnet radiating an intense electric forest-green hue with a refractive index higher than emerald. Sourced from premier East African gem corridors and cut into a fiery cushion brilliant with zero heat treatment.",
    specifications: [
      "Origin & Variety: Natural Grossular Garnet (East Africa / Ceylon Sourced)",
      "Carat Weight: 3.80 Carats (9.3 x 8.4 x 5.6 mm)",
      "Color Grade: Electric Forest Green (High Dispersion)",
      "Clarity & Treatment: 100% Natural & Untreated (No Oil / No Heat)",
      "Certification: GIA / IGI Certified · Bespoke Cocktail Ring Recommendation"
    ]
  }
];

async function run() {
  console.log('--- Starting Sanity Gemstone Upload & Sync ---');

  for (let i = 0; i < gemstonesData.length; i++) {
    const item = gemstonesData[i];
    console.log(`\n[${i + 1}/${gemstonesData.length}] Processing: "${item.name}"...`);

    if (!fs.existsSync(item.imagePath)) {
      console.error(`Image not found: ${item.imagePath}`);
      continue;
    }

    const imageBuffer = fs.readFileSync(item.imagePath);
    const filename = path.basename(item.imagePath);

    console.log(`Uploading asset: ${filename}...`);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
      contentType: 'image/png',
    });
    console.log(`Uploaded asset: ${asset._id}`);

    // Check if document with slug already exists
    const existing = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: item.slug });

    const docData = {
      _type: 'product',
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      sku: item.sku,
      catalog_type: item.catalog_type,
      category: item.category,
      price: item.price,
      featured: item.featured,
      description: item.description,
      specifications: item.specifications,
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

  console.log('\n--- Gemstones Upload Complete! ---');

  // Refetch full catalog to sanity_products.json
  const allProducts = await client.fetch(`*[_type == "product"] {
    _id,
    sku,
    name,
    "slug": slug.current,
    catalog_type,
    category,
    price,
    featured,
    description,
    specifications,
    "img": image.asset->url,
    "imageFilename": image.asset->originalFilename
  }`);

  fs.writeFileSync(
    path.resolve(__dirname, '../../sanity_products.json'),
    JSON.stringify(allProducts, null, 2)
  );

  console.log(`Refetched total active products in Sanity: ${allProducts.length} (Saved to sanity_products.json)`);
}

run().catch(console.error);
