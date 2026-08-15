import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rrsnwe4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

const featuredNames = [
  'Sapphire Brilliance Ring',
  'Royal Blue Sapphire Ring',
  'Golden Cascade Necklace',
  'Classic Tennis Bracelet',
  'Ceylon Blue Sapphire',
  'Pigeon Blood Ruby'
];

async function updateFeatured() {
  const docs = await client.fetch('*[_type == "product"] { _id, name }');
  console.log('Total docs:', docs.length);
  for (const doc of docs) {
    const isFeatured = featuredNames.includes(doc.name);
    await client.patch(doc._id).set({ featured: isFeatured }).commit();
    console.log(`Updated ${doc.name} (${doc._id}) -> featured: ${isFeatured}`);
  }
  console.log('Done updating featured status!');
}

updateFeatured().catch(console.error);
