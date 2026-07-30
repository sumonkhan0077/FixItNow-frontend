"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TechnicianAvailability, AvailabilityPayload, DayOfWeek } from "@/lib/types";
import {
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "@/service/technician/availabilityActions";
import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CalendarDays, Plus, Pencil, Trash2,
  Clock, AlertTriangle, CheckCircle2, XCircle,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────
const DAYS: DayOfWeek[] = [
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
];

const DAY_LABEL: Record<DayOfWeek, string> = {
  MONDAY: "Monday", TUESDAY: "Tuesday", WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday", FRIDAY: "Friday", SATURDAY: "Saturday", SUNDAY: "Sunday",
};

const DAY_SHORT: Record<DayOfWeek, string> = {
  MONDAY: "Mon", TUESDAY: "Tue", WEDNESDAY: "Wed",
  THURSDAY: "Thu", FRIDAY: "Fri", SATURDAY: "Sat", SUNDAY: "Sun",
};

// Generate time options in 30-min increments
const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

type FormState = {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

const defaultForm: FormState = {
  dayOfWeek: "MONDAY",
  startTime: "09:00",
  endTime: "17:00",
  isAvailable: true,
};

// ── Overlap check ─────────────────────────────────────────────────────
function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function hasOverlap(
  slots: TechnicianAvailability[],
  form: FormState,
  excludeId?: string
): boolean {
  const newStart = toMinutes(form.startTime);
  const newEnd   = toMinutes(form.endTime);
  return slots
    .filter((s) => s.dayOfWeek === form.dayOfWeek && s.id !== excludeId)
    .some((s) => {
      const start = toMinutes(s.startTime);
      const end   = toMinutes(s.endTime);
      return newStart < end && newEnd > start;
    });
}

// ── Select component ──────────────────────────────────────────────────
function Select({
  label, value, onChange, children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
      >
        {children}
      </select>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────
interface AvailabilityManagerProps {
  initialSlots: TechnicianAvailability[];
}

export function AvailabilityManager({ initialSlots }: AvailabilityManagerProps) {
  const [slots, setSlots]               = useState<TechnicianAvailability[]>(initialSlots);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editTarget, setEditTarget]     = useState<TechnicianAvailability | null>(null);
  const [form, setForm]                 = useState<FormState>(defaultForm);
  const [submitting, setSubmitting]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TechnicianAvailability | null>(null);
  const [deleting, setDeleting]         = useState(false);

  // ── Refetch slots from profile ──
  const refetch = async () => {
    const res = await getMyTechnicianProfile();
    if (res?.success && res.data) setSlots(res.data.availabilities);
  };

  // ── Open create modal ──
  const openCreate = () => {
    setEditTarget(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  // ── Open edit modal ──
  const openEdit = (slot: TechnicianAvailability) => {
    setEditTarget(slot);
    setForm({
      dayOfWeek:   slot.dayOfWeek,
      startTime:   slot.startTime,
      endTime:     slot.endTime,
      // coerce to boolean in case API returns string "true"/"false"
      isAvailable: slot.isAvailable === true || (slot.isAvailable as unknown) === "true",
    });
    setModalOpen(true);
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (toMinutes(form.endTime) <= toMinutes(form.startTime)) {
      toast.error("End time must be after start time.");
      return;
    }
    if (hasOverlap(slots, form, editTarget?.id)) {
      toast.error("This slot overlaps with an existing one on the same day.");
      return;
    }

    const payload: AvailabilityPayload = {
      dayOfWeek:   form.dayOfWeek,
      startTime:   form.startTime,
      endTime:     form.endTime,
      isAvailable: form.isAvailable,
    };

    setSubmitting(true);
    try {
      const result = editTarget
        ? await updateAvailability(editTarget.id, payload)
        : await createAvailability(payload);

      if (result.success) {
        toast.success(editTarget ? "Slot updated!" : "Slot added!");
        setModalOpen(false);
        await refetch();
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const result = await deleteAvailability(deleteTarget.id);
      if (result.success) {
        toast.success("Slot deleted.");
        setDeleteTarget(null);
        await refetch();
      } else {
        toast.error(result.message || "Delete failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  // Group slots by day for display
  const slotsByDay = DAYS.reduce<Record<DayOfWeek, TechnicianAvailability[]>>(
    (acc, day) => {
      acc[day] = slots.filter((s) => s.dayOfWeek === day);
      return acc;
    },
    {} as Record<DayOfWeek, TechnicianAvailability[]>
  );

  const isEditMode = editTarget !== null;

  return (
    <>
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Availability</h2>
              <p className="text-xs text-muted-foreground">
                {slots.length} slot{slots.length !== 1 ? "s" : ""} configured
              </p>
            </div>
          </div>
          <Button onClick={openCreate} size="sm" className="gap-2">
            <Plus className="size-4" />
            Add Slot
          </Button>
        </div>

        {/* Slots list */}
        {slots.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border/60 py-10 text-center">
            <Clock className="size-8 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">No availability slots yet.</p>
            <p className="text-xs text-muted-foreground">Click &quot;Add Slot&quot; to set your schedule.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {DAYS.filter((d) => slotsByDay[d].length > 0).map((day) => (
              <div key={day}>
                {/* Day label row */}
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 px-1">
                  {DAY_LABEL[day]}
                </p>
                <div className="space-y-2">
                  {slotsByDay[day].map((slot) => {
                    // coerce isAvailable in case backend returns string
                    const isAvail = slot.isAvailable === true || (slot.isAvailable as unknown) === "true";
                    return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`size-2 shrink-0 rounded-full ${isAvail ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {DAY_SHORT[slot.dayOfWeek]}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {slot.startTime} – {slot.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            isAvail
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {isAvail ? (
                            <><CheckCircle2 className="size-3 mr-1" />Available</>
                          ) : (
                            <><XCircle className="size-3 mr-1" />Unavailable</>
                          )}
                        </Badge>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => openEdit(slot)}
                          className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => setDeleteTarget(slot)}
                          className="size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Availability Slot" : "Add Availability Slot"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 py-2">
            <Select
              label="Day of Week"
              value={form.dayOfWeek}
              onChange={(v) => setForm({ ...form, dayOfWeek: v as DayOfWeek })}
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>{DAY_LABEL[d]}</option>
              ))}
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Start Time"
                value={form.startTime}
                onChange={(v) => setForm({ ...form, startTime: v })}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>

              <Select
                label="End Time"
                value={form.endTime}
                onChange={(v) => setForm({ ...form, endTime: v })}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>

            <Select
              label="Availability Status"
              value={form.isAvailable ? "true" : "false"}
              onChange={(v) => setForm({ ...form, isAvailable: v === "true" })}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </Select>

            <DialogFooter className="pt-2">
              <Button type="submit" disabled={submitting} className="gap-2 w-full sm:w-auto">
                {submitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {isEditMode ? "Updating..." : "Adding..."}
                  </>
                ) : isEditMode ? "Update Slot" : "Add Slot"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ── */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null); }}>
        <DialogContent className="sm:max-w-sm" showCloseButton>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <AlertTriangle className="size-5 text-destructive" />
              </div>
              <DialogTitle>Delete Slot</DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-1">
            Are you sure you want to delete the{" "}
            <span className="font-semibold text-foreground">
              {deleteTarget ? DAY_LABEL[deleteTarget.dayOfWeek] : ""}{" "}
              {deleteTarget?.startTime} – {deleteTarget?.endTime}
            </span>{" "}
            slot? This cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="gap-2 w-full sm:w-auto"
            >
              {deleting ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </>
              ) : (
                <><Trash2 className="size-4" />Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
