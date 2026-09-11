import WishlistClient from "./WishlistClient";

export const metadata = {
  title: "Inquiry Cart",
  description: "Curate your personal selection of fine jewelry and rare Ceylon gemstones, and send an inquiry for tailored pricing.",
  alternates: {
    canonical: "/wishlist",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
