import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/vercel-blob";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "image_display_debug",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Getting database...");
    const db = await getDatabase();
    debug.db_stats = {
      blog_count: db.blog.length,
      portfolio_count: db.portfolio.length,
      products_count: db.products.length,
    };

    debug.steps.push("Step 2: Analyzing image URLs...");

    // Check blog images
    debug.blog_images = db.blog.map((post) => ({
      id: post.id,
      title: post.title,
      image_url: post.image,
      image_exists: post.image ? "YES" : "NO",
      url_format: post.image ? (post.image.includes("unsplash") ? "UNSPLASH" : "OTHER") : "NONE",
    }));

    // Check portfolio images
    debug.portfolio_images = db.portfolio.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: item.image,
      image_exists: item.image ? "YES" : "NO",
      url_format: item.image ? (item.image.includes("unsplash") ? "UNSPLASH" : "OTHER") : "NONE",
    }));

    debug.steps.push("Step 3: Testing image URL accessibility...");

    // Test a few image URLs
    const testUrls = [];
    if (db.blog.length > 0 && db.blog[0].image) {
      testUrls.push(db.blog[0].image);
    }
    if (db.portfolio.length > 0 && db.portfolio[0].image) {
      testUrls.push(db.portfolio[0].image);
    }

    debug.url_tests = [];
    for (const url of testUrls.slice(0, 2)) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        debug.url_tests.push({
          url: url,
          status: response.status,
          ok: response.ok,
          content_type: response.headers.get("content-type"),
          accessible: response.ok,
        });
      } catch (err) {
        debug.url_tests.push({
          url: url,
          status: "ERROR",
          ok: false,
          error: err instanceof Error ? err.message : "Unknown",
        });
      }
    }

    debug.steps.push("Step 4: Frontend rendering check...");
    debug.recommendations = [];

    // Check if images should be visible
    const hasUnsplashImages = db.blog.some((post) => post.image?.includes("unsplash")) || db.portfolio.some((item) => item.image?.includes("unsplash"));

    if (hasUnsplashImages) {
      debug.recommendations.push("✅ Unsplash images found in database");
      debug.recommendations.push("🔍 Check frontend rendering logic");
      debug.recommendations.push("🔍 Check browser console for errors");
      debug.recommendations.push("🔍 Check network tab for failed requests");
    } else {
      debug.recommendations.push("❌ No Unsplash images found");
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
