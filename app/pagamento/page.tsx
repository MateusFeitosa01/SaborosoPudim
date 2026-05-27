// app/pagamento/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, QrCode } from "lucide-react";
import { useState, useEffect } from "react";

export default function Pagamento() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, total, checkoutData, clearItems, setLastOrder } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "dinheiro" | "pix">("pix");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePayment = () => {
    setLastOrder({ items, total });
    clearItems();
    router.push("/confirmacao");
  };

  if (!isMounted) {
    return <div>Carregando...</div>;
  }

  if (!checkoutData || items.length === 0) {
    router.push("/cestinha");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pagamento</h1>
        {/* Resto do seu JSX aqui */}
      </div>
    </div>
  );
}