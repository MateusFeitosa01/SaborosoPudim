"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-4 pt-4 md:px-6 md:pt-6 lg:px-[200px]">
      <div className="relative mx-auto min-h-[420px] max-w-7xl overflow-hidden rounded-[2rem] bg-[rgb(75,40,27)] shadow-xl md:min-h-[520px]">
        <Image
          src="/hero-banner.jpg"
          alt="Pudins artesanais"
          fill
          priority
          className="object-cover object-center opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="relative flex min-h-[420px] items-end px-6 py-8 md:min-h-[520px] md:items-center md:px-12 md:py-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl text-white"
          >
            <h1 className="font-heading text-4xl font-bold leading-[1.05] md:text-6xl">
              Seu momento pede um pudim.
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
              Escolha o tamanho, monte seu pedido e receba ou retire quando
              quiser.
            </p>

            <div className="mt-7">
              <button
                onClick={() =>
                  document
                    .getElementById("cardapio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
              >
                <ShoppingBag className="h-5 w-5" /> Ver menu de pudins
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
