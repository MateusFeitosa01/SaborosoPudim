"use client";

export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import { useCart } from "@/components/contexts/cartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* =========================
   📌 MÁSCARA DE TELEFONE
========================= */
function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) return numbers;

  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

export default function Checkout() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const { items, total, setCheckoutData, checkoutData } = useCart();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: checkoutData?.name || "",
    email: checkoutData?.email || "",
    whatsapp: checkoutData?.whatsapp || "",
    deliveryDate: checkoutData?.deliveryDate
      ? checkoutData.deliveryDate.toISOString().split("T")[0]
      : "",
    deliveryMethod: checkoutData?.deliveryMethod || "entrega",
    address: checkoutData?.address || "",
    address_rua: checkoutData?.address_rua || "",
    address_bairro: checkoutData?.address_bairro || "",
    address_numero: checkoutData?.address_numero || "",
    address_complemento: checkoutData?.address_complemento || "",
    address_referencia: checkoutData?.address_referencia || "",
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);

  function handleContinue() {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      whatsapp: !formData.whatsapp.trim(),
      deliveryDate: !formData.deliveryDate,
      address_rua:
        formData.deliveryMethod === "entrega" && !formData.address_rua.trim(),
      address_bairro:
        formData.deliveryMethod === "entrega" && !formData.address_bairro.trim(),
      address_numero:
        formData.deliveryMethod === "entrega" && !formData.address_numero.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setCheckoutData({
      name: formData.name,
      email: formData.email,

      // 🔥 SALVAR SÓ NÚMEROS NO BANCO (boa prática)
      whatsapp: formData.whatsapp.replace(/\D/g, ""),

      deliveryDate: new Date(formData.deliveryDate),
      deliveryMethod: formData.deliveryMethod as "entrega" | "retirada",
      address:
        formData.deliveryMethod === "entrega"
          ? formData.address
          : undefined,
      address_rua:
        formData.deliveryMethod === "entrega" ? formData.address_rua : undefined,
      address_bairro:
        formData.deliveryMethod === "entrega"
          ? formData.address_bairro
          : undefined,
      address_numero:
        formData.deliveryMethod === "entrega"
          ? formData.address_numero
          : undefined,
      address_complemento:
        formData.deliveryMethod === "entrega"
          ? formData.address_complemento
          : undefined,
      address_referencia:
        formData.deliveryMethod === "entrega"
          ? formData.address_referencia
          : undefined,
    });

    router.push("/checkout/pagamento");
  }

  return (
    <div className="min-h-screen bg-background">
      
      <Header />

      <div className="container px-5 py-15 md:py-12 lg:px-115">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
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
            {/* NOME */}
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

            {/* EMAIL */}
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

            {/* WHATSAPP COM MÁSCARA */}
            <div>
              <Label className="flex items-center gap-2">
                <Phone size={16} /> WhatsApp
              </Label>

              <Input
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatsapp: formatPhone(e.target.value),
                  })
                }
                placeholder="(83) 99999-9999"
                maxLength={15}
                aria-invalid={errors.whatsapp}
              />
            </div>

            {/* DATA */}
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

            {/* MÉTODO */}
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
                    {method === "retirada" ? "🏠 Retirada" : "🚗 Entrega"}
                  </label>
                ))}
              </div>
            </div>

            {/* ENDEREÇO */}
            <AnimatePresence>
              {formData.deliveryMethod === "entrega" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-4 border-t pt-4"
                >
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin size={16} /> Detalhes da Entrega
                  </h3>

                  {/* RUA - CAMPO OBRIGATÓRIO */}
                  <div>
                    <Label>Rua *</Label>
                    <Input
                      value={formData.address_rua}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_rua: e.target.value,
                        })
                      }
                      placeholder="Ex: Rua das Flores"
                      aria-invalid={errors.address_rua}
                    />
                    {errors.address_rua && (
                      <p className="text-red-500 text-xs mt-1">
                        Rua é obrigatória
                      </p>
                    )}
                  </div>

                  {/* BAIRRO - CAMPO OBRIGATÓRIO */}
                  <div>
                    <Label>Bairro *</Label>
                    <Input
                      value={formData.address_bairro}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_bairro: e.target.value,
                        })
                      }
                      placeholder="Ex: Centro"
                      aria-invalid={errors.address_bairro}
                    />
                    {errors.address_bairro && (
                      <p className="text-red-500 text-xs mt-1">
                        Bairro é obrigatório
                      </p>
                    )}
                  </div>

                  {/* NÚMERO - CAMPO OBRIGATÓRIO */}
                  <div>
                    <Label>Número *</Label>
                    <Input
                      value={formData.address_numero}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_numero: e.target.value,
                        })
                      }
                      placeholder="Ex: 123"
                      aria-invalid={errors.address_numero}
                    />
                    {errors.address_numero && (
                      <p className="text-red-500 text-xs mt-1">
                        Número é obrigatório
                      </p>
                    )}
                  </div>

                  {/* COMPLEMENTO - OPCIONAL */}
                  <div>
                    <Label>Complemento (Opcional)</Label>
                    <Input
                      value={formData.address_complemento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_complemento: e.target.value,
                        })
                      }
                      placeholder="Ex: Apto 42, Bloco B"
                    />
                  </div>

                  {/* PONTO DE REFERÊNCIA - OPCIONAL */}
                  <div>
                    <Label>Ponto de Referência (Opcional)</Label>
                    <Textarea
                      value={formData.address_referencia}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_referencia: e.target.value,
                        })
                      }
                      placeholder="Ex: Próximo ao supermercado..."
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
<div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm space-y-1">
          <p className="font-semibold">⏳ Atenção</p>
          <p>
            Trabalhamos com pedidos sob encomenda e precisamos de no mínimo <strong>48 horas de antecedência</strong> para produção.
          </p>
          <p>
            Isso garante mais qualidade, organização e uma melhor experiência para você.
          </p>
        </div>
            {/* BOTÃO */}
            <Button onClick={handleContinue} className="w-full">
              Prosseguir para pagamento
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}