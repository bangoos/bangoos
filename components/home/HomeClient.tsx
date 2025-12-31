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
  const contentWrapper = "container mx-auto px-6 max-w-6xl w-full";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageLayout>
      <section id="beranda" className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -50, 0], opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl mix-blend-screen"
          />
          <motion.div
            animate={{ y: [0, 50, 0], opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-40 right-10 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl mix-blend-screen"
          />
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.12, 0.35, 0.12] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl mix-blend-screen"
          />
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className={contentWrapper + " relative z-10 grid lg:grid-cols-2 gap-12 items-center"}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-cyan-300 font-bold tracking-wider text-sm uppercase mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                #1 Agensi Digital di Karawang
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                <span className="text-white block mb-2">Solusi Digital</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 animate-gradient bg-300">Web Solutions</span>
              </h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl">
                Website super cepat, <span className="text-cyan-400 font-semibold">SEO lokal Karawang #1</span>, dan gratis hosting selamanya. Spesialis UMKM, Skripsi, dan Profil Kantor profesional.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://wa.me/6281234567890"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Rocket size={24} className="relative z-10" />
                <span className="relative z-10">Mulai Sekarang</span>
              </motion.a>

              <motion.a
                href="#portofolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 border-2 border-cyan-500/50 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 backdrop-blur-sm transition-all duration-300"
              >
                <PlayCircle size={24} />
                <span>Lihat Portofolio</span>
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-3 text-cyan-400 font-medium">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" />
                <span>Gratis Hosting Selamanya</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-400 font-medium">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" />
                <span>Garansi Halaman 1 Google</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-400 font-medium">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" />
                <span>Support 24/7</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="hidden lg:block relative">
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20" />
                <div className="relative bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center space-y-6">
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-7xl md:text-8xl">
                      🚀
                    </motion.div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white">Siap Launch!</h3>
                      <p className="text-cyan-300 text-lg font-medium">Website profesional Anda siap dalam 24 jam</p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50" style={{ animationDelay: "0.5s" }}></div>
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse shadow-lg shadow-red-400/50" style={{ animationDelay: "1s" }}></div>
                    </div>
                    <div className="pt-4 border-t border-cyan-500/30">
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span>Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span>Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="layanan" className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
        <div className={contentWrapper + " relative z-10"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Jasa <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Website Profesional</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Solusi website lengkap untuk berbagai kebutuhan bisnis Anda di Karawang</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                t: "Website UMKM",
                d: "Toko Online & Company Profile untuk UMKM Karawang",
                features: ["Responsive Design", "SEO Basic", "WhatsApp Integration", "Free Domain"],
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: MapPin,
                t: "SEO Karawang",
                d: "Optimasi Lokal #1 Karawang - Garansi Halaman 1 Google",
                features: ["Local SEO", "Google Maps", "Keyword Research", "Analytics"],
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: CheckCircle2,
                t: "Web Skripsi",
                d: "Tugas Akhir & Kampus - Source Code Lengkap",
                features: ["Full Documentation", "Source Code", "Guidance", "Revisi Support"],
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} rounded-2xl opacity-20 blur-xl`} />
                    <div className={`relative w-16 h-16 bg-gradient-to-r ${f.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <f.icon size={32} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{f.t}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{f.d}</p>

                  <div className="space-y-2">
                    {f.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className={contentWrapper + " relative z-10"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Harga Website</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Harga transparan untuk website profesional di Karawang</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {db.products.length > 0
              ? db.products.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className={`relative group ${i === 1 ? "scale-105" : ""}`}>
                    {i === 1 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">🔥 Paling Laris</div>
                      </div>
                    )}

                    <div
                      className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                        i === 1
                          ? "bg-gradient-to-b from-purple-900/30 to-[#0F1628] border-2 border-purple-500/50 shadow-2xl shadow-purple-900/30"
                          : "bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 hover:border-cyan-500/30"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative p-8">
                        <h3 className={`text-2xl font-bold mb-4 ${i === 1 ? "text-white" : "text-gray-300"} group-hover:text-cyan-400 transition-colors`}>{p.name}</h3>

                        <div className="mb-8">
                          <div className="text-4xl font-black text-white mb-2">{p.price}</div>
                          <div className="text-sm text-gray-400">one-time payment</div>
                        </div>

                        <ul className="space-y-4 mb-8">
                          {p.features.map((f, fi) => (
                            <li key={fi} className="flex gap-3 items-start">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 size={14} className="text-white" />
                              </div>
                              <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => {
                            if (i === 2) {
                              window.open("https://wa.me/6281234567890", "_blank");
                            } else {
                              setModalType("product");
                              setSelectedItem(p);
                            }
                          }}
                          className={`block w-full text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                            i === 1
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                              : i === 2
                              ? "bg-gray-700 text-white hover:bg-gray-600"
                              : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          }`}
                        >
                          {i === 1 ? "🚀 Paling Laris" : i === 2 ? "💬 Kontak Kami" : "📦 Pilih Paket"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              : // Fallback data saat database kosong
                [
                  { id: "1", name: "Starter", price: "Rp 1,5 Juta", features: ["Landing Page 1 Section", "Desain Modern", "Free Domain .my.id", "Gratis Meeting Selamanya", "Revisi 2x"] },
                  { id: "2", name: "Bisnis", price: "Rp 3 Juta", features: ["Hingga 5 Halaman", "SEO Basic Karawang", "Integrasi WhatsApp", "Analitik Google", "Revisi 3x", "Support Prioritas"] },
                  { id: "3", name: "Custom / Skripsi", price: "Rp 5 Juta", features: ["Full Sistem Database", "Fitur Komplet (Login/Admin)", "Source Code Lengkap (Skripsi)", "Dokumentasi", "Revisi 5x", "Guidance Bimbingan"] },
                ].map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className={`relative group ${i === 1 ? "scale-105" : ""}`}>
                    {i === 1 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">🔥 Paling Laris</div>
                      </div>
                    )}

                    <div
                      className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                        i === 1
                          ? "bg-gradient-to-b from-purple-900/30 to-[#0F1628] border-2 border-purple-500/50 shadow-2xl shadow-purple-900/30"
                          : "bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 hover:border-cyan-500/30"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative p-8">
                        <h3 className={`text-2xl font-bold mb-4 ${i === 1 ? "text-white" : "text-gray-300"} group-hover:text-cyan-400 transition-colors`}>{p.name}</h3>

                        <div className="mb-8">
                          <div className="text-4xl font-black text-white mb-2">{p.price}</div>
                          <div className="text-sm text-gray-400">one-time payment</div>
                        </div>

                        <ul className="space-y-4 mb-8">
                          {p.features.map((f, fi) => (
                            <li key={fi} className="flex gap-3 items-start">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 size={14} className="text-white" />
                              </div>
                              <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => {
                            if (i === 2) {
                              window.open("https://wa.me/6281234567890", "_blank");
                            } else {
                              setModalType("product");
                              setSelectedItem(p);
                            }
                          }}
                          className={`block w-full text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                            i === 1
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                              : i === 2
                              ? "bg-gray-700 text-white hover:bg-gray-600"
                              : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          }`}
                        >
                          {i === 1 ? "🚀 Paling Laris" : i === 2 ? "💬 Kontak Kami" : "📦 Pilih Paket"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Produk <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section id="portofolio" className="py-8">
        <div className={contentWrapper}>
          <div className="flex justify-between items-end mb-8">
            <div className={contentWrapper}>
              <h2 className="text-3xl font-bold">
                Portfolio <span className="text-cyan-400">Website</span>
              </h2>
              <p className="text-gray-400 mt-2">Hasil kerja nyata untuk client di Karawang.</p>
            </div>
            <Link href="/portofolio" className="hidden md:flex items-center text-sm text-blue-400 hover:text-blue-300 font-semibold">
              Lihat Semua <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {db.portfolio.length > 0
              ? db.portfolio.slice(0, 3).map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setModalType("portfolio");
                      setSelectedItem(item);
                    }}
                    className="group bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 text-left w-full hover:shadow-xl hover:shadow-blue-900/20"
                  >
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
                      <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.description}</p>
                    </div>
                  </button>
                ))
              : // Fallback data saat database kosong
                [
                  { id: "1", title: "Toko Online UMKM Karawang", description: "Platform e-commerce lengkap untuk UMKM lokal", category: "UMKM", image: null },
                  { id: "2", title: "Sistem Informasi Skripsi", description: "Aplikasi web untuk manajemen data skripsi", category: "Skripsi", image: null },
                  { id: "3", title: "Company Profile PT. Karawang", description: "Website profil perusahaan profesional", category: "Kantor", image: null },
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
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
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/portofolio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="blog" className="py-8">
        <div className={contentWrapper}>
          <div className="flex justify-between items-end mb-8">
            <div className={contentWrapper}>
              <h2 className="text-3xl font-bold">
                Artikel <span className="text-cyan-400">Website</span>
              </h2>
              <p className="text-gray-400 mt-2">Wawasan terbaru seputar Web & Bisnis.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-sm text-blue-400 hover:text-blue-300 font-semibold">
              Lihat Semua <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {db.blog.length > 0
              ? db.blog.slice(0, 2).map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 cursor-pointer"
                    onClick={() => {
                      setModalType("blog");
                      setSelectedItem(item);
                    }}
                  >
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
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6">{item.content}</p>
                      <button className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                        Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                ))
              : // Fallback data saat database kosong
                [
                  { id: "1", title: "Pentingnya SEO Lokal untuk UMKM", content: "SEO lokal sangat penting untuk UMKM di Karawang. Dengan optimasi yang tepat, bisnis Anda bisa muncul di pencarian Google.", date: "15 Des 2024", image: null },
                  { id: "2", title: "Tips Judul Skripsi IT yang Mudah Diterima", content: "Memilih judul skripsi IT yang tepat sangat krusial. Pilih tema yang relevan dengan industri saat ini.", date: "12 Des 2024", image: null },
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-b from-[#1a2332] to-[#0F1628] border border-gray-700/50 rounded-2xl overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                        <div className="text-6xl">
                          {item.title.includes("SEO") && "🔍"}
                          {item.title.includes("Skripsi") && "📚"}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">{item.date}</div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6">{item.content}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

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
    </PageLayout>
  );
}
