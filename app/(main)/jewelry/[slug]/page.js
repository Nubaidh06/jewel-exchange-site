import { getProductBySlug, getRelatedProducts } from "@/lib/sanity";
import ProductDetail from "../../../components/ProductDetail";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Jewel Exchange',
    };
  }

  return {
    title: `${product.name} | Jewel Exchange`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Jewel Exchange`,
      description: product.description,
      url: `https://jewelexchange.lk/jewelry/${product.slug}`,
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

export default async function JewelryDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.type !== 'Jewelry') {
    notFound();
  }

  const relatedProducts = await getRelatedProducts('Jewelry', product.category, slug, 8);

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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} type="Jewelry" relatedProducts={relatedProducts} />
    </>
  );
}
