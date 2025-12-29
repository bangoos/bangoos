import { put, list } from '@vercel/blob';
import { Database } from './types';

export const DB_FILENAME = 'db.json';

export async function getDatabase(): Promise<Database> {
  try {
    const { blobs } = await list({ prefix: DB_FILENAME });
    if (blobs.length > 0) {
      const blob = blobs[0];
      const res = await fetch(blob.url);
      return await res.json();
    }
  } catch (e) {
    console.error("DB initialized empty", e);
  }
  return { blog: [], portfolio: [], products: [] };
}

export async function saveDatabase(data: Database): Promise<void> {
  await put(DB_FILENAME, JSON.stringify(data, null, 2), { access: 'public', contentType: 'application/json', allowOverwrite: true });
}
