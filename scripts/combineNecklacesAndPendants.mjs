import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rrsnwe4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function combineCategories() {
  console.log('Fetching products with category Necklaces or Pendants...');
  const docs = await client.fetch(
    '*[_type == "product" && (category in ["Necklaces", "Pendants", "Necklace", "Pendant"] || category match "Necklace*" || category match "Pendant*")] { _id, name, category }'
  );
  console.log(`Found ${docs.length} products to update.`);

  let count = 0;
  for (const doc of docs) {
    if (doc.category !== 'Necklaces & Pendants') {
      await client
        .patch(doc._id)
        .set({ category: 'Necklaces & Pendants' })
        .commit();
      count++;
      console.log(`[${count}] Updated ${doc.name} (${doc._id}): "${doc.category}" -> "Necklaces & Pendants"`);
    }
  }

  console.log(`\nFinished! Successfully updated ${count} products to "Necklaces & Pendants".`);
}

combineCategories().catch((err) => {
  console.error('Error combining categories:', err);
  process.exit(1);
});
