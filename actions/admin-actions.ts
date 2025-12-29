'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { getDatabase, saveDatabase } from '@/lib/vercel-blob';

export async function loginAction(prev: unknown, fd: FormData): Promise<{ error?: string } | void> {
  const expectedUser = process.env.ADMIN_USER ?? 'admin';
  const expectedPass = process.env.ADMIN_PASS ?? 'admin';

  const inputUser = fd.get('username') as string | null;
  const inputPass = fd.get('password') as string | null;

  if (inputUser === expectedUser && inputPass === expectedPass) {
    (await cookies()).set('admin_session', 'true', { httpOnly: true, path: '/' });
    redirect('/admin');
  }
  return { error: 'Login Gagal' };
}

export async function logoutAction() { 
  (await cookies()).delete('admin_session'); 
  redirect('/admin/login'); 
}

export async function uploadImage(fd: FormData): Promise<string> {
  const f = fd.get('file') as File;
  if (!f) throw new Error("No file");
  const b = await put(f.name, f, { access: 'public', addRandomSuffix: true });
  return b.url;
}

async function saveByType(formData: FormData, type: 'blog' | 'portfolio' | 'products') {
  if (!formData) return { error: 'Error' };

  try {
    const db = await getDatabase();
    const url = type === 'products' ? '' : await uploadImage(formData);

    if (type === 'blog') {
      db.blog.push({
        id: Date.now().toString(),
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        content: formData.get('content') as string,
        image: url, 
        date: new Date().toLocaleDateString('id-ID'),
      });
    } else if (type === 'portfolio') {
      db.portfolio.push({
        id: Date.now().toString(),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as 'UMKM' | 'Skripsi' | 'Kantor',
        image: url,
      });
    } else if (type === 'products') {
      const raw = (formData.get('features') as string) || '';
      const feats = raw.split(',').map(f => f.trim()).filter(f => f !== '');
      db.products.push({
        id: Date.now().toString(),
        name: formData.get('name') as string,
        price: formData.get('price') as string,
        features: feats,
      });
    }

    await saveDatabase(db);
    revalidatePath('/'); 
    revalidatePath('/admin');
    return { message: 'Data Disimpan' };
  } catch (e) { console.error(e); return { error: 'Gagal menyimpan' }; }
}

export async function addBlog(prev: unknown, formData: FormData) { 
  return saveByType(formData, 'blog'); 
}
export async function addPortfolio(prev: unknown, formData: FormData) { 
  return saveByType(formData, 'portfolio'); 
}
export async function addProduct(formData: FormData): Promise<void> { 
  await saveByType(formData, 'products'); 
}

export async function deleteItem(fd: FormData) {
  const type = fd.get('type') as "blog" | "portfolio" | "products";
  const id = fd.get('id') as string;
  const db = await getDatabase();

  if (type === 'blog') db.blog = db.blog.filter((i) => i.id !== id);
  else if (type === 'portfolio') db.portfolio = db.portfolio.filter((i) => i.id !== id);
  else if (type === 'products') db.products = db.products.filter((i) => i.id !== id);

  await saveDatabase(db);
  revalidatePath('/'); 
  revalidatePath('/admin');
}
