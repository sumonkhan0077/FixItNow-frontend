import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { GsapWrapper } from "../_components/gsap-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Star, Briefcase, Clock,
  Wallet, CalendarDays, Pencil, Wrench,
} from "lucide-react";

async function ProfileContent() {
  const res = await getMyTechnicianProfile();

  if (!res?.success || !res.data) {
    return (
      <div className="text-center py-20 space-y-3">
        <p className="text-lg font-semibold">No profile found</p>
        <p className="text-sm text-muted-foreground">You haven&apos;t set up your technician profile yet.</p>
        <Link
          href="/technician-dashboard/edit-profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Pencil className="size-4" /> Create Profile
        </Link>
      </div>
    );
  }

  const user = res.data;
  const tp = user.technicianProfile;

  const infoRows = [
    { icon: Mail,        label: "Email",        value: user.email },
    { icon: Phone,       label: "Phone",        value: user.phone },
    { icon: MapPin,      label: "Address",      value: user.address },
    { icon: MapPin,      label: "Service Area", value: tp?.serviceArea },
    { icon: Clock,       label: "Experience",   value: tp?.experience ? `${tp.experience} years` : undefined },
    { icon: Wallet,      label: "Hourly Rate",  value: tp?.hourlyRate ? `$${tp.hourlyRate}/hr` : undefined },
    { icon: Briefcase,   label: "Completed Jobs",value: tp?.completedJobs?.toString() },
    { icon: Star,        label: "Avg. Rating",  value: tp?.averageRating?.toFixed(1) },
    { icon: CalendarDays,label: "Member Since", value: new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
  ].filter((r) => r.value);

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-8 text-primary-foreground shadow-lg">
          <div className="absolute -top-12 -right-12 size-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-8 size-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="size-24 border-4 border-white/30 shadow-xl shrink-0">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-white/70 text-sm">{user.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <Badge className="bg-white/15 text-white text-xs border-white/20 hover:bg-white/20">
                  TECHNICIAN
                </Badge>
                <Badge
                  className={`text-xs border ${
                    tp?.availability === "AVAILABLE"
                      ? "bg-emerald-400/20 text-emerald-100 border-emerald-400/30"
                      : tp?.availability === "BUSY"
                      ? "bg-amber-400/20 text-amber-100 border-amber-400/30"
                      : "bg-white/10 text-white/70 border-white/20"
                  }`}
                >
                  {tp?.availability ?? "Status not set"}
                </Badge>
              </div>
            </div>
            <Link
              href="/technician-dashboard/edit-profile"
              className="sm:ml-auto mt-2 sm:mt-0 flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-medium text-white transition-colors border border-white/20 shrink-0"
            >
              <Pencil className="size-4" /> Edit Profile
            </Link>
          </div>
        </div>
      </GsapWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info */}
        <GsapWrapper animation="fadeUp" delay={0.15} className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoRows.map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                    <row.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-semibold text-foreground">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          {tp?.bio && (
            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Bio</h2>
              <p className="text-sm text-foreground leading-relaxed">{tp.bio}</p>
            </div>
          )}
        </GsapWrapper>

        {/* Skills */}
        <GsapWrapper animation="fadeUp" delay={0.25}>
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 h-full">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Wrench className="size-4" /> Skills
            </h2>
            {tp?.skills && tp.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            )}
          </div>
        </GsapWrapper>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-44 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
