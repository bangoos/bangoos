import { addPortfolio, deleteItem } from '@/actions/admin-actions';
import { getDatabase } from '@/lib/vercel-blob';
import { FormWrapper } from '@/components/admin/FormWithImagePreview';
import type { Database } from '@/lib/types';

export default async function PortfolioPage() {
  const db: Database = await getDatabase();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-white mb-6">Tambah Portofolio</h2>
        <FormWrapper action={addPortfolio}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Nama Proyek</label>
              <input name="title" type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Kategori</label>
              <select name="category" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors">
                <option value="UMKM">UMKM (Toko)</option>
                <option value="Skripsi">Skripsi (Mahasiswa)</option>
                <option value="Kantor">Kantor (Perusahaan)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Deskripsi</label>
              <textarea name="description" required rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Jelaskan proyek ini..." />
            </div>
          </div>
        </FormWrapper>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        {db.portfolio.length === 0 ? (
           <div className="col-span-2 text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">Belum ada portofolio.</div>
        ) : (
          db.portfolio.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all">
              <div className="relative h-48">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md border border-white/10">
                  {item.category}
                </span>
                <form action={deleteItem} className="absolute top-3 right-3">
                  <input type="hidden" name="type" value="portfolio" />
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded-full shadow-lg transition-colors">✕</button>
                </form>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
