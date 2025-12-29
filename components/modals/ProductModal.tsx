"use client";
import Modal from "@/components/ui/Modal";
import type { Product } from "@/lib/types";

export default function ProductModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: Product | null }) {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose} title={item.name}>
      <div className="text-3xl font-bold text-white mb-4">{item.price}</div>
      <ul className="text-slate-200 space-y-2 mb-4">
        {item.features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
      <a href="https://wa.me/6281234567890" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold">
        Hubungi Kami
      </a>
    </Modal>
  );
}
