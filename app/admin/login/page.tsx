import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">LP</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leve Pudim</h1>
          <p className="text-gray-600">Painel de Administração</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
          <AdminLoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © 2024 Leve Pudim. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
