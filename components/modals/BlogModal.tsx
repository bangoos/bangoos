"use client";
import Modal from "@/components/ui/Modal";
import type { BlogPost } from "@/lib/types";

export default function BlogModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: BlogPost | null }) {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose} title={item.title}>
      <div className="text-sm text-slate-400 mb-4">{item.date}</div>
      <div className="mb-4 flex flex-col md:flex-row md:items-start md:gap-6">
        {item.image && (
          <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
            <img src={item.image} alt={item.title} className="w-full h-32 md:h-40 object-cover rounded-lg" loading="lazy" decoding="async" />
          </div>
        )}
        <article className="prose prose-invert max-w-none text-slate-200">
          <p>{item.content}</p>
        </article>
      </div>
    </Modal>
  );
}
