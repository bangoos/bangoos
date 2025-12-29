export interface BlogPost { id: string; title: string; slug: string; content: string; image: string; date: string; }
export interface PortfolioItem { id: string; title: string; description: string; category: "UMKM" | "Skripsi" | "Kantor"; image: string; }
export interface Product { id: string; name: string; price: string; features: string[]; }
export interface Database { blog: BlogPost[]; portfolio: PortfolioItem[]; products: Product[]; }