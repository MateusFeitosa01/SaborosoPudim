"use client";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Confirmacao() {
  const { checkoutData, lastOrder } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!checkoutData && !lastOrder) {
      router.push("/");
    }
  }, [checkoutData, lastOrder, router]);

  if (!checkoutData && !lastOrder) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Pedido Confirmado!
            </h1>
            <p className="text-xl text-muted-foreground">
              Obrigado por escolher o Saboroso Pudim! Entraremos em contato pelo WhatsApp para confirmar os detalhes.
            </p>
          </div>

          {lastOrder && (
            <div className="bg-card p-8 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6">Resumo do pedido</h2>

              <div className="space-y-4 text-left">
                {lastOrder.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>R$ {lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📱 Fique ligado no WhatsApp!
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              Enviaremos atualizações sobre o status do seu pedido pelo WhatsApp.
              Qualquer dúvida, é só responder nossa mensagem!
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Esperamos que você aproveite seus pudins! 🍮
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">Voltar ao Início</Button>
              </Link>
              <Link href="/cestinha">
                <Button>Fazer Novo Pedido</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}