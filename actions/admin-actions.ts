"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getDatabase, saveDatabase } from "@/lib/vercel-blob";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function loginAction(prev: unknown, fd: FormData): Promise<{ error?: string } | void> {
  const expectedUser = process.env.ADMIN_USER ?? "admin";
  const expectedPass = process.env.ADMIN_PASS ?? "admin";

  const inputUser = fd.get("username") as string | null;
  const inputPass = fd.get("password") as string | null;

  if (inputUser === expectedUser && inputPass === expectedPass) {
    (await cookies()).set("admin_session", "true", { httpOnly: true, path: "/" });
    redirect("/admin");
  }
  return { error: "Login Gagal" };
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}

export async function uploadImage(fd: FormData): Promise<string> {
  const f = fd.get("file") as File;
  if (!f) throw new Error("No file");
  const b = await put(f.name, f, { access: "public", addRandomSuffix: true });
  return b.url;
}

async function saveByType(formData: FormData, type: "blog" | "portfolio" | "products") {
  if (!formData) return { error: "Error" };

  try {
    const db = await getDatabase();
    const url = type === "products" ? "" : await uploadImage(formData);

    if (type === "blog") {
      const title = formData.get("title") as string;
      const providedSlug = (formData.get("slug") as string) || "";
      const safeSlug = providedSlug.trim() ? slugify(providedSlug) : slugify(title);
      db.blog.push({
        id: Date.now().toString(),
        title,
        slug: safeSlug,
        content: formData.get("content") as string,
        image: url,
        date: new Date().toLocaleDateString("id-ID"),
      });
    } else if (type === "portfolio") {
      db.portfolio.push({
        id: Date.now().toString(),
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as "UMKM" | "Skripsi" | "Kantor",
        image: url,
      });
    } else if (type === "products") {
      const raw = (formData.get("features") as string) || "";
      const feats = raw
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== "");
      db.products.push({
        id: Date.now().toString(),
        name: formData.get("name") as string,
        price: formData.get("price") as string,
        features: feats,
      });
    }

    await saveDatabase(db);
    revalidatePath("/");
    revalidatePath("/admin");
    return { message: "Data Disimpan" };
  } catch (e) {
    console.error(e);
    return { error: "Gagal menyimpan" };
  }
}

export async function addBlog(prev: unknown, formData: FormData) {
  return saveByType(formData, "blog");
}
export async function addPortfolio(prev: unknown, formData: FormData) {
  return saveByType(formData, "portfolio");
}
export async function addProduct(...args: any[]): Promise<void> {
  const formData = args.length === 1 ? (args[0] as FormData) : (args[1] as FormData);
  await saveByType(formData, "products");
}

export async function deleteItem(...args: any[]) {
  const fd = args.length === 1 ? (args[0] as FormData) : (args[1] as FormData);
  try {
    const type = fd.get("type") as "blog" | "portfolio" | "products";
    const id = fd.get("id") as string;
    const db = await getDatabase();

    if (type === "blog") db.blog = db.blog.filter((i) => i.id !== id);
    else if (type === "portfolio") db.portfolio = db.portfolio.filter((i) => i.id !== id);
    else if (type === "products") db.products = db.products.filter((i) => i.id !== id);

    await saveDatabase(db);
    revalidatePath("/");
    revalidatePath("/admin");
    return { message: "Data dihapus" };
  } catch (e) {
    console.error("Gagal menghapus item", e);
    return { error: "Gagal menghapus data" };
  }
}

export async function updateItem(...args: any[]) {
  const fd = args.length === 1 ? (args[0] as FormData) : (args[1] as FormData);
  try {
    const type = fd.get("type") as "blog" | "portfolio" | "products";
    const id = fd.get("id") as string;
    const db = await getDatabase();

    if (type === "blog") {
      const post = db.blog.find((p) => p.id === id);
      if (!post) return { error: "Artikel tidak ditemukan" };
      const title = fd.get("title") as string | null;
      const providedSlug = (fd.get("slug") as string) || "";
      const content = fd.get("content") as string | null;
      const file = fd.get("file") as File | null;
      if (title) post.title = title;
      post.slug = providedSlug.trim() ? slugify(providedSlug) : slugify(post.title);
      if (content) post.content = content;
      if (file) post.image = await uploadImage(fd as FormData);
    } else if (type === "portfolio") {
      const item = db.portfolio.find((p) => p.id === id);
      if (!item) return { error: "Portofolio tidak ditemukan" };
      const title = fd.get("title") as string | null;
      const description = fd.get("description") as string | null;
      const category = fd.get("category") as ("UMKM" | "Skripsi" | "Kantor") | null;
      const file = fd.get("file") as File | null;
      if (title) item.title = title;
      if (description) item.description = description;
      if (category) item.category = category;
      if (file) item.image = await uploadImage(fd as FormData);
    } else if (type === "products") {
      const p = db.products.find((p) => p.id === id);
      if (!p) return { error: "Produk tidak ditemukan" };
      const name = fd.get("name") as string | null;
      const price = fd.get("price") as string | null;
      const raw = (fd.get("features") as string) || "";
      const feats = raw
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== "");
      if (name) p.name = name;
      if (price) p.price = price;
      if (raw) p.features = feats;
    }

    await saveDatabase(db);
    revalidatePath("/");
    revalidatePath("/admin");
    return { message: "Data diperbarui" };
  } catch (e) {
    console.error("Gagal memperbarui item", e);
    return { error: "Gagal memperbarui data" };
  }
}
