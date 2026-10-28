import { apiFetch } from "@/lib/api";

interface CreateOrderInput {
  name: string; email: string; whatsapp: string; delivery_date: string;
  delivery_method: "entrega" | "retirada"; address_rua?: string | null;
  address_bairro?: string | null; address_numero?: string | null;
  address_complemento?: string | null; address_referencia?: string | null;
}

export async function createOrder(orderData: CreateOrderInput, items: { productId: string | number; sizeId: string | number; quantity: number }[]): Promise<{ id: string }> {
  const data = await apiFetch("/orders/orders/", { method: "POST", body: JSON.stringify({
    customer_name: orderData.name, customer_email: orderData.email, customer_whatsapp: orderData.whatsapp,
    delivery_date: orderData.delivery_date, delivery_method: orderData.delivery_method,
    address_rua: orderData.address_rua || null, address_bairro: orderData.address_bairro || null,
    address_numero: orderData.address_numero || null, address_complemento: orderData.address_complemento || null,
    address_referencia: orderData.address_referencia || null,
    items: items.map((item) => ({ product_id: Number(item.productId), size_id: Number(item.sizeId), quantity: item.quantity })),
  }) });
  return { ...data, id: String(data.id) };
}
