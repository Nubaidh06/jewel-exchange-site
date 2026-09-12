import { getProductBySlug, getRelatedProducts } from "@/lib/sanity";
import ProductDetail from "../../../components/ProductDetail";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/gemstones/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Jewel Exchange`,
      description: product.description,
      url: `https://www.jewelexchange.lk/gemstones/${product.slug}`,
      images: [
        {
          url: product.img,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Jewel Exchange`,
      description: product.description,
      images: [product.img],
    },
  };
}

export default async function GemstoneDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  if (product.type === 'Jewelry') {
    notFound();
  }

  const relatedProducts = await getRelatedProducts('Gemstones', product.category, slug, 8);

  // Ensure id is present for legacy components
  product.id = product._id;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.img,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Jewel Exchange',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0',
      url: `https://www.jewelexchange.lk/gemstones/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Jewel Exchange' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} type="Gemstones" relatedProducts={relatedProducts} />
    </>
  );
}
