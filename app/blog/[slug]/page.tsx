import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/vercel-blob";
import PageLayout from "@/components/PageLayout";

export default async function BlogDetail({ params }: { params: { slug: string } } | { params: Promise<{ slug: string }> }) {
  const { slug } = await (params as any);
  const db = await getDatabase();
  const bySlug = db.blog.find((b) => b.slug === slug);
  const byId = db.blog.find((b) => b.id === slug);
  const item = bySlug ?? byId;
  if (!item) return notFound();

  return (
    <PageLayout>
      <main className="container mx-auto px-6 max-w-3xl py-12">
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
        <div className="text-gray-400 text-sm mb-6">{item.date}</div>
        {item.image && <img src={item.image} alt={item.title} className="w-full rounded-xl border border-white/10 mb-8" />}
        <article className="prose prose-invert max-w-none">
          <p>{item.content}</p>
        </article>
      </main>
    </PageLayout>
  );
}
