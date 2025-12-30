"use client";
import { useActionState } from "react";
import { useRef, useState } from "react";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

type ServerAction = (prev: unknown, formData: FormData) => Promise<{ message?: string; error?: string } | void>;

export default function DeleteForm({ action, type, id }: { action: ServerAction; type: string; id: string }) {
  const [state, act] = useActionState(action, null);
  const [open, setOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onConfirm() {
    // submit the form programmatically which will call the server action
    formRef.current?.requestSubmit();
    // Close modal immediately
    setOpen(false);
    // Show success popup after a short delay
    setTimeout(() => {
      if (state?.message) {
        setShowSuccessPopup(true);
        // Hide popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 3000);
      }
    }, 300);
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

      {/* Success Popup */}
      {showSuccessPopup && state?.message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-green-500/95 backdrop-blur-sm text-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 transform animate-pulse">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Berhasil!</h3>
                <p className="text-green-100">{state.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {state?.error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-red-500/95 backdrop-blur-sm text-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 transform animate-pulse">
            <div className="flex items-center gap-3">
              <XCircle size={24} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Error!</h3>
                <p className="text-red-100">{state.error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
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
