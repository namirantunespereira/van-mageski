
import Image from "next/image";
import Wave from "./Wave";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src="/hero.jpg"
          alt="Tattoo hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full items-center">
          <div className="container">
            
// dentro do <h1> e <p>:
<h1 className="font-display text-5xl md:text-6xl text-white drop-shadow">
  Van Mageski
</h1>
<p className="mt-3 text-white/90 max-w-xl">
  Arte autoral com a flúi.
</p>


          </div>
        </div>
      </div>

      <Wave className="-mt-1 w-full" color="#BFE9FF" />
      <div className="bg-brand-blue py-6">
        <div className="container">
          <p className="text-brand-dark/80">
            Agenda aberta — envie sua ideia ou escolha um flash.
          </p>
        </div>
      </div>
    </section>
  );
}
