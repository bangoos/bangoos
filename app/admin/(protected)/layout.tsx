import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Layout, FileText, Image as ImageIcon, Package, LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/admin-actions';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get('admin_session');
  if (!session) { redirect('/admin/login'); }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Layout },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Portofolio', href: '/admin/portofolio', icon: ImageIcon },
    { name: 'Produk', href: '/admin/products', icon: Package },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col">
        <div className="p-6 border-b border-slate-800 text-white font-bold flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg"><Layout size={20} className="text-white"/></div>
          BangOos Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-slate-400 hover:bg-slate-800">
              <item.icon size={20} /> {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </form>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 w-full z-50 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
        <span className="font-bold text-white">BangOos Admin</span>
        <Link href="/admin" className="text-slate-400"><LogOut size={24}/></Link>
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-14 md:mt-0">{children}</main>
    </div>
  );
}
