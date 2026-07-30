import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./technician-dashboard/_components/app-sidebar";
import { getMe } from "@/service/getMe";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const res = await getMe();
  const user = res?.data?.profile || null;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="flex-1 min-h-screen bg-background">
        <div className="flex items-center gap-2 p-4 border-b border-border/50 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-muted-foreground">Technician Dashboard</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
