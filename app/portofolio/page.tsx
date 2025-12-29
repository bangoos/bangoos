import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import PortfolioClient from "./PortfolioClient";

export const revalidate = 0; // Disable caching for this page

export default async function PortfolioPage() {
  const db: Database = await getDatabase();
  return <PortfolioClient db={db} />;
}
