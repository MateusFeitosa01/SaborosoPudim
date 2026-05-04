"use client";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { Button } from "@/components/ui/button";
import {
  getOrders,
  STATUS_FLOW,
  updateOrderStatus,
} from "@/lib/services/orders";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodosPedidosPage() {
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-gray-600">Carregando pedidos...</p>
      </div>
    );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Todos os Pedidos</h1>
          <p className="text-sm text-gray-600 mt-1">
            Visualize todos os pedidos em uma tabela
          </p>
        </div>
        <Link href="/admin/pedidos">
          <Button variant="outline">Ver por Status</Button>
        </Link>
      </div>

      <div>
        <OrdersTable orders={orders} onChangeStatus={changeStatus} />
      </div>
    </div>
  );
}
