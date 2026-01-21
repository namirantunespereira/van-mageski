
import Image from "next/image";
import Link from "next/link";
import type { Tattoo } from "@/lib/gallery";

export default function Gallery({ items }: { items: Tattoo[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {items.map((t) => (
        <figure key={t.id} className="group relative overflow-hidden rounded-lg bg-white">
          <Image
            src={t.image}
            alt={t.title}
            width={800}
            height={1000}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
            {t.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
``
