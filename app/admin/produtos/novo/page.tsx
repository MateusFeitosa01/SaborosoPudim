import { ProductForm } from "@/components/admin/ProductForm";

export default function NovoProdutoPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Novo Produto
          </h1>
        </div>

        <div className="w-full flex justify-center">
          
            <ProductForm />
          
        </div>
      </div>
    </div>
  );
}