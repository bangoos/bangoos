import { addPortfolio, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { Edit2 } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";

export default async function PortfolioPage() {
  const db: Database = await getDatabase();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tambah Portofolio</h2>
        <FormWrapper action={addPortfolio}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Nama Proyek</label>
              <input name="title" type="text" required className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-cyan-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Kategori</label>
              <select name="category" className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-cyan-500 outline-none transition-colors">
                <option value="UMKM">UMKM (Toko)</option>
                <option value="Skripsi">Skripsi (Mahasiswa)</option>
                <option value="Kantor">Kantor (Perusahaan)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Deskripsi</label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-cyan-500 outline-none transition-colors"
                placeholder="Jelaskan proyek ini..."
              />
            </div>
          </div>
        </FormWrapper>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        {db.portfolio.length === 0 ? (
          <div className="col-span-2 text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">Belum ada portofolio.</div>
        ) : (
          db.portfolio.map((item) => (
            <div key={item.id} className="cloud-panel rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md border border-white/10">{item.category}</span>
                <div className="absolute top-3 right-3 flex gap-2 items-center">
                  <a href={`/admin/portofolio/${item.id}/edit`} className="p-1.5 text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/8 rounded-full transition-colors" title="Edit">
                    ✎
                  </a>
                  <DeleteForm action={deleteItem} type="portfolio" id={item.id} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
