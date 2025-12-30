"use client";
import { useActionState } from "react";
import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

type ServerAction = (prev: unknown, formData: FormData) => Promise<{ message?: string; error?: string } | void>;

export default function DeleteForm({ action, type, id }: { action: ServerAction; type: string; id: string }) {
  const [state, act] = useActionState(action, null);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onConfirm() {
    // submit the form programmatically which will call the server action
    formRef.current?.requestSubmit();
    // Don't close modal immediately - let user see the result
    setTimeout(() => {
      setOpen(false);
      setShowNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    }, 500);
  }

  return (
    <>
      <form ref={formRef} action={act} className="flex items-center gap-2">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <button type="button" onClick={() => setOpen(true)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus">
          <Trash2 size={18} />
        </button>
      </form>

      {/* Persistent Notification */}
      {(state?.message || state?.error) && showNotification && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-pulse">
          {state?.message && <div className="text-green-400 text-sm font-medium bg-green-500/10 border border-green-500/30 p-3 rounded-lg">✅ {state.message}</div>}
          {state?.error && <div className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/30 p-3 rounded-lg">❌ {state.error}</div>}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative p-6 rounded-xl w-full max-w-md z-10 cloud-panel">
            <h3 className="text-lg font-bold mb-2">Konfirmasi Hapus</h3>
            <p className="text-sm text-slate-600 mb-4">Yakin ingin menghapus data ini? Aksi ini tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg btn">
                Batal
              </button>
              <button onClick={onConfirm} className="px-4 py-2 rounded-lg btn btn-danger">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
