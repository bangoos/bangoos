"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab" && modalRef.current) {
        // simple focus trap
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter(Boolean);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      // focus the close button after paint
      setTimeout(() => closeButtonRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-auto py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
          aria-hidden={!open}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            ref={modalRef}
            className="relative z-10 w-full max-w-3xl mx-4 md:mx-0 cloud-panel p-6 transform max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985, y: 10 }}
            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985, y: 10 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              {title ? (
                <h3 id="modal-title" className="text-xl font-bold">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button ref={closeButtonRef} onClick={onClose} className="text-slate-600 hover:text-slate-800 px-3 py-1 rounded-md bg-transparent">
                Close
              </button>
            </div>
            <div className="overflow-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
