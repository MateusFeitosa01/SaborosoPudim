import { supabase } from "@/lib/supabase";

interface CreateOrderInput {
  name: string;
  email: string;
  whatsapp: string;
  delivery_date: string;
  delivery_method: "entrega" | "retirada";
  address?: string | null;
  total: number;
  status?: string;
}

export async function createOrder(
  orderData: CreateOrderInput
): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select("id")
    .single();

  if (error) throw error;

  return data;
}

export async function createOrderItems(
  orderId: string,
  items: {
    productId: string;
    size: string;
    quantity: number;
    price: number;
  }[]
) {
  const payload = items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error } = await supabase
    .from("order_items")
    .insert(payload);

  if (error) throw error;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
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
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}