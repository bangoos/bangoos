import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "comprehensive_storage_debug",
    supabase_client: supabase ? "CREATED" : "NULL",
    steps: [],
  };

  try {
    if (!supabase) {
      debug.error = "Supabase client not available";
      return NextResponse.json(debug);
    }

    // Step 1: List all buckets
    debug.steps.push("Step 1: Listing all buckets...");
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      debug.all_buckets = buckets?.map((b) => ({ id: b.id, name: b.name, public: b.public })) || [];
      debug.buckets_error = bucketsError?.message || null;
      debug.steps.push(`✅ Found ${debug.all_buckets.length} buckets`);
    } catch (err) {
      debug.steps.push(`❌ Bucket listing failed: ${err instanceof Error ? err.message : "Unknown"}`);
    }

    // Step 2: Try different bucket names
    debug.steps.push("Step 2: Testing different bucket names...");
    const testNames = ["images", "Images", "IMAGES", "public", "uploads"];
    debug.bucket_tests = {};

    for (const name of testNames) {
      try {
        const { data, error } = await supabase.storage.getBucket(name);
        debug.bucket_tests[name] = {
          found: !error,
          error: error?.message || null,
          data: data,
        };
        if (!error) {
          debug.steps.push(`✅ Bucket '${name}' found!`);
        }
      } catch (err) {
        debug.bucket_tests[name] = {
          found: false,
          error: err instanceof Error ? err.message : "Exception",
          data: null,
        };
      }
    }

    // Step 3: Try to create bucket with different settings
    debug.steps.push("Step 3: Attempting bucket creation...");
    try {
      const { data, error } = await supabase.storage.createBucket("images", {
        public: true,
        fileSizeLimit: 52428800,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      });

      if (error) {
        debug.creation_result = {
          success: false,
          error: error.message,
          details: error,
        };
        debug.steps.push(`❌ Creation failed: ${error.message}`);

        // If already exists, that's actually good
        if (error.message.includes("already exists") || error.message.includes("duplicate")) {
          debug.steps.push(`✅ Bucket already exists (this is good!)`);
          debug.creation_result.success = true;
        }
      } else {
        debug.creation_result = {
          success: true,
          data: data,
        };
        debug.steps.push(`✅ Bucket created successfully!`);
      }
    } catch (err) {
      debug.creation_result = {
        success: false,
        error: err instanceof Error ? err.message : "Exception",
      };
      debug.steps.push(`❌ Creation exception: ${err instanceof Error ? err.message : "Unknown"}`);
    }

    // Step 4: Test upload permissions
    debug.steps.push("Step 4: Testing upload permissions...");
    try {
      const testFile = new Blob(["test"], { type: "text/plain" });
      const testFileName = `test-${Date.now()}.txt`;

      const { data, error } = await supabase.storage.from("images").upload(testFileName, testFile);

      if (error) {
        debug.upload_test = {
          success: false,
          error: error.message,
        };
        debug.steps.push(`❌ Upload test failed: ${error.message}`);
      } else {
        debug.upload_test = {
          success: true,
          data: data,
        };
        debug.steps.push(`✅ Upload test successful!`);

        // Clean up test file
        await supabase.storage.from("images").remove([testFileName]);
      }
    } catch (err) {
      debug.upload_test = {
        success: false,
        error: err instanceof Error ? err.message : "Exception",
      };
      debug.steps.push(`❌ Upload test exception: ${err instanceof Error ? err.message : "Unknown"}`);
    }
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
  }

  return NextResponse.json(debug);
}
