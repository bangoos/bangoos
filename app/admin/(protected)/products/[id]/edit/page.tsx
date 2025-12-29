import { updateItem } from "@/actions/admin-actions";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import { ArrowLeft, Save, Package, DollarSign } from "lucide-react";
import Link from "next/link";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const db: Database = await getDatabase();

  // Debug: Log untuk melihat ID yang dicari dan ID yang ada
  console.log("Products - Looking for ID:", params.id);
  console.log(
    "Products - Available IDs:",
    db.products.map((p) => p.id)
  );
  console.log("Products items:", db.products);

  const product = db.products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-4">ID yang dicari: {params.id}</p>
          <p className="text-slate-400 mb-6">Produk yang Anda cari tidak ada atau telah dihapus.</p>
          <Link href="/admin/products" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} /> Kembali ke Produk
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
          <h1 className="text-3xl font-bold text-white mb-2">Edit Produk</h1>
          <p className="text-slate-400">Perbarui paket: {product.name}</p>
        </div>
        <Link href="/admin/products" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>

      {/* Edit Form */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
        <FormWrapper action={updateItem}>
          <input type="hidden" name="type" value="products" />
          <input type="hidden" name="id" value={product.id} />

          <div className="space-y-6">
            {/* Nama Produk */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nama Produk</label>
              <input
                name="name"
                defaultValue={product.name}
                type="text"
                required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="Masukkan nama produk..."
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Harga Produk</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
                  <DollarSign size={18} />
                </div>
                <input
                  name="price"
                  defaultValue={product.price}
                  type="text"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-semibold text-lg"
                  placeholder="Rp 0"
                />
              </div>
              <p className="text-slate-500 text-xs mt-1">Harga yang akan ditampilkan kepada customer</p>
            </div>

            {/* Fitur */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Fitur Produk</label>
              <textarea
                name="features"
                defaultValue={product.features.join(", ")}
                required
                rows={6}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                placeholder="Fitur 1, Fitur 2, Fitur 3..."
              ></textarea>
              <p className="text-slate-500 text-xs mt-1">Pisahkan setiap fitur dengan koma (,)</p>
            </div>

            {/* Current Features Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Fitur Saat Ini</label>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Save size={18} /> Simpan Perubahan
              </button>
              <Link href="/admin/products" className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl font-medium text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
                Batal
              </Link>
            </div>
          </div>
        </FormWrapper>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Package size={20} className="text-purple-400" />
          Informasi Produk
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">ID:</span>
            <span className="text-white font-mono">{product.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nama:</span>
            <span className="text-white font-mono text-xs truncate max-w-[200px]">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Harga:</span>
            <span className="text-white font-bold">{product.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total Fitur:</span>
            <span className="text-white">{product.features.length} fitur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
