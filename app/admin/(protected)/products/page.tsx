import { addProduct, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { Trash2, Check, Edit2 } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";
import type { Database } from "@/lib/types";

export default async function ProductsPage() {
  const db: Database = await getDatabase();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tambah Produk</h2>
        <form action={addProduct} className="space-y-6 p-8 cloud-panel">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Nama Produk</label>
              <input name="name" type="text" required placeholder="Contoh: Paket Bisnis" className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-purple-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Harga</label>
              <input
                name="price"
                type="text"
                required
                placeholder="Rp 1.500.000"
                className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-purple-500 outline-none transition-colors font-semibold text-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Fitur (Pisahkan dengan koma)</label>
              <textarea
                name="features"
                required
                placeholder="Gratis Domain, SEO Basic, 5 Halaman, ..."
                className="w-full bg-transparent border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:border-purple-500 outline-none transition-colors h-24 resize-none"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Simpan Produk
          </button>
        </form>
      </div>

      <div className="md:col-span-2 space-y-4">
        {db.products.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">Belum ada paket produk.</div>
        ) : (
          db.products.map((product) => (
            <div key={product.id} className="cloud-panel p-6 rounded-xl flex justify-between items-center hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-800">{product.name}</h3>
                  <span className="text-purple-400 font-semibold text-xl">{product.price}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {product.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="bg-transparent px-3 py-1.5 rounded-full text-xs text-slate-800 border border-slate-300 flex items-center gap-1">
                      <Check size={10} className="text-green-500" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/admin/products/${product.id}/edit`} className="p-2.5 text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/8 rounded-lg transition-colors" title="Edit">
                  <Edit2 size={18} />
                </a>
                <DeleteForm action={deleteItem} type="products" id={product.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
