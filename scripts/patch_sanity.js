const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const productData = require('/Users/nubaidhahamed/.gemini/antigravity-ide/brain/1a8cbaea-191a-4db8-89b6-2dc1fa339d00/scratch/product_data.js');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
});

const client = createClient({
  projectId: 'rrsnwe4c',
  dataset: 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  const sanityProductsPath = path.join(__dirname, '..', '..', 'sanity_products.json');
  let updatedCount = 0;

  const query = `*[_type == "product" && img.asset->originalFilename in $filenames] { _id, "filename": img.asset->originalFilename }`;
  const itemsToPatch = await client.fetch(query, { filenames: Object.keys(productData) });
  
  for (const item of itemsToPatch) {
    const data = productData[item.filename];
    if (data) {
      console.log(`Patching ${item.filename} (ID: ${item._id})`);
      await client.patch(item._id)
        .set({
          description: data.desc,
          specifications: data.specs
        })
        .commit();
      updatedCount++;
    }
  }
  console.log(`Patched ${updatedCount} products in Sanity.`);
  
  // Re-fetch all to sanity_products.json
  console.log("Refetching all products...");
  const refetchQuery = `*[_type == "product"]{
    name,
    "slug": slug.current,
    type,
    category,
    price,
    featured,
    description,
    specifications,
    "image_filename": img.asset->originalFilename
  }`;
  
  const allProducts = await client.fetch(refetchQuery);
  fs.writeFileSync(sanityProductsPath, JSON.stringify(allProducts, null, 2));
  console.log(`Refetched ${allProducts.length} products to sanity_products.json`);
}

run().catch(console.error);
