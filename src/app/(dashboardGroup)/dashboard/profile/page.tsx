import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Mail, Phone, MapPin, CalendarDays,
  ShieldCheck, User, AlertCircle, Pencil,
} from "lucide-react";

export default async function CustomerProfilePage() {
  const res     = await getMe();
  const profile = res?.data?.profile ?? null;

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <AlertCircle className="size-10 text-muted-foreground/40" />
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-muted-foreground">Please log in again.</p>
      </div>
    );
  }

  const name     = profile.name;
  const initials = name.slice(0, 2).toUpperCase();
  const joined   = new Date(profile.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const infoRows = [
    { icon: Mail,        label: "Email",        value: profile.email },
    { icon: Phone,       label: "Phone",        value: profile.phone        ?? "Not provided" },
    { icon: MapPin,      label: "Address",      value: profile.address      ?? "Not provided" },
    { icon: CalendarDays,label: "Member Since", value: joined },
  ];

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8 space-y-6">

      {/* Hero card */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/85 to-primary/60 p-6 md:p-8 shadow-lg shadow-primary/20">
          <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 size-64 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar className="size-20 shrink-0 border-4 border-white/25 shadow-xl md:size-24">
              <AvatarImage src={profile.profileImage ?? undefined} alt={name} />
              <AvatarFallback className="bg-white/30 text-white text-2xl font-extrabold tracking-wide select-none">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-white md:text-3xl">{name}</h1>
              <p className="text-sm text-white/70">{profile.email}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge className="border-white/20 bg-white/15 text-xs text-white hover:bg-white/20">
                  {profile.role}
                </Badge>
                <Badge className={`text-xs border ${
                  profile.status === "ACTIVE"
                    ? "border-emerald-400/30 bg-emerald-400/20 text-emerald-100"
                    : "border-red-400/30 bg-red-400/20 text-red-100"
                }`}>
                  <ShieldCheck className="mr-1 size-3" />
                  {profile.status ?? "ACTIVE"}
                </Badge>
              </div>
            </div>
            <Link
              href="/dashboard/edit-profile"
              className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25 sm:self-auto"
            >
              <Pencil className="size-4" /> Edit Profile
            </Link>
          </div>
        </div>
      </GsapWrapper>

      {/* Info grid */}
      <GsapWrapper animation="stagger" delay={0.1}>
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="size-4 text-muted-foreground" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Account Details
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <row.icon className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                  <p className={`text-sm font-semibold truncate ${
                    row.value === "Not provided"
                      ? "text-muted-foreground italic"
                      : "text-foreground"
                  }`}>
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GsapWrapper>
    </div>
  );
}
