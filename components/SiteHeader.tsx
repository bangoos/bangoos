"use client";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  return (
    <header className="fixed w-full z-50 bg-transparent py-3 border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-white">BangOos</span>
          <span className="text-cyan-400">Web</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beranda" className="text-sm text-gray-300 hover:text-cyan-400">
              Beranda
            </a>
            <a href="#layanan" className="text-sm text-gray-300 hover:text-cyan-400">
              Layanan
            </a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-cyan-400">
              Harga
            </a>
            <a href="#portofolio" className="text-sm text-gray-300 hover:text-cyan-400">
              Portofolio
            </a>
            <a href="#blog" className="text-sm text-gray-300 hover:text-cyan-400">
              Blog
            </a>
          </nav>
          <a href="https://wa.me/6281234567890" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20">
            Konsultasi
          </a>
        </div>
      </div>
    </header>
  );
}
