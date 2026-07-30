import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../technician-dashboard/_components/gsap-wrapper";
import { StatsCard } from "../technician-dashboard/_components/stats-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Star, ArrowRight, Wrench, Bell, User } from "lucide-react";
import Link from "next/link";

export default async function CustomerDashboardPage() {
  const res  = await getMe();
  const user = res?.data?.profile || null;
  const name = user?.name ?? "Customer";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const quickActions = [
    { label: "My Bookings",   href: "/dashboard/bookings",     desc: "View & track your bookings", icon: CalendarDays },
    { label: "My Reviews",    href: "/dashboard/reviews",      desc: "Reviews you've left",        icon: Star },
    { label: "Profile",       href: "/dashboard/profile",      desc: "Manage your account",        icon: User },
    { label: "Notifications", href: "/dashboard/notifications",desc: "Alerts & updates",           icon: Bell },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">

      {/* Hero greeting */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 md:p-8 shadow-lg shadow-primary/20">
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
              <p className="text-sm text-white/70 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </GsapWrapper>

      {/* Stats */}
      <GsapWrapper animation="stagger" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard title="Total Bookings" value="—" subtitle="All time"      icon={CalendarDays} color="blue"   />
        <StatsCard title="Reviews Given"  value="—" subtitle="Your feedback" icon={Star}         color="yellow" />
      </GsapWrapper>

      {/* Quick actions */}
      <GsapWrapper animation="fadeUp" delay={0.2}>
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <action.icon className="size-5 text-primary" />
              </div>
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </span>
              <span className="text-xs text-muted-foreground">{action.desc}</span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-auto" />
            </Link>
          ))}
        </div>
      </GsapWrapper>

      {/* Find technicians CTA */}
      <GsapWrapper animation="fadeUp" delay={0.3}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <Wrench className="size-6 text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-foreground">Need a technician?</p>
              <p className="text-sm text-muted-foreground">Browse and book from our verified professionals.</p>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Find Technicians <ArrowRight className="size-4" />
          </Link>
        </div>
      </GsapWrapper>
    </div>
  );
}
