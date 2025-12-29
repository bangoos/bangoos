import { getDatabase } from '@/lib/vercel-blob';
import { FileText, Image as ImageIcon, Package, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const db = await getDatabase();
  const stats = [
    { title: 'Total Blog', value: db.blog.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Portofolio', value: db.portfolio.length, icon: ImageIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Produk', value: db.products.length, icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Ringkasan konten website Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 border-dashed">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-cyan-400"/> Aksi Cepat</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/blog" className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">+ Tambah Blog</a>
          <a href="/admin/portfolio" className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">+ Tambah Portofolio</a>
          <a href="/admin/products" className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">+ Tambah Produk</a>
        </div>
      </div>
    </div>
  );
}
