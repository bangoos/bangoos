import { addProduct, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { Trash2, Check, Edit2, Package, Plus, Search, Filter } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";
import type { Database } from "@/lib/types";

export default async function ProductsPage() {
  const db: Database = await getDatabase();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kelola Paket</h1>
          <p className="text-slate-400">Kelola paket website dan layanan yang ditawarkan.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari paket..."
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Paket</p>
              <p className="text-3xl font-bold text-white mt-1">{db.products.length}</p>
            </div>
            <div className="w-14 h-14 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
              <Package size={28} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Paket Aktif</p>
              <p className="text-3xl font-bold text-white mt-1">{db.products.length}</p>
            </div>
            <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <Check size={28} className="text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Fitur</p>
              <p className="text-3xl font-bold text-white mt-1">{db.products.reduce((acc, p) => acc + p.features.length, 0)}</p>
            </div>
            <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
              <Plus size={28} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Avg Harga</p>
              <p className="text-3xl font-bold text-white mt-1">Rp 1.5M</p>
            </div>
            <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
              <Package size={28} className="text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus size={24} className="text-purple-400" />
              Tambah Paket
            </h2>
            <form action={addProduct} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nama Paket</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Contoh: Paket Bisnis"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Harga</label>
                  <input
                    name="price"
                    type="text"
                    required
                    placeholder="Rp 1.500.000"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-semibold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fitur (Pisahkan dengan koma)</label>
                  <textarea
                    name="features"
                    required
                    placeholder="Gratis Domain, SEO Basic, 5 Halaman, ..."
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none h-24"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus size={18} /> Tambah Paket
              </button>
            </form>
          </div>
        </div>

        {/* Products List */}
        <div className="md:col-span-2 space-y-4">
          {db.products.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-20 rounded-2xl text-center">
              <div className="w-20 h-20 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Belum Ada Paket</h3>
              <p className="text-slate-400">Mulai dengan menambahkan paket website pertama Anda.</p>
            </div>
          ) : (
            db.products.map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                      <span className="text-purple-400 font-bold text-xl bg-purple-500/20 px-3 py-1 rounded-lg">{product.price}</span>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {product.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="bg-purple-500/20 border border-purple-500/30 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1">
                          <Check size={10} className="text-green-400" /> {feat}
                        </li>
                      ))}
                      {product.features.length > 4 && <li className="bg-slate-700/50 border border-slate-600/50 px-3 py-1.5 rounded-full text-xs text-slate-300">+{product.features.length - 4} lagi</li>}
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <a href={`/admin/products/${product.id}/edit`} className="p-2.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300" title="Edit">
                      <Edit2 size={18} />
                    </a>
                    <DeleteForm action={deleteItem} type="products" id={product.id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
