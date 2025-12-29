import { addPortfolio, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { Edit2, Briefcase, Plus, Search, Filter, Building, GraduationCap, ShoppingBag } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";

export default async function PortfolioPage() {
  const db: Database = await getDatabase();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kelola Portofolio</h1>
          <p className="text-slate-400">Kelola proyek dan karya terbaik Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari portofolio..."
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Proyek</p>
              <p className="text-3xl font-bold text-white mt-1">{db.portfolio.length}</p>
            </div>
            <div className="w-14 h-14 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center">
              <Briefcase size={28} className="text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">UMKM</p>
              <p className="text-3xl font-bold text-white mt-1">{db.portfolio.filter((p) => p.category === "UMKM").length}</p>
            </div>
            <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <ShoppingBag size={28} className="text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Skripsi</p>
              <p className="text-3xl font-bold text-white mt-1">{db.portfolio.filter((p) => p.category === "Skripsi").length}</p>
            </div>
            <div className="w-14 h-14 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
              <GraduationCap size={28} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Kantor</p>
              <p className="text-3xl font-bold text-white mt-1">{db.portfolio.filter((p) => p.category === "Kantor").length}</p>
            </div>
            <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
              <Building size={28} className="text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Add Portfolio Form */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus size={24} className="text-cyan-400" />
              Tambah Portofolio
            </h2>
            <FormWrapper action={addPortfolio} redirectTo="/admin/portofolio">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nama Proyek</label>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="Contoh: Website Toko Online"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Kategori Proyek</label>
                  <select
                    name="category"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  >
                    <option value="UMKM">UMKM (Toko Online)</option>
                    <option value="Skripsi">Skripsi (Mahasiswa)</option>
                    <option value="Kantor">Kantor (Perusahaan)</option>
                  </select>
                  <p className="text-slate-500 text-xs mt-1">Pilih kategori yang sesuai dengan proyek</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Deskripsi Proyek</label>
                  <textarea
                    name="description"
                    required
                    rows={6}
                    placeholder="Jelaskan detail proyek ini, fitur yang dibuat, dan hasil yang dicapai..."
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                  ></textarea>
                  <p className="text-slate-500 text-xs mt-1">Deskripsi akan ditampilkan di halaman portofolio</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 mt-6"
              >
                <Plus size={18} /> Tambah Portofolio
              </button>
            </FormWrapper>
          </div>
        </div>

        {/* Portfolio List */}
        <div className="md:col-span-2 space-y-4">
          {db.portfolio.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-20 rounded-2xl text-center">
              <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Belum Ada Portofolio</h3>
              <p className="text-slate-400">Mulai dengan menambahkan proyek pertama Anda.</p>
            </div>
          ) : (
            db.portfolio.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden">
                <div className="flex gap-6 p-6">
                  {/* Image */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          item.category === "UMKM"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : item.category === "Skripsi"
                            ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }`}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-3">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <a href={`/admin/portofolio/${item.id}/edit`} className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all duration-300" title="Edit">
                          <Edit2 size={18} />
                        </a>
                        <DeleteForm action={deleteItem} type="portfolio" id={item.id} />
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className={`w-2 h-2 rounded-full ${item.category === "UMKM" ? "bg-green-400" : item.category === "Skripsi" ? "bg-purple-400" : "bg-orange-400"}`}></div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">{item.category} Project</span>
                    </div>
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
