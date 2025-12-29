import { addBlog, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { Trash2, Calendar, Edit2 } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";

export default async function BlogPage() {
  const db: Database = await getDatabase();

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tambah Blog</h2>
        <FormWrapper action={addBlog}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Judul</label>
              <input name="title" type="text" required className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-blue-500 outline-none transition-colors" placeholder="Masukkan judul..." />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Slug (URL)</label>
              <input name="slug" type="text" required className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-blue-500 outline-none transition-colors lowercase" placeholder="judul-artikel" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Konten</label>
              <textarea
                name="content"
                required
                rows={5}
                className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-blue-500 outline-none transition-colors"
                placeholder="Tulis artikel di sini..."
              ></textarea>
            </div>
          </div>
        </FormWrapper>
      </div>

      <div className="md:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Daftar Artikel ({db.blog.length})</h3>
        {db.blog.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">Belum ada artikel.</div>
        ) : (
          db.blog.map((post) => (
            <div key={post.id} className="cloud-panel p-4 rounded-xl flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-lg truncate">{post.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Calendar size={14} /> {post.date}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/admin/blog/${post.id}/edit`} className="p-2.5 text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/8 rounded-lg transition-colors" title="Edit">
                  <Edit2 size={18} />
                </a>
                <DeleteForm action={deleteItem} type="blog" id={post.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
