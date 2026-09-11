import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/showroomAuth";
import { getShowcaseItems } from "@/lib/sanity";
import { enrichShowcaseItem } from "@/lib/showcaseHelper";
import ShowroomClient from "./ShowroomClient";
import ShowroomAuthGate from "./components/ShowroomAuthGate";
import "./showroom.css";

export const metadata = {
  title: 'Showroom Private Collection | Jewel Exchange',
  description: 'Private in-store client showroom view.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

// Must be dynamic to check httpOnly session cookie per request
export const dynamic = 'force-dynamic';

export default async function ShowroomPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jewel_showroom_token")?.value;
  const isAuthorized = verifyAuthToken(token);

  // If unauthorized: return the auth gate alone. Zero product data is sent to the client.
  if (!isAuthorized) {
    return (
      <main className="showroom-shell">
        <ShowroomAuthGate />
      </main>
    );
  }

  // Authorized: fetch showroom catalog and render the showroom application
  const rawItems = await getShowcaseItems();
  const items = (rawItems || []).map((item, idx) => enrichShowcaseItem(item, idx));

  return <ShowroomClient initialItems={items} />;
}
