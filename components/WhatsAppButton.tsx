
"use client";
import Link from "next/link";
import { WhatsAppIcon } from "./icons"; // opcional - crie um ícone ou use emoji

export default function WhatsAppButton({ phone }: { phone: string }) {
  const href = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return (
    <Link
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 rounded-full bg-green-500 text-white px-5 py-3 shadow-lg hover:bg-green-600 transition"
      aria-label="Abrir WhatsApp"
    >
      💬 WhatsApp
    </Link>
  );
}
