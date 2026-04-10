"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 lg:px-[200px]">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-banner.jpg"
          alt="Hero Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Conteúdo */}
      <div className="relative py-20 md:py-32">
        <div className="max-w-lg animate-fade-in">
          
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            Pudins Gourmets feitos com Amor
          </h1>

          <p className="mt-4 text-lg text-white/80 font-body">
            Sabor caseiro com apresentação profissional. Encomende agora e receba no conforto da sua casa.
          </p>

          <button
            onClick={() => {
                window.scrollBy({
                top: 400,
                behavior: "smooth",
                });
            }}
            className="text-white mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-button transition-all hover:bg-[var(--primary-hover)] active:scale-95"
          >
            Ver Cardápio
          </button>

        </div>
      </div>
    </section>
  );
}