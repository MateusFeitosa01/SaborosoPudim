import Header from "@/components/Header";
import Hero from "@/components/hero";
import ProductsGrid from "@/components/productGrid";

export default function Principal() {
  return (
    <section className="">

        <Header />
        <Hero/>
        <ProductsGrid />
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
            <div className="container">© 2026 Saboroso Pudim — Feito com 🍮 e amor</div>
          </footer>
    </section>
  )
}
