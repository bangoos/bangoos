import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/vercel-blob";
import PageLayout from "@/components/PageLayout";

export default async function PortfolioDetail({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const { id } = await (params as any);
  const db = await getDatabase();
  const item = db.portfolio.find((p) => p.id === id) ?? db.portfolio.find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === id);
  if (!item) return notFound();

  return (
    <PageLayout>
      <main className="container mx-auto px-6 max-w-3xl py-12">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">{item.category}</span>
        <h1 className="text-4xl font-bold mt-2 mb-6">{item.title}</h1>
        {item.image && <img src={item.image} alt={item.title} className="w-full rounded-xl border border-white/10 mb-8" />}
        <div className="text-gray-300 leading-relaxed">{item.description}</div>
      </main>
    </PageLayout>
  );
}
