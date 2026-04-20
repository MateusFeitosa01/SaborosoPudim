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

  if (!filtered.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id.slice(0, 8)}</TableCell>

              <TableCell>{order.name}</TableCell>

              <TableCell>
                {new Date(order.delivery_date).toLocaleDateString("pt-BR")}
              </TableCell>

              <TableCell>{order.address || "Não informado"}</TableCell>

              <TableCell>R$ {Number(order.total).toFixed(2)}</TableCell>

              <TableCell className="flex gap-2">
                <button
                  onClick={() => onChangeStatus(order, "prev")}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  ⬅️
                </button>

                <button
                  onClick={() => onChangeStatus(order, "next")}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  ➡️
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
