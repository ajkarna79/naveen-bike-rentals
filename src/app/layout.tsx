import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, business } from "@/lib/site";

const sans = Work_Sans({ subsets: ["latin"], variable: "--font-work", display: "swap" });
/** Barlow was drawn from highway signs and licence plates: used only on the rental plates. */
const plate = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow",
  display: "swap",
});

const SEO_DESCRIPTION =
  "Scooty from ₹399/day, Pulsar & FZ from ₹499, Royal Enfield from ₹1,099 in Hanamkonda & Warangal, 125–200 km a day included. Open 6 AM–11:30 PM. Book on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bike & Scooty Rental in Hanamkonda, Warangal | Naveen Bike Rentals",
    template: "%s | Naveen Bike Rentals",
  },
  description: SEO_DESCRIPTION,
  applicationName: business.name,
  keywords: [
    "bike rental Hanamkonda",
    "bike rental Warangal",
    "scooty rental Warangal",
    "Royal Enfield rental Warangal",
    "Activa rent Hanamkonda",
    "bike on rent Kishanpura",
    "bike rental Kazipet",
    "bike rental near NIT Warangal",
    "scooty on rent Hanamkonda",
    "Royal Enfield on rent Warangal",
    "Naveen Bike Rentals",
  ],
  // Optional: set these in Netlify to verify Google Search Console and Bing Webmaster Tools by meta tag.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    url: "/",
    title: "Naveen Bike Rentals: bike and scooty rental in Hanamkonda, Warangal",
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen Bike Rentals: bike and scooty rental in Hanamkonda, Warangal",
    description: SEO_DESCRIPTION,
  },
  formatDetection: { telephone: true, address: true },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#eeeeeb",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${plate.variable}`}>
      <body className="min-h-dvh">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
