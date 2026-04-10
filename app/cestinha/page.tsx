"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/contexts/cartContext";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background ">
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
      <div className="container px-5 py-15  md:py-12 lg:px-115">
        
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Sua Cestinha
        </h1>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 rounded-xl bg-card p-4 shadow-md border border-border transition-all"
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.productId, item.size, item.quantity - 1);
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
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

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
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-card p-5 shadow-md border border-border">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Total ({itemCount} itens)
            </span>
            <span className="font-display text-2xl font-bold text-foreground">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={() => router.push("/checkout")}
            className="mt-4 w-full"
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}