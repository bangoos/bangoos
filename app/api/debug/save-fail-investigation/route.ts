import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseService } from "@/lib/supabase";
import { getDatabase, saveDatabase, deleteBlogPost, deletePortfolioItem, deleteProduct, uploadImage } from "@/lib/supabase-database";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "bangoos_save_fail_investigation",
    project: "Bangoos Web",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Environment Variables Deep Check...");
    debug.env_vars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT_SET",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT_SET",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT_SET",
      NODE_ENV: process.env.NODE_ENV || "NOT_SET",
    };

    debug.steps.push("Step 2: Supabase Clients Status...");
    debug.clients = {
      supabase: supabase ? "CREATED" : "FAILED",
      supabaseService: supabaseService ? "CREATED" : "FAILED",
    };

    debug.steps.push("Step 3: Database Schema Check...");
    if (supabase) {
      try {
        // Check table structures
        const { data: blogSchema, error: blogSchemaError } = await supabase.rpc("get_table_schema", { table_name: "blog" });
        debug.blog_schema = {
          success: !blogSchemaError,
          error: blogSchemaError?.message,
          schema: blogSchema,
        };

        const { data: portfolioSchema, error: portfolioSchemaError } = await supabase.rpc("get_table_schema", { table_name: "portfolio" });
        debug.portfolio_schema = {
          success: !portfolioSchemaError,
          error: portfolioSchemaError?.message,
          schema: portfolioSchema,
        };

        const { data: productsSchema, error: productsSchemaError } = await supabase.rpc("get_table_schema", { table_name: "products" });
        debug.products_schema = {
          success: !productsSchemaError,
          error: productsSchemaError?.message,
          schema: productsSchema,
        };
      } catch (schemaError) {
        debug.schema_check = {
          success: false,
          error: schemaError instanceof Error ? schemaError.message : "Schema check failed",
        };
      }
    }

    debug.steps.push("Step 4: RLS Policies Check...");
    if (supabaseService) {
      try {
        const { data: rlsPolicies, error: rlsError } = await supabaseService.from("pg_policies").select("tablename, policyname, permissive, roles, cmd, qual").in("tablename", ["blog", "portfolio", "products"]);

        debug.rls_policies = {
          success: !rlsError,
          error: rlsError?.message,
          policies: rlsPolicies || [],
        };
      } catch (rlsCheckError) {
        debug.rls_check = {
          success: false,
          error: rlsCheckError instanceof Error ? rlsCheckError.message : "RLS check failed",
        };
      }
    }

    debug.steps.push("Step 5: Test Individual Save Operations...");
    if (supabaseService) {
      try {
        // Test blog save
        const testBlog = {
          id: `blog-test-${Date.now()}`,
          title: "Test Blog Save",
          slug: `test-blog-save-${Date.now()}`,
          content: "Test content for blog save operation",
          image: "https://example.com/blog-test.jpg",
          date: new Date().toLocaleDateString("id-ID"),
        };

        const { data: blogSaveData, error: blogSaveError } = await supabaseService.from("blog").upsert(testBlog, { onConflict: "id" }).select();

        debug.blog_save_test = {
          success: !blogSaveError,
          error: blogSaveError?.message,
          data: blogSaveData,
        };

        // Test portfolio save
        const testPortfolio = {
          id: `portfolio-test-${Date.now()}`,
          title: "Test Portfolio Save",
          description: "Test portfolio description",
          category: "UMKM",
          image: "https://example.com/portfolio-test.jpg",
          slug: `test-portfolio-${Date.now()}`,
        };

        const { data: portfolioSaveData, error: portfolioSaveError } = await supabaseService.from("portfolio").upsert(testPortfolio, { onConflict: "id" }).select();

        debug.portfolio_save_test = {
          success: !portfolioSaveError,
          error: portfolioSaveError?.message,
          data: portfolioSaveData,
        };

        // Test products save
        const testProduct = {
          id: `product-test-${Date.now()}`,
          name: "Test Product Save",
          price: "Rp 1 Juta",
          features: ["Feature 1", "Feature 2", "Feature 3"],
        };

        const { data: productSaveData, error: productSaveError } = await supabaseService.from("products").upsert(testProduct, { onConflict: "id" }).select();

        debug.product_save_test = {
          success: !productSaveError,
          error: productSaveError?.message,
          data: productSaveData,
        };
      } catch (saveError) {
        debug.save_operations_test = {
          success: false,
          error: saveError instanceof Error ? saveError.message : "Save operations failed",
        };
      }
    }

    debug.steps.push("Step 6: Test Database Functions...");
    try {
      const db = await getDatabase();
      debug.get_db_function = {
        success: true,
        blog_count: db.blog.length,
        portfolio_count: db.portfolio.length,
        products_count: db.products.length,
      };

      // Test saveDatabase function
      const testDb = {
        blog: [
          ...db.blog,
          {
            id: `db-test-${Date.now()}`,
            title: "Database Function Test",
            slug: `db-function-test-${Date.now()}`,
            content: "Testing saveDatabase function",
            image: "https://example.com/db-test.jpg",
            date: new Date().toLocaleDateString("id-ID"),
          },
        ],
        portfolio: [
          ...db.portfolio,
          {
            id: `db-portfolio-test-${Date.now()}`,
            title: "DB Portfolio Test",
            description: "Testing portfolio save via database function",
            category: "UMKM" as const,
            image: "https://example.com/db-portfolio-test.jpg",
            slug: `db-portfolio-test-${Date.now()}`,
          },
        ],
        products: [
          ...db.products,
          {
            id: `db-product-test-${Date.now()}`,
            name: "DB Product Test",
            price: "Rp 2 Juta",
            features: ["DB Test Feature 1", "DB Test Feature 2"],
          },
        ],
      };

      await saveDatabase(testDb);
      debug.save_db_function = {
        success: true,
        message: "saveDatabase function executed",
      };

      // Verify data was saved
      const updatedDb = await getDatabase();
      debug.verify_save = {
        success: updatedDb.blog.length > db.blog.length && updatedDb.portfolio.length > db.portfolio.length && updatedDb.products.length > db.products.length,
        original_blog_count: db.blog.length,
        saved_blog_count: updatedDb.blog.length,
        original_portfolio_count: db.portfolio.length,
        saved_portfolio_count: updatedDb.portfolio.length,
        original_products_count: db.products.length,
        saved_products_count: updatedDb.products.length,
      };
    } catch (dbFunctionError) {
      debug.db_functions_test = {
        success: false,
        error: dbFunctionError instanceof Error ? dbFunctionError.message : "Database functions failed",
      };
    }

    debug.steps.push("Step 7: Error Analysis...");
    debug.error_analysis = {
      possible_causes: [
        "RLS policies blocking service role",
        "Missing required columns in tables",
        "Incorrect data types",
        "Service role key permissions",
        "Table constraints violations",
        "Network connectivity issues",
        "Supabase service limitations",
      ],
      recommendations: [],
    };

    if (debug.blog_save_test?.error) {
      debug.error_analysis.recommendations.push(`Blog save error: ${debug.blog_save_test.error}`);
    }
    if (debug.portfolio_save_test?.error) {
      debug.error_analysis.recommendations.push(`Portfolio save error: ${debug.portfolio_save_test.error}`);
    }
    if (debug.product_save_test?.error) {
      debug.error_analysis.recommendations.push(`Product save error: ${debug.product_save_test.error}`);
    }
    if (debug.save_db_function?.error) {
      debug.error_analysis.recommendations.push(`Save function error: ${debug.save_db_function.error}`);
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
