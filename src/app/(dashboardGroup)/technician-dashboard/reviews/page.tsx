import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { GsapWrapper } from "../_components/gsap-wrapper";
import {
  AlertCircle, MessageSquare, Star, TrendingUp, Users, Award,
} from "lucide-react";
import { TechnicianReview } from "@/lib/types";
import { ReviewsList } from "@/app/(dashboardGroup)/technician-dashboard/_components/reviews-list";

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground w-3 shrink-0">{star}</span>
      <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-5 text-right shrink-0">{count}</span>
    </div>
  );
}

export default async function ReviewsPage() {
  const res = await getMyTechnicianProfile();

  if (!res?.success || !res.data) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <AlertCircle className="size-10 text-muted-foreground/40" />
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-muted-foreground">Set up your profile to start receiving reviews.</p>
      </div>
    );
  }

  const { reviews, averageRating } = res.data;
  const total = reviews.length;
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => { if (r.rating >= 1 && r.rating <= 5) dist[r.rating]++; });
  const avg = averageRating ?? (total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0);
  const sorted: TechnicianReview[] = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8 space-y-6">

      {/* Header */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/10">
            <MessageSquare className="size-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Reviews</h1>
            <p className="text-sm text-muted-foreground">Customer feedback on your services</p>
          </div>
        </div>
      </GsapWrapper>

      {total === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 py-20 text-center">
          <Star className="size-10 text-muted-foreground/30" />
          <p className="font-semibold text-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground">Reviews from completed bookings will appear here.</p>
        </div>
      ) : (
        <>
          {/* Summary row */}
          <GsapWrapper animation="stagger" delay={0.05} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Average */}
            <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-4">
              <div className="flex flex-col items-center justify-center size-14 shrink-0 rounded-xl bg-amber-400/10">
                <p className="text-xl font-bold text-foreground leading-none">{avg.toFixed(1)}</p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-2.5 ${i < Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Average</p>
                <p className="text-sm text-muted-foreground mt-0.5">Based on {total} review{total !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-foreground">{total}</p>
              </div>
            </div>

            {/* 5-star */}
            <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                <Award className="size-6 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">5-Star</p>
                <p className="text-2xl font-bold text-foreground">{dist[5]}</p>
              </div>
            </div>
          </GsapWrapper>

          {/* Breakdown */}
          <GsapWrapper animation="fadeUp" delay={0.1}>
            <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Breakdown</p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <RatingBar key={star} star={star} count={dist[star]} total={total} />
                ))}
              </div>
            </div>
          </GsapWrapper>

          {/* Paginated review list */}
          <GsapWrapper animation="fadeUp" delay={0.15}>
            <ReviewsList reviews={sorted} />
          </GsapWrapper>
        </>
      )}
    </div>
  );
}
