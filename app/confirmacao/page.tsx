"use client";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
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

  // 🔥 GERAR CÓDIGO DO PEDIDO
  const orderCode = lastOrder.id?.slice(0, 5).toUpperCase() || "SEM-CODIGO";

  // 🔥 MENSAGEM DO WHATSAPP
  const message = `Olá! Segue o comprovante do Pix do pedido Nº ${orderCode}.`;

  const encodedMessage = encodeURIComponent(message);

  // ⚠️ COLOQUE SEU NÚMERO AQUI (55 + DDD + número)
  const phone = "5583999883708";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

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
              Pedido Nº #{orderCode}
            </p>

            <p className="text-muted-foreground">
              Obrigado por escolher o Saboroso Pudim!
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
            <p>
              📱 Clique no botão abaixo e envie o comprovante do Pix junto com o
              código do seu pedido para agilizar a confirmação.
            </p>
          </div>

          {/* 🔥 BOTÃO WHATSAPP */}
          <div className="flex gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button>Enviar comprovante</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
