import { NextRequest, NextResponse } from "next/server";
import { deleteItem } from "@/actions/admin-actions";

export async function POST(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "delete_function_debug",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Parsing request body...");
    const body = await request.json();
    debug.request_data = body;

    const { type, id } = body;
    debug.parsed_data = { type, id };

    debug.steps.push("Step 2: Creating FormData...");
    const formData = new FormData();
    formData.set("type", type);
    formData.set("id", id);
    debug.form_data_created = true;

    debug.steps.push("Step 3: Calling deleteItem function...");
    const startTime = Date.now();
    const result = await deleteItem(formData);
    const endTime = Date.now();

    debug.delete_result = result;
    debug.execution_time = `${endTime - startTime}ms`;

    debug.steps.push("Step 4: Checking database state...");

    // Check database after deletion
    try {
      const fs = require("fs").promises;
      const path = require("path");
      const dbPath = path.join(process.cwd(), "db.json");
      const dbContent = await fs.readFile(dbPath, "utf-8");
      const db = JSON.parse(dbContent);

      debug.database_after = {
        blog_count: db.blog.length,
        portfolio_count: db.portfolio.length,
        products_count: db.products.length,
        item_still_exists: db[type]?.some((item: any) => item.id === id),
      };
    } catch (dbError) {
      debug.database_error = dbError instanceof Error ? dbError.message : "Unknown database error";
    }

    debug.steps.push("Step 5: Analysis...");
    debug.analysis = {
      delete_successful: result?.message === "Data dihapus",
      item_removed: debug.database_after?.item_still_exists === false,
      database_updated: debug.database_after !== undefined,
      likely_issue: debug.database_after?.item_still_exists === true ? "Item still exists in database" : "Unknown",
    };

    debug.recommendations = [];

    if (result?.message === "Data dihapus") {
      debug.recommendations.push("✅ Delete function returned success");
    } else {
      debug.recommendations.push("❌ Delete function failed");
    }

    if (debug.database_after?.item_still_exists === false) {
      debug.recommendations.push("✅ Item removed from database");
    } else if (debug.database_after?.item_still_exists === true) {
      debug.recommendations.push("❌ Item still exists in database - check save logic");
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
