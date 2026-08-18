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

const targetBaseDir = '/Users/nubaidhahamed/Desktop/JEWEL-EXCHANGE/JEWEL-EXCHANGE-ASSETS/products';

const newImages = [
  "necklace-u-shape-diamond-pendant-gold.png",
  "ring-yellow-gold-diamond-u-shape.png",
  "necklace-u-shape-diamond-pendant-gold-close-up.png",
  "earrings-gold-textured-dangle-teardrop.png",
  "necklace-gold-textured-dangle-teardrop.png",
  "bracelet-gold-textured-dangle-teardrop.png",
  "earrings-tricolor-interlocking-rings-studs.png",
  "earrings-tricolor-interlocking-rings-studs-close-up.png",
  "necklace-u-shape-diamond-pendant-gold-model.png",
  "ring-yellow-gold-diamond-u-shape-model.png",
  "necklace-gold-textured-dangle-teardrop-model.png",
  "necklace-gold-textured-dangle-teardrop-model-close.png",
  "earrings-tricolor-interlocking-rings-studs-model.png",
  "ring-tricolor-interlocking-rings-model.png",
  "necklace-tricolor-interlocking-rings-model.png",
  "necklace-tricolor-interlocking-rings-model-close.png",
  "bracelet-tricolor-interlocking-rings-model.png",
  "earrings-u-shape-diamond-studs-gold.png",
  "ring-yellow-gold-diamond-u-shape-glass.png",
  "necklace-u-shape-link-pendant-twotone.png",
  "necklace-hexagon-geometric-pendant-gold.png",
  "ring-hexagon-geometric-gold.png",
  "earrings-white-gold-diamond-teardrop-dangle.png",
  "bracelet-geometric-coin-circle-link-gold.png",
  "bracelet-textured-rigid-bangle-gold.png",
  "necklace-tricolor-interlocking-rings.png",
  "ring-rosegold-ruby-bypass-glass.png",
  "earrings-pink-gemstone-square-diamond-halo-studs.png",
  "necklace-oval-emerald-diamond-halo-gold.png",
  "ring-round-emerald-diamond-halo-gold.png",
  "necklace-oval-emerald-diamond-halo-gold-close.png",
  "ring-multicolor-gemstone-half-eternity-gold.png",
  "ring-multicolor-gemstone-half-eternity-gold-close.png",
  "earrings-round-emerald-diamond-halo-studs-gold.png",
  "earrings-white-gold-diamond-huggie-hoops.png",
  "bracelet-textured-rigid-bangle-screw-details-gold.png"
];

function generateProductName(filename) {
  let name = path.parse(filename).name;
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getCategory(filename) {
  if (filename.startsWith('necklace')) return 'necklaces';
  if (filename.startsWith('ring')) return 'rings';
  if (filename.startsWith('bracelet')) return 'bracelets';
  if (filename.startsWith('earring')) return 'earrings';
  return 'misc';
}

function getDisplayCategory(filename) {
  if (filename.startsWith('necklace')) return 'Necklaces';
  if (filename.startsWith('ring')) return 'Rings';
  if (filename.startsWith('bracelet')) return 'Bracelets';
  if (filename.startsWith('earring')) return 'Earrings';
  return 'Misc';
}

function slugify(text) {
  return text.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function run() {
  for (const filename of newImages) {
    const categoryFolder = getCategory(filename);
    const filePath = path.join(targetBaseDir, categoryFolder, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    try {
      console.log(`Uploading asset: ${filename}`);
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: filename
      });

      const productName = generateProductName(filename);
      const slugValue = slugify(productName);
      
      const newProduct = {
        _type: 'product',
        name: productName,
        slug: { _type: 'slug', current: slugValue },
        type: 'Jewelry',
        category: getDisplayCategory(filename),
        price: 'Price Upon Request',
        featured: false,
        img: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      };

      console.log(`Creating document for: ${productName}`);
      const createdDoc = await client.create(newProduct);
      console.log(`Created document ${createdDoc._id}`);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }
}

run().then(() => console.log('Delta upload complete!')).catch(console.error);
