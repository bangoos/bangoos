import { addBlog, deleteItem } from "@/actions/admin-actions";
import { getDatabase } from "@/lib/vercel-blob";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import type { Database } from "@/lib/types";
import { Trash2, Calendar, Edit2, Plus, Search, Filter, FileText, TrendingUp, Clock } from "lucide-react";
import DeleteForm from "@/components/admin/DeleteForm";

export default async function BlogPage() {
  const db: Database = await getDatabase();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kelola Blog</h1>
          <p className="text-slate-400">Kelola artikel dan konten website BangOos Web</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari artikel..."
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all duration-300">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-blue-400" size={20} />
            <span className="text-xs text-blue-400 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-white">{db.blog.length}</p>
          <p className="text-slate-400 text-sm">Total Artikel</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 border border-green-500/30 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-xs text-green-400 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-white">1.2k</p>
          <p className="text-slate-400 text-sm">Total Views</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 border border-purple-500/30 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-purple-400" size={20} />
            <span className="text-xs text-purple-400 font-medium">3.2min</span>
          </div>
          <p className="text-2xl font-bold text-white">4.5</p>
          <p className="text-slate-400 text-sm">Avg. Read Time</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-500/20 border border-cyan-500/30 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Plus className="text-cyan-400" size={20} />
            <span className="text-xs text-cyan-400 font-medium">New</span>
          </div>
          <p className="text-2xl font-bold text-white">2</p>
          <p className="text-slate-400 text-sm">Draft Articles</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Plus size={20} className="text-white" />
              </div>
              Tambah Artikel Baru
            </h2>
            <FormWrapper action={addBlog} redirectTo="/admin/blog">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Judul Artikel</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Masukkan judul artikel..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL)</label>
                  <input
                    name="slug"
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 lowercase"
                    placeholder="artikel-judul-anda"
                  />
                  <p className="text-slate-500 text-xs mt-1">💡 Kosongkan untuk auto-generate SEO-friendly URL dari judul</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Konten Artikel</label>
                  <textarea
                    name="content"
                    required
                    rows={6}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    placeholder="Tulis konten artikel di sini..."
                  ></textarea>
                </div>
              </div>
            </FormWrapper>
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Daftar Artikel</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                <span className="text-blue-400 text-sm font-medium">{db.blog.length} artikel</span>
              </div>
            </div>

            {db.blog.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-400 text-lg font-medium mb-2">Belum ada artikel</p>
                <p className="text-slate-500 text-sm">Mulai dengan menambah artikel pertama Anda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {db.blog.map((post, index) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-700/50 rounded-xl p-4 hover:from-blue-600/10 hover:to-cyan-600/10 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-lg truncate group-hover:text-blue-400 transition-colors duration-300">{post.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />3 min read
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2">{post.content}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={`/admin/blog/${post.id}/edit`} className="group/edit relative overflow-hidden p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/20 rounded-xl transition-all duration-300" title="Edit">
                          <Edit2 size={18} className="group-hover/edit:scale-110 transition-transform duration-300" />
                        </a>
                        <DeleteForm action={deleteItem} type="blog" id={post.id} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/5 group-hover:to-cyan-600/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
