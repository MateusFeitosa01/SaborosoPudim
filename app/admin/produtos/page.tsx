import { ProductTable } from "@/components/admin/ProductTable";
import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProdutosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-amber-600" size={28} />
            <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          </div>
          <p className="text-gray-600">
            Gerencie todos os produtos da sua loja
          </p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button className="bg-amber-600 hover:bg-amber-700">
            + Novo Produto
          </Button>
        </Link>
      </div>
      <ProductTable />
    </div>
  );
}
