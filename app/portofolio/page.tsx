import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export const revalidate = 0; // Disable caching for this page

export default async function PortfolioPage() {
  const db: Database = await getDatabase();

  return (
    <PageLayout>
      <div className="container mx-auto px-6 max-w-6xl w-full py-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Semua <span className="text-cyan-400">Portofolio</span>
          </h1>
          <p className="text-gray-400 text-lg">Hasil kerja nyata untuk client di Karawang dan sekitarnya.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {db.portfolio.map((item) => (
            <div key={item.id} className="group bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20">
              <div className="relative h-48 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {item.category === "UMKM" && "🛒"}
                        {item.category === "Skripsi" && "🎓"}
                        {item.category === "Kantor" && "🏢"}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">{item.category}</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">{item.category}</span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{item.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                  <ExternalLink size={16} /> Portfolio Detail
                </div>
              </div>
            </div>
          ))}
        </div>

        {db.portfolio.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Portofolio</h3>
            <p className="text-gray-400">Portofolio akan segera ditambahkan. Silakan kembali lagi nanti.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
