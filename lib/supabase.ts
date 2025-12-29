import { createClient } from "@supabase/supabase-js";

// Supabase configuration for BangOos Web
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
