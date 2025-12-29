"use client";

import { useState } from "react";
import type { Database, Product } from "@/lib/types";
import ProductModal from "@/components/modals/ProductModal";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

interface ProductsClientProps {
  db: Database;
}

export default function ProductsClient({ db }: ProductsClientProps) {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 max-w-7xl w-full py-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Semua <span className="text-cyan-400">Paket Layanan</span>
          </h1>
          <p className="text-gray-400 text-lg">Pilih paket yang sesuai dengan kebutuhan bisnis Anda.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {db.products.map((p: Product, i) => (
            <div
              key={p.id}
              className={`rounded-2xl ${
                i === 1 ? "p-8 bg-gradient-to-b from-blue-900/30 to-[#0F1628] border-2 border-blue-500/50 shadow-2xl shadow-blue-900/30 scale-105 relative" : "bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 p-8"
              }`}
            >
              {i === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-full">Paling Laris</div>
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${i === 1 ? "text-white" : "text-gray-200"}`}>{p.name}</h3>
              <div className="text-3xl font-bold mb-6 text-white">{p.price}</div>
              <ul className="space-y-3 mb-8 text-gray-400 text-sm">
                {p.features.map((f, fi) => (
                  <li key={fi} className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (i === 2) {
                    window.open("https://wa.me/6281234567890", "_blank");
                  } else {
                    setSelectedItem(p);
                  }
                }}
                className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${
                  i === 1 ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700" : i === 2 ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {i === 1 ? "Paling Laris" : i === 2 ? "Kontak Kami" : "Pilih Paket"}
              </button>
            </div>
          ))}
        </div>

        {db.products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Paket</h3>
            <p className="text-gray-400">Paket layanan akan segera ditambahkan. Silakan kembali lagi nanti.</p>
          </div>
        )}

        <ProductModal open={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} />
      </div>
    </PageLayout>
  );
}
