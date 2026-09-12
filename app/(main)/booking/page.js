import BookingClient from "./BookingClient";

export const metadata = {
  title: "Book a Consultation",
  description: "Schedule a private consultation, showroom viewing, or bespoke design session at Jewel Exchange's Colombo atelier. Let's create your perfect piece.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Book a Private Consultation | Jewel Exchange",
    description: "Schedule a private showroom viewing or bespoke design consultation at Jewel Exchange.",
    url: "https://www.jewelexchange.lk/booking",
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
