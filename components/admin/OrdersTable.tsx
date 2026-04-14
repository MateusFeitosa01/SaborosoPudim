"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrders } from "@/lib/services/orders";

interface OrderItem {
  quantity: number;
  price: number;
  size: string;
  products?: {
    name: string;
  } | null;
}

interface Order {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  delivery_date: string;
  delivery_method: string;
  address: string | null;
  total: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}
export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();

      console.log("Pedidos carregados:", data);

      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  if (!orders.length) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data Entrega</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Itens</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id.slice(0, 8)}</TableCell>

              <TableCell>{order.customer_name}</TableCell>

              <TableCell>
                {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
              </TableCell>

              <TableCell>{order.delivery_method}</TableCell>

              <TableCell>
                R$ {Number(order.total).toFixed(2)}
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    order.status === "pending"
                      ? "secondary"
                      : "default"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell>
                {order.order_items?.length ? (
                  order.order_items.map((item, index) => (
                    <div key={index}>
                      {item.quantity}x{" "}
                      {item.products?.name ?? "Produto removido"}{" "}
                      ({item.size})
                    </div>
                  ))
                ) : (
                  "Sem itens"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}