"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, PlayCircle, Zap, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/lib/types";
import PageLayout from "@/components/PageLayout";
import BlogModal from "@/components/modals/BlogModal";
import PortfolioModal from "@/components/modals/PortfolioModal";
import ProductModal from "@/components/modals/ProductModal";

export default function HomeClient({ db }: { db: Database }) {
  const [scrolled, setScrolled] = useState(false);
  const [modalType, setModalType] = useState<"blog" | "portfolio" | "product" | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const contentWrapper = "container mx-auto px-6 max-w-7xl w-full";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageLayout>
      <section id="beranda" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -50, 0], opacity: [0.18, 0.45, 0.18] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl mix-blend-screen" />
          <motion.div animate={{ y: [0, 50, 0], opacity: [0.18, 0.45, 0.18] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-10 w-96 h-96 bg-green-200 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className={contentWrapper + " relative z-10 grid md:grid-cols-2 gap-12 items-center"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 text-cyan-300 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">#1 Agensi Digital di Karawang</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
              Solusi Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Web Solutions</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">Website super cepat, SEO lokal Karawang, dan gratis hosting selamanya. Spesialis UMKM, Skripsi, dan Profil Kantor.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/6281234567890" className="btn btn-primary px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-3">
                <Rocket size={20} /> Mulai Sekarang
              </a>
              <a href="#portofolio" className="btn btn-ghost px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                <PlayCircle size={20} /> Lihat Portofolio
              </a>
            </div>
            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400" /> Gratis Hosting</div>
              <div className="flex items-center gap-2 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400" /> Garansi SEO</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="layanan" className="py-20">
        <div className={contentWrapper}>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Mengapa <span className="text-green-600">BangOos?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, t: "Super Cepat", d: "Teknologi Next.js" },
              { icon: MapPin, t: "SEO Lokal", d: "Karawang Area" },
              { icon: CheckCircle2, t: "Gratis Hosting", d: "Vercel Stack" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="cloud-panel p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-500">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{f.t}</h3>
                <p className="text-slate-600">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="portofolio" className="py-20">
        <div className={contentWrapper}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Karya <span className="text-cyan-400">Terbaru</span></h2>
              <p className="text-gray-400 mt-2">Hasil kerja nyata untuk client di Karawang.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm text-blue-400 hover:text-blue-300 font-semibold">Lihat Semua <ArrowRight size={16} className="ml-1" /></a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {db.portfolio.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  setModalType("portfolio");
                  setSelectedItem(item);
                }}
                className="group cloud-panel overflow-hidden hover:-translate-y-2 transition-transform duration-300 text-left w-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/12 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">{item.category}</span>
                  <h3 className="text-xl font-bold mt-2 group-hover:text-cyan-400 transition-colors text-white">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20">
        <div className={contentWrapper}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Artikel <span className="text-cyan-400">& Tips</span></h2>
              <p className="text-gray-400 mt-2">Wawasan terbaru seputar Web & Bisnis.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm text-blue-400 hover:text-blue-300 font-semibold">
              Lihat Semua <ArrowRight size={16} className="ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {db.blog.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cloud-panel overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute bottom-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 m-4 rounded-full z-10">{item.date}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed line-clamp-2 mb-6">{item.content}</p>
                  <button
                    onClick={() => {
                      setModalType("blog");
                      setSelectedItem(item);
                    }}
                    className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className={contentWrapper}>
          <h2 className="text-3xl font-bold mb-12 text-center">Investasi <span className="text-cyan-400">Terbaik</span></h2>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Modals */}
            <BlogModal
              open={modalType === "blog"}
              onClose={() => {
                setModalType(null);
                setSelectedItem(null);
              }}
              item={modalType === "blog" ? selectedItem : null}
            />
            <PortfolioModal
              open={modalType === "portfolio"}
              onClose={() => {
                setModalType(null);
                setSelectedItem(null);
              }}
              item={modalType === "portfolio" ? selectedItem : null}
            />
            <ProductModal
              open={modalType === "product"}
              onClose={() => {
                setModalType(null);
                setSelectedItem(null);
              }}
              item={modalType === "product" ? selectedItem : null}
            />
            {db.products.map((p, i) => (
              <div key={p.id} className={`rounded-3xl ${i === 1 ? "p-8 bg-gradient-to-b from-blue-900/20 to-[#0F1628] border-blue-500/50 shadow-2xl shadow-blue-900/20 scale-105" : "cloud-panel"}`}>
                {i === 1 && <div className="text-center mb-4 text-blue-400 font-bold text-xs uppercase tracking-wider">Paling Laris</div>}
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <div className="text-3xl font-bold mb-4 text-white">{p.price}</div>
                <ul className="space-y-3 mb-8 text-gray-400 text-sm">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex gap-2">
                      <CheckCircle2 size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setModalType("product");
                    setSelectedItem(p);
                  }}
                  className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${i === 1 ? "btn btn-primary" : "btn"}`}
                >
                  {i === 1 ? "Paling Laris" : "Pilih Paket"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
