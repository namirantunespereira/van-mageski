
import Image from "next/image";
import { getTattoosFromNotion } from "@/lib/notion";
import { getAllLocalTattoos } from "@/lib/gallery";
import type { Metadata } from "next";

type Params = { params: { id: string } };

async function getTattoo(id: string) {
  const notion = await getTattoosFromNotion();
  if (notion.length) {
    const found = notion.find(t => t.id === id);
    if (found) return found;
  }
  const local = getAllLocalTattoos();
  return local.find(t => t.id === id) || null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = await getTattoo(params.id);
  const title = t ? `${t.title} — Van Mageski` : "Trabalho — Van Mageski";
  const description = t ? `Categoria: ${t.category}` : "Portfólio de tatuagens autorais.";
  const images = t?.image ? [{ url: t.image, width: 1200, height: 630 }] : [{ url: "/og-image.jpg", width: 1200, height: 630 }];

  return {
    title,
    description,
    openGraph: { title, description, images, type: "article", siteName: "Van Mageski" },
    twitter: { card: "summary_large_image", title, description, images: images.map(i => i.url) }
  };
}

export default async function TattooPage({ params }: Params) {
  const t = await getTattoo(params.id);
  if (!t) {
    return (
      <section className="container py-10">
        <h1 className="font-display text-3xl">Trabalho não encontrado</h1>
      </section>
    );
  }
  return (
    <section className="container py-10 space-y-6">
      <h1 className="font-display text-3xl">{t.title}</h1>
      <p className="text-brand-dark/70">Categoria: {t.category}</p>
      <Image src={t.image} alt={t.title} width={1200} height={1600} className="rounded-lg w-full h-auto" />
      <div>
        <a href="/portfolio" className="inline-block mt-4 underline">← Voltar ao portfólio</a>
      </div>
    </section>
  );
}
``
