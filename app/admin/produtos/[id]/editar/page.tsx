import { ProductForm } from "@/components/admin/ProductForm";
import { getProducts } from "@/lib/services/products";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditarProdutoPage({ params }: Props) {
  const products = await getProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Produto não encontrado
          </h2>
          <p className="text-gray-600">Verifique o ID do produto</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Editar Produto</h1>
        <p className="text-sm text-gray-600 mt-1">{product.name}</p>
      </div>
      <ProductForm product={product} isEdit />
    </div>
  );
}
