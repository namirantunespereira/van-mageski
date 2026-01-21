
"use client";
import Image from "next/image";
import { useState } from "react";
import type { Tattoo } from "@/lib/gallery";
import Lightbox from "./Lightbox";
import Link from "next/link";

import data from "@/data/tattoos.json";

export function getAllLocalTattoos() {
  return data as Tattoo[];
}

export function getTattooByIdLocal(id: string) {
  return (data as Tattoo[]).find(t => t.id === id) || null;
}


export default function Gallery({ items }: { items: Tattoo[] }) {
  const [view, setView] = useState<{src: string; alt: string} | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((t) => (
          <figure key={t.id} className="group relative overflow-hidden rounded-lg bg-white">
            {/* Abre detalhe ao clicar no título/caption */}
            <Link href={`/portfolio/${t.id}`} className="absolute inset-0 z-10" aria-label={`Abrir ${t.title}`} />
            {/* Clique na imagem abre lightbox (sem sair da página) */}
            <button
              onClick={() => setView({ src: t.image, alt: t.title })}
              className="block"
              aria-label={`Ampliar ${t.title}`}
            >
              <Image
                src={t.image}
                alt={t.title}
                width={800}
                height={1000}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
              />
            </button>
            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
              {t.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {view && <Lightbox src={view.src} alt={view.alt} onClose={() => setView(null)} />}
    </>
  );
}
``
