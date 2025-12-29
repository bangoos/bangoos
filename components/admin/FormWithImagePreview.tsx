"use client";
import { useState, useActionState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";

type ServerAction = (prevState: unknown, formData: FormData) => Promise<{ message?: string; error?: string } | void>;
export function FormWrapper({ action, children, defaultImage, fileRequired = false }: { action: ServerAction; children: React.ReactNode; defaultImage?: string; fileRequired?: boolean }) {
  const [state, formAct] = useActionState(action, null);
  const [preview, setPrev] = useState<string | null>(defaultImage ?? null);

  return (
    <form action={formAct} className="space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
      {state?.message && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
          <Check size={18} /> {state.message}
        </div>
      )}
      {state?.error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
          <AlertCircle size={18} /> {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Upload Gambar</label>
        <div className="relative group">
          <input type="file" name="file" onChange={(e) => setPrev(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 group-hover:border-blue-500 group-hover:text-blue-400">
            <Upload size={32} />
            <span className="text-sm">Klik upload</span>
          </div>
        </div>
        {preview && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-600">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      {children}
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl">
        Simpan
      </button>
    </form>
  );
}
