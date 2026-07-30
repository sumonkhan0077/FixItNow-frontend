import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { GsapWrapper } from "../_components/gsap-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import {
  Mail, MapPin, Star, Clock, CalendarDays,
  Pencil, Wrench, DollarSign, ShieldCheck,
  MessageSquare, AlertCircle,
} from "lucide-react";
import { TechnicianProfileData } from "@/lib/types";

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroCard({ profile }: { profile: TechnicianProfileData }) {
  const { user } = profile;
  const initials = user.name?.slice(0, 2).toUpperCase() ?? "TK";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/85 to-primary/60 p-6 md:p-8 shadow-lg shadow-primary/20">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 size-64 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Avatar */}
        <Avatar className="size-20 shrink-0 border-4 border-white/25 shadow-xl md:size-24">
          <AvatarImage src={user.profileImage ?? undefined} alt={user.name} />
          <AvatarFallback className="bg-white/20 text-xl font-bold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-white md:text-3xl">{user.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-white/70">
            <Mail className="size-3.5" /> {user.email}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge className="border-white/20 bg-white/15 text-xs text-white hover:bg-white/20">
              {user.role}
            </Badge>
            <Badge
              className={`text-xs border ${
                user.status === "ACTIVE"
                  ? "border-emerald-400/30 bg-emerald-400/20 text-emerald-100"
                  : "border-red-400/30 bg-red-400/20 text-red-100"
              }`}
            >
              <ShieldCheck className="mr-1 size-3" />
              {user.status ?? "UNKNOWN"}
            </Badge>
          </div>
        </div>

        {/* Edit link */}
        <Link
          href="/technician-dashboard/edit-profile"
          className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25 sm:self-auto"
        >
          <Pencil className="size-4" /> Edit Profile
        </Link>
      </div>
    </div>
  );
}

function InfoGrid({ profile }: { profile: TechnicianProfileData }) {
  const rows = [
    { icon: MapPin,       label: "Service Area", value: profile.serviceArea },
    { icon: Clock,        label: "Experience",   value: profile.experience ? `${profile.experience} years` : undefined },
    { icon: Star,         label: "Avg. Rating",  value: profile.averageRating?.toFixed(1) },
    { icon: CalendarDays, label: "Member Since", value: new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
  ].filter((r) => r.value !== undefined);

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Details
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
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
  );
}

function BioCard({ bio }: { bio?: string }) {
  if (!bio) return null;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Bio</h2>
      <p className="text-sm leading-relaxed text-foreground">{bio}</p>
    </div>
  );
}

function ServicesSection({ profile }: { profile: TechnicianProfileData }) {
  const { services } = profile;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Wrench className="size-4" /> Services ({services.length})
      </h2>
      {services.length === 0 ? (
        <p className="text-sm text-muted-foreground">No services added yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((svc, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{svc.title}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {svc.category.name}
                  </Badge>
                </div>
                <span className="flex items-center gap-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  <DollarSign className="size-3.5" />
                  {svc.price}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AvailabilitySection({ profile }: { profile: TechnicianProfileData }) {
  const { availabilities } = profile;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <CalendarDays className="size-4" /> Availability
      </h2>
      {availabilities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No schedule set yet.</p>
      ) : (
        <div className="space-y-2">
          {availabilities.map((slot, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-background/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={`size-2 rounded-full ${slot.isAvailable ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                <span className="text-sm font-semibold text-foreground capitalize">
                  {slot.dayOfWeek.charAt(0) + slot.dayOfWeek.slice(1).toLowerCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {slot.startTime} – {slot.endTime}
                </span>
                <Badge
                  className={`text-xs ${
                    slot.isAvailable
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                  variant="outline"
                >
                  {slot.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsSection({ profile }: { profile: TechnicianProfileData }) {
  const { reviews } = profile;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <MessageSquare className="size-4" /> Reviews ({reviews.length})
      </h2>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Star className="size-10 text-muted-foreground/30" />
          <p className="text-sm font-medium text-muted-foreground">No reviews yet.</p>
          <p className="text-xs text-muted-foreground/60">Reviews from clients will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border/50 bg-background/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              {review.comment && <p className="text-sm text-foreground">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main async content ───────────────────────────────────────────────────────

async function ProfileContent() {
  const res = await getMyTechnicianProfile();

  if (!res?.success || !res.data) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <AlertCircle className="size-10 text-muted-foreground/40" />
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-muted-foreground">Your technician profile hasn&apos;t been set up yet.</p>
        <Link
          href="/technician-dashboard/edit-profile"
          className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Pencil className="size-4" /> Create Profile
        </Link>
      </div>
    );
  }

  // API shape: response.data IS the profile object
  const profile = res.data;

  return (
    <div className="space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <HeroCard profile={profile} />
      </GsapWrapper>

      <GsapWrapper animation="stagger" delay={0.1} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoGrid profile={profile} />
        <BioCard bio={profile.bio} />
      </GsapWrapper>

      <GsapWrapper animation="fadeUp" delay={0.2}>
        <ServicesSection profile={profile} />
      </GsapWrapper>

      <GsapWrapper animation="stagger" delay={0.25} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AvailabilitySection profile={profile} />
        <ReviewsSection profile={profile} />
      </GsapWrapper>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-52 rounded-2xl" />
      </div>
      <Skeleton className="h-56 rounded-2xl" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
