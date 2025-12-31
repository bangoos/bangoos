"use client";
import { useState } from "react";
import { Settings, Save, Upload, Globe, Image, Link2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [siteTitle, setSiteTitle] = useState("BangOos - Digital Agency");
  const [siteDescription, setSiteDescription] = useState("Digital agency yang menyediakan solusi teknologi modern");
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [faviconUrl, setFaviconUrl] = useState("/favicon.ico");

  const [footerText, setFooterText] = useState("© 2024 BangOos. All rights reserved.");
  const [footerLinks, setFooterLinks] = useState([
    { name: "Tentang", url: "#tentang" },
    { name: "Layanan", url: "#layanan" },
    { name: "Portofolio", url: "#portofolio" },
    { name: "Blog", url: "#blog" },
    { name: "Kontak", url: "#kontak" },
  ]);

  const [socialMedia, setSocialMedia] = useState({
    facebook: "https://facebook.com/bangoos",
    twitter: "https://twitter.com/bangoos",
    instagram: "https://instagram.com/bangoos",
    linkedin: "https://linkedin.com/company/bangoos",
    youtube: "https://youtube.com/@bangoos",
  });

  const [contact, setContact] = useState({
    email: "info@bangoos.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSaving(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddFooterLink = () => {
    setFooterLinks([...footerLinks, { name: "", url: "" }]);
  };

  const handleUpdateFooterLink = (index: number, field: string, value: string) => {
    const updated = [...footerLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFooterLinks(updated);
  };

  const handleRemoveFooterLink = (index: number) => {
    setFooterLinks(footerLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pengaturan Website</h1>
        <p className="text-slate-400">Kelola konfigurasi website, logo, footer, dan media sosial</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 border-b border-slate-700/50">
        {[
          { id: "general", name: "Umum", icon: Globe },
          { id: "branding", name: "Branding", icon: Image },
          { id: "footer", name: "Footer", icon: Link2 },
          { id: "social", name: "Sosial Media", icon: Facebook },
          { id: "contact", name: "Kontak", icon: Mail },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 ${activeTab === tab.id ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"}`}
          >
            <tab.icon size={18} />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Judul Website</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan judul website"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Deskripsi Website</label>
              <textarea
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Masukkan deskripsi website"
              />
            </div>
          </div>
        )}

        {/* Branding Settings */}
        {activeTab === "branding" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URL Logo</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/logo.png"
                />
                <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2">
                  <Upload size={18} />
                  Upload
                </button>
              </div>
              <div className="mt-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Image size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Logo Preview</p>
                    <p className="text-slate-400 text-sm">{logoUrl}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URL Favicon</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/favicon.ico"
                />
                <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2">
                  <Upload size={18} />
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Settings */}
        {activeTab === "footer" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Teks Footer</label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="© 2024 BangOos. All rights reserved."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-300">Link Footer</label>
                <button onClick={handleAddFooterLink} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  Tambah Link
                </button>
              </div>
              <div className="space-y-3">
                {footerLinks.map((link, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => handleUpdateFooterLink(index, "name", e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nama link"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateFooterLink(index, "url", e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL link"
                    />
                    <button onClick={() => handleRemoveFooterLink(index)} className="px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors">
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(socialMedia).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">{platform} URL</label>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-slate-800/50 border border-slate-600/50 rounded-xl flex items-center justify-center">
                      {platform === "facebook" && <Facebook size={18} className="text-blue-400" />}
                      {platform === "twitter" && <Twitter size={18} className="text-sky-400" />}
                      {platform === "instagram" && <Instagram size={18} className="text-pink-400" />}
                      {platform === "linkedin" && <Linkedin size={18} className="text-blue-600" />}
                      {platform === "youtube" && <Youtube size={18} className="text-red-500" />}
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setSocialMedia({ ...socialMedia, [platform]: e.target.value })}
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`https://${platform}.com/bangoos`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Settings */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-800/50 border border-slate-600/50 rounded-xl flex items-center justify-center">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@bangoos.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Telepon</label>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-800/50 border border-slate-600/50 rounded-xl flex items-center justify-center">
                    <Phone size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Alamat</label>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-800/50 border border-slate-600/50 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jakarta, Indonesia"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-700/50">
          <div>
            {saved && (
              <div className="flex items-center gap-2 text-green-400">
                <Settings size={18} />
                <span className="font-medium">Pengaturan berhasil disimpan!</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={18} />
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
