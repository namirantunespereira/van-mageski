
"use client";
import { useState } from "react";

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (res.ok) setStatus("ok");
    else setStatus("error");
  }

  return (
    <section className="container py-10">
      <div className="bg-brand-blue rounded-2xl p-6 md:p-8">
        <h1 className="font-display text-3xl mb-4">Contato</h1>
        <p className="text-brand-dark/80 mb-6">
          Preencha o formulário para orçamento e agendamento.
        </p>

        <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
          <input name="name" placeholder="Seu nome" className="border rounded p-3" required />
          <input name="email" type="email" placeholder="Seu e-mail" className="border rounded p-3" required />
          <input name="whatsapp" placeholder="Seu WhatsApp" className="border rounded p-3" />
          <textarea name="message" rows={5} placeholder="Sua ideia / referência" className="border rounded p-3" required />
          <button disabled={status === "sending"} className="bg-brand-dark text-white rounded p-3 hover:opacity-90">
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>
          {status === "ok" && <p className="text-green-700">Mensagem enviada com sucesso!</p>}
          {status === "error" && <p className="text-red-700">Erro ao enviar. Tente novamente.</p>}
        </form>
      </div>
    </section>
  );
}
