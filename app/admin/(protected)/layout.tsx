import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Layout, FileText, Image as ImageIcon, Package, LogOut, Settings, BarChart3, Home, Sparkles } from "lucide-react";
import { logoutAction } from "@/actions/admin-actions";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get("admin_session");
  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home, description: "Ringkasan data" },
    { name: "Blog", href: "/admin/blog", icon: FileText, description: "Kelola artikel" },
    { name: "Portofolio", href: "/admin/portofolio", icon: ImageIcon, description: "Kelola portfolio" },
    { name: "Produk", href: "/admin/products", icon: Package, description: "Kelola produk" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 min-h-screen flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Layout size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">BangOos Admin</h2>
              <p className="text-slate-400 text-xs">Management Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative overflow-hidden flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-slate-400 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:text-white hover:shadow-lg"
            >
              <div
                className={`w-10 h-10 rounded-lg ${
                  item.name === "Dashboard" ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-slate-700/50"
                } group-hover:from-blue-600 group-hover:to-cyan-500 flex items-center justify-center transition-all duration-300`}
              >
                <item.icon size={20} className={`${item.name === "Dashboard" ? "text-white" : "text-slate-400"} group-hover:text-white`} />
              </div>
              <div className="flex-1">
                <p className="font-medium group-hover:text-white">{item.name}</p>
                <p className="text-xs text-slate-500 group-hover:text-slate-400">{item.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-700/30 to-slate-600/30">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Settings size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Admin User</p>
              <p className="text-slate-400 text-xs">Online</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button className="group relative overflow-hidden flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                <LogOut size={18} />
              </div>
              <span className="font-medium">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-500/0 group-hover:from-red-600/5 group-hover:to-red-500/5 transition-all duration-300"></div>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
            <Layout size={20} className="text-white" />
          </div>
          <span className="font-bold text-white">BangOos Admin</span>
        </div>
        <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
          <LogOut size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
