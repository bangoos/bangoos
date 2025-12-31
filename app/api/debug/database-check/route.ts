import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseService } from "@/lib/supabase";
import { getDatabase, saveDatabase } from "@/lib/vercel-blob";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "bangoos_supabase_database_check",
    project: "Bangoos Web",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Checking environment variables...");
    debug.env_vars = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT_SET",
      url_preview: process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30) + "..." : "NONE",
      anon_key_set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service_key_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    debug.steps.push("Step 2: Testing Supabase clients...");
    debug.clients = {
      supabase: supabase ? "CREATED" : "FAILED",
      supabaseService: supabaseService ? "CREATED" : "FAILED",
    };

    debug.steps.push("Step 3: Testing database connection...");
    if (supabase) {
      try {
        // Test blog table
        const { data: blogData, error: blogError } = await supabase.from("blog").select("count", { count: "exact", head: true });
        debug.blog_test = {
          success: !blogError,
          error: blogError?.message,
          count: blogData ? blogData[0]?.count : 0,
        };

        // Test portfolio table
        const { data: portfolioData, error: portfolioError } = await supabase.from("portfolio").select("count", { count: "exact", head: true });
        debug.portfolio_test = {
          success: !portfolioError,
          error: portfolioError?.message,
          count: portfolioData ? portfolioData[0]?.count : 0,
        };

        // Test products table
        const { data: productsData, error: productsError } = await supabase.from("products").select("count", { count: "exact", head: true });
        debug.products_test = {
          success: !productsError,
          error: productsError?.message,
          count: productsData ? productsData[0]?.count : 0,
        };
      } catch (connError) {
        debug.connection_test = {
          success: false,
          error: connError instanceof Error ? connError.message : "Connection failed",
        };
      }
    }

    debug.steps.push("Step 4: Testing write operations...");
    if (supabaseService) {
      try {
        // Test insert operation
        const testBlog = {
          id: `test-${Date.now()}`,
          title: "Test Blog Entry",
          slug: `test-blog-${Date.now()}`,
          content: "Test content for database operations",
          image: "https://example.com/test.jpg",
          date: new Date().toLocaleDateString("id-ID"),
        };

        const { data: insertData, error: insertError } = await supabaseService.from("blog").insert(testBlog).select();
        debug.insert_test = {
          success: !insertError,
          error: insertError?.message,
          data: insertData,
        };

        // Test delete operation
        if (insertData && insertData.length > 0) {
          const { error: deleteError } = await supabaseService.from("blog").delete().eq("id", testBlog.id);
          debug.delete_test = {
            success: !deleteError,
            error: deleteError?.message,
          };
        }
      } catch (opError) {
        debug.operations_test = {
          success: false,
          error: opError instanceof Error ? opError.message : "Operations failed",
        };
      }
    }

    debug.steps.push("Step 5: Checking Vercel Blob integration...");
    try {
      const localDb = await getDatabase();
      debug.vercel_blob = {
        connected: true,
        blog_count: localDb.blog.length,
        portfolio_count: localDb.portfolio.length,
        products_count: localDb.products.length,
        total_items: localDb.blog.length + localDb.portfolio.length + localDb.products.length,
      };
    } catch (blobError) {
      debug.vercel_blob = {
        connected: false,
        error: blobError instanceof Error ? blobError.message : "Vercel Blob failed",
      };
    }

    debug.steps.push("Step 6: Testing save operations...");
    try {
      // Test save to Vercel Blob
      const testDb = await getDatabase();
      const originalBlogCount = testDb.blog.length;

      // Add test item
      testDb.blog.push({
        id: `blob-test-${Date.now()}`,
        title: "Blob Test Entry",
        slug: `blob-test-${Date.now()}`,
        content: "Test content for Vercel Blob",
        image: "https://example.com/blob-test.jpg",
        date: new Date().toLocaleDateString("id-ID"),
      });

      await saveDatabase(testDb);

      // Verify save
      const savedDb = await getDatabase();
      debug.save_test = {
        success: savedDb.blog.length > originalBlogCount,
        original_count: originalBlogCount,
        saved_count: savedDb.blog.length,
        test_item_found: savedDb.blog.some((item) => item.id.includes("blob-test")),
      };

      // Clean up test item
      const cleanedDb = savedDb;
      cleanedDb.blog = cleanedDb.blog.filter((item) => !item.id.includes("blob-test"));
      await saveDatabase(cleanedDb);
    } catch (saveError) {
      debug.save_test = {
        success: false,
        error: saveError instanceof Error ? saveError.message : "Save operation failed",
      };
    }

    debug.steps.push("Step 7: Recommendations...");
    debug.recommendations = [];

    if (debug.env_vars.supabase_url === "NOT_SET") {
      debug.recommendations.push("❌ Supabase URL not configured");
    } else {
      debug.recommendations.push("✅ Supabase URL configured");
    }

    if (debug.clients.supabase === "CREATED") {
      debug.recommendations.push("✅ Supabase client created");
    } else {
      debug.recommendations.push("❌ Supabase client failed");
    }

    if (debug.blog_test?.success && debug.portfolio_test?.success && debug.products_test?.success) {
      debug.recommendations.push("✅ All database tables accessible");
    } else {
      debug.recommendations.push("❌ Some database tables not accessible");
    }

    if (debug.insert_test?.success && debug.delete_test?.success) {
      debug.recommendations.push("✅ Write operations working");
    } else {
      debug.recommendations.push("❌ Write operations failed");
    }

    if (debug.vercel_blob?.connected) {
      debug.recommendations.push("✅ Vercel Blob connected");
    } else {
      debug.recommendations.push("❌ Vercel Blob failed");
    }

    if (debug.save_test?.success) {
      debug.recommendations.push("✅ Save operations working");
    } else {
      debug.recommendations.push("❌ Save operations failed");
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
