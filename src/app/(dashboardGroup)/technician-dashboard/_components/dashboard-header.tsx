import { TechnicianProfileData } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star } from "lucide-react";

interface DashboardHeaderProps {
  user: TechnicianProfileData;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const name = user.user?.name ?? "Technician";
  const profileImage = user.user?.profileImage ?? undefined;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 md:p-8 text-primary-foreground shadow-lg shadow-primary/20">
      <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-8 size-64 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Avatar className="size-16 md:size-20 border-4 border-white/30 shadow-xl shrink-0">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/70">{greeting},</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{name}</h1>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {user.serviceArea && (
              <span className="flex items-center gap-1 text-xs text-white/80">
                <MapPin className="size-3.5" />
                {user.serviceArea}
              </span>
            )}
            {user.averageRating !== undefined && (
              <span className="flex items-center gap-1 text-xs text-white/80">
                <Star className="size-3.5 fill-amber-300 text-amber-300" />
                {user.averageRating.toFixed(1)} rating
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
