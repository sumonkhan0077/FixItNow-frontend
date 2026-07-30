"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import { Category, Service, ServicePayload } from "@/lib/types";
import {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getCategories,
} from "@/service/technician/serviceActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus, Pencil, Trash2, Wrench,
  DollarSign, Tag, Calendar, AlertTriangle,
} from "lucide-react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  image: string;
};

const emptyForm: FormState = { title: "", description: "", price: "", categoryId: "", image: "" };

// ── Field component ───────────────────────────────────────────────────────────
function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onEdit,
  onDelete,
}: {
  service: Service;
  onEdit: (s: Service) => void;
  onDelete: (s: Service) => void;
}) {
  return (
    <div className="service-card group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      {/* Service image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Wrench className="size-8 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
       
        <div className="flex gap-1.5">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onEdit(service)}
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onDelete(service)}
            className="size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Title & Category */}
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-1">{service.title}</h3>
        <Badge variant="secondary" className="text-xs">
          <Tag className="size-3 mr-1" />
          {service.category?.name ?? "Uncategorized"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {service.description}
      </p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <span className="flex items-center gap-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
         
          ৳ {service.price}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          {new Date(service.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

// ── Skeletons ─────────────────────────────────────────────────────────────────
function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-52 rounded-2xl" />
      ))}
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────
interface ServicesClientProps {
  initialServices: Service[];
}

export function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [catsLoading, setCatsLoading] = useState(false);
  const [catsError, setCatsError] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Service | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  // GSAP ref
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate cards when list changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || services.length === 0) return;
    gsap.fromTo(
      grid.querySelectorAll(".service-card"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power3.out" }
    );
  }, [services]);

  // ── Refetch services ──
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyServices();
      if (res?.success) setServices(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch categories (called once when modal first opens) ──
  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return; // already loaded
    setCatsLoading(true);
    setCatsError(false);
    try {
      const res = await getCategories();
      if (res?.success && res.data.length > 0) {
        setCategories(res.data);
      } else {
        setCatsError(true);
      }
    } catch {
      setCatsError(true);
    } finally {
      setCatsLoading(false);
    }
  }, [categories.length]);

  // ── Validation ──
  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.title.trim())        e.title       = "Title is required.";
    if (!form.description.trim())  e.description = "Description is required.";
    if (!form.price.trim())        e.price       = "Price is required.";
    if (!form.categoryId)          e.categoryId  = "Category is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Open create modal ──
  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
    fetchCategories();
  };

  // ── Open edit modal ──
  const openEdit = (service: Service) => {
    setEditTarget(service);
    setForm({
      title:       service.title,
      description: service.description,
      price:       service.price,
      categoryId:  service.categoryId,
      image:       service.image || "",
    });
    setErrors({});
    setModalOpen(true);
    fetchCategories();
  };

  // ── Submit create / update ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: ServicePayload = {
      title:       form.title.trim(),
      description: form.description.trim(),
      price:       form.price.trim(),
      categoryId:  form.categoryId,
      image:       form.image.trim() || undefined,
    };

    setSubmitting(true);
    try {
      const result = editTarget
        ? await updateService(editTarget.id, payload)
        : await createService(payload);

      if (result.success) {
        toast.success(editTarget ? "Service updated!" : "Service created!");
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

  // ── Open delete confirmation ──
  const openDelete = (service: Service) => {
    setDeleteTarget(service);
    setDeleteDialogOpen(true);
  };

  // ── Confirm delete ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const result = await deleteService(deleteTarget.id);
      if (result.success) {
        toast.success("Service deleted.");
        setDeleteDialogOpen(false);
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

  const isEditMode = editTarget !== null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
            <Wrench className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Services</h1>
            <p className="text-sm text-muted-foreground">
              {services.length} service{services.length !== 1 ? "s" : ""} listed
            </p>
          </div>
        </div>
        <Button onClick={openCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          Create Service
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <ServicesSkeleton />
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <Wrench className="size-7 text-muted-foreground/50" />
          </div>
          <p className="font-semibold text-foreground">No services yet</p>
          <p className="text-sm text-muted-foreground">Click &quot;Create Service&quot; to add your first one.</p>
          <Button onClick={openCreate} variant="outline" className="mt-1 gap-2">
            <Plus className="size-4" /> Create Service
          </Button>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((svc) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg" showCloseButton>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Service" : "Create New Service"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 py-2">
            <Field label="Title" required error={errors.title}>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Pipe Repair"
                className="bg-background/50"
              />
            </Field>

            <Field label="Description" required error={errors.description}>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what this service includes..."
                className="min-h-[90px] resize-none bg-background/50"
              />
            </Field>

            <Field label="Image URL" error={errors.image}>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-background/50"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Paste a direct image link for the service thumbnail</p>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (৳)" required error={errors.price}>
                <Input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. 1299"
                  className="bg-background/50"
                />
              </Field>

              <Field label="Category" required error={errors.categoryId}>
                {catsLoading ? (
                  <div className="flex h-9 items-center gap-2 rounded-lg border border-input bg-background/50 px-3 text-sm text-muted-foreground">
                    <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading...
                  </div>
                ) : catsError ? (
                  <div className="flex h-9 items-center justify-between gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-3 text-xs text-destructive">
                    Failed to load categories.
                    <button
                      type="button"
                      onClick={() => { setCatsError(false); setCategories([]); fetchCategories(); }}
                      className="underline hover:no-underline"
                    >
                      Retry
                    </button>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="flex h-9 items-center rounded-lg border border-border bg-background/50 px-3 text-sm text-muted-foreground">
                    No categories available.
                  </div>
                ) : (
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
              </Field>
            </div>

            <DialogFooter className="pt-2">
              <Button type="submit" disabled={submitting} className="gap-2 w-full sm:w-auto">
                {submitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditMode ? "Update Service" : "Create Service"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <AlertTriangle className="size-5 text-destructive" />
              </div>
              <DialogTitle>Delete Service</DialogTitle>
            </div>
          </DialogHeader>

          <p className="text-sm text-muted-foreground py-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">&quot;{deleteTarget?.title}&quot;</span>?
            This action cannot be undone.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
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
                <>
                  <Trash2 className="size-4" /> Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
