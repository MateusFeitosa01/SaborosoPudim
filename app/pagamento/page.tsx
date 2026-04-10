"use client";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, QrCode } from "lucide-react";
import { useState } from "react";

export default function Pagamento() {
  const { items, total, checkoutData, clearItems, setLastOrder } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "dinheiro" | "pix">("pix");

  const handlePayment = () => {
    setLastOrder({ items, total });
    clearItems();
    router.push("/confirmacao");
  };

  if (!checkoutData || items.length === 0) {
    router.push("/cestinha");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pagamento</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Método de pagamento */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

              <div className="space-y-3">
                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={(e) => setPaymentMethod(e.target.value as "pix")}
                    className="mr-3"
                  />
                  <QrCode className="mr-3" size={20} />
                  <div>
                    <p className="font-medium">PIX</p>
                    <p className="text-sm text-muted-foreground">
                      Pagamento instantâneo
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    value="cartao"
                    checked={paymentMethod === "cartao"}
                    onChange={(e) => setPaymentMethod(e.target.value as "cartao")}
                    className="mr-3"
                  />
                  <CreditCard className="mr-3" size={20} />
                  <div>
                    <p className="font-medium">Cartão de Crédito/Débito</p>
                    <p className="text-sm text-muted-foreground">
                      Visa, Mastercard, Elo
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    value="dinheiro"
                    checked={paymentMethod === "dinheiro"}
                    onChange={(e) => setPaymentMethod(e.target.value as "dinheiro")}
                    className="mr-3"
                  />
                  <Banknote className="mr-3" size={20} />
                  <div>
                    <p className="font-medium">Dinheiro</p>
                    <p className="text-sm text-muted-foreground">
                      Pague na entrega
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {paymentMethod === "pix" && (
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Pagamento via PIX</h3>
                <div className="text-center">
                  <div className="bg-muted p-8 rounded-lg mb-4">
                    <QrCode size={120} className="mx-auto text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Escaneie o QR Code ou copie o código PIX
                  </p>
                  <button className="text-primary hover:underline">
                    Copiar código PIX
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === "cartao" && (
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Dados do Cartão</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="João Silva"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resumo e confirmação */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span>{checkoutData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp:</span>
                  <span>{checkoutData.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data de Entrega:</span>
                  <span>{checkoutData.deliveryDate.toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Método:</span>
                  <span className="capitalize">{checkoutData.deliveryMethod}</span>
                </div>
                {checkoutData.address && (
                  <div className="flex justify-between">
                    <span>Endereço:</span>
                    <span className="text-right max-w-48">{checkoutData.address}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between">
                    <span>
                      {item.productName} ({item.size}) x {item.quantity}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button onClick={handlePayment} className="w-full">
              Confirmar Pagamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}