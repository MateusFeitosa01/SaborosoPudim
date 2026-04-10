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

export default function Checkout() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const { items, total, setCheckoutData, checkoutData } = useCart();

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

  // mínimo de 2 dias
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  const handleContinue = () => {
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      whatsapp: !formData.whatsapp,
      deliveryDate: !formData.deliveryDate,
      address:
        formData.deliveryMethod === "entrega" && !formData.address,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

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
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-5 py-15 md:py-12 lg:px-115">

        {step === "dados" && (
          <div className="space-y-6">

            <h1 className="font-display text-2xl font-bold text-foreground mb-0 md:text-3xl">Finalizar Pedido</h1>
            <p className="mt-1 text-sm text-muted-foreground">Preencha seus dados para continuar</p>

            <div className="bg-card p-6 rounded-xl border border-border space-y-4">

              {/* NOME */}
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  aria-invalid={errors.name}
                  className="aria-invalid:border-red-500"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  aria-invalid={errors.email}
                  className="aria-invalid:border-red-500"
                />
              </div>

              {/* WHATSAPP */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Phone size={16} /> WhatsApp
                </Label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  aria-invalid={errors.whatsapp}
                  className="aria-invalid:border-red-500"
                />
              </div>

              {/* DATA */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Calendar size={16} /> Data de Entrega
                </Label>
                <Input
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  value={formData.deliveryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryDate: e.target.value })
                  }
                  aria-invalid={errors.deliveryDate}
                  className="aria-invalid:border-red-500"
                />
              </div>

              {/* MÉTODO ESTILIZADO */}
              <div className="space-y-2">
                <Label>Método de recebimento</Label>

                <div className="flex gap-3">
                  {(["retirada", "entrega"] as const).map((method) => (
                    <label
                      key={method}
                      className={cn(
                        "flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm font-medium transition-all",
                        formData.deliveryMethod === method
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      <input
                        type="radio"
                        value={method}
                        checked={formData.deliveryMethod === method}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            deliveryMethod: method,
                          })
                        }
                        className="sr-only"
                      />

                      {method === "retirada"
                        ? "🏠 Retirada"
                        : "🚗 Entrega"}
                    </label>
                  ))}
                </div>
              </div>

              {/* ENDEREÇO */}
              {formData.deliveryMethod === "entrega" && (
                <div className="space-y-1">
                  <Label className="flex items-center gap-2">
                    <MapPin size={16} /> Endereço
                  </Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    aria-invalid={errors.address}
                    className="aria-invalid:border-red-500"
                  />
                </div>
              )}

              <Button onClick={handleContinue} className="w-full">
                Prosseguir para pagamento
              </Button>
            </div>
          </div>
        )}

        {/* ETAPA 2 */}
        {step === "pagamento" && (
          <div className="space-y-6">

            <h1 className="text-2xl font-bold">Pagamento</h1>

            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="font-semibold mb-4">Resumo do Pedido</h2>

              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <span>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 font-bold flex justify-between">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="font-semibold mb-2">Dados do Pedido</h2>
              <p><strong>Nome: </strong>{formData.name}</p>
              <p><strong>Email: </strong>{formData.email}</p>
              <p><strong>Whatsapp: </strong>{formData.whatsapp}</p>
              <p><strong>Recebimento: </strong>{formData.deliveryMethod}</p>
              <p>
                <strong>Data: </strong>
                {formData.deliveryDate
                    ? formData.deliveryDate.split("-").reverse().join("/")
                    : ""}
            </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="font-semibold">Integração com gateway</h2>
            </div>

            <Button
              onClick={() => router.push("/confirmacao")}
              className="w-full"
            >
              Finalizar Pedido
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep("dados")}
              className="w-full"
            >
              Voltar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}