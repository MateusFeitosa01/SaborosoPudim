import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminMenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

function AdminMenuItem({
  href,
  icon,
  label,
  isActive,
  isCollapsed,
}: AdminMenuItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive
          ? "bg-amber-600 text-white font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      title={isCollapsed ? label : undefined}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

interface AdminSidebarProps {
  isCollapsed?: boolean;
}

export function AdminSidebar({ isCollapsed = false }: AdminSidebarProps) {
  const menuItems = [
    {
      href: "/admin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      href: "/admin/clientes",
      icon: <Users size={20} />,
      label: "Clientes",
    },
    {
      href: "/admin/pedidos",
      icon: <ShoppingCart size={20} />,
      label: "Pedidos",
    },
    {
      href: "/admin/produtos",
      icon: <Package size={20} />,
      label: "Produtos",
    },
    {
      href: "/admin/relatorios",
      icon: <BarChart3 size={20} />,
      label: "Relatórios",
    },
    {
      href: "/admin/configuracoes",
      icon: <Settings size={20} />,
      label: "Configurações",
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold">
            LP
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-sm font-bold text-gray-900">Leve Pudim</h1>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <AdminMenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          title={isCollapsed ? "Sair" : undefined}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Sair</span>}
        </Link>
      </div>
    </div>
  );
}
