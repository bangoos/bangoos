import { updateItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { ArrowLeft, Save, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const db: Database = await getDatabase();

  // Debug: Log untuk melihat ID yang dicari dan ID yang ada
  console.log("Portfolio - Looking for ID:", params.id);
  console.log(
    "Portfolio - Available IDs:",
    db.portfolio.map((p) => p.id)
  );
  console.log("Portfolio items:", db.portfolio);

  const item = db.portfolio.find((p) => p.id === params.id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Portofolio Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-4">ID yang dicari: {params.id}</p>
          <p className="text-slate-400 mb-6">Portofolio yang Anda cari tidak ada atau telah dihapus.</p>
          <Link href="/admin/portofolio" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} /> Kembali ke Portofolio
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
          <h1 className="text-3xl font-bold text-white mb-2">Edit Portofolio</h1>
          <p className="text-slate-400">Perbarui proyek: {item.title}</p>
        </div>
        <Link href="/admin/portofolio" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>

      {/* Edit Form */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
        <FormWrapper action={updateItem} defaultImage={item.image}>
          <input type="hidden" name="type" value="portfolio" />
          <input type="hidden" name="id" value={item.id} />

          <div className="space-y-6">
            {/* Nama Proyek */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nama Proyek</label>
              <input
                name="title"
                defaultValue={item.title}
                type="text"
                required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Masukkan nama proyek..."
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Kategori Proyek</label>
              <select
                name="category"
                defaultValue={item.category}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              >
                <option value="UMKM">UMKM (Toko)</option>
                <option value="Skripsi">Skripsi (Mahasiswa)</option>
                <option value="Kantor">Kantor (Perusahaan)</option>
              </select>
              <p className="text-slate-500 text-xs mt-1">Pilih kategori yang sesuai dengan proyek</p>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Deskripsi Proyek</label>
              <textarea
                name="description"
                defaultValue={item.description}
                required
                rows={6}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                placeholder="Jelaskan detail proyek ini..."
              ></textarea>
              <p className="text-slate-500 text-xs mt-1">Deskripsi akan ditampilkan di halaman portofolio</p>
            </div>

            {/* Image Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Gambar Saat Ini</label>
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-700/50">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
              <p className="text-slate-500 text-xs mt-2">Upload gambar baru untuk mengganti</p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                <Save size={18} /> Simpan Perubahan
              </button>
              <Link href="/admin/portofolio" className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
                Batal
              </Link>
            </div>
          </div>
        </FormWrapper>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Briefcase size={20} className="text-cyan-400" />
          Informasi Portofolio
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">ID:</span>
            <span className="text-white font-mono">{item.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Kategori:</span>
            <span className="text-white">{item.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Judul:</span>
            <span className="text-white font-mono text-xs truncate max-w-[200px]">{item.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
