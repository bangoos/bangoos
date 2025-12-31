// Website settings types
export interface WebsiteSettings {
  // General Settings
  siteTitle: string;
  siteDescription: string;

  // Branding Settings
  logoUrl: string;
  faviconUrl: string;

  // Footer Settings
  footerText: string;
  footerLinks: Array<{ name: string; url: string }>;

  // Social Media Settings
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };

  // Contact Settings
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Default settings
export const defaultSettings: WebsiteSettings = {
  siteTitle: "BangOos - Digital Agency",
  siteDescription: "Digital agency yang menyediakan solusi teknologi modern",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  footerText: "© 2024 BangOos. All rights reserved.",
  footerLinks: [
    { name: "Tentang", url: "#tentang" },
    { name: "Layanan", url: "#layanan" },
    { name: "Portofolio", url: "#portofolio" },
    { name: "Blog", url: "#blog" },
    { name: "Kontak", url: "#kontak" },
  ],
  socialMedia: {
    facebook: "https://facebook.com/bangoos",
    twitter: "https://twitter.com/bangoos",
    instagram: "https://instagram.com/bangoos",
    linkedin: "https://linkedin.com/company/bangoos",
    youtube: "https://youtube.com/@bangoos",
  },
  contact: {
    email: "info@bangoos.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
  },
};
