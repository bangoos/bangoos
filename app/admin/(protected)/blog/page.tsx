import { addBlog, deleteItem } from '@/actions/admin-actions';
import { getDatabase } from '@/lib/vercel-blob';
import { FormWrapper } from '@/components/admin/FormWithImagePreview';
import type { Database } from '@/lib/types';
import { Trash2, Calendar } from 'lucide-react';

export default async function BlogPage() {
  const db: Database = await getDatabase();

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-white mb-6">Tambah Blog</h2>
        <FormWrapper action={addBlog}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Judul</label>
              <input name="title" type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors" placeholder="Masukkan judul..." />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Slug (URL)</label>
              <input name="slug" type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors lowercase" placeholder="judul-artikel" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Konten</label>
              <textarea name="content" required rows={5} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors" placeholder="Tulis artikel di sini..."></textarea>
            </div>
          </div>
        </FormWrapper>
      </div>

      <div className="md:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Daftar Artikel ({db.blog.length})</h3>
        {db.blog.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">Belum ada artikel.</div>
        ) : (
          db.blog.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-5 hover:border-slate-600 transition-colors">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-lg">{post.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Calendar size={14} /> {post.date}
                </div>
              </div>
              <form action={deleteItem}>
                <input type="hidden" name="type" value="blog" />
                <input type="hidden" name="id" value={post.id} />
                <button className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus">
                  <Trash2 size={20}/>
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
