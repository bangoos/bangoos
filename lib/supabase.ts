import { createClient } from "@supabase/supabase-js";

// Supabase configuration for BangOos Web
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
