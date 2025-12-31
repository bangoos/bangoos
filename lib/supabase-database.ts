import { supabase, supabaseService } from "./supabase";
import { Database } from "./types";
import { promises as fs } from "fs";
import path from "path";

export const DB_FILENAME = "db.json";
const LOCAL_DB_PATH = path.join(process.cwd(), DB_FILENAME);

export async function getDatabase(): Promise<Database> {
  // Check if Supabase is available
  if (!supabase) {
    console.warn("Supabase not configured, using fallback data");
    return getFallbackData();
  }

  try {
    // Try Supabase first
    console.log("Fetching database from Supabase...");

    // Fetch all data from Supabase
    const { data: blogData, error: blogError } = await supabase.from("blog").select("*").order("created_at", { ascending: false });

    const { data: portfolioData, error: portfolioError } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });

    const { data: productsData, error: productsError } = await supabase.from("products").select("*").order("created_at", { ascending: false });

    // Check for errors
    if (blogError || portfolioError || productsError) {
      console.error("Supabase errors:", { blogError, portfolioError, productsError });
      throw new Error("Supabase fetch failed");
    }

    const result = {
      blog: blogData || [],
      portfolio: portfolioData || [],
      products: productsData || [],
    };

    console.log("Database loaded successfully from Supabase, items:", {
      blog: result.blog.length,
      portfolio: result.portfolio.length,
      products: result.products.length,
    });

    // Save to local file as backup
    await saveLocalBackup(result);

    return result;
  } catch (e) {
    console.error("Failed to fetch from Supabase, falling back to local DB", e);
    return getFallbackData();
  }
}

function getFallbackData(): Database {
  // Try local file first
  try {
    const localData = require("fs").readFileSync(LOCAL_DB_PATH, "utf-8");
    const parsed = JSON.parse(localData);
    console.log("Using local database, items:", {
      blog: parsed.blog?.length || 0,
      portfolio: parsed.portfolio?.length || 0,
      products: parsed.products?.length || 0,
    });
    return parsed;
  } catch (localError) {
    console.error("Local DB also failed, using hardcoded fallback data", localError);

    // Ultimate fallback
    return {
      blog: [],
      portfolio: [
        {
          id: "portfolio-1",
          title: "Toko Fashion Online Karawang",
          description: "Website e-commerce modern untuk toko fashion dengan fitur shopping cart, payment gateway, dan inventory management.",
          category: "UMKM",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
          slug: "portfolio-toko-fashion-online-karawang",
        },
        {
          id: "portfolio-2",
          title: "Sistem Informasi Akademik Kampus",
          description: "Aplikasi web lengkap untuk manajemen akademik kampus dengan fitur login, dashboard, dan laporan.",
          category: "Skripsi",
          image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",
          slug: "portfolio-sistem-informasi-akademik",
        },
        {
          id: "portfolio-3",
          title: "Company Profile PT. Maju Bersama",
          description: "Website profil perusahaan profesional dengan desain modern dan animasi yang menarik.",
          category: "Kantor",
          image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
          slug: "portfolio-company-profile-pt-maju-bersama",
        },
      ],
      products: [
        {
          id: "product-1",
          name: "Starter",
          price: "Rp 1.5 Juta",
          features: ["Landing Page 1 Section", "Desain Modern", "Free Domain .my.id", "Gratis Meeting Selamanya", "Revisi 2x"],
        },
        {
          id: "product-2",
          name: "Bisnis",
          price: "Rp 3 Juta",
          features: ["Hingga 5 Halaman", "SEO Basic Karawang", "Integrasi WhatsApp", "Analitik Google", "Revisi 3x", "Support Prioritas"],
        },
        {
          id: "product-3",
          name: "Custom / Skripsi",
          price: "Rp 5 Juta",
          features: ["Full Sistem Database", "Fitur Komplet (Login/Admin)", "Source Code Lengkap (Skripsi)", "Dokumentasi", "Revisi 5x", "Guidance Bimbingan"],
        },
      ],
    };
  }
}

// Save local backup
async function saveLocalBackup(data: Database): Promise<void> {
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log("Local backup saved:", LOCAL_DB_PATH);
  } catch (e) {
    console.error("Failed to save local backup", e);
  }
}

export async function saveDatabase(data: Database): Promise<void> {
  if (!supabaseService) {
    console.error("Supabase service client not available");
    throw new Error("Supabase service client not available");
  }

  try {
    console.log("Saving database to Supabase...");

    // Save blog data
    if (data.blog && data.blog.length > 0) {
      for (const blog of data.blog) {
        const { error } = await supabaseService.from("blog").upsert(blog, { onConflict: "id" });

        if (error) {
          console.error("Failed to save blog:", error);
          throw error;
        }
      }
    }

    // Save portfolio data
    if (data.portfolio && data.portfolio.length > 0) {
      for (const portfolio of data.portfolio) {
        const { error } = await supabaseService.from("portfolio").upsert(portfolio, { onConflict: "id" });

        if (error) {
          console.error("Failed to save portfolio:", error);
          throw error;
        }
      }
    }

    // Save products data
    if (data.products && data.products.length > 0) {
      for (const product of data.products) {
        const { error } = await supabaseService.from("products").upsert(product, { onConflict: "id" });

        if (error) {
          console.error("Failed to save product:", error);
          throw error;
        }
      }
    }

    console.log("Database saved successfully to Supabase");

    // Save local backup
    await saveLocalBackup(data);
  } catch (e) {
    console.error("Failed to save to Supabase", e);

    // Fallback to local only
    console.log("Falling back to local file only...");
    await saveLocalBackup(data);
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!supabaseService) {
    throw new Error("Supabase service client not available");
  }

  try {
    const { error } = await supabaseService.from("blog").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete blog post:", error);
      throw error;
    }
    console.log("Blog post deleted successfully from Supabase");
  } catch (e) {
    console.error("Failed to delete blog post from Supabase", e);
    throw e;
  }
}

export async function deletePortfolioItem(id: string): Promise<void> {
  if (!supabaseService) {
    throw new Error("Supabase service client not available");
  }

  try {
    const { error } = await supabaseService.from("portfolio").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete portfolio item:", error);
      throw error;
    }
    console.log("Portfolio item deleted successfully from Supabase");
  } catch (e) {
    console.error("Failed to delete portfolio item from Supabase", e);
    throw e;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (!supabaseService) {
    throw new Error("Supabase service client not available");
  }

  try {
    const { error } = await supabaseService.from("products").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
    console.log("Product deleted successfully from Supabase");
  } catch (e) {
    console.error("Failed to delete product from Supabase", e);
    throw e;
  }
}

// Image upload to Supabase Storage
export async function uploadImage(file: File, folder: string = "images"): Promise<string> {
  if (!supabaseService) {
    throw new Error("Supabase service client not available");
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabaseService.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.error("Failed to upload image:", error);
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseService.storage.from("images").getPublicUrl(fileName);

    console.log("Image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (e) {
    console.error("Failed to upload image to Supabase", e);
    throw e;
  }
}
