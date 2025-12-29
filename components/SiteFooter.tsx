export default function SiteFooter() {
  return (
    <footer className="py-16 border-t border-white/10 mt-16">
      <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-2xl font-bold tracking-tight mb-4"><span className="text-white">BangOos</span><span className="text-cyan-400">Web</span></div>
          <p className="text-gray-400 text-sm">Biro Jasa digital Karawang. Website cepat, SEO lokal, dan hosting selamanya untuk UMKM, Skripsi, dan Profil Kantor.</p>
        </div>
        <div>
          <div className="font-semibold mb-4">Layanan</div>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Jasa Pembuatan Website</li>
            <li>SEO Lokal Karawang</li>
            <li>Profil Kantor</li>
            <li>Skripsi / Tugas Akhir</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-4">Kontak</div>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Karawang, Jawa Barat</li>
            <li>Email: halo@bangoos.id</li>
            <li>WhatsApp: +62 812-3456-7890</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-10">&copy; 2025 BangOos Web Solutions.</div>
    </footer>
  );
}
