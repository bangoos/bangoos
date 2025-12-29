import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import ProductsClient from "./ProductsClient";

export const revalidate = 0; // Disable caching for this page

export default async function ProductsPage() {
  const db: Database = await getDatabase();
  return <ProductsClient db={db} />;
}
