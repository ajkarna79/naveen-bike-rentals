import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { SITE_URL, business } from "@/lib/site";

const sans = Work_Sans({ subsets: ["latin"], variable: "--font-work", display: "swap" });
/** Barlow was drawn from highway signs and licence plates: used only on the rental plates. */
const plate = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bike & Scooty Rental in Hanamkonda, Warangal | Naveen Bike Rentals",
    template: "%s | Naveen Bike Rentals",
  },
  description: business.description,
  applicationName: business.name,
  keywords: [
    "bike rental Hanamkonda",
    "bike rental Warangal",
    "scooty rental Warangal",
    "Royal Enfield rental Warangal",
    "Activa rent Hanamkonda",
    "bike on rent Kishanpura",
    "Naveen Bike Rentals",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    url: "/",
    title: "Naveen Bike Rentals: bikes and scooters on rent in Hanamkonda",
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen Bike Rentals: bikes and scooters on rent in Hanamkonda",
    description: business.description,
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
