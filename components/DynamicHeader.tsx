"use client";
import { useSettings } from "@/hooks/useSettings";

export default function DynamicHeader() {
  const { settings } = useSettings();

  return (
    <header className="fixed w-full z-50 bg-[#0B1220]/80 backdrop-blur-lg py-4 border-b border-white/10">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <div className="text-3xl font-black tracking-tight">
          <span className="text-white font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">{settings.siteTitle.split(" ")[0]}</span>
          <span className="text-cyan-400 font-extrabold">{settings.siteTitle.split(" ")[1] || "Web"}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {settings.footerLinks.map((link, index) => (
            <a key={index} href={link.url} className="text-base font-medium text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105">
              {link.name}
            </a>
          ))}
          <a href={`mailto:${settings.contact.email}`} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all duration-300">
            Konsultasi
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
