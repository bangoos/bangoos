"use client";

import { useState } from "react";
import type { Database, BlogPost } from "@/lib/types";
import BlogModal from "@/components/modals/BlogModal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

interface BlogClientProps {
  db: Database;
}

export default function BlogClient({ db }: BlogClientProps) {
  const [selectedItem, setSelectedItem] = useState<BlogPost | null>(null);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 max-w-7xl w-full py-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Semua <span className="text-cyan-400">Artikel & Tips</span>
          </h1>
          <p className="text-gray-400 text-lg">Wawasan terbaru seputar Web & Bisnis.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {db.blog.map((item: BlogPost) => (
            <div key={item.id} className="group bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                    <div className="text-6xl">
                      {item.title.includes("SEO") && "🔍"}
                      {item.title.includes("Skripsi") && "📚"}
                      {!item.title.includes("SEO") && !item.title.includes("Skripsi") && "📝"}
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">{item.date}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed line-clamp-3 mb-4">{item.content}</p>
                <button onClick={() => setSelectedItem(item)} className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Baca Selengkapnya <ExternalLink size={16} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {db.blog.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-400">Artikel akan segera ditambahkan. Silakan kembali lagi nanti.</p>
          </div>
        )}

        <BlogModal open={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} />
      </div>
    </PageLayout>
  );
}
