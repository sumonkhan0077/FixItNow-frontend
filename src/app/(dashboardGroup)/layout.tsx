import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import { AppSidebar } from "./technician-dashboard/_components/app-sidebar";
import { CustomerSidebar } from "./dashboard/_components/customer-sidebar";
import { AdminSidebar } from "./admin-dashboard/_components/admin-sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const res = await getMe();
  const user = res?.data?.profile || null;
  const role = user?.role ?? "CUSTOMER";

  const sidebarLabel =
    role === "ADMIN" ? "Admin Panel" :
    role === "TECHNICIAN" ? "Technician Dashboard" :
    "My Dashboard";

  return (
    <SidebarProvider>
      {role === "TECHNICIAN" && <AppSidebar user={user} />}
      {role === "CUSTOMER"   && <CustomerSidebar user={user} />}
      {role === "ADMIN"      && <AdminSidebar user={user} />}
      <main className="flex-1 min-h-screen bg-background">
        <div className="flex items-center gap-2 p-4 border-b border-border/50 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-muted-foreground">{sidebarLabel}</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
