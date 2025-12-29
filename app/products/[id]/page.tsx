import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/vercel-blob";
import PageLayout from "@/components/PageLayout";

export default async function ProductDetail({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const { id } = await (params as any);
  const db = await getDatabase();
  const item = db.products.find((p) => p.id === id) ?? db.products.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === id);
  if (!item) return notFound();

  return (
    <PageLayout>
      <main className="container mx-auto px-6 max-w-3xl py-12">
        <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
        <div className="text-3xl font-bold mb-6">{item.price}</div>
        <ul className="space-y-3 mb-8 text-gray-300">
          {item.features.map((f, i) => (
            <li key={i} className="flex gap-2">
              • {f}
            </li>
          ))}
        </ul>
        <a href="https://wa.me/6281234567890" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold">
          Hubungi Kami
        </a>
      </main>
    </PageLayout>
  );
}
