"use client";

import { OrdersByStatusTable } from "@/components/admin/OrdersByStatusTable";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import {
  getOrders,
  STATUS_FLOW,
  updateOrderStatus,
} from "@/lib/services/orders";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <SiteHeader />
        <p className="text-gray-600">Carregando pedidos...</p>
      </div>
    );

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <SiteHeader />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Pedidos por Status</h1>
          <p className="text-sm text-gray-600 mt-1">
            Organize seus pedidos por etapa
          </p>
        </div>
        <Link href="/admin/pedidos/todos">
          <Button>Ver Todos</Button>
        </Link>
      </div>

      <div>
        <OrdersByStatusTable
          orders={orders}
          status="pendente"
          title="Pedidos Pendentes"
          onChangeStatus={changeStatus}
        />
      </div>
      <div>
        <OrdersByStatusTable
          orders={orders}
          status="preparando"
          title="Pedidos em Preparo"
          onChangeStatus={changeStatus}
        />
      </div>

      <div>
        <OrdersByStatusTable
          orders={orders}
          status="pronto"
          title="Prontos para Entrega"
          onChangeStatus={changeStatus}
        />
      </div>

      <div>
        <OrdersByStatusTable
          orders={orders}
          status="entregue"
          title="Pedidos Entregues"
          onChangeStatus={changeStatus}
        />
      </div>
    </div>
  );
}
