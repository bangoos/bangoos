"use client";
import { useSettings } from "@/hooks/useSettings";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function DynamicFooter() {
  const { settings } = useSettings();

  return (
    <footer className="py-6 border-t border-white/10 mt-4">
      <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-4 gap-10">
        {/* 50% - Brand & Description */}
        <div className="md:col-span-2">
          <div className="text-2xl font-bold tracking-tight mb-4">
            <span className="text-white">{settings.siteTitle.split(" ")[0]}</span>
            <span className="text-cyan-400">{settings.siteTitle.split(" ")[1] || "Web"}</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">{settings.siteDescription}</p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-6">
            <a href={settings.socialMedia.facebook} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">
              <Facebook size={18} className="text-blue-400" />
            </a>
            <a href={settings.socialMedia.twitter} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} className="text-sky-400" />
            </a>
            <a href={settings.socialMedia.instagram} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram size={18} className="text-pink-400" />
            </a>
          </div>
        </div>

        {/* 25% - Footer Links */}
        <div>
          <div className="font-semibold mb-4 text-white">Quick Links</div>
          <ul className="text-gray-400 text-sm space-y-2">
            {settings.footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="hover:text-cyan-400 transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 25% - Contact */}
        <div>
          <div className="font-semibold mb-4 text-white">Kontak</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" />
              <a href={`mailto:${settings.contact.email}`} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                {settings.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400" />
              <a href={`tel:${settings.contact.phone}`} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                {settings.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-gray-400 text-sm">{settings.contact.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm text-center">{settings.footerText}</p>
      </div>
    </footer>
  );
}
