import { supabase } from "@/lib/supabase";

/* ================= STATUS PADRÃO ================= */

export const STATUS_FLOW = [
  "pendente",
  "preparando",
  "pronto",
  "entregue",
] as const;

export type OrderStatus = (typeof STATUS_FLOW)[number];

/* ================= TYPES ================= */

interface CreateOrderInput {
  name: string;
  email: string;
  whatsapp: string;
  delivery_date: string;
  delivery_method: "entrega" | "retirada";
  address?: string | null;
  total: number;
  status?: OrderStatus;
}

/* ================= CREATE ORDER ================= */

export async function createOrder(
  orderData: CreateOrderInput,
): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      ...orderData,
      status: orderData.status ?? "pendente",
    })
    .select("id")
    .single();

  if (error) throw error;

  return data;
}

/* ================= CREATE ORDER ITEMS ================= */

export async function createOrderItems(
  orderId: string,
  items: {
    productId: string;
    size: string;
    quantity: number;
    price: number;
  }[],
) {
  const payload = items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error } = await supabase.from("order_items").insert(payload);

  if (error) throw error;
}

/* ================= GET ORDERS ================= */

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      name,
      email,
      whatsapp,
      delivery_date,
      delivery_method,
      address,
      total,
      status,
      created_at,
      order_items(
        quantity,
        price,
        size,
        products(name)
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

/* ================= UPDATE STATUS ================= */

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) throw error;
}
