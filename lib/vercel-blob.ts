import { put, list } from "@vercel/blob";
import { Database } from "./types";
import { promises as fs } from "fs";
import path from "path";

export const DB_FILENAME = "db.json";
const LOCAL_DB_PATH = path.join(process.cwd(), DB_FILENAME);

export async function getDatabase(): Promise<Database> {
  try {
    const { blobs } = await list({ prefix: DB_FILENAME });
    if (blobs.length > 0) {
      const blob = blobs[0];
      const res = await fetch(blob.url);
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to list blobs, falling back to local DB", e);
  }

  // try local file fallback
  try {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(raw) as Database;
  } catch (e) {
    // ignore and return empty
  }

  return { blog: [], portfolio: [], products: [] };
}

export async function saveDatabase(data: Database): Promise<void> {
  try {
    await put(DB_FILENAME, JSON.stringify(data, null, 2), { access: "public", contentType: "application/json", allowOverwrite: true });
    return;
  } catch (e) {
    console.error("Vercel Blob save failed, writing local DB file", e);
  }

  // local fallback
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local DB file", e);
    throw e;
  }
}
