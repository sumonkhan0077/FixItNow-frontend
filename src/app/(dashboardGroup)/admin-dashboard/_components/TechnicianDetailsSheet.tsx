"use client";

import { useState } from "react";
import { 
  Eye, Star, MapPin, Briefcase, Mail, 
  Wrench, Calendar, CheckCircle2, XCircle, User,
  Clock, ShieldCheck, Sparkles, X
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Cross button integration
} from "@/components/ui/dialog";

interface TechnicianDetailsProps {
  tech: any;
}

export function TechnicianDetailsSheet({ tech }: TechnicianDetailsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="w-full mt-4 py-2.5 px-4 bg-purple-500/10 hover:bg-purple-600 hover:text-white text-purple-600 dark:text-purple-300 font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-purple-500/20 shadow-sm active:scale-[0.98]">
          <Eye className="size-4" />
          View Details
        </button>
      </DialogTrigger>

      {/* Center Dialog Content */}
      <DialogContent className="!w-[90vw] !max-w-sm sm:!max-w-xl md:!max-w-2xl lg:!max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-background/95 backdrop-blur-xl sm:rounded-2xl border border-border/80 shadow-2xl transition-all [&>button]:hidden">
        
        {/* Header */}
        <DialogHeader className="p-5 border-b border-border/60 bg-muted/30 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-500/20">
                <Wrench className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-foreground tracking-tight">
                  Technician Profile
                </DialogTitle>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  ID: #{tech.id?.slice(-8)?.toUpperCase() || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium text-[11px] border ${
                  tech.user?.status === "ACTIVE"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                }`}
              >
                {tech.user?.status === "ACTIVE" ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <XCircle className="size-3.5" />
                )}
                {tech.user?.status || "INACTIVE"}
              </span>

              {/* Explicit Close (X) Button */}
              <DialogClose className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus:outline-none">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* SECTION 1: TECHNICIAN INFO */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <User className="size-3.5" /> Technician Info
            </h3>
            
            <div className="p-4 rounded-xl border border-border/70 bg-card/60 hover:bg-card transition-colors shadow-sm space-y-4">
              
              {/* Profile Bar */}
              <div className="flex items-center gap-3.5 pb-3.5 border-b border-border/50">
                <div className="relative size-14 rounded-full overflow-hidden bg-muted border-2 border-background shadow-md shrink-0">
                  {tech.user?.profileImage ? (
                    <Image
                      src={tech.user.profileImage}
                      alt={tech.user?.name || "Technician"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-500/10 text-purple-500">
                      <User className="size-7" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base capitalize leading-snug">
                    {tech.user?.name || "Unknown Technician"}
                  </h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="size-3.5 text-purple-500" /> Verified Partner
                  </p>
                </div>
              </div>

              {/* Information Row Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40">
                  <Mail className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium">Email</p>
                    <p className="font-semibold text-foreground truncate">{tech.user?.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40">
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium">Area</p>
                    <p className="font-semibold text-foreground truncate">{tech.serviceArea || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40">
                  <Briefcase className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium">Experience</p>
                    <p className="font-semibold text-foreground">{tech.experience || 0} Years</p>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              {tech.bio && (
                <div className="text-xs bg-muted/20 p-3 rounded-lg border border-border/40 italic text-muted-foreground">
                  "{tech.bio}"
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: OFFERED SERVICES (Compact Style) */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Offered Services ({tech.services?.length || 0})
            </h3>

            {tech.services && tech.services.length > 0 ? (
              <div className="space-y-2">
                {tech.services.map((service: any) => (
                  <div 
                    key={service.id} 
                    className="p-2.5 rounded-lg border border-border/60 bg-card/60 hover:bg-card transition-all flex items-center gap-3"
                  >
                    {/* Small Thumbnail Image */}
                    {service.image ? (
                      <div className="relative size-11 rounded-md overflow-hidden border border-border/50 shrink-0 bg-muted">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="size-11 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <Wrench className="size-5 text-purple-500" />
                      </div>
                    )}

                    {/* Compact Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-foreground text-xs truncate">{service.title}</h4>
                        <span className="font-extrabold text-[11px] text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded shrink-0">
                          ৳{service.price} BDT
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {service.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-dashed border-border text-center text-xs text-muted-foreground">
                No services added yet.
              </div>
            )}
          </div>

          {/* SECTION 3: AVAILABILITY & SCHEDULE */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Availability Schedule
            </h3>

            <div className="p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-sm">
              {tech.availabilities && tech.availabilities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tech.availabilities.map((slot: any) => (
                    <div 
                      key={slot.id} 
                      className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-muted/30 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="size-3 text-purple-500" />
                        <div>
                          <p className="font-semibold text-foreground text-[11px] capitalize">{slot.dayOfWeek?.toLowerCase()}</p>
                          <p className="text-[10px] text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                        </div>
                      </div>
                      {slot.isAvailable ? (
                        <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      ) : (
                        <span className="size-2 rounded-full bg-rose-400" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic text-center py-1">No availability configured.</p>
              )}
            </div>
          </div>

          {/* SECTION 4: REVIEWS & RATING CARD */}
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-card to-card flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <Star className="size-4 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Rating & Feedback</p>
                <p className="text-[10px] text-muted-foreground">Based on completed jobs</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-black text-base text-foreground">
                {tech.averageRating ? tech.averageRating.toFixed(1) : "0.0"}
              </span>
              <span className="text-xs text-muted-foreground"> / 5.0</span>
              <p className="text-[10px] text-muted-foreground">{tech._count?.reviews || 0} Reviews</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border/60 bg-muted/30 text-center text-[11px] text-muted-foreground">
          Joined System: {tech.createdAt ? new Date(tech.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
        </div>

      </DialogContent>
    </Dialog>
  );
}