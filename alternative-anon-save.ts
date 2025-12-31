// Alternative: Use anon key for save operations
// Update lib/supabase-database.ts

import { supabase } from "./supabase"; // Use anon client instead of service

export async function saveDatabase(data: Database): Promise<void> {
  if (!supabase) {
    console.error("Supabase client not available");
    throw new Error("Supabase client not available");
  }

  try {
    console.log("Saving database to Supabase using anon key...");

    // Save blog data
    if (data.blog && data.blog.length > 0) {
      for (const blog of data.blog) {
        const { error } = await supabase.from("blog").upsert(blog, { onConflict: "id" });

        if (error) {
          console.error("Failed to save blog:", error);
          throw error;
        }
      }
    }

    // Save portfolio data
    if (data.portfolio && data.portfolio.length > 0) {
      for (const portfolio of data.portfolio) {
        const { error } = await supabase.from("portfolio").upsert(portfolio, { onConflict: "id" });

        if (error) {
          console.error("Failed to save portfolio:", error);
          throw error;
        }
      }
    }

    // Save products data
    if (data.products && data.products.length > 0) {
      for (const product of data.products) {
        const { error } = await supabase.from("products").upsert(product, { onConflict: "id" });

        if (error) {
          console.error("Failed to save product:", error);
          throw error;
        }
      }
    }

    console.log("Database saved successfully to Supabase using anon key");

    // Save local backup
    await saveLocalBackup(data);
  } catch (e) {
    console.error("Failed to save to Supabase", e);

    // Fallback to local only
    console.log("Falling back to local file only...");
    await saveLocalBackup(data);
  }
}
