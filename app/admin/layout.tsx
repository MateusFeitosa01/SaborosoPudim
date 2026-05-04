import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <AppSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
