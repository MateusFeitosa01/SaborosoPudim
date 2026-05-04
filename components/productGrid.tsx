"use client";

import { getProducts } from "@/lib/services/products";
import { useEffect, useState } from "react";
import ProductCard, { Product } from "./productCard";

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        console.log("PRODUTOS:", data);
        setProducts(data || []);
      } catch (error) {
        console.error("Erro completo:", JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Nossos Pudins
          </h1>

          <p className="mt-2 text-muted-foreground text-lg md:text-xl">
            Escolha os seus favoritos e faça seu pedido
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            Carregando produtos...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
