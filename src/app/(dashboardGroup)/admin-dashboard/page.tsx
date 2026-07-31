import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../technician-dashboard/_components/gsap-wrapper";
import { StatsCard } from "../technician-dashboard/_components/stats-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Wrench, CalendarDays, Tag, BarChart3, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const res = await getMe();

  const user = res?.data?.profile || null;
  const name = user?.name ?? "Admin";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const stats = [
    { title: "Total Users",       value: "—", subtitle: "Customers & technicians", icon: Users,        color: "blue"   as const },
    { title: "Technicians",       value: "—", subtitle: "Registered professionals", icon: Wrench,       color: "purple" as const },
    { title: "Total Bookings",    value: "—", subtitle: "All time",                 icon: CalendarDays,color: "green"  as const },
    { title: "Categories",        value: "—", subtitle: "Service categories",       icon: Tag,          color: "yellow" as const },
  ];

  const quickActions = [
    { label: "Manage Users",      href: "/admin-dashboard/users",       desc: "View & moderate users",        icon: Users },
    { label: "Technicians",        href: "/admin-dashboard/technicians", desc: "Approve & manage technicians", icon: Wrench },
    { label: "All Bookings",       href: "/admin-dashboard/bookings",    desc: "Monitor all bookings",         icon: CalendarDays },
    { label: "Categories",         href: "/admin-dashboard/categories",  desc: "Manage service categories",    icon: Tag },
    { label: "Analytics",          href: "/admin-dashboard/analytics",   desc: "Platform insights",            icon: BarChart3 },
    { label: "Settings",           href: "/admin-dashboard/settings",    desc: "Platform configuration",       icon: Settings },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-rose-500 to-rose-400 p-6 md:p-8 shadow-lg shadow-rose-500/20">
          <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-8 size-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar className="size-16 md:size-20 border-4 border-white/30 shadow-xl shrink-0">
              <AvatarImage src={user?.profileImage ?? undefined} />
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/70">{greeting},</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{name}</h1>
              <p className="text-sm text-white/70 mt-1">Administrator · FixItNow Platform</p>
            </div>
          </div>
        </div>
      </GsapWrapper>

      {/* Stats */}
      <GsapWrapper animation="stagger" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </GsapWrapper>

      {/* Quick actions */}
      <GsapWrapper animation="fadeUp" delay={0.2}>
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 hover:border-rose-500/30 hover:bg-rose-500/5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
                <action.icon className="size-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </GsapWrapper>
    </div>
  );
}