"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function OrdersTable({
  orders,
  onChangeStatus,
}: {
  orders: any[];
  onChangeStatus: (order: any, dir: "next" | "prev") => void;
}) {
  function getBadgeVariant(status: string) {
    switch (status) {
      case "pendente":
        return "default";
      case "preparando":
        return "default";
      case "pronto":
        return "default";
      case "entregue":
        return "default";
      default:
        return "secondary";
    }
  }

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

    if (days < 0) return "bg-red-300";
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

  if (!orders.length) return <div>Nenhum pedido encontrado.</div>;

  const sortedOrders = [...orders].sort((a, b) => {
    if (!a.delivery_date) return 1;
    if (!b.delivery_date) return -1;

    return (
      new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime()
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Todos os Pedidos</h2>

      {/* ✅ APENAS UM SCROLL */}
      <div className="w-full overflow-x-auto border rounded-lg">
        <Table className="min-w-[1200px]">
          <TableHeader>
            <TableRow>
              <TableHead>Prazo</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data entrega</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizar</TableHead>
              <TableHead>Itens</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow
                key={order.id}
                className={getRowColor(order.delivery_date, order.status)}
              >
                <TableCell className="font-semibold whitespace-nowrap">
                  {getDaysLabel(order.delivery_date)}
                </TableCell>

                <TableCell>{order.id.slice(0, 8)}</TableCell>

                <TableCell className="whitespace-nowrap">
                  {order.name}
                </TableCell>

                <TableCell>
                  {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
                </TableCell>

                <TableCell>{order.delivery_method}</TableCell>

                <TableCell className="whitespace-nowrap">
                  {order.address || "Não informado"}
                </TableCell>

                <TableCell>R$ {Number(order.total).toFixed(2)}</TableCell>

                <TableCell>
                  <Badge variant={getBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="flex gap-2">
                  <button
                    onClick={() => onChangeStatus(order, "prev")}
                    className="px-2 py-1 bg-red-400 text-white rounded"
                  >
                    ⬅️
                  </button>

                  <button
                    onClick={() => onChangeStatus(order, "next")}
                    className="px-2 py-1 bg-green-400 text-white rounded"
                  >
                    ➡️
                  </button>
                </TableCell>

                <TableCell>
                  {order.order_items?.length
                    ? order.order_items.map((item: any, index: number) => (
                        <div key={index}>
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
    </div>
  );
}
