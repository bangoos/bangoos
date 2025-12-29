import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const result: any = {
    timestamp: new Date().toISOString(),
    action: "force_bucket_creation",
    success: false,
    error: null,
    attempts: [],
  };

  try {
    if (!supabase) {
      result.error = "Supabase client not available";
      return NextResponse.json(result, { status: 500 });
    }

    // Try multiple approaches
    const approaches = [
      {
        name: "images",
        options: { public: true, fileSizeLimit: 52428800 },
      },
      {
        name: "uploads",
        options: { public: true, fileSizeLimit: 52428800 },
      },
      {
        name: "public",
        options: { public: true, fileSizeLimit: 52428800 },
      },
    ];

    for (const approach of approaches) {
      const attempt: any = {
        bucket_name: approach.name,
        success: false,
        error: null,
      };

      try {
        // Try to create bucket
        const { data, error } = await supabase.storage.createBucket(approach.name, approach.options);

        if (error) {
          attempt.error = error.message;

          // If already exists, that's success
          if (error.message.includes("already exists") || error.message.includes("duplicate")) {
            attempt.success = true;
            attempt.status = "already_exists";
          }
        } else {
          attempt.success = true;
          attempt.status = "created";
          attempt.data = data;
        }
      } catch (err) {
        attempt.error = err instanceof Error ? err.message : "Exception";
      }

      result.attempts.push(attempt);

      // If any attempt succeeded, we're good
      if (attempt.success) {
        result.success = true;
        result.working_bucket = approach.name;
        break;
      }
    }

    // If we have a working bucket, test it
    if (result.success && result.working_bucket) {
      try {
        const { data, error } = await supabase.storage.getBucket(result.working_bucket);
        result.bucket_test = {
          success: !error,
          error: error?.message || null,
          data: data,
        };
      } catch (err) {
        result.bucket_test = {
          success: false,
          error: err instanceof Error ? err.message : "Exception",
        };
      }
    }
  } catch (err) {
    result.error = err instanceof Error ? err.message : "Unknown error";
  }

  return NextResponse.json(result);
}
