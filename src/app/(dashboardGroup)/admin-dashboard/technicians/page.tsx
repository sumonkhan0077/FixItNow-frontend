import { getAllUsers } from "@/service/admin/technician";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { Wrench, Star, MapPin, User, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TechnicianDetailsSheet } from "../_components/TechnicianDetailsSheet";
import { SearchInput } from "../_components/SearchInput";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function AdminTechniciansPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.search || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10;

  const result = await getAllUsers({
    searchTerm: query,
    page: currentPage,
    limit: limit,
  });

  if ("error" in result) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
          <p className="font-semibold">Failed to load technicians</p>
          {/* <p className="text-sm mt-1">{result.error}</p> */}
        </div>
      </div>
    );
  }

  const technicians = result.data || [];
  const totalItems = result.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Search Section */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm shrink-0">
              <Wrench className="size-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                Technicians Directory
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage and monitor all technician profiles ({totalItems} registered)
              </p>
            </div>
          </div>

          {/* Search Box Component */}
          <div className="w-full sm:w-72">
            <SearchInput defaultValue={query} />
          </div>
        </div>
      </GsapWrapper>

      {/* Technicians List Section */}
      {technicians.length === 0 ? (
        <GsapWrapper animation="fadeUp" delay={0.1}>
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 sm:p-12 text-center backdrop-blur-sm">
            <Wrench className="size-10 sm:size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-bold text-foreground text-sm sm:text-base">No Technicians Found</p>
            <p className="text-xs text-muted-foreground mt-1">
              {query ? `No profile matching "${query}"` : "There are currently no technician profiles registered."}
            </p>
          </div>
        </GsapWrapper>
      ) : (
        <GsapWrapper animation="fadeUp" delay={0.05}>
          {/* 1. Mobile Card View (visible on small screens) */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="p-4 rounded-2xl border border-border/60 bg-gradient-to-b from-card via-card/90 to-card/60 shadow-md space-y-3.5"
              >
                {/* Top Row: Tech Info & Status */}
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative size-11 rounded-xl overflow-hidden bg-muted border border-border/80 shadow-sm shrink-0">
                      {tech.user?.profileImage ? (
                        <Image
                          src={tech.user.profileImage}
                          alt={tech.user.name || "Technician"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-purple-500/10 text-purple-500">
                          <User className="size-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-foreground text-xs sm:text-sm truncate">
                          {tech.user?.name || "Unknown Technician"}
                        </p>
                        <ShieldCheck className="size-3.5 text-purple-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-muted-foreground/80 truncate mt-0.5">
                        {tech.user?.email || "No Email"}
                      </p>
                    </div>
                  </div>

                  {/* Account Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                      tech.user?.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        tech.user?.status === "ACTIVE"
                          ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                          : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                      }`}
                    />
                    {tech.user?.status || "INACTIVE"}
                  </span>
                </div>

                {/* Middle Info Row */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-0.5">Area</span>
                    <div className="inline-flex items-center gap-1 text-foreground font-medium truncate max-w-full">
                      <MapPin className="size-3 text-purple-500 shrink-0" />
                      <span className="truncate">{tech.serviceArea || "N/A"}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-0.5">Experience</span>
                    <div className="inline-flex items-center gap-1 text-muted-foreground font-semibold">
                      <Sparkles className="size-3 text-purple-500 shrink-0" />
                      <span>{tech.experience || 0} Yrs</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-0.5">Rating</span>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                      <Star className="size-3 fill-amber-500 text-amber-500 shrink-0" />
                      <span>{tech.averageRating ? tech.averageRating.toFixed(1) : "0.0"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-2 border-t border-border/40 flex justify-end">
                  <div className="w-full sm:w-auto">
                    <TechnicianDetailsSheet tech={tech} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Desktop Table View (visible on md and larger screens) */}
          <div className="hidden md:block rounded-2xl border border-border/60 bg-gradient-to-b from-card via-card/90 to-card/60 shadow-xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/60 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/70 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="py-4 px-5 font-bold">Technician Info</th>
                    <th className="py-4 px-5 font-bold">Service Area</th>
                    <th className="py-4 px-5 font-bold">Experience</th>
                    <th className="py-4 px-5 font-bold">Rating</th>
                    <th className="py-4 px-5 font-bold">Account Status</th>
                    <th className="py-4 px-5 font-bold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/40 text-xs">
                  {technicians.map((tech) => (
                    <tr 
                      key={tech.id} 
                      className="hover:bg-purple-500/[0.03] transition-colors duration-150 group"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5 min-w-[220px]">
                          <div className="relative size-11 rounded-xl overflow-hidden bg-muted border border-border/80 shadow-sm shrink-0 group-hover:border-purple-500/40 transition-colors">
                            {tech.user?.profileImage ? (
                              <Image
                                src={tech.user.profileImage}
                                alt={tech.user.name || "Technician"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-purple-500/10 text-purple-500">
                                <User className="size-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-foreground text-sm truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {tech.user?.name || "Unknown Technician"}
                              </p>
                              <ShieldCheck className="size-3.5 text-purple-500 shrink-0" />
                            </div>
                            <p className="text-[11px] text-muted-foreground/80 truncate mt-0.5">{tech.user?.email || "No Email"}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 text-foreground font-medium text-xs border border-border/30 max-w-[160px] truncate">
                          <MapPin className="size-3.5 text-purple-500 shrink-0" />
                          <span className="truncate">{tech.serviceArea || "N/A"}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 text-muted-foreground font-semibold">
                          <Sparkles className="size-3 text-purple-500" />
                          <span>{tech.experience || 0} Years Exp.</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-xs">
                          <Star className="size-3.5 fill-amber-500 text-amber-500" />
                          <span>{tech.averageRating ? tech.averageRating.toFixed(1) : "0.0"}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                            tech.user?.status === "ACTIVE"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          }`}
                        >
                          <span 
                            className={`size-2 rounded-full ${
                              tech.user?.status === "ACTIVE" 
                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                                : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                            }`} 
                          />
                          {tech.user?.status || "INACTIVE"}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div className="inline-block w-32">
                          <TechnicianDetailsSheet tech={tech} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls (Shared for both Card & Table views) */}
          {totalPages > 1 && (
            <div className="mt-4 p-4 rounded-2xl border border-border/60 bg-card/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs backdrop-blur-md">
              <span className="text-muted-foreground font-medium order-2 sm:order-1">
                Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-2 order-1 sm:order-2">
                <Link
                  href={`?search=${query}&page=${currentPage - 1}`}
                  className={`p-2 rounded-lg border border-border/60 transition-all ${
                    currentPage <= 1
                      ? "pointer-events-none opacity-40 bg-muted"
                      : "hover:bg-purple-500/10 hover:text-purple-600 hover:border-purple-500/30"
                  }`}
                >
                  <ChevronLeft className="size-4" />
                </Link>

                <Link
                  href={`?search=${query}&page=${currentPage + 1}`}
                  className={`p-2 rounded-lg border border-border/60 transition-all ${
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-40 bg-muted"
                      : "hover:bg-purple-500/10 hover:text-purple-600 hover:border-purple-500/30"
                  }`}
                >
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          )}
        </GsapWrapper>
      )}
    </div>
  );
}