import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import HomeClient from "@/components/home/HomeClient";
import type { Metadata } from "next";

export const revalidate = 0; // Disable caching for this page

export const metadata: Metadata = {
  title: "Jasa Website Karawang | BangOos Web - Professional Web Development",
  description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi. SEO lokal Karawang, gratis hosting selamanya.",
  keywords:
    "jasa website karawang, web developer karawang, pembuatan website karawang, website umkm karawang, seo karawang, toko online karawang, company profile karawang, web skripsi karawang, jasa web murah karawang, website profesional karawang",
  openGraph: {
    title: "Jasa Website Karawang | BangOos Web - Professional Web Development",
    description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal Karawang.",
    url: "https://bangoos.id",
    siteName: "BangOos Web Solutions",
    locale: "id_ID",
    type: "website",
  },
};

export default async function Home() {
  const db: Database = await getDatabase();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BangOos Web Solutions",
    description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi.",
    url: "https://bangoos.id",
    telephone: "+62 812-3456-7890",
    email: "halo@bangoos.id",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karawang",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.3167",
      longitude: "107.2931",
    },
    openingHours: "Mo-Su 00:00-23:59",
    serviceType: ["Jasa Pembuatan Website", "Website UMKM", "Toko Online", "Company Profile", "Web Skripsi", "SEO Lokal Karawang"],
    areaServed: "Karawang, Jawa Barat, Indonesia",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomeClient db={db} />
    </>
  );
}
