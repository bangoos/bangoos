import { put, list } from "@vercel/blob";
import { Database } from "./types";
import { promises as fs } from "fs";
import path from "path";

export const DB_FILENAME = "db.json";
const LOCAL_DB_PATH = path.join(process.cwd(), DB_FILENAME);

export async function getDatabase(): Promise<Database> {
  try {
    const { blobs } = await list({ prefix: DB_FILENAME });
    if (blobs.length > 0) {
      const blob = blobs[0];
      const res = await fetch(blob.url);
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to list blobs, falling back to local DB", e);
  }

  // try local file fallback
  try {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const parsedData = JSON.parse(raw) as Database;

    // If database exists but portfolio/products are empty, add default content
    if (parsedData.portfolio.length === 0 || parsedData.products.length === 0) {
      const defaultData = getDefaultData();
      const updatedData = {
        blog: parsedData.blog,
        portfolio: parsedData.portfolio.length > 0 ? parsedData.portfolio : defaultData.portfolio,
        products: parsedData.products.length > 0 ? parsedData.products : defaultData.products,
      };

      // Auto-save the updated data with defaults
      try {
        await saveDatabase(updatedData);
        console.log("Auto-saved default data to database");
      } catch (e) {
        console.error("Failed to auto-save default data", e);
      }

      return updatedData;
    }

    return parsedData;
  } catch (e) {
    // ignore and return empty with defaults
  }

  const defaultData = getDefaultData();

  // Auto-save default data if database is completely empty
  try {
    await saveDatabase(defaultData);
    console.log("Auto-saved initial default data to database");
  } catch (e) {
    console.error("Failed to auto-save initial default data", e);
  }

  return defaultData;
}

function getDefaultData(): Database {
  return {
    blog: [],
    portfolio: [
      {
        id: "portfolio-1",
        title: "Toko Fashion Online Karawang",
        description: "Website e-commerce modern untuk toko fashion dengan fitur shopping cart, payment gateway, dan inventory management. Desain responsive dengan UI/UX yang user-friendly.",
        category: "UMKM",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        slug: "portfolio-toko-fashion-online-karawang",
      },
      {
        id: "portfolio-2",
        title: "Website Company Profile PT. Maju Bersama",
        description: "Website profesional untuk perusahaan dengan fitur company profile, services, portfolio, dan contact form. SEO optimized dengan loading speed yang cepat.",
        category: "Kantor",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        slug: "portfolio-website-company-profile-pt-maju-bersama",
      },
      {
        id: "portfolio-3",
        title: "Website Portal Skripsi Online",
        description: "Platform digital untuk mahasiswa dengan fitur browsing judul skripsi, download materi, dan konsultasi online. Database management yang terstruktur.",
        category: "Skripsi",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        slug: "portfolio-website-portal-skripsi-online",
      },
      {
        id: "portfolio-4",
        title: "Resto Cafe Digital Platform",
        description: "Website untuk restoran dengan fitur online ordering, reservation system, menu digital, dan customer reviews. Integrasi dengan WhatsApp untuk order confirmation.",
        category: "UMKM",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        slug: "portfolio-resto-cafe-digital-platform",
      },
    ],
    products: [
      {
        id: "product-1",
        name: "Paket Starter",
        price: "Rp 1.500.000",
        features: ["1 Halaman Landing", "Responsive Design", "Basic SEO Setup", "Free Domain .com", "SSL Certificate", "Email Integration", "3 Revisions", "2 Weeks Support"],
      },
      {
        id: "product-2",
        name: "Paket Business",
        price: "Rp 3.500.000",
        features: ["5 Halaman Website", "Advanced SEO", "Contact Form", "Free Domain .com", "SSL Certificate", "Email Integration", "Google Analytics", "Social Media Integration", "Unlimited Revisions", "1 Month Support"],
      },
      {
        id: "product-3",
        name: "Paket E-Commerce",
        price: "Rp 5.500.000",
        features: [
          "Full E-Commerce System",
          "Shopping Cart",
          "Payment Gateway",
          "Inventory Management",
          "Free Domain .com",
          "SSL Certificate",
          "Email Integration",
          "Google Analytics",
          "SEO Optimization",
          "Unlimited Revisions",
          "3 Months Support",
          "Basic Training",
        ],
      },
    ],
  };
}

export async function saveDatabase(data: Database): Promise<void> {
  try {
    await put(DB_FILENAME, JSON.stringify(data, null, 2), { access: "public", contentType: "application/json", allowOverwrite: true });
    return;
  } catch (e) {
    console.error("Vercel Blob save failed, writing local DB file", e);
  }

  // local fallback
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local DB file", e);
    throw e;
  }
}
