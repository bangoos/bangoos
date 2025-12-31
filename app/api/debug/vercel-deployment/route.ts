import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "vercel_deployment_debug",
    project: "Bangoos Web",
    environment: {},
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Environment Variables Check...");
    debug.environment = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT_SET",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT_SET",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT_SET",
      VERCEL_BLOB_READ_WRITE_TOKEN: process.env.VERCEL_BLOB_READ_WRITE_TOKEN ? "SET" : "NOT_SET",
      NODE_ENV: process.env.NODE_ENV || "NOT_SET",
      VERCEL: process.env.VERCEL || "NOT_SET",
      VERCEL_ENV: process.env.VERCEL_ENV || "NOT_SET",
      VERCEL_URL: process.env.VERCEL_URL || "NOT_SET",
      VERCEL_REGION: process.env.VERCEL_REGION || "NOT_SET",
    };

    debug.steps.push("Step 2: Runtime Information...");
    debug.runtime = {
      platform: process.platform,
      arch: process.arch,
      node_version: process.version,
      is_production: process.env.NODE_ENV === "production",
      is_vercel: !!process.env.VERCEL,
      vercel_env: process.env.VERCEL_ENV,
    };

    debug.steps.push("Step 3: Import Test...");
    try {
      // Test importing supabase-database
      const supabaseDatabase = await import("@/lib/supabase-database");
      debug.import_test = {
        supabase_database: "SUCCESS",
        functions_available: {
          getDatabase: typeof supabaseDatabase.getDatabase === "function",
          saveDatabase: typeof supabaseDatabase.saveDatabase === "function",
          deleteBlogPost: typeof supabaseDatabase.deleteBlogPost === "function",
          deletePortfolioItem: typeof supabaseDatabase.deletePortfolioItem === "function",
          deleteProduct: typeof supabaseDatabase.deleteProduct === "function",
          uploadImage: typeof supabaseDatabase.uploadImage === "function",
        },
      };
    } catch (importError) {
      debug.import_test = {
        supabase_database: "FAILED",
        error: importError instanceof Error ? importError.message : "Import failed",
      };
    }

    debug.steps.push("Step 4: Supabase Connection Test...");
    try {
      const { supabase, supabaseService } = await import("@/lib/supabase");
      debug.supabase_clients = {
        supabase: supabase ? "CREATED" : "FAILED",
        supabaseService: supabaseService ? "CREATED" : "FAILED",
      };

      if (supabase) {
        // Test basic connection
        const { data, error } = await supabase.from("blog").select("count", { count: "exact", head: true });
        debug.supabase_connection = {
          success: !error,
          error: error?.message,
          blog_count: data ? data[0]?.count : 0,
        };
      }
    } catch (supabaseError) {
      debug.supabase_connection = {
        success: false,
        error: supabaseError instanceof Error ? supabaseError.message : "Supabase connection failed",
      };
    }

    debug.steps.push("Step 5: Database Functions Test...");
    try {
      const { getDatabase, saveDatabase } = await import("@/lib/supabase-database");

      // Test getDatabase
      const db = await getDatabase();
      debug.get_db_test = {
        success: true,
        blog_count: db.blog.length,
        portfolio_count: db.portfolio.length,
        products_count: db.products.length,
      };

      // Test saveDatabase with minimal data
      const testDb = {
        blog: [
          ...db.blog,
          {
            id: `vercel-test-${Date.now()}`,
            title: "Vercel Test Entry",
            slug: `vercel-test-${Date.now()}`,
            content: "Testing save on Vercel deployment",
            image: "https://example.com/vercel-test.jpg",
            date: new Date().toLocaleDateString("id-ID"),
          },
        ],
        portfolio: db.portfolio,
        products: db.products,
      };

      await saveDatabase(testDb);
      debug.save_db_test = {
        success: true,
        message: "Save function executed on Vercel",
      };

      // Clean up test entry
      const { deleteBlogPost } = await import("@/lib/supabase-database");
      await deleteBlogPost(`vercel-test-${Date.now()}`);
      debug.cleanup_test = {
        success: true,
        message: "Test entry cleaned up",
      };
    } catch (dbFunctionError) {
      debug.db_functions_test = {
        success: false,
        error: dbFunctionError instanceof Error ? dbFunctionError.message : "Database functions failed",
      };
    }

    debug.steps.push("Step 6: Vercel-Specific Issues...");
    debug.vercel_issues = {
      possible_causes: [
        "Environment variables not set in Vercel dashboard",
        "Supabase keys not properly configured for production",
        "Network restrictions on Vercel edge",
        "Build process not including new files",
        "Import path resolution issues on Vercel",
        "Service role key permissions in production",
        "Supabase RLS policies blocking Vercel IP ranges",
      ],
      recommendations: ["Check Vercel dashboard Environment Variables", "Verify Supabase project settings", "Check Vercel build logs", "Test with production Supabase keys", "Verify import paths in production build"],
    };

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
