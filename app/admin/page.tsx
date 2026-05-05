import { SiteHeader } from "@/components/site-header";
import { LogoutButton } from "../../components/admin/LogoutButton";

export default function Page() {
  return (
    <div className="flex-1 space-y-4">
      <SiteHeader />
      <div className="px-2 sm:px-3 md:px-4 lg:px-0 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Dashboard Admin
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Bem-vindo ao painel de administração.
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
