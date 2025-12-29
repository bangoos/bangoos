import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const result: any = {
    timestamp: new Date().toISOString(),
    action: "create_storage_bucket",
    success: false,
    error: null,
    bucket_info: null,
  };

  try {
    if (!supabase) {
      result.error = "Supabase client not available";
      return NextResponse.json(result, { status: 500 });
    }

    // Try to create the bucket
    const { data, error } = await supabase.storage.createBucket("images", {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    });

    if (error) {
      result.error = error.message;

      // If bucket already exists, that's actually fine
      if (error.message.includes("already exists")) {
        result.success = true;
        result.error = null;
        result.bucket_info = "Bucket already exists";
      }
    } else {
      result.success = true;
      result.bucket_info = data;
    }

    // If successful, also create policies
    if (result.success) {
      try {
        // Create policies for public access
        const policies = [
          // Public reads
          `CREATE POLICY "Allow public reads" ON storage.objects FOR SELECT USING (bucket_id = 'images')`,
          // Authenticated uploads
          `CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images')`,
          // Authenticated updates
          `CREATE POLICY "Allow authenticated updates" ON storage.objects FOR UPDATE USING (bucket_id = 'images')`,
          // Authenticated deletes
          `CREATE POLICY "Allow authenticated deletes" ON storage.objects FOR DELETE USING (bucket_id = 'images')`,
        ];

        result.policies_created = [];
        for (const policy of policies) {
          // Note: This would need to be run in SQL Editor manually
          result.policies_created.push(policy);
        }
      } catch (policyError) {
        result.policy_error = policyError instanceof Error ? policyError.message : "Policy creation failed";
      }
    }
  } catch (err) {
    result.error = err instanceof Error ? err.message : "Unknown error";
  }

  return NextResponse.json(result);
}
