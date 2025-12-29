"use client";
import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // focus the close button
      setTimeout(() => closeButtonRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-auto py-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-3xl mx-4 md:mx-0 cloud-panel p-6 transform transition-all max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          {title ? <h3 className="text-xl font-bold">{title}</h3> : <div />}
          <button ref={closeButtonRef} onClick={onClose} className="text-slate-600 hover:text-slate-800 px-3 py-1 rounded-md bg-transparent">
            Close
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
