const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

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

const assetsBaseDir = path.join(__dirname, '..', '..', 'JEWEL-EXCHANGE-ASSETS', 'products');

const targetFiles = [
  { category: 'necklaces', filename: 'necklace-aura-u-silhouette-pave-diamond-gold-01.png', slug: 'aura-u-silhouette-pave-diamond-pendant-necklace' },
  { category: 'rings', filename: 'ring-aura-u-contour-pave-diamond-gold-01.png', slug: 'aura-u-contour-pave-diamond-cocktail-ring' },
  { category: 'necklaces', filename: 'necklace-aura-u-silhouette-pave-diamond-gold-closeup.png', slug: 'aura-u-silhouette-pave-diamond-pendant-necklace-closeup' },
  { category: 'earrings', filename: 'earrings-florentine-ripple-teardrop-dangle-gold.png', slug: 'florentine-ripple-gilded-teardrop-dangle-earrings' },
  { category: 'necklaces', filename: 'necklace-florentine-ripple-teardrop-gold-01.png', slug: 'florentine-ripple-gilded-teardrop-pendant-necklace' },
  { category: 'bracelets', filename: 'bracelet-florentine-ripple-teardrop-gold.png', slug: 'florentine-ripple-gilded-teardrop-chain-bracelet' },
  { category: 'earrings', filename: 'earrings-trinity-entwined-tricolor-gold-studs-01.png', slug: 'trinity-entwined-tricolor-gold-stud-earrings' },
  { category: 'earrings', filename: 'earrings-trinity-entwined-tricolor-gold-studs-closeup.png', slug: 'trinity-entwined-tricolor-gold-stud-earrings-closeup' },
  { category: 'necklaces', filename: 'necklace-aura-u-silhouette-pave-diamond-gold-model.png', slug: 'aura-u-silhouette-pave-diamond-pendant-necklace-model' },
  { category: 'rings', filename: 'ring-aura-u-contour-pave-diamond-gold-model.png', slug: 'aura-u-contour-pave-diamond-cocktail-ring-model' },
  { category: 'necklaces', filename: 'necklace-florentine-ripple-teardrop-gold-model.png', slug: 'florentine-ripple-gilded-teardrop-pendant-necklace-model' },
  { category: 'necklaces', filename: 'necklace-florentine-ripple-teardrop-gold-model-closeup.png', slug: 'florentine-ripple-gilded-teardrop-pendant-necklace-model-closeup' },
  { category: 'earrings', filename: 'earrings-trinity-entwined-tricolor-gold-studs-model.png', slug: 'trinity-entwined-tricolor-gold-stud-earrings-model' },
  { category: 'rings', filename: 'ring-trinity-entwined-tricolor-rolling-band-model.png', slug: 'trinity-entwined-tricolor-rolling-band-ring-model' },
  { category: 'necklaces', filename: 'necklace-trinity-entwined-tricolor-gold-model.png', slug: 'trinity-entwined-tricolor-halo-pendant-necklace-model' },
  { category: 'necklaces', filename: 'necklace-trinity-entwined-tricolor-gold-model-closeup.png', slug: 'trinity-entwined-tricolor-halo-pendant-necklace-model-closeup' },
  { category: 'bracelets', filename: 'bracelet-trinity-entwined-tricolor-gold-model.png', slug: 'trinity-entwined-tricolor-station-chain-bracelet-model' },
  { category: 'earrings', filename: 'earrings-aura-u-contour-pave-diamond-studs-gold.png', slug: 'aura-u-contour-pave-diamond-stud-earrings' },
  { category: 'rings', filename: 'ring-aura-u-contour-pave-diamond-gold-glass.png', slug: 'aura-u-contour-pave-diamond-cocktail-ring-glass' },
  { category: 'necklaces', filename: 'necklace-bicolor-duo-link-elongated-pendant-gold.png', slug: 'bicolor-duo-link-elongated-pendant-necklace' },
  { category: 'necklaces', filename: 'necklace-prism-geometric-hexagon-pendant-gold.png', slug: 'prism-geometric-hexagon-pendant-necklace' },
  { category: 'rings', filename: 'ring-prism-geometric-hexagon-gold.png', slug: 'prism-geometric-hexagon-signet-ring' },
  { category: 'earrings', filename: 'earrings-cascading-starlight-pave-diamond-teardrop-white-gold.png', slug: 'cascading-starlight-pave-diamond-teardrop-earrings' },
  { category: 'bracelets', filename: 'bracelet-imperial-medallion-disc-link-gold.png', slug: 'imperial-medallion-disc-link-bracelet' },
  { category: 'bracelets', filename: 'bracelet-florentine-stippled-torque-cuff-bangle-gold.png', slug: 'florentine-stippled-gold-torque-cuff-bangle' },
  { category: 'necklaces', filename: 'necklace-trinity-entwined-tricolor-gold-01.png', slug: 'trinity-entwined-tricolor-halo-pendant-necklace' },
  { category: 'rings', filename: 'ring-duet-crimson-ruby-bypass-rosegold-glass.png', slug: 'duet-crimson-ruby-bypass-ring-rosegold' },
  { category: 'earrings', filename: 'earrings-rose-blossom-pink-sapphire-diamond-halo-studs.png', slug: 'rose-blossom-pink-sapphire-diamond-halo-studs' },
  { category: 'necklaces', filename: 'necklace-verdant-sovereign-oval-emerald-diamond-halo-gold-01.png', slug: 'verdant-sovereign-oval-emerald-diamond-halo-necklace' },
  { category: 'rings', filename: 'ring-verdant-solstice-round-emerald-diamond-halo-gold.png', slug: 'verdant-solstice-round-emerald-diamond-halo-ring' },
  { category: 'necklaces', filename: 'necklace-verdant-sovereign-oval-emerald-diamond-halo-gold-closeup.png', slug: 'verdant-sovereign-oval-emerald-diamond-halo-necklace-closeup' },
  { category: 'rings', filename: 'ring-prismatic-ceylon-multicolor-sapphire-eternity-gold-01.png', slug: 'prismatic-ceylon-multicolor-sapphire-half-eternity-band' },
  { category: 'rings', filename: 'ring-prismatic-ceylon-multicolor-sapphire-eternity-gold-closeup.png', slug: 'prismatic-ceylon-multicolor-sapphire-half-eternity-band-closeup' },
  { category: 'earrings', filename: 'earrings-verdant-solstice-round-emerald-diamond-halo-studs-gold.png', slug: 'verdant-solstice-round-emerald-diamond-halo-stud-earrings' },
  { category: 'earrings', filename: 'earrings-lumiere-pave-diamond-huggie-hoops-white-gold.png', slug: 'lumiere-pave-diamond-seamless-huggie-hoop-earrings' },
  { category: 'bracelets', filename: 'bracelet-riviera-industrial-screw-textured-bangle-gold.png', slug: 'riviera-industrial-screw-accent-textured-bangle' }
];

async function replaceCompressedAssets() {
  console.log(`Starting in-place compressed image asset update for ${targetFiles.length} items...`);
  let updatedCount = 0;
  let deletedAssetsCount = 0;

  for (const item of targetFiles) {
    const filePath = path.join(assetsBaseDir, item.category, item.filename);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    const fileSizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
    console.log(`\n[${updatedCount + 1}/${targetFiles.length}] Uploading compressed asset: ${item.filename} (${fileSizeMB} MB)...`);
    
    // 1. Upload compressed asset
    const fileStream = fs.createReadStream(filePath);
    const newAsset = await client.assets.upload('image', fileStream, {
      filename: item.filename,
    });
    console.log(`New Compressed Asset ID: ${newAsset._id}`);

    // 2. Find existing product doc by slug or image filename
    const query = `*[_type == "product" && (slug.current == $slug || img.asset->originalFilename == $filename)][0]`;
    const doc = await client.fetch(query, { slug: item.slug, filename: item.filename });

    if (!doc) {
      console.error(`Document not found for slug "${item.slug}" or filename "${item.filename}"`);
      continue;
    }

    const oldAssetRef = doc.img && doc.img.asset ? doc.img.asset._ref : null;

    // 3. Patch doc to point to new compressed asset
    await client.patch(doc._id)
      .set({
        img: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: newAsset._id,
          },
        },
      })
      .commit();
    console.log(`Updated document (${doc._id}) -> "${doc.name}" with compressed asset`);
    updatedCount++;

    // 4. Delete old uncompressed asset from Sanity to prevent duplicates/storage bloat
    if (oldAssetRef && oldAssetRef !== newAsset._id) {
      try {
        await client.delete(oldAssetRef);
        console.log(`Deleted old heavy asset: ${oldAssetRef}`);
        deletedAssetsCount++;
      } catch (err) {
        console.log(`Note on old asset cleanup (${oldAssetRef}): ${err.message}`);
      }
    }
  }

  console.log(`\nFinished in-place update!`);
  console.log(`- Products updated: ${updatedCount}`);
  console.log(`- Old assets deleted: ${deletedAssetsCount}`);

  // 5. Refetch and verify total count
  console.log("\nRefetching full catalog from Sanity...");
  const refetchQuery = `*[_type == "product"] | order(_createdAt desc) {
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
  const sanityProductsPath = path.join(__dirname, '..', '..', 'sanity_products.json');
  fs.writeFileSync(sanityProductsPath, JSON.stringify(allProducts, null, 2));
  console.log(`Verified total products in Sanity: ${allProducts.length} (Saved to sanity_products.json)`);
}

replaceCompressedAssets().catch(console.error);
