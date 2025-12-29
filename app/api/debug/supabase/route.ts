import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT_SET",
    supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT_SET",
    supabase_client: supabase ? "CREATED" : "NULL",
    connection_test: null,
    error: null,
  };

  try {
    if (supabase) {
      // Test basic connection
      const { data, error } = await supabase.from("blog").select("count").limit(1);

      if (error) {
        debug.connection_test = "FAILED";
        debug.error = error.message;
      } else {
        debug.connection_test = "SUCCESS";
        debug.data = data;
      }

      // Test storage connection
      try {
        const { data: storageData, error: storageError } = await supabase.storage.getBucket("images");
        debug.storage_bucket = storageError ? "NOT_FOUND" : "FOUND";
        debug.storage_error = storageError?.message || null;
      } catch (storageErr) {
        debug.storage_bucket = "ERROR";
        debug.storage_error = storageErr instanceof Error ? storageErr.message : "Unknown error";
      }
    } else {
      debug.connection_test = "NO_CLIENT";
    }
  } catch (err) {
    debug.error = err instanceof Error ? err.message : "Unknown error";
  }

  return NextResponse.json(debug);
}
