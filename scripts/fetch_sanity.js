const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const envFile = fs.readFileSync('/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/website/.env.local', 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
});

const client = createClient({
  projectId: 'rrsnwe4c',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
});

async function run() {
  const query = `*[_type == "product"]{
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
  
  const products = await client.fetch(query);
  fs.writeFileSync('/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/sanity_products.json', JSON.stringify(products, null, 2));
  console.log(`Fetched ${products.length} products to sanity_products.json`);
}

run().catch(console.error);
