import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jasa Website Karawang | BangOos Web - Professional Web Development",
  description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi. SEO lokal Karawang, gratis hosting selamanya.",
  keywords:
    "jasa website karawang, web developer karawang, pembuatan website karawang, website umkm karawang, seo karawang, toko online karawang, company profile karawang, web skripsi karawang, jasa web murah karawang, website profesional karawang",
  authors: [{ name: "BangOos Web Solutions" }],
  creator: "BangOos Web",
  publisher: "BangOos Web Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bangoos.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jasa Website Karawang | BangOos Web - Professional Web Development",
    description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi dengan SEO lokal Karawang.",
    url: "https://bangoos.id",
    siteName: "BangOos Web Solutions",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Website Karawang | BangOos Web",
    description: "Jasa pembuatan website profesional di Karawang. Spesialis website UMKM, toko online, company profile, web skripsi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
