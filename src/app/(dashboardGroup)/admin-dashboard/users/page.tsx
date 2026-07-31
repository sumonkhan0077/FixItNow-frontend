import { getAllUsers } from "@/service/admin/users";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { AdminTableControls } from "../_components/admin-table-controls";
import { Users, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/types";


interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    role?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}
type MetaType = {
  page: number;
  limit: number;
  total: number;
};


export default async function AdminUsersPage({ searchParams }: Props) {
  const sp = await searchParams;

  const res = await getAllUsers({
    page: sp.page ? Number(sp.page) : 1,
    limit: 10,
    searchTerm: sp.searchTerm || undefined,
    role: sp.role || undefined,
    status: sp.status || undefined,
    sortBy: sp.sortBy || undefined,
    sortOrder: (sp.sortOrder as "asc" | "desc") || undefined,
  });

  const isError = "error" in res;
  const errorMessage = isError ? (res as { error: string }).error : null;
  const isSuccess = !isError && "success" in res && Boolean(res.success);

  
  const users: IUser[] = isSuccess && Array.isArray(res.data) ? res.data : [];


const meta: MetaType =
  isSuccess && "meta" in res && res.meta
    ? (res.meta as MetaType)
    : { page: 1, limit: 10, total: 0 };
 

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Users className="size-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Users</h1>
            <p className="text-sm text-muted-foreground">Manage platform users</p>
          </div>
        </div>
      </GsapWrapper>

      {/* Error Display */}
      {isError && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="size-4" />
            <p className="text-sm font-medium">Error: {errorMessage}</p>
          </div>
        </div>
      )}

      <GsapWrapper animation="fadeUp" delay={0.1}>
        <AdminTableControls
          searchPlaceholder="Search by name, email, phone..."
          showRoleFilter
          showStatusFilter
          initialSearch={sp.searchTerm || ""}
          initialRole={sp.role || ""}
          initialStatus={sp.status || ""}
          initialSortBy={sp.sortBy}
          initialSortOrder={sp.sortOrder}
          total={meta.total}
          page={meta.page}
          limit={meta.limit}
        />
      </GsapWrapper>

      {/* Table Section */}
      <GsapWrapper animation="fadeUp" delay={0.15}>
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
          {users.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Users className="size-10 text-muted-foreground/30" />
              <p className="font-semibold text-foreground">No users found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">User</th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Role</th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => {
                    const userName = user?.name || "Unknown User";
                    const userEmail = user?.email || "No Email";
                    const initials = userName.slice(0, 2).toUpperCase();

                    return (
                      <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {user.profileImage ? (
                              <div className="relative size-9 rounded-full overflow-hidden bg-muted">
                                <Image
                                  src={user.profileImage}
                                  alt={userName}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <Avatar className="size-9">
                                <AvatarImage src={user.profileImage ?? undefined} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
                              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                            {user.status || "ACTIVE"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">{user.phone || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </GsapWrapper>
    </div>
  );
}