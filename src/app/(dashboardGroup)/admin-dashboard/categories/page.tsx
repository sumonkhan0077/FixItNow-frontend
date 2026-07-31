import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { Tag } from "lucide-react";

import { getAllCategories } from "@/service/admin/category";
import {
  CreateCategoryDialog,
  DeleteCategoryButton,
} from "../_components/category-actions";
import Image from "next/image";

export interface ICategory {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  icon?: string | null;
}

export default async function AdminCategoriesPage() {
  const res = await getAllCategories();

  const categories: ICategory[] = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
      ? res
      : [];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Area */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-yellow-500/10">
              <Tag className="size-5 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Categories</h1>
              <p className="text-sm text-muted-foreground">
                Manage service categories
              </p>
            </div>
          </div>

          {/* Create Category Modal Button */}
          <CreateCategoryDialog />
        </div>
      </GsapWrapper>

      {/* Categories Content Table */}
      <GsapWrapper animation="fadeUp" delay={0.1}>
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-8 text-center">
              <Tag className="size-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-semibold text-foreground">
                No Categories Found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Click the "Add Category" button above to create a new category.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Icon
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                      Description
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories.map((item) => {
                    const catId = item.id || item._id || "";
                    return (
                      <tr
                        key={catId}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          {item.icon ? (
                            <div className="relative size-8">
                              <Image
                                src={item.icon}
                                alt={item.name}
                                fill
                                unoptimized // 
                                className="object-contain rounded"
                              />
                            </div>
                          ) : (
                            <div className="size-8 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-xs">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DeleteCategoryButton categoryId={catId} />
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
