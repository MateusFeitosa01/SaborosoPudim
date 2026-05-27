"use client";

import { Menu, Bell, User } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 hidden sm:block">
            Painel de Administração
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-gray-200">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">Admin</span>
              <span className="text-xs text-gray-500">Gerenciador</span>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
