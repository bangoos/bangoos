import { getDatabase } from "@/lib/vercel-blob";
import { FileText, Image as ImageIcon, Package, TrendingUp, Users, Clock, ArrowUp, ArrowDown, MoreVertical } from "lucide-react";

export default async function AdminDashboard() {
  const db = await getDatabase();
  const stats = [
    { title: "Total Blog", value: db.blog.length, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+12%", trendUp: true },
    { title: "Portofolio", value: db.portfolio.length, icon: ImageIcon, color: "text-cyan-400", bg: "bg-cyan-500/10", trend: "+8%", trendUp: true },
    { title: "Produk", value: db.products.length, icon: Package, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+15%", trendUp: true },
  ];

  const recentActivity = [
    { type: "blog", title: "Website UMKM Karawang", time: "2 jam yang lalu", icon: FileText, color: "text-blue-400" },
    { type: "portfolio", title: "Toko Online Fashion", time: "5 jam yang lalu", icon: ImageIcon, color: "text-cyan-400" },
    { type: "product", title: "Paket Website Bisnis", time: "1 hari yang lalu", icon: Package, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Dashboard Admin</h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">Kelola konten website BangOos Web dengan mudah</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs sm:text-sm font-medium">System Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={20} className="sm:size-32" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trendUp ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {stat.trendUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            Aksi Cepat
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <a
              href="/admin/blog"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-3 sm:px-4 rounded-xl font-medium hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FileText size={16} className="sm:size-18" /> <span className="text-sm sm:text-base">Blog</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="/admin/portofolio"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-3 sm:px-4 rounded-xl font-medium hover:from-cyan-600/30 hover:to-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ImageIcon size={16} className="sm:size-18" /> <span className="text-sm sm:text-base">Portfolio</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="/admin/products"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 text-purple-400 px-3 py-3 sm:px-4 rounded-xl font-medium hover:from-purple-600/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Package size={16} className="sm:size-18" /> <span className="text-sm sm:text-base">Produk</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            Aktivitas Terbaru
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-slate-700/30 transition-colors duration-200">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${activity.color.replace("text", "bg").replace("400", "500/20")} ${activity.color} flex items-center justify-center`}>
                  <activity.icon size={14} className="sm:size-18" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm sm:text-base truncate">{activity.title}</p>
                  <p className="text-slate-400 text-xs sm:text-sm">{activity.time}</p>
                </div>
                <button className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-colors">
                  <MoreVertical size={14} className="sm:size-16" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Status Sistem</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Users size={16} className="sm:size-24 text-green-400" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white">247</p>
            <p className="text-xs sm:text-sm text-slate-400">Total Pengunjung</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Clock size={16} className="sm:size-24 text-blue-400" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white">99.9%</p>
            <p className="text-xs sm:text-sm text-slate-400">Uptime</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Package size={16} className="sm:size-24 text-purple-400" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white">3</p>
            <p className="text-xs sm:text-sm text-slate-400">Total Produk</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <TrendingUp size={16} className="sm:size-24 text-cyan-400" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white">+23%</p>
            <p className="text-xs sm:text-sm text-slate-400">Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
