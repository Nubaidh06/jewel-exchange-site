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

async function unfeatureAll() {
  console.log('Fetching all product documents from Sanity...');
  const docs = await client.fetch('*[_type == "product"] { _id, name, featured }');
  console.log(`Found ${docs.length} products total.`);

  let updatedCount = 0;
  for (const doc of docs) {
    if (doc.featured !== false) {
      await client.patch(doc._id).set({ featured: false }).commit();
      updatedCount++;
      console.log(`[${updatedCount}] Set featured: false -> ${doc.name} (${doc._id})`);
    }
  }

  console.log(`\nSuccessfully updated ${updatedCount} products to featured: false!`);
}

unfeatureAll().catch((err) => {
  console.error('Error unfeaturing products:', err);
  process.exit(1);
});
