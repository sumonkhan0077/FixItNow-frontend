import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "purple";
}

const colorMap = {
  blue:   { bg: "bg-blue-500/10",   icon: "text-blue-500",   border: "border-blue-500/20" },
  green:  { bg: "bg-emerald-500/10", icon: "text-emerald-500",border: "border-emerald-500/20" },
  yellow: { bg: "bg-amber-500/10",  icon: "text-amber-500",  border: "border-amber-500/20" },
  purple: { bg: "bg-violet-500/10", icon: "text-violet-500", border: "border-violet-500/20" },
};

export function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn(
      "rounded-2xl border bg-card/60 backdrop-blur-sm p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5",
      c.border
    )}>
      <div className={cn("flex size-12 items-center justify-center rounded-xl shrink-0", c.bg)}>
        <Icon className={cn("size-6", c.icon)} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
