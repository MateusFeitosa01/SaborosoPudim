"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Conteúdo */}
      <div className="relative py-20 md:py-32">
        <div className="max-w-lg">

          {/* TÍTULO */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Pudins Gourmets feitos com Amor
          </motion.h1>

          {/* DESCRIÇÃO */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/80 font-body"
          >
            Sabor caseiro com apresentação profissional. Encomende agora e receba no conforto da sua casa.
          </motion.p>

          {/* BOTÃO */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => {
              window.scrollBy({
                top: 400,
                behavior: "smooth",
              });
            }}
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-button transition-all hover:bg-[var(--primary-hover)] active:scale-95"
          >
            Ver Cardápio
          </motion.button>

        </div>
      </div>
    </section>
  );
}