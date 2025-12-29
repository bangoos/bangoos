"use client";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const initialTheme = (() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return "dark";
    if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  })();

  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <header className="fixed w-full z-50 bg-transparent py-4 border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-tight">BangOos</div>
        <div className="flex items-center gap-6">
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

          <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
