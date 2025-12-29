import { getDatabase } from '@/lib/vercel-blob';
import type { Database } from '@/lib/types';
import HomeClient from '@/components/home/HomeClient';

export default async function Home() {
  const db: Database = await getDatabase();
  return <HomeClient db={db} />;
}
