"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { getOrders } from "@/lib/services/orders";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function ClientesPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const orders = await getOrders();
      const uniqueCustomers = Array.from(
        new Map(
          orders.map((order) => [
            order.whatsapp,
            {
              name: order.name,
              email: order.email,
              whatsapp: order.whatsapp,
              pedidos: orders.filter((o) => o.whatsapp === order.whatsapp)
                .length,
              totalGasto: orders
                .filter((o) => o.whatsapp === order.whatsapp)
                .reduce((sum, o) => sum + o.total, 0),
            },
          ])
        ).values()
      );
      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  }

  const customerData = customers.map((c) => ({
    ...c,
    totalGasto: `R$ ${c.totalGasto.toFixed(2)}`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Users className="text-amber-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        </div>
        <p className="text-gray-600">
          Gerencie e visualize informações de seus clientes
        </p>
      </div>

      <AdminDataTable
        title={`Total de Clientes: ${customers.length}`}
        columns={[
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" },
          { key: "whatsapp", label: "WhatsApp" },
          { key: "pedidos", label: "Pedidos" },
          { key: "totalGasto", label: "Total Gasto" },
        ]}
        data={customerData}
      />
    </div>
  );
}
