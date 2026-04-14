"use client";

import { useCart } from "@/components/contexts/cartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Cart() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
            Sua cestinha está vazia
          </h2>
          <p className="mt-2 text-muted-foreground">
            Adicione pudins deliciosos ao seu pedido!
          </p>

          <Link href="/" className="mt-6">
            <Button>Ver Cardápio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 🔥 container animado */}
      <motion.div layout className="container px-5 py-15 md:py-12 lg:px-115">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Sua Cestinha
        </h1>

        {/* LISTA */}
        <div className="mt-6 space-y-4">
          <AnimatePresence>
            {items.map((item: CartItem) => (
              <motion.div
                key={`${item.productId}-${item.size}`}
                layout="position"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex gap-4 rounded-xl bg-card p-4 shadow-md border border-border"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1,
                            );
                          } else {
                            removeItem(item.productId, item.size);
                          }
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-6 text-center text-sm font-semibold text-foreground">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* PREÇO */}
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-foreground">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 🔥 TOTAL (acompanha animação) */}
        <motion.div
          layout="position"
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mt-8 rounded-xl bg-card p-5 shadow-md border border-border space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Total ({itemCount} itens)
            </span>
            <span className="font-display text-2xl font-bold text-foreground">
              R$ {total.toFixed(2)}
            </span>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col gap-3">
            <Button onClick={() => router.push("/checkout")} className="w-full">
              Finalizar Pedido
            </Button>

            {/* 🔥 NOVO BOTÃO */}
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Adicionar mais itens
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
