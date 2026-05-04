"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, getProducts, Product } from "@/lib/services/products";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-gray-600">Carregando produtos...</p>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Produtos</h2>
        <Link href="/admin/produtos/novo">
          <Button className="w-full sm:w-auto">Novo Produto</Button>
        </Link>
      </div>

      {/* Versão desktop - tabela */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Tamanhos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell>
                  {product.sizes.map((size, index) => (
                    <div key={index} className="text-sm">
                      {size.label}: R$ {size.price}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/produtos/${product.id}/editar`}>
                    <Button variant="outline" size="sm" className="mr-2">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão mobile - cards */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs font-semibold mb-2">Tamanhos:</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {product.sizes.map((size, index) => (
                  <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                    <span className="font-semibold">{size.label}</span>
                    <br />
                    R$ {size.price}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/produtos/${product.id}/editar`}
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  Editar
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
                className="flex-1"
              >
                Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
