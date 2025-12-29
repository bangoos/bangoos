import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import BlogClient from "./BlogClient";

export const revalidate = 0; // Disable caching for this page

export default async function BlogPage() {
  const db: Database = await getDatabase();
  return <BlogClient db={db} />;
}
