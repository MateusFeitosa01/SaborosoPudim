"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <SidebarProvider>
      <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
        {/* Sidebar desktop */}
        <div className="hidden md:block">
          <AdminSidebar isCollapsed={sidebarCollapsed} />
        </div>

        {/* Mobile overlay */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-white z-40 transform transition-transform md:hidden ${
            sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <AdminSidebar isCollapsed={false} />
        </div>

        {/* MAIN AREA (isso garante 100% largura) */}
        <div className="flex flex-col flex-1 min-w-0 w-full h-full overflow-hidden">
          <AdminHeader
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <main className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}