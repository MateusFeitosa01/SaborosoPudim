import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground mb-8">
            Ops! Parece que você se perdeu no caminho dos pudins.
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full flex items-center gap-2">
              <Home size={18} />
              Voltar ao Início
            </Button>
          </Link>

          <Link href="/cestinha">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Search size={18} />
              Ver Cardápio
            </Button>
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            🍮 Precisa de ajuda? Entre em contato conosco!
          </p>
        </div>
      </div>
    </div>
  );
}