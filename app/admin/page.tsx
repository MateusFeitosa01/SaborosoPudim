"use client";

import { AdminCard } from "@/components/admin/AdminCard";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/services/orders";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pendente").length;
  const completedOrders = orders.filter((o) => o.status === "entregue").length;

  const recentOrders = orders
    .slice()
    .reverse()
    .slice(0, 10)
    .map((order) => ({
      id: order.id,
      cliente: order.name,
      status: order.status,
      total: `R$ ${order.total.toFixed(2)}`,
      data: new Date(order.created_at).toLocaleDateString("pt-BR"),
    }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo! Aqui você pode gerenciar todos os aspectos da sua loja.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard
          title="Pedidos Totais"
          value={totalOrders}
          icon={ShoppingCart}
          color="primary"
          trend={{ value: 12, label: "este mês", isPositive: true }}
        />
        <AdminCard
          title="Receita Total"
          value={`R$ ${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="success"
          trend={{ value: 8, label: "vs. mês anterior", isPositive: true }}
        />
        <AdminCard
          title="Pendentes"
          value={pendingOrders}
          icon={Calendar}
          color="warning"
          trend={{
            value: 3,
            label: "aguardando ação",
            isPositive: false,
          }}
        />
        <AdminCard
          title="Entregues"
          value={completedOrders}
          icon={TrendingUp}
          color="secondary"
          trend={{ value: 25, label: "taxa de conclusão", isPositive: true }}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <AdminDataTable
          title="Pedidos Recentes"
          columns={[
            { key: "id", label: "ID" },
            { key: "cliente", label: "Cliente" },
            { key: "data", label: "Data" },
            { key: "status", label: "Status" },
            { key: "total", label: "Total" },
          ]}
          data={recentOrders}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Status dos Pedidos</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Pendentes",
                value: pendingOrders,
                color: "bg-yellow-500",
              },
              {
                label: "Preparando",
                value: orders.filter((o) => o.status === "preparando").length,
                color: "bg-blue-500",
              },
              {
                label: "Prontos",
                value: orders.filter((o) => o.status === "pronto").length,
                color: "bg-purple-500",
              },
              {
                label: "Entregues",
                value: completedOrders,
                color: "bg-green-500",
              },
            ].map((status) => (
              <div key={status.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <span className="text-sm text-gray-600">{status.label}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Métodos de Entrega</h3>
          <div className="space-y-4">
            {[
              {
                label: "Entrega",
                value: orders.filter((o) => o.delivery_method === "entrega")
                  .length,
              },
              {
                label: "Retirada",
                value: orders.filter((o) => o.delivery_method === "retirada")
                  .length,
              },
            ].map((method) => (
              <div key={method.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{method.label}</span>
                <span className="font-semibold text-gray-900">
                  {method.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Informações Rápidas</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Ticket Médio:</span>
              <span className="font-semibold text-gray-900">
                {totalOrders > 0
                  ? `R$ ${(totalRevenue / totalOrders).toFixed(2)}`
                  : "R$ 0,00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxa de Conversão:</span>
              <span className="font-semibold text-green-600">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clientes Ativos:</span>
              <span className="font-semibold text-gray-900">
                {new Set(orders.map((o) => o.whatsapp)).size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
