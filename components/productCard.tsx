"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "./contexts/cartContext";
import { motion } from "framer-motion";

interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: ProductSize[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  function handleAdd() {
    const selected = product.sizes[selectedSize];

    if (!selected) return;

    addItem({
      productId: product.id,
      productName: product.name,
      size: selected.label,
      price: selected.price,
      image: product.image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-2xl bg-card shadow-md border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-lg font-semibold text-foreground">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex gap-2 flex-wrap">
          {product.sizes.map((size, idx) => (
            <motion.button
              key={`${size.label}-${idx}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(idx)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                selectedSize === idx
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-[#FFF5E6] text-foreground hover:bg-[#f5e2c4]"
              }`}
            >
              {size.label}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            R$ {product.sizes[selectedSize]?.price.toFixed(2)}
          </span>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              added
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]"
            }`}
          >
            <motion.span
              key={added ? "check" : "plus"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {added ? <Check size={16} /> : <Plus size={16} />}
              {added ? "Adicionado!" : "Adicionar"}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}