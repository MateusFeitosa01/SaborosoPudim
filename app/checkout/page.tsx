"use client";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder, createOrderItems } from "@/lib/services/orders";

export default function Checkout() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const {
    items,
    total,
    setCheckoutData,
    checkoutData,
    setLastOrder,
    clearCart,
  } = useCart();

  const router = useRouter();

  const [step, setStep] = useState<"dados" | "pagamento">("dados");

  const [formData, setFormData] = useState({
    name: checkoutData?.name || "",
    email: checkoutData?.email || "",
    whatsapp: checkoutData?.whatsapp || "",
    deliveryDate: checkoutData?.deliveryDate
      ? checkoutData.deliveryDate.toISOString().split("T")[0]
      : "",
    deliveryMethod: checkoutData?.deliveryMethod || "entrega",
    address: checkoutData?.address || "",
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  function handleContinue() {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      whatsapp: !formData.whatsapp.trim(),
      deliveryDate: !formData.deliveryDate,
      address:
        formData.deliveryMethod === "entrega" &&
        !formData.address.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setCheckoutData({
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      deliveryDate: new Date(formData.deliveryDate),
      deliveryMethod: formData.deliveryMethod as "entrega" | "retirada",
      address:
        formData.deliveryMethod === "entrega"
          ? formData.address
          : undefined,
    });

    setStep("pagamento");
  }

 async function handleFinishOrder() {
    if (loading) return;

    try {
      setLoading(true);

      const order = await createOrder({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        delivery_method: formData.deliveryMethod,
        delivery_date: formData.deliveryDate,
        address:
          formData.deliveryMethod === "entrega"
            ? formData.address
            : null,
        total,
        status: "pending",
      });

      await createOrderItems(
        order.id,
        items.map((item) => ({
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

  alert(
    JSON.stringify(error, null, 2)
  );
}
     finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-5 py-15 md:py-12 lg:px-115">
        <AnimatePresence mode="wait">
          {step === "dados" && (
            <motion.div
              key="dados"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h1 className="font-display text-2xl font-bold md:text-3xl">
                Finalizar Pedido
              </h1>

              <p className="text-sm text-muted-foreground">
                Preencha seus dados para continuar
              </p>

              <div className="bg-card p-6 rounded-xl border space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    aria-invalid={errors.name}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    aria-invalid={errors.email}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Phone size={16} /> WhatsApp
                  </Label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    aria-invalid={errors.whatsapp}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar size={16} /> Data de Entrega
                  </Label>
                  <Input
                    type="date"
                    min={minDate.toISOString().split("T")[0]}
                    value={formData.deliveryDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryDate: e.target.value,
                      })
                    }
                    aria-invalid={errors.deliveryDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Método de recebimento</Label>

                  <div className="flex gap-3">
                    {(["retirada", "entrega"] as const).map((method) => (
                      <label
                        key={method}
                        className={cn(
                          "flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm font-medium transition-all",
                          formData.deliveryMethod === method
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          checked={formData.deliveryMethod === method}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              deliveryMethod: method,
                            })
                          }
                        />
                        {method === "retirada"
                          ? "🏠 Retirada"
                          : "🚗 Entrega"}
                      </label>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {formData.deliveryMethod === "entrega" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Label className="flex items-center gap-2">
                        <MapPin size={16} /> Endereço
                      </Label>

                      <Textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                        aria-invalid={errors.address}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button onClick={handleContinue} className="w-full">
                  Prosseguir para pagamento
                </Button>
              </div>
            </motion.div>
          )}

          {step === "pagamento" && (
            <motion.div
              key="pagamento"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold">Pagamento</h1>

              <div className="bg-card p-6 rounded-xl border">
                <h2 className="font-semibold mb-4">Resumo do Pedido</h2>

                {items.map((item, index) => (
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

              <Button
                onClick={handleFinishOrder}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Finalizando..." : "Finalizar Pedido"}
              </Button>

              <Button
                variant="outline"
                onClick={() => setStep("dados")}
                className="w-full"
              >
                Voltar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}