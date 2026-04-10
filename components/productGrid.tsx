import ProductCard from "./productCard";
import { pudins } from "../data/products";

export default function ProductsGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">

        <h1 className="font-display text-3xl font-bold text-foreground md:text-3xl text-center">
          Nossos Pudins
        <p className="mt-2 text-center text-muted-foreground text-2xl">Escolha o seu favorito e adicione</p>
        </h1><br/><br/>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pudins.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}