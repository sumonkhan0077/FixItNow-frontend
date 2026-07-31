"use client";

import { useState, useTransition } from "react";

import { Plus, Trash2, Loader2, Tag, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createCategory, deleteCategory } from "@/service/admin/category";

// ------------------------------------
// 1. Create Category Modal
// ------------------------------------
export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createCategory({
        name: formData.name,
        description: formData.description,
        icon: formData.icon || null,
      });

      if (res?.error) {
        alert(res.error);
      } else {
        setFormData({ name: "", description: "", icon: "" });
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs md:text-sm rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer">
        <Plus className="size-4" />
        Add Category
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <Tag className="size-5 text-yellow-500" />
            Create New Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Category Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Color house"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Color your house very nice"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Icon URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://example.com/icon.png"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isPending && <Loader2 className="size-3.5 animate-spin" />}
              Save Category
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------------
// 2. Delete Category with shadcn AlertDialog
// ------------------------------------
export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCategory(categoryId);
      if (res?.error) alert(res.error);
    });
  };

  return (
    <AlertDialog>
      {/* asChild তুলে দেওয়া হয়েছে এবং সরাসরি AlertDialogTrigger ব্যবহার করা হয়েছে */}
      <AlertDialogTrigger
        disabled={isPending}
        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center justify-center"
        title="Delete Category"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="size-5" />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete the category.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            {isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}