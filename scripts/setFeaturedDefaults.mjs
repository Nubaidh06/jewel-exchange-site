import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rrsnwe4c',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: 'sk03RRt4ykmOS2sNK85TJmy8tJ0GuUovsfZZFouqtBy2gcjRSffAudoYKfCTLzNvJDFSMO7ygeeb857uLCJrIaxnWcH35Muk1EI8v3ZU8uSW4HXei5u7i8u6Z2Iv1n17YhQQ7IdhAW6Jf803hqN4zxMvGh4Pctd4rYQDX5OSFKWhv8hWrQL1'
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
