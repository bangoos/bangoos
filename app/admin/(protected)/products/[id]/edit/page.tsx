import { updateItem } from "@/actions/admin-actions";
import { FormWrapper } from "@/components/admin/FormWithImagePreview";
import { getDatabase } from "@/lib/vercel-blob";
import type { Database } from "@/lib/types";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const db: Database = await getDatabase();
  const product = db.products.find((p) => p.id === params.id);
  if (!product) return <div className="p-8">Produk tidak ditemukan.</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Produk</h2>
      <FormWrapper action={updateItem}>
        <input type="hidden" name="type" value="products" />
        <input type="hidden" name="id" value={product.id} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Nama Produk</label>
            <input name="name" defaultValue={product.name} type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Harga</label>
            <input
              name="price"
              defaultValue={product.price}
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors font-semibold text-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Fitur (Pisahkan dengan koma)</label>
            <textarea
              name="features"
              defaultValue={product.features.join(", ")}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors h-24 resize-none"
            ></textarea>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
