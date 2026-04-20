"use client";

import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  STATUS_FLOW,
} from "@/lib/services/orders";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { OrdersByStatusTable } from "@/components/admin/OrdersByStatusTable";

export default function PedidosPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(order: any, direction: "next" | "prev") {
    const currentIndex = STATUS_FLOW.indexOf(order.status);

    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 || newIndex >= STATUS_FLOW.length) return;

    const newStatus = STATUS_FLOW[newIndex];

    await updateOrderStatus(order.id, newStatus);

    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o)),
    );
  }

  if (loading) return <div className="p-6">Carregando pedidos...</div>;

  return (
    <div className="p-6 space-y-6">
      <OrdersTable orders={orders} onChangeStatus={changeStatus} />

      <OrdersByStatusTable
        orders={orders}
        status="pendente"
        title="Pedidos Pendentes"
        onChangeStatus={changeStatus}
      />
      <OrdersByStatusTable
        orders={orders}
        status="preparando"
        title="Pedidos em Preparo"
        onChangeStatus={changeStatus}
      />

      <OrdersByStatusTable
        orders={orders}
        status="pronto"
        title="Prontos para Entrega"
        onChangeStatus={changeStatus}
      />

      <OrdersByStatusTable
        orders={orders}
        status="entregue"
        title="Pedidos Entregues"
        onChangeStatus={changeStatus}
      />
    </div>
  );
}
