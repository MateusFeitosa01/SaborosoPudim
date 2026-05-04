import { ProductForm } from "@/components/admin/ProductForm";

export default function NovoProdutoPage() {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Novo Produto</h1>
        <p className="text-sm text-gray-600 mt-1">
          Crie um novo produto para sua loja
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
