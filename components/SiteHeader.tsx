"use client";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md py-4 border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-tight">BangOos</div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#beranda" className="text-sm text-gray-300 hover:text-cyan-400">
            Beranda
          </a>
          <a href="#layanan" className="text-sm text-gray-300 hover:text-cyan-400">
            Layanan
          </a>
          <a href="#portofolio" className="text-sm text-gray-300 hover:text-cyan-400">
            Portofolio
          </a>
          <a href="#blog" className="text-sm text-gray-300 hover:text-cyan-400">
            Blog
          </a>
          <a href="#pricing" className="text-sm text-gray-300 hover:text-cyan-400">
            Harga
          </a>
        </nav>
      </div>
    </header>
  );
}
