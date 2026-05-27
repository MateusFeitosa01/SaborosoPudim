"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface DataTableProps {
  title: string;
  columns: { key: string; label: string }[];
  data: any[];
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export function AdminDataTable({
  title,
  columns,
  data,
  onView,
  onEdit,
  onDelete,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-10 py-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-gray-800">
                    {item[col.key]}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Deletar"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Nenhum resultado encontrado
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
        <span className="text-sm text-gray-600">
          Mostrando {paginatedData.length > 0 ? startIndex + 1 : 0} a{" "}
          {Math.min(startIndex + itemsPerPage, filteredData.length)} de{" "}
          {filteredData.length}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="px-4 py-2 text-sm font-medium">
            {page} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
