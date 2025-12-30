import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseService } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    action: "service_role_storage_debug",
    steps: [],
  };

  try {
    debug.steps.push("Step 1: Checking environment variables...");
    debug.env_vars = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT_SET",
      anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT_SET",
      service_key: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT_SET",
    };

    debug.steps.push("Step 2: Testing clients...");
    debug.clients = {
      supabase: supabase ? "CREATED" : "FAILED",
      supabaseService: supabaseService ? "CREATED" : "FAILED",
    };

    debug.steps.push("Step 3: Testing service role bucket operations...");

    if (supabaseService) {
      try {
        // Test bucket access
        const { data: buckets, error: bucketError } = await supabaseService.storage.listBuckets();
        debug.bucket_list = {
          success: !bucketError,
          buckets: buckets || [],
          error: bucketError?.message,
        };

        // Test bucket existence
        const { data: bucket, error: getError } = await supabaseService.storage.getBucket("images");
        debug.bucket_exists = {
          success: !getError,
          bucket: bucket,
          error: getError?.message,
        };

        // Test bucket creation
        if (getError) {
          debug.steps.push("Step 4: Creating bucket with service role...");
          const { data: created, error: createError } = await supabaseService.storage.createBucket("images", {
            public: true,
            fileSizeLimit: 52428800,
            allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
          });

          debug.bucket_creation = {
            success: !createError,
            data: created,
            error: createError?.message,
          };
        }

        // Test upload permissions
        debug.steps.push("Step 5: Testing upload permissions...");
        const testFile = new Blob(["test"], { type: "text/plain" });
        const testFileName = `test-${Date.now()}.txt`;

        const { data: uploadData, error: uploadError } = await supabaseService.storage.from("images").upload(testFileName, testFile);

        debug.upload_test = {
          success: !uploadError,
          data: uploadData,
          error: uploadError?.message,
        };

        // Clean up test file
        if (!uploadError) {
          await supabaseService.storage.from("images").remove([testFileName]);
        }
      } catch (serviceError) {
        debug.service_error = serviceError instanceof Error ? serviceError.message : "Unknown service error";
      }
    } else {
      debug.service_error = "Service role client not created";
    }

    debug.steps.push("Step 6: Final verification...");
    debug.recommendations = [];

    if (supabaseService) {
      debug.recommendations.push("✅ Service role client created");

      if (debug.bucket_creation?.success) {
        debug.recommendations.push("✅ Bucket creation successful");
        debug.recommendations.push("🎯 Try uploading real image in admin");
      } else if (debug.bucket_exists?.success) {
        debug.recommendations.push("✅ Bucket exists");
        debug.recommendations.push("🎯 Try uploading real image in admin");
      } else {
        debug.recommendations.push("❌ Bucket operations failed");
        debug.recommendations.push("🔍 Check service role key permissions");
      }

      if (debug.upload_test?.success) {
        debug.recommendations.push("✅ Upload permissions working");
      } else {
        debug.recommendations.push("❌ Upload permissions failed");
      }
    } else {
      debug.recommendations.push("❌ Service role client not created");
      debug.recommendations.push("🔍 Check SUPABASE_SERVICE_ROLE_KEY in .env.local");
    }

    debug.success = true;
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
    debug.success = false;
  }

  return NextResponse.json(debug);
}
