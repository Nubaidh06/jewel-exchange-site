import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local if present
const envLocalPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/)
    if (match) {
      const key = match[1]
      let value = match[2] || ''
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  })
}

// 1. Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rrsnwe4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
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
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"'
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

  let fullPath = path.resolve(assetsBaseDir, imageRelPath)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.resolve(rootDir, 'website/public', imageRelPath)
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️ Image file not found at: ${fullPath}`)
    return null
  }

  const stream = fs.createReadStream(fullPath)
  const filename = path.basename(fullPath)
  console.log(`  Uploading image asset: ${filename}...`)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

async function clearExistingProducts() {
  console.log('🧹 Fetching and clearing all existing product documents from Sanity Cloud...')
  try {
    const existing = await client.fetch('*[_type == "product"]._id')
    console.log(`Found ${existing.length} existing products to remove.`)
    for (const id of existing) {
      await client.delete(id)
    }
    console.log('✅ Clean slate: All old product records cleared successfully.\n')
  } catch (err) {
    console.error('⚠️ Error clearing products:', err.message)
  }
}

async function runImport() {
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at: ${csvPath}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8')
  const products = parseCSV(csvContent)

  console.log(`💎 Starting Sanity CSV Import — ${products.length} products to sync...\n`)

  let successCount = 0

  for (const item of products) {
    const sku = item.sku || 'ITEM'
    const name = item.name
    if (!name) continue

    console.log(`▶ [${sku}] ${name}`)

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

    const docId = `product-${sku.toLowerCase().replace(/[^a-z0-9-_]/g, '-')}`

    const doc = {
      _id: docId,
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
      const res = await client.createOrReplace(doc)
      console.log(`  ✅ Published [${doc.type} > ${doc.category}] (ID: ${res._id})\n`)
      successCount++
    } catch (err) {
      console.error(`  ❌ Sanity creation error for ${name}:`, err.message)
    }
  }

  console.log(`🎉 Import Complete! Successfully synced ${successCount} of ${products.length} products to Sanity Cloud.`)
}

runImport()
