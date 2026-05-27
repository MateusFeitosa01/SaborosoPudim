"use client";

export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { Button } from "@/components/ui/button";
import { createOrder, createOrderItems } from "@/lib/services/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Pagamento() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { items, total, checkoutData, setLastOrder, clearCart } = useCart();

  const pixCode =
    "00020101021126580014br.gov.bcb.pix01362d2fc313-ecfc-4a9c-9848-12257ab40d125204000053039865802BR5920MATEUS M Y M FEITOSA6011JOAO PESSOA62070503***6304AB02";

  function handleCopyPix() {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  }

  async function handleFinishOrder() {
    if (loading) return;

    // 🔴 VALIDAÇÃO ANTES DE ENVIAR (evita erro no Supabase)
    if (!checkoutData?.deliveryDate) {
      alert("Data de entrega não encontrada. Volte e selecione uma data.");
      return;
    }

    try {
      setLoading(true);

      const order = await createOrder({
        name: checkoutData?.name || "",
        email: checkoutData?.email || "",
        whatsapp: checkoutData?.whatsapp || "",
        delivery_method: checkoutData?.deliveryMethod || "entrega",

        // ✅ CORREÇÃO DO ERRO 22007 (nunca enviar "")
        delivery_date: checkoutData.deliveryDate
          ? checkoutData.deliveryDate.toISOString().split("T")[0]
          : null,

        address:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address
            : null,

        // 🆕 NOVOS CAMPOS DE ENDEREÇO
        address_rua:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address_rua
            : null,
        address_bairro:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address_bairro
            : null,
        address_numero:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address_numero
            : null,
        address_complemento:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address_complemento
            : null,
        address_referencia:
          checkoutData?.deliveryMethod === "entrega"
            ? checkoutData?.address_referencia
            : null,

        total,
        status: "pendente",
      });

      await createOrderItems(
        order.id,
        items.map((item: any) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      setLastOrder({
        id: order.id,
        total,
        items,
      });

      clearCart();

      router.push("/confirmacao");
    } catch (error) {
      console.error("ERRO COMPLETO:");
      console.dir(error);
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-5 py-15 md:py-12 lg:px-115">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Pagamento</h1>

          

          {/* RESUMO DO PEDIDO */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">Resumo do Pedido</h2>

            {items.map((item: any, index: number) => (
              <div
                key={`${item.productId}-${item.size}-${index}`}
                className="flex justify-between mb-2 text-sm"
              >
                <span>
                  {item.productName} x {item.quantity}
                </span>
                <span>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* PIX */}
          <div className="bg-card p-6 rounded-xl border text-center space-y-4">
            <h2 className="font-semibold">Pagamento via PIX</h2>

            <Image
              src="/pix.png"
              alt="QR Code PIX"
              width={200}
              height={200}
              className="mx-auto"
            />

            <p className="text-sm text-muted-foreground">
              Escaneie ou copie o código abaixo:
            </p>

            <Button onClick={handleCopyPix} className="w-full">
              Copiar código PIX
            </Button>
          </div>
            {/* 📢 CAIXA DE AVISO WHATSAPP */}
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-xl text-sm space-y-1">
            <p className="font-semibold">📢 Importante</p>
            <p>
              Após finalizar o pedido, envie o comprovante de pagamento pelo WhatsApp
              junto com o código do seu pedido para confirmarmos sua compra.
            </p>
          </div>
          {/* FINALIZAR */}
          <Button
            onClick={handleFinishOrder}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Finalizando..." : "Finalizar Pedido"}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}