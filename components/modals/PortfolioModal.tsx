"use client";
import Modal from "@/components/ui/Modal";
import type { PortfolioItem } from "@/lib/types";

export default function PortfolioModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: PortfolioItem | null }) {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose} title={item.title}>
      <div className="text-xs font-bold text-cyan-400 mb-2">{item.category}</div>
      <div className="mb-4 flex flex-col md:flex-row md:items-start md:gap-6">
        {item.image && (
          <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
            <img src={item.image} alt={item.title} className="w-full h-32 md:h-36 object-cover rounded-lg" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="text-slate-200">{item.description}</div>
      </div>
    </Modal>
  );
}
