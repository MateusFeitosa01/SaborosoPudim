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
        setProducts((await getProducts()) || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const weekly = products.filter((product) => product.is_weekly);
  const bestSellers = products.filter((product) => product.is_best_seller && !product.is_weekly);
  const regular = products.filter((product) => !product.is_weekly && !product.is_best_seller);

  return (
    <main className="pb-16">
      {loading ? (
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground lg:px-10">Carregando cardápio...</div>
      ) : products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground lg:px-10">Nenhum produto encontrado.</div>
      ) : (
        <>
          {weekly.length > 0 && (
            <section id="da-semana" className="scroll-mt-24 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-10 md:py-14">
              <div className="mx-auto max-w-7xl px-4 lg:px-10">
                <div className="mb-8 text-center">
                  <span className="mb-2 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Especial da semana</span>
                  <h2 className="font-heading text-2xl font-bold md:text-4xl">Pudim da Semana</h2>
                  <p className="mt-1 text-sm text-muted-foreground md:text-base">Sabores especiais disponíveis por tempo limitado.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {weekly.map((product) => <ProductCard key={product.id} product={product} featured badge="Pudim da Semana" />)}
                </div>
              </div>
            </section>
          )}

          {bestSellers.length > 0 && (
            <section className="border-y border-primary/10 bg-white/50 py-10 md:py-14">
              <div className="mx-auto max-w-7xl px-4 lg:px-10">
                <div className="mb-8 text-center">
                  <span className="mb-2 inline-flex rounded-full bg-[rgb(75,40,27)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Ranking da semana</span>
                  <h2 className="font-heading text-2xl font-bold md:text-4xl">Mais Pedidos da Semana</h2>
                  <p className="mt-1 text-sm text-muted-foreground md:text-base">Atualizado automaticamente entre segunda-feira e domingo.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {bestSellers.map((product) => <ProductCard key={product.id} product={product} featured badge={`Mais pedido · ${product.weekly_order_count ?? 0}`} />)}
                </div>
              </div>
            </section>
          )}

          <section id="cardapio" className="scroll-mt-24 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-10">
              <div className="mb-8 text-center">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Nosso cardápio</span>
                <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Escolha seu pudim</h2>
                <p className="mt-2 text-muted-foreground">Feito com carinho e pronto para adoçar o seu dia.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regular.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
