import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "supabase_connection_deep_debug",
    project: "Bangoos Web",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Testing Supabase Client Creation...");

    // Test with anon key
    const { createClient } = await import("@supabase/supabase-js");
    const anonClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    debug.anon_client = anonClient ? "CREATED" : "FAILED";

    debug.steps.push("Step 2: Testing Anon Client Connection...");
    try {
      const { data, error } = await anonClient.from("blog").select("count", { count: "exact", head: true });
      debug.anon_connection = {
        success: !error,
        error: error?.message,
        blog_count: data ? data[0]?.count : 0,
      };
    } catch (anonError) {
      debug.anon_connection = {
        success: false,
        error: anonError instanceof Error ? anonError.message : "Anon connection failed",
      };
    }

    debug.steps.push("Step 3: Testing Service Role Client...");
    const serviceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    debug.service_client = serviceClient ? "CREATED" : "FAILED";

    debug.steps.push("Step 4: Testing Service Role Connection...");
    try {
      const { data, error } = await serviceClient.from("blog").select("count", { count: "exact", head: true });
      debug.service_connection = {
        success: !error,
        error: error?.message,
        blog_count: data ? data[0]?.count : 0,
      };
    } catch (serviceError) {
      debug.service_connection = {
        success: false,
        error: serviceError instanceof Error ? serviceError.message : "Service connection failed",
      };
    }

    debug.steps.push("Step 5: Testing Direct HTTP Request...");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog?select=count()`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
      });
      debug.http_request = {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog`,
      };

      if (response.ok) {
        const data = await response.json();
        debug.http_request.count = data[0]?.count || 0;
      }
    } catch (httpError) {
      debug.http_request = {
        success: false,
        error: httpError instanceof Error ? httpError.message : "HTTP request failed",
      };
    }

    debug.steps.push("Step 6: Testing Service Role HTTP Request...");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog?select=count()`, {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
      });
      debug.service_http_request = {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog`,
      };

      if (response.ok) {
        const data = await response.json();
        debug.service_http_request.count = data[0]?.count || 0;
      }
    } catch (serviceHttpError) {
      debug.service_http_request = {
        success: false,
        error: serviceHttpError instanceof Error ? serviceHttpError.message : "Service HTTP request failed",
      };
    }

    debug.steps.push("Step 7: Environment Variables Verification...");
    debug.env_verification = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      url_length: process.env.NEXT_PUBLIC_SUPABASE_URL?.length,
      anon_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
      service_key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length,
      url_starts_with_https: process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https://"),
    };

    debug.steps.push("Step 8: Network Diagnostics...");
    debug.network_diagnostics = {
      platform: process.platform,
      node_env: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV,
      vercel_region: process.env.VERCEL_REGION,
      fetch_available: typeof fetch === "function",
    };

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
