import { getMe } from "@/service/getMe";
import { getMyBookings } from "@/service/customer/bookingActions";
import { GsapWrapper } from "../technician-dashboard/_components/gsap-wrapper";
import { StatsCard } from "../technician-dashboard/_components/stats-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays, Star, ArrowRight, Wrench,
  Bell, User, CheckCircle2, Clock, Settings,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CustomerDashboardPage() {
  const [meRes, bookingsRes] = await Promise.all([
    getMe(),
    getMyBookings({ limit: 100 }),   // fetch all to count stats
  ]);

  const user = meRes?.data?.profile || null;
  const name = user?.name ?? "Customer";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const allBookings  = bookingsRes?.success ? bookingsRes.data.data : [];
  const totalBookings   = bookingsRes?.data?.meta?.total ?? 0;
  const completedCount  = allBookings.filter((b) => b.status === "COMPLETED").length;
  const pendingCount    = allBookings.filter((b) =>
    ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
  ).length;
  const reviewsGiven    = allBookings.filter((b) => b.review !== null).length;

  // Recent 3 bookings
  const recent = allBookings.slice(0, 3);

  const STATUS_COLOR: Record<string, string> = {
    REQUESTED:   "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    ACCEPTED:    "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    PAID:        "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    IN_PROGRESS: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    COMPLETED:   "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    DECLINED:    "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    CANCELLED:   "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
  };

  const quickActions = [
    { label: "My Bookings",   href: "/dashboard/bookings",      desc: "View & track your bookings", icon: CalendarDays },
    { label: "Profile",       href: "/dashboard/profile",       desc: "Manage your account",        icon: User },
    { label: "Edit Profile",  href: "/dashboard/edit-profile",  desc: "Update your information",    icon: Settings },
    { label: "Notifications", href: "/dashboard/notifications", desc: "Alerts & updates",           icon: Bell },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">

      {/* Hero */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 md:p-8 shadow-lg shadow-primary/20">
          <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-8 size-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar className="size-16 md:size-20 border-4 border-white/30 shadow-xl shrink-0">
              <AvatarImage src={user?.profileImage ?? undefined} />
              <AvatarFallback className="bg-white/30 text-white text-2xl font-extrabold">
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
      <GsapWrapper animation="stagger" delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value={totalBookings}  subtitle="All time"        icon={CalendarDays}   color="blue"   />
        <StatsCard title="Completed"      value={completedCount} subtitle="Finished"        icon={CheckCircle2}   color="green"  />
        <StatsCard title="Active"         value={pendingCount}   subtitle="In progress"     icon={Clock}          color="purple" />
        <StatsCard title="Reviews Given"  value={reviewsGiven}   subtitle="Your feedback"   icon={Star}           color="yellow" />
      </GsapWrapper>

      {/* Recent bookings */}
      {recent.length > 0 && (
        <GsapWrapper animation="fadeUp" delay={0.2}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recent.map((b) => (
              <Link
                key={b.id}
                href="/dashboard/bookings"
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3 hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {b.service.image ? (
                      <Image
                        src={b.service.image}
                        alt={b.service.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <Wrench className="size-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{b.service.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(b.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {b.timeSlot && ` · ${b.timeSlot}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">${b.totalAmount}</span>
                  <Badge variant="outline" className={`text-[10px] px-2 py-0.5 font-semibold ${STATUS_COLOR[b.status] ?? ""}`}>
                    {b.status.replace("_", " ")}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </GsapWrapper>
      )}

      {/* Quick actions */}
      <GsapWrapper animation="fadeUp" delay={0.25}>
        <h2 className="text-base font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <action.icon className="size-4 text-primary" />
              </div>
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                {action.label}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">{action.desc}</span>
            </Link>
          ))}
        </div>
      </GsapWrapper>

      {/* Find technicians CTA */}
      <GsapWrapper animation="fadeUp" delay={0.3}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <Wrench className="size-5 text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-foreground">Need a technician?</p>
              <p className="text-sm text-muted-foreground">Browse and book verified professionals.</p>
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
