import { updateItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const db: Database = await getDatabase();
  const post = db.blog.find((p) => p.id === params.id);
  if (!post) return <div className="p-8">Artikel tidak ditemukan.</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Artikel</h2>
      <FormWrapper action={updateItem} defaultImage={post.image}>
        <input type="hidden" name="type" value="blog" />
        <input type="hidden" name="id" value={post.id} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Judul</label>
            <input
              name="title"
              defaultValue={post.title}
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
              placeholder="Masukkan judul..."
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Slug (URL)</label>
            <input
              name="slug"
              defaultValue={post.slug}
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors lowercase"
              placeholder="judul-artikel"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Konten</label>
            <textarea
              name="content"
              defaultValue={post.content}
              required
              rows={5}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
              placeholder="Tulis artikel di sini..."
            ></textarea>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
