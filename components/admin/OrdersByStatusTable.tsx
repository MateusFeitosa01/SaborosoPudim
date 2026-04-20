"use client";

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
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prazo</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data entrega</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
            <TableHead>Itens</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((order) => (
            <TableRow
              key={order.id}
              className={getRowColor(order.delivery_date, order.status)}
            >
              {/* 🔥 CONTADOR */}
              <TableCell className="font-semibold">
                {getDaysLabel(order.delivery_date)}
              </TableCell>

              <TableCell>{order.id.slice(0, 8)}</TableCell>

              <TableCell>{order.name}</TableCell>

              <TableCell>
                {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>{order.delivery_method}</TableCell>

              <TableCell>{order.address || "Não informado"}</TableCell>

              <TableCell>R$ {Number(order.total).toFixed(2)}</TableCell>

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
                        {item.products?.name ?? "Produto removido"} ({item.size}
                        )
                      </div>
                    ))
                  : "Sem itens"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
