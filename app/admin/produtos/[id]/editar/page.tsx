import { ProductForm } from "@/components/admin/ProductForm";
import { getProducts } from "@/lib/services/products";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditarProdutoPage({ params }: Props) {
  const products = await getProducts();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <ProductForm product={product} isEdit />
    </div>
  );
}