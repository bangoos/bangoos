import { createClient } from "@supabase/supabase-js";

// Supabase configuration for BangOos Web
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
}

if (!supabaseServiceKey) {
  console.warn("Supabase service role key not found. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local for storage operations");
}

// Public client (for reads)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Service client (for writes/storage operations)
export const supabaseService =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;

// Database types
export interface Database {
  blog: BlogPost[];
  portfolio: PortfolioItem[];
  products: Product[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: "UMKM" | "Skripsi" | "Kantor";
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  features: string[];
}
