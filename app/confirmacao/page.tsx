"use client";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Confirmacao() {
  const { checkoutData, lastOrder } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!checkoutData && !lastOrder) {
      router.push("/");
    }
  }, [checkoutData, lastOrder, router]);

  if (!lastOrder) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* 🔥 HEADER */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
            >
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4">Pedido Confirmado!</h1>

            {/* 🔥 ID DO PEDIDO */}
            <p className="text-lg font-semibold text-primary mb-2">
              Pedido Nº #{lastOrder.id?.slice(0, 8).toUpperCase()}
            </p>

            <p className="text-muted-foreground">
              Obrigado por escolher o Saboroso Pudim! Entraremos em contato pelo
              WhatsApp.
            </p>
          </div>

          {/* 🔥 RESUMO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-sm mb-8 text-left"
          >
            <h2 className="text-xl font-semibold mb-4">Resumo do pedido</h2>

            <div className="space-y-3">
              {lastOrder.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p>{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.size} x {item.quantity}
                    </p>
                  </div>

                  <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>R$ {lastOrder.total.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* 🔥 WHATSAPP */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <p>📱 Fique ligado no WhatsApp! Vamos te atualizar por lá.</p>
          </div>

          {/* 🔥 BOTÕES */}
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">Voltar</Button>
            </Link>

            <Link href="/cestinha">
              <Button>Novo Pedido</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
