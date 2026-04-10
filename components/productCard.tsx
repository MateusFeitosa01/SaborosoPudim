"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "./contexts/cartContext";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      productId: product.id,
      productName: product.name,
      size: product.sizes[selectedSize].label,
      price: product.sizes[selectedSize].price,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">

      {/* IMAGEM */}
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* TAMANHOS */}
        <div className="mt-3 flex gap-2">
          {product.sizes.map((size, idx) => (
            <button
              key={`${size.label}-${idx}`}
              onClick={() => setSelectedSize(idx)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                selectedSize === idx
                    ? "bg-primary text-primary-foreground shadow-md scale-105 hover:bg-[var(--primary-hover)]"
                  : "bg-[#FFF5E6] text-foreground hover:bg-[#f5e2c4]"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* PREÇO + BOTÃO */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            R$ {product.sizes[selectedSize].price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              added
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] active:scale-95"
            }`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
            {added ? "Adicionado!" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}