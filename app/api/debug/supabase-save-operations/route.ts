import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "supabase_save_operations_debug",
    project: "Bangoos Web",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Testing Supabase Service Client...");

    // Test service client creation
    const { createClient } = await import("@supabase/supabase-js");
    const serviceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    debug.service_client = serviceClient ? "CREATED" : "FAILED";

    debug.steps.push("Step 2: Testing Service Role Authentication...");

    // Test service role authentication
    try {
      const { data, error } = await serviceClient.from("blog").select("count", { count: "exact", head: true });
      debug.service_auth = {
        success: !error,
        error: error?.message,
        blog_count: data ? data[0]?.count : 0,
      };
    } catch (authError) {
      debug.service_auth = {
        success: false,
        error: authError instanceof Error ? authError.message : "Service auth failed",
      };
    }

    debug.steps.push("Step 3: Testing Blog Save Operation...");

    // Test blog save operation
    try {
      const testBlog = {
        id: `save-test-${Date.now()}`,
        title: "Save Test Entry",
        slug: `save-test-${Date.now()}`,
        content: "Testing save operation",
        image: "https://example.com/save-test.jpg",
        date: new Date().toLocaleDateString("id-ID"),
      };

      const { data, error } = await serviceClient.from("blog").upsert(testBlog, { onConflict: "id" }).select();
      debug.blog_save_test = {
        success: !error,
        error: error?.message,
        data: data,
      };

      // Clean up test entry
      if (data && data.length > 0) {
        const { error: deleteError } = await serviceClient.from("blog").delete().eq("id", testBlog.id);
        debug.blog_cleanup = {
          success: !deleteError,
          error: deleteError?.message,
        };
      }
    } catch (saveError) {
      debug.blog_save_test = {
        success: false,
        error: saveError instanceof Error ? saveError.message : "Save operation failed",
      };
    }

    debug.steps.push("Step 4: Testing Portfolio Save Operation...");

    // Test portfolio save operation
    try {
      const testPortfolio = {
        id: `portfolio-save-test-${Date.now()}`,
        title: "Portfolio Save Test",
        description: "Testing portfolio save",
        category: "UMKM",
        image: "https://example.com/portfolio-save-test.jpg",
        slug: `portfolio-save-test-${Date.now()}`,
      };

      const { data, error } = await serviceClient.from("portfolio").upsert(testPortfolio, { onConflict: "id" }).select();
      debug.portfolio_save_test = {
        success: !error,
        error: error?.message,
        data: data,
      };

      // Clean up test entry
      if (data && data.length > 0) {
        const { error: deleteError } = await serviceClient.from("portfolio").delete().eq("id", testPortfolio.id);
        debug.portfolio_cleanup = {
          success: !deleteError,
          error: deleteError?.message,
        };
      }
    } catch (portfolioSaveError) {
      debug.portfolio_save_test = {
        success: false,
        error: portfolioSaveError instanceof Error ? portfolioSaveError.message : "Portfolio save failed",
      };
    }

    debug.steps.push("Step 5: Testing Delete Operations...");

    // Test delete operation
    try {
      const testId = `delete-test-${Date.now()}`;

      // First insert a test entry
      await serviceClient.from("blog").insert({
        id: testId,
        title: "Delete Test Entry",
        slug: `delete-test-${Date.now()}`,
        content: "Testing delete operation",
        image: "https://example.com/delete-test.jpg",
        date: new Date().toLocaleDateString("id-ID"),
      });

      // Then delete it
      const { error } = await serviceClient.from("blog").delete().eq("id", testId);
      debug.delete_test = {
        success: !error,
        error: error?.message,
      };
    } catch (deleteError) {
      debug.delete_test = {
        success: false,
        error: deleteError instanceof Error ? deleteError.message : "Delete operation failed",
      };
    }

    debug.steps.push("Step 6: Environment Variables Check...");
    debug.env_check = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      service_key_prefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + "...",
      service_key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length,
      url_valid: process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https://"),
    };

    debug.steps.push("Step 7: Error Analysis...");
    debug.error_analysis = {
      possible_causes: ["Service role key invalid/expired", "RLS policies blocking service role", "Table permissions incorrect", "Network connectivity issues", "Supabase service restrictions"],
      recommendations: [],
    };

    if (debug.service_auth?.error) {
      debug.error_analysis.recommendations.push(`Service auth error: ${debug.service_auth.error}`);
    }
    if (debug.blog_save_test?.error) {
      debug.error_analysis.recommendations.push(`Blog save error: ${debug.blog_save_test.error}`);
    }
    if (debug.delete_test?.error) {
      debug.error_analysis.recommendations.push(`Delete error: ${debug.delete_test.error}`);
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
