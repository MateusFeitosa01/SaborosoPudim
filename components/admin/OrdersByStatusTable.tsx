"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrdersByStatusTable({
  orders,
  status,
  title,
  onChangeStatus,
}: {
  orders: any[];
  status: string;
  title: string;
  onChangeStatus: (order: any, dir: "next" | "prev") => void;
}) {
  const filtered = orders.filter((o) => o.status === status);

  function getDaysRemaining(date: string) {
    if (!date) return null;

    const today = new Date();
    const delivery = new Date(date);

    today.setHours(0, 0, 0, 0);
    delivery.setHours(0, 0, 0, 0);

    const diffTime = delivery.getTime() - today.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  function getRowColor(date: string, status: string) {
    if (status === "entregue") return "";

    const days = getDaysRemaining(date);
    if (days === null) return "";

    if (days < 0) return "bg-red-300"; // 🔥 atrasado
    if (days <= 2) return "bg-red-100";
    if (days <= 5) return "bg-orange-100";
    if (days <= 10) return "bg-yellow-100";
    return "bg-green-100";
  }

  function getDaysLabel(date: string) {
    const days = getDaysRemaining(date);

    if (days === null) return "";

    if (days < 0) return `Atrasado ${Math.abs(days)}d`;
    if (days === 0) return "Hoje";
    return `Faltam ${days}d`;
  }

  if (!filtered.length) return null;

  // 🔥 ordena por data mais próxima
  const sorted = [...filtered].sort((a, b) => {
    if (!a.delivery_date) return 1;
    if (!b.delivery_date) return -1;

    return (
      new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime()
    );
  });

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-3">{title}</h2>

      {/* Versão Desktop - Tabela */}
      <div className="hidden md:block w-full overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Prazo</TableHead>
              <TableHead className="text-xs sm:text-sm">ID</TableHead>
              <TableHead className="text-xs sm:text-sm">Cliente</TableHead>
              <TableHead className="text-xs sm:text-sm">Data entrega</TableHead>
              <TableHead className="text-xs sm:text-sm">Método</TableHead>
              <TableHead className="text-xs sm:text-sm">Endereço</TableHead>
              <TableHead className="text-xs sm:text-sm">Total</TableHead>
              <TableHead className="text-xs sm:text-sm">Ações</TableHead>
              <TableHead className="text-xs sm:text-sm">Itens</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((order) => (
              <TableRow
                key={order.id}
                className={getRowColor(order.delivery_date, order.status)}
              >
                <TableCell className="font-semibold text-xs sm:text-sm">
                  {getDaysLabel(order.delivery_date)}
                </TableCell>

                <TableCell className="text-xs sm:text-sm">
                  {order.id.slice(0, 8)}
                </TableCell>

                <TableCell className="text-xs sm:text-sm">
                  {order.name}
                </TableCell>

                <TableCell className="text-xs sm:text-sm">
                  {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  {order.delivery_method}
                </TableCell>

                <TableCell className="text-xs sm:text-sm truncate">
                  {order.address || "Não informado"}
                </TableCell>

                <TableCell className="text-xs sm:text-sm">
                  R$ {Number(order.total).toFixed(2)}
                </TableCell>

                <TableCell className="flex gap-1">
                  <button
                    onClick={() => onChangeStatus(order, "prev")}
                    className="px-1 sm:px-2 py-1 bg-red-400 text-white rounded text-xs"
                  >
                    ⬅️
                  </button>

                  <button
                    onClick={() => onChangeStatus(order, "next")}
                    className="px-1 sm:px-2 py-1 bg-green-400 text-white rounded text-xs"
                  >
                    ➡️
                  </button>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  {order.order_items?.length
                    ? order.order_items.map((item: any, index: number) => (
                        <div key={index} className="text-xs line-clamp-1">
                          {item.quantity}x{" "}
                          {item.products?.name ?? "Produto removido"} (
                          {item.size})
                        </div>
                      ))
                    : "Sem itens"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão Mobile - Cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((order) => (
          <div
            key={order.id}
            className={`border rounded-lg p-3 space-y-2 ${getRowColor(order.delivery_date, order.status)}`}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <p className="font-semibold text-sm">{order.name}</p>
                <p className="text-xs text-gray-600">{order.id.slice(0, 8)}</p>
              </div>
              <Badge variant="default" className="text-xs">
                {getDaysLabel(order.delivery_date)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-600">Entrega</p>
                <p className="font-semibold">
                  {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Total</p>
                <p className="font-semibold">
                  R$ {Number(order.total).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Método</p>
                <p className="font-semibold">{order.delivery_method}</p>
              </div>
              <div>
                <p className="text-gray-600">Endereço</p>
                <p className="font-semibold line-clamp-1 text-xs">
                  {order.address || "Não informado"}
                </p>
              </div>
            </div>

            <div className="border-t pt-2">
              <p className="text-xs font-semibold mb-2">Itens:</p>
              {order.order_items?.length
                ? order.order_items.map((item: any, index: number) => (
                    <div key={index} className="text-xs">
                      {item.quantity}x{" "}
                      {item.products?.name ?? "Produto removido"} ({item.size})
                    </div>
                  ))
                : "Sem itens"}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onChangeStatus(order, "prev")}
                className="flex-1 px-2 py-2 bg-red-400 text-white rounded text-sm font-semibold"
              >
                ⬅️ Voltar
              </button>
              <button
                onClick={() => onChangeStatus(order, "next")}
                className="flex-1 px-2 py-2 bg-green-400 text-white rounded text-sm font-semibold"
              >
                Próximo ➡️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
