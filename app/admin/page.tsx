import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p>Bem-vindo ao painel de administração.</p>
        {/* Adicionar estatísticas ou overview aqui */}
      </div>
    </div>
  )
}
