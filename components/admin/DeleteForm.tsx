"use client";
import { useActionState } from "react";
import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

type ServerAction = (prev: unknown, formData: FormData) => Promise<{ message?: string; error?: string } | void>;

export default function DeleteForm({ action, type, id }: { action: ServerAction; type: string; id: string }) {
  const [state, act] = useActionState(action, null);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onConfirm() {
    // submit the form programmatically which will call the server action
    formRef.current?.requestSubmit();
    setOpen(false);
  }

  return (
    <>
      <form ref={formRef} action={act} className="flex items-center gap-2">
        {state?.message && <div className="text-green-400 text-sm">{state.message}</div>}
        {state?.error && <div className="text-red-400 text-sm">{state.error}</div>}
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <button type="button" onClick={() => setOpen(true)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus">
          <Trash2 size={18} />
        </button>
      </form>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-md z-10">
            <h3 className="text-lg font-bold text-white mb-2">Konfirmasi Hapus</h3>
            <p className="text-sm text-slate-300 mb-4">Yakin ingin menghapus data ini? Aksi ini tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200">
                Batal
              </button>
              <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
