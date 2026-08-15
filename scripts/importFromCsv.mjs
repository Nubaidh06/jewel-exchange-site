import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rrsnwe4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN || 'sk03RRt4ykmOS2sNK85TJmy8tJ0GuUovsfZZFouqtBy2gcjRSffAudoYKfCTLzNvJDFSMO7ygeeb857uLCJrIaxnWcH35Muk1EI8v3ZU8uSW4HXei5u7i8u6Z2Iv1n17YhQQ7IdhAW6Jf803hqN4zxMvGh4Pctd4rYQDX5OSFKWhv8hWrQL1',
  useCdn: false,
})

const rootDir = path.resolve(__dirname, '../../')
const csvPath = path.resolve(rootDir, 'JEWEL-EXCHANGE-ASSETS/INVENTORY_CATALOG_TEMPLATE.csv')
const assetsBaseDir = path.resolve(rootDir, 'JEWEL-EXCHANGE-ASSETS/products')

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '')
  if (lines.length < 2) return []

  const header = parseCSVLine(lines[0])
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === header.length) {
      const row = {}
      header.forEach((h, index) => {
        row[h.trim()] = values[index] ? values[index].trim() : ''
      })
      rows.push(row)
    }
  }
  return rows
}

function parseCSVLine(text) {
  const result = []
  let cur = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '"' || char === "'") {
      if (inQuotes && text[i + 1] === char) {
        cur += char
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur)
      cur = ''
    } else {
      cur += char
    }
  }
  result.push(cur)
  return result
}

async function uploadImage(imageRelPath) {
  if (!imageRelPath) return null

  // Try direct path or subfolder path
  let fullPath = path.resolve(assetsBaseDir, imageRelPath)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.resolve(rootDir, 'website/public', imageRelPath)
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Image not found at: ${fullPath} (Continuing without image)`)
    return null
  }

  const stream = fs.createReadStream(fullPath)
  const filename = path.basename(fullPath)
  console.log(`  Uploading image asset: ${filename}...`)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

async function runImport() {
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at: ${csvPath}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8')
  const products = parseCSV(csvContent)

  console.log(`\n💎 Starting Sanity CSV Import — ${products.length} products found...\n`)

  for (const item of products) {
    const sku = item.sku || 'ITEM'
    const name = item.name
    if (!name) continue

    console.log(`▶ Processing: [${sku}] ${name}...`)

    const slug = generateSlug(name)
    const isFeatured = item.featured && item.featured.toUpperCase() === 'TRUE'

    // Build structured specifications array
    const specs = []
    if (item.spec_metal) specs.push(`Metal: ${item.spec_metal}`)
    if (item.spec_center_stone) specs.push(`Center Stone: ${item.spec_center_stone}`)
    if (item.spec_side_stones) specs.push(`Side Stones: ${item.spec_side_stones}`)
    if (item.spec_certification) specs.push(`Certification: ${item.spec_certification}`)
    if (item.spec_other) specs.push(item.spec_other)

    let imageAssetId = null
    if (item.image_file) {
      try {
        imageAssetId = await uploadImage(item.image_file)
      } catch (err) {
        console.warn(`  Failed to upload image: ${err.message}`)
      }
    }

    const doc = {
      _type: 'product',
      name: name,
      slug: { _type: 'slug', current: slug },
      type: item.catalog_type || 'Jewelry',
      category: item.category || 'Rings',
      price: item.price || 'Price Upon Request',
      featured: isFeatured,
      description: item.description || '',
      specifications: specs,
    }

    if (imageAssetId) {
      doc.img = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      }
    }

    try {
      const res = await client.create(doc)
      console.log(`  ✅ Successfully published to Sanity (ID: ${res._id})\n`)
    } catch (err) {
      console.error(`  ❌ Sanity creation error for ${name}:`, err.message)
    }
  }

  console.log('🎉 Import Complete! All inventory documents created in Sanity Cloud.')
}

runImport()
