"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "./contexts/cartContext";
import Image from "next/image";

export default function Header() {
  const { itemCount } = useCart();

  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    if (itemCount <= 0) return;

    const startTimer = setTimeout(() => setBouncing(true), 0);
    const stopTimer = setTimeout(() => setBouncing(false), 400);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [itemCount]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/70 backdrop-blur-md px-[20px] lg:px-[200px]">
      <div className="mx-auto flex justify-between items-center h-18">
        {/* 🔥 LOGO */}
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/logo.png"
            alt="Saboroso Pudim"
            width={0}
            height={0}
            sizes="100vw"
            className="h-15 w-auto object-contain"
            priority
          />
        </Link>
        {/* 🔥 CESTINHA */}
        <Link
          href="/cestinha"
          className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-[var(--primary-hover)] shadow-md text-white"
        >
          <ShoppingBag
            className={`h-4 w-4 ${bouncing ? "animate-cart-bounce" : ""}`}
          />

          <span>Cestinha</span>

          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(75,40,27)] text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
