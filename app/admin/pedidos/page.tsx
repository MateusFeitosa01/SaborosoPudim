"use client";

import { OrdersByStatusTable } from "@/components/admin/OrdersByStatusTable";
import { Button } from "@/components/ui/button";
import {
  getOrders,
  STATUS_FLOW,
  updateOrderStatus,
} from "@/lib/services/orders";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

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
        <p className="text-gray-600">Carregando pedidos...</p>
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="text-amber-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
        </div>
        <p className="text-gray-600">
          Gerencie todos os pedidos da sua loja
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600">
          Total de pedidos: <strong>{orders.length}</strong>
        </div>
        <Link href="/admin/pedidos/todos">
          <Button className="bg-amber-600 hover:bg-amber-700">
            Ver Todos os Pedidos
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
