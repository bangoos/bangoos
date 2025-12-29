import { updateItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const db: Database = await getDatabase();
  const item = db.portfolio.find((p) => p.id === params.id);
  if (!item) return <div className="p-8">Portofolio tidak ditemukan.</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Portofolio</h2>
      <FormWrapper action={updateItem} defaultImage={item.image}>
        <input type="hidden" name="type" value="portfolio" />
        <input type="hidden" name="id" value={item.id} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Nama Proyek</label>
            <input name="title" defaultValue={item.title} type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Kategori</label>
            <select name="category" defaultValue={item.category} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors">
              <option value="UMKM">UMKM (Toko)</option>
              <option value="Skripsi">Skripsi (Mahasiswa)</option>
              <option value="Kantor">Kantor (Perusahaan)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Deskripsi</label>
            <textarea
              name="description"
              defaultValue={item.description}
              required
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors"
              placeholder="Jelaskan proyek ini..."
            />
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
