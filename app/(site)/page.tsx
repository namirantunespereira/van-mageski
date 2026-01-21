
import Hero from "@/components/Hero";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  const phone = process.env.WHATSAPP_PHONE || "+5527999999999";
  return (
    <>
      <Hero />
      <section className="container py-12">
        <div className="bg-brand-blue rounded-xl p-6">
          <h2 className="font-display text-2xl">Bem-vinda(o) ao estúdio</h2>
          <p className="mt-2 text-brand-dark/80">
            Portfólio autoral da tatuadora Van Mageski — selecione uma categoria no Portfólio
            para ver os trabalhos, ou envie sua ideia pelo contato.
          </p>
        </div>
      </section>
      <WhatsAppButton phone={phone} />
    </>
  );
}
