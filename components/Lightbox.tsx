
"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Lightbox({
  src,
  alt,
  onClose
}: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/90 hover:text-white"
          aria-label="Fechar"
        >
          Fechar ✕
        </button>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1600}
          className="w-full h-auto rounded"
          sizes="(max-width: 768px) 90vw, 80vw"
          priority
        />
      </div>
    </div>
  );
}

