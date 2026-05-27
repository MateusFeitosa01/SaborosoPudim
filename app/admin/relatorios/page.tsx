"use client";

import { AdminCard } from "@/components/admin/AdminCard";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/services/orders";

export default function RelatoriosPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const totalOrders = orders.length;

  // Estatísticas por status
  const statusStats = {
    pendente: orders.filter((o) => o.status === "pendente").length,
    preparando: orders.filter((o) => o.status === "preparando").length,
    pronto: orders.filter((o) => o.status === "pronto").length,
    entregue: orders.filter((o) => o.status === "entregue").length,
  };

  // Método de entrega
  const deliveryMethods = {
    entrega: orders.filter((o) => o.delivery_method === "entrega").length,
    retirada: orders.filter((o) => o.delivery_method === "retirada").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="text-amber-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        </div>
        <p className="text-gray-600">
          Análise completa do seu negócio e performance
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminCard
          title="Receita Total"
          value={`R$ ${totalRevenue.toFixed(2)}`}
          icon={TrendingUp}
          color="success"
        />
        <AdminCard
          title="Valor Médio por Pedido"
          value={`R$ ${averageOrderValue.toFixed(2)}`}
          icon={Calendar}
          color="primary"
        />
        <AdminCard
          title="Total de Pedidos"
          value={totalOrders}
          icon={BarChart3}
          color="secondary"
        />
      </div>

      {/* Relatório de Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Pedidos por Status
          </h2>
          <div className="space-y-4">
            {Object.entries(statusStats).map(([status, count]) => {
              const total = Object.values(statusStats).reduce(
                (a, b) => (a as number) + (b as number),
                0
              ) as number;
              const percentage = total > 0 ? ((count as number) / total) * 100 : 0;
              const statusLabels: Record<string, string> = {
                pendente: "Pendente",
                preparando: "Preparando",
                pronto: "Pronto",
                entregue: "Entregue",
              };
              const colors: Record<string, string> = {
                pendente: "bg-yellow-400",
                preparando: "bg-blue-400",
                pronto: "bg-purple-400",
                entregue: "bg-green-400",
              };

              return (
                <div key={status}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {statusLabels[status]}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {count as number} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors[status]} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Método de Entrega
          </h2>
          <div className="space-y-6">
            {Object.entries(deliveryMethods).map(([method, count]) => {
              const total = Object.values(deliveryMethods).reduce(
                (a, b) => (a as number) + (b as number),
                0
              ) as number;
              const percentage = total > 0 ? ((count as number) / total) * 100 : 0;
              const methodLabels: Record<string, string> = {
                entrega: "🚗 Entrega",
                retirada: "🏠 Retirada",
              };

              return (
                <div key={method}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {methodLabels[method]}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {count as number} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        method === "entrega"
                          ? "bg-amber-500"
                          : "bg-purple-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            <span>
              Você teve <strong>{totalOrders} pedidos</strong> no total
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            <span>
              A receita média por pedido é{" "}
              <strong>R$ {averageOrderValue.toFixed(2)}</strong>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            <span>
              {deliveryMethods.entrega > deliveryMethods.retirada
                ? "Entrega é o método mais popular"
                : "Retirada é o método mais popular"}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            <span>
              {statusStats.entregue} pedidos foram entregues com sucesso
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
