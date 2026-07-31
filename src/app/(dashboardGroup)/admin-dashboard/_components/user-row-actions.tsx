"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/service/admin/users";
import { Loader2 } from "lucide-react";

type UserRole = "ADMIN" | "TECHNICIAN" | "CUSTOMER";
type UserStatus = "ACTIVE" | "BANNED";

interface RoleSelectProps {
  userId: string;
  currentRole: string;
}

export function UserRoleSelect({ userId, currentRole }: RoleSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === currentRole) return;
    startTransition(async () => {
  
      const res = await updateUser(userId, { role: newRole });
      if ("error" in res) {
        alert(`Failed to update role: ${res.error}`);
      } else {
        router.refresh();
      }
    });
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "TECHNICIAN":
        return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "CUSTOMER":
      default:
        return "border-border/80 bg-muted/30 text-foreground";
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        disabled={isPending}
        value={currentRole}
        onChange={(e) => handleRoleChange(e.target.value as UserRole)}
        className={`h-8 rounded-lg border px-2 text-xs font-semibold outline-none focus:ring-1 focus:ring-primary cursor-pointer disabled:opacity-50 transition-colors ${getRoleStyle(
          currentRole
        )}`}
      >
        <option value="CUSTOMER" className="bg-background text-foreground">
          CUSTOMER
        </option>
        <option value="TECHNICIAN" className="bg-background text-foreground">
          TECHNICIAN
        </option>
        <option value="ADMIN" className="bg-background text-foreground">
          ADMIN
        </option>
      </select>
      {isPending && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
    </div>
  );
}

interface StatusSelectProps {
  userId: string;
  currentStatus: string;
}

export function UserStatusSelect({ userId, currentStatus }: StatusSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: UserStatus) => {
    if (newStatus === currentStatus) return;
    startTransition(async () => {
    
      const res = await updateUser(userId, { status: newStatus });
      if ("error" in res) {
        alert(`Failed to update status: ${res.error}`);
      } else {
        router.refresh();
      }
    });
  };

  const statusVal = currentStatus || "ACTIVE";

  return (
    <div className="flex items-center gap-1.5">
      <select
        disabled={isPending}
        value={statusVal}
        onChange={(e) => handleStatusChange(e.target.value as UserStatus)}
        className={`h-8 rounded-lg border px-2 text-xs font-semibold outline-none focus:ring-1 focus:ring-primary cursor-pointer disabled:opacity-50 transition-colors ${
          statusVal === "ACTIVE"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
        }`}
      >
        <option value="ACTIVE" className="bg-background text-foreground">
          ACTIVE
        </option>
        <option value="BANNED" className="bg-background text-foreground">
          BANNED
        </option>
      </select>
      {isPending && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
    </div>
  );
}