import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import HomeClient from "@/components/home/HomeClient";
import type { Metadata } from "next";

export const revalidate = 0; // Disable caching for this page

export const metadata: Metadata = {
  title: "Jasa Website Karawang | BangOos Web - #1 Web Development & SEO Expert",
  description: "Jasa pembuatan website profesional terbaik di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal #1 Karawang. Gratis hosting selamanya, garansi halaman 1 Google.",
  keywords:
    "jasa website karawang, web developer karawang, pembuatan website karawang, website umkm karawang, seo karawang, toko online karawang, company profile karawang, web skripsi karawang, jasa web murah karawang, website profesional karawang, jasa seo karawang, website karawang murah, pembuatan web karawang, developer web karawang, optimasi seo karawang, website company profile karawang",
  authors: [{ name: "BangOos Web Solutions" }],
  creator: "BangOos Web Solutions",
  publisher: "BangOos Web Solutions",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Jasa Website Karawang | BangOos Web - #1 Web Development & SEO Expert",
    description: "Jasa pembuatan website profesional terbaik di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal #1 Karawang. Gratis hosting selamanya.",
    url: "https://bangoos.id",
    siteName: "BangOos Web Solutions",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://bangoos.id/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BangOos Web - Jasa Website Karawang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Website Karawang | BangOos Web - #1 Web Development & SEO Expert",
    description: "Jasa pembuatan website profesional terbaik di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal #1 Karawang.",
    images: ["https://bangoos.id/og-image.jpg"],
  },
  alternates: {
    canonical: "https://bangoos.id",
  },
};

export default async function Home() {
  const db: Database = await getDatabase();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bangoos.id#business",
    name: "BangOos Web Solutions",
    alternateName: "BangOos Web",
    description: "Jasa pembuatan website profesional terbaik di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal #1 Karawang. Gratis hosting selamanya, garansi halaman 1 Google.",
    url: "https://bangoos.id",
    telephone: "+62 812-3456-7890",
    email: "halo@bangoos.id",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karawang",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
      postalCode: "41311",
      streetAddress: "Karawang, Jawa Barat",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.3167",
      longitude: "107.2931",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "Rp1.500.000 - Rp5.000.000",
    paymentAccepted: ["Cash", "Bank Transfer", "E-Wallet"],
    currenciesAccepted: "IDR",
    serviceType: ["Jasa Pembuatan Website", "Website UMKM", "Toko Online", "Company Profile", "Web Skripsi", "SEO Lokal Karawang", "Web Development", "E-commerce Solutions", "Digital Marketing"],
    areaServed: {
      "@type": "Place",
      name: "Karawang, Jawa Barat, Indonesia",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website UMKM Starter",
            description: "Landing Page profesional untuk UMKM Karawang",
          },
          price: "1500000",
          priceCurrency: "IDR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Bisnis",
            description: "Website lengkap dengan SEO untuk bisnis Karawang",
          },
          price: "3000000",
          priceCurrency: "IDR",
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomeClient db={db} />
    </>
  );
}
