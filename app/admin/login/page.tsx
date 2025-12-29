"use client";
import { loginAction } from '@/actions/admin-actions';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useActionState } from 'react';

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
           <div className="bg-blue-600 p-3 rounded-2xl"><Lock size={32} className="text-white"/></div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-2">Login Admin</h1>
        <p className="text-center text-slate-400 mb-8 text-sm">Masuk untuk mengelola website BangOos.</p>
        
        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
              <AlertCircle size={18} /> {state.error}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400 uppercase tracking-wide">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
              <input name="username" type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder="admin" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input name="password" type="password" required className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder="•••••••" />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all">Masuk Dashboard</button>
        </form>
      </div>
    </div>
  );
}
