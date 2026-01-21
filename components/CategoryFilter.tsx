
"use client";
import { CATEGORIES } from "@/lib/gallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const current = search.get("cat") || "Todas";

  function setCategory(cat: string) {
    const params = new URLSearchParams(search.toString());
    if (cat === "Todas") params.delete("cat");
    else params.set("cat", cat);
    params.delete("page"); // reset paginação
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-3 py-1 rounded-full border ${
            current === cat ? "bg-brand-dark text-white" : "bg-white text-brand-dark"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
