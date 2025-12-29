import { updateItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  // Force fresh database read
  const db: Database = await getDatabase();

  // Debug: Log untuk melihat ID yang dicari dan ID yang ada
  console.log("=== BLOG EDIT DEBUG ===");
  console.log("Looking for ID:", params.id);
  console.log("Type of params.id:", typeof params.id);
  console.log(
    "Available IDs:",
    db.blog.map((p) => ({ id: p.id, type: typeof p.id }))
  );
  console.log("Total blog items:", db.blog.length);
  console.log("Blog items:", db.blog);

  // Try multiple ID matching approaches
  let post = null;

  // Method 1: Strict string comparison
  post = db.blog.find((p) => p.id === params.id);
  console.log("Method 1 result:", post ? "FOUND" : "NOT FOUND");

  // Method 2: String conversion comparison
  if (!post) {
    post = db.blog.find((p) => String(p.id) === String(params.id));
    console.log("Method 2 result:", post ? "FOUND" : "NOT FOUND");
  }

  // Method 3: Contains comparison (for partial matches)
  if (!post) {
    post = db.blog.find((p) => String(p.id).includes(String(params.id)));
    console.log("Method 3 result:", post ? "FOUND" : "NOT FOUND");
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-4">ID yang dicari: {params.id}</p>
          <p className="text-slate-400 mb-6">Artikel yang Anda cari tidak ada atau telah dihapus.</p>
          <Link href="/admin/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} /> Kembali ke Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Artikel</h1>
          <p className="text-slate-400">Perbarui konten artikel: {post.title}</p>
        </div>
        <Link href="/admin/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>

      {/* Edit Form */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
        <FormWrapper action={updateItem} defaultImage={post.image}>
          <input type="hidden" name="type" value="blog" />
          <input type="hidden" name="id" value={post.id} />

          <div className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Judul Artikel</label>
              <input
                name="title"
                defaultValue={post.title}
                type="text"
                required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Masukkan judul artikel..."
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL)</label>
              <input
                name="slug"
                defaultValue={post.slug}
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 lowercase"
                placeholder="artikel-judul-anda"
              />
              <p className="text-slate-500 text-xs mt-1">💡 Kosongkan untuk auto-generate SEO-friendly URL dari judul</p>
            </div>

            {/* Konten */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Konten Artikel</label>
              <textarea
                name="content"
                defaultValue={post.content}
                required
                rows={8}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Tulis konten artikel di sini..."
              ></textarea>
              <p className="text-slate-500 text-xs mt-1">Konten akan ditampilkan di halaman blog</p>
            </div>

            {/* Image Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Gambar Saat Ini</label>
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-700/50">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
              <p className="text-slate-500 text-xs mt-2">Upload gambar baru untuk mengganti</p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                <Save size={18} /> Simpan Perubahan
              </button>
              <Link href="/admin/blog" className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
                Batal
              </Link>
            </div>
          </div>
        </FormWrapper>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <FileText size={20} className="text-blue-400" />
          Informasi Artikel
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">ID:</span>
            <span className="text-white font-mono">{post.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Dibuat:</span>
            <span className="text-white">{post.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Slug:</span>
            <span className="text-white font-mono text-xs">{post.slug}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
