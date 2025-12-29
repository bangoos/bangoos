"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check, AlertCircle, Loader2 } from "lucide-react";

type ServerAction = (prevState: unknown, formData: FormData) => Promise<{ message?: string; error?: string } | void>;

export function FormWrapper({ action, children, defaultImage, fileRequired = false, redirectTo = null }: { action: ServerAction; children: React.ReactNode; defaultImage?: string; fileRequired?: boolean; redirectTo?: string | null }) {
  const [state, formAct, isPending] = useActionState(action, null);
  const [preview, setPrev] = useState<string | null>(defaultImage ?? null);
  const router = useRouter();

  // Auto-redirect on success
  useEffect(() => {
    if (state?.message && redirectTo) {
      console.log("Success! Redirecting to:", redirectTo);
      const timer = setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 1500); // 1.5 second delay to show success message

      return () => clearTimeout(timer);
    }
  }, [state, redirectTo, router]);

  return (
    <form action={formAct} className="space-y-6">
      {/* Success Message */}
      {state?.message && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg animate-pulse">
          <Check size={18} />
          <span>{state.message}</span>
          {redirectTo && <span className="text-xs ml-auto">Redirecting...</span>}
        </div>
      )}

      {/* Error Message */}
      {state?.error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
          <AlertCircle size={18} /> {state.error}
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
          <Loader2 size={18} className="animate-spin" /> Processing...
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-600">Upload Gambar</label>
        <div className="relative group">
          <input type="file" name="file" onChange={(e) => setPrev(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required={fileRequired} />
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 group-hover:border-blue-500 group-hover:text-blue-400">
            <Upload size={32} />
            <span className="text-sm">Klik upload</span>
          </div>
        </div>
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl" />
          </div>
        )}
      </div>

      {children}
    </form>
  );
}
