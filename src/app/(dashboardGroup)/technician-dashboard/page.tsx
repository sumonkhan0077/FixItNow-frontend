import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { DashboardHeader } from "./_components/dashboard-header";
import { StatsCard } from "./_components/stats-card";
import { GsapWrapper } from "./_components/gsap-wrapper";
import { Briefcase, Star, Wallet, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

async function DashboardContent() {
  const res = await getMyTechnicianProfile();

  if (!res?.success || !res.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-foreground">Profile not found</p>
          <p className="text-sm text-muted-foreground">Please complete your profile setup.</p>
          <Link
            href="/technician-dashboard/edit-profile"
            className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:underline"
          >
            Set up profile <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  const user = res.data;
  const tp = user.technicianProfile;

  const stats = [
    { title: "Completed Jobs", value: tp?.completedJobs ?? 0,              subtitle: "Total jobs done",        icon: Briefcase, color: "blue"   as const },
    { title: "Average Rating", value: tp?.averageRating?.toFixed(1) ?? "—", subtitle: "Out of 5.0",            icon: Star,      color: "yellow" as const },
    { title: "Hourly Rate",    value: tp?.hourlyRate ? `$${tp.hourlyRate}` : "—", subtitle: "Per hour",         icon: Wallet,    color: "green"  as const },
    { title: "Experience",     value: tp?.experience ? `${tp.experience}y` : "—", subtitle: "Years of service", icon: Clock,     color: "purple" as const },
  ];

  const quickActions = [
    { label: "View Profile",   href: "/technician-dashboard/profile",      desc: "See your public profile" },
    { label: "Edit Profile",   href: "/technician-dashboard/edit-profile", desc: "Update your information" },
    { label: "My Services",    href: "/technician-dashboard/services",     desc: "Manage offered services" },
    { label: "View Bookings",  href: "/technician-dashboard/bookings",     desc: "Check incoming requests" },
  ];

  return (
    <div className="space-y-8">
      <GsapWrapper animation="fadeUp" delay={0}>
        <DashboardHeader user={user} />
      </GsapWrapper>

      {/* Stats */}
      <GsapWrapper animation="stagger" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </GsapWrapper>

      {/* Quick Actions */}
      <GsapWrapper animation="fadeUp" delay={0.3}>
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300"
            >
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </span>
              <span className="text-xs text-muted-foreground">{action.desc}</span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
            </Link>
          ))}
        </div>
      </GsapWrapper>

      {/* Bio & Skills */}
      {(tp?.bio || (tp?.skills && tp.skills.length > 0)) && (
        <GsapWrapper animation="fadeUp" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tp?.bio && (
              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
                <p className="text-sm text-foreground leading-relaxed">{tp.bio}</p>
              </div>
            )}
            {tp?.skills && tp.skills.length > 0 && (
              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {tp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GsapWrapper>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-36 rounded-2xl w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
      </div>
    </div>
  );
}

export default function TechnicianDashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
