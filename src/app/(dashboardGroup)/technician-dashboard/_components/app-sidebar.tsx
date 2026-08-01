"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wrench,
  CalendarDays,
  Star,
  Wallet,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { logout } from "@/service/auth/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
  { title: "Overview",      url: "/technician-dashboard",              icon: LayoutDashboard },
  { title: "My Profile",    url: "/technician-dashboard/profile",      icon: User },
  { title: "Edit Profile",  url: "/technician-dashboard/edit-profile", icon: Settings },
  { title: "My Services",   url: "/technician-dashboard/services",     icon: Wrench },
  { title: "Bookings",      url: "/technician-dashboard/bookings",     icon: CalendarDays },
  { title: "Reviews",       url: "/technician-dashboard/reviews",      icon: Star },

];

interface AppSidebarProps {
  user?: {
    name?: string;
    email?: string;
    profileImage?: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <Sidebar className="border-r border-border/60">
      {/* Header */}
      <SidebarHeader className="p-4 pb-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-1.5 rounded-xl transition-colors hover:bg-accent/50 group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <Wrench className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">
              FixItNow<span className="text-primary">.</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <ShieldCheck className="size-3 text-emerald-500" />
              Technician Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="mx-4 my-2 opacity-60" />

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      )}
                      render={
                        <Link href={item.url} className="flex items-center gap-3 w-full">
                          <Icon className="size-4 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2">
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="size-4 shrink-0" />
          <span>Logout</span>
        </button>

        <SidebarSeparator className="opacity-60" />

        {/* User profile card */}
        <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-2.5 shadow-sm">
          <Avatar className="size-9 border border-border/60 shrink-0">
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
              {user?.name ? user.name.slice(0, 2) : "TK"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-bold text-foreground truncate leading-tight">
              {user?.name || "Technician"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
