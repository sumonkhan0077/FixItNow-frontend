"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ServicesFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const [categoryId, setCategoryId] = useState<string | null>(
    searchParams.get("categoryId") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [serviceArea, setServiceArea] = useState(
    searchParams.get("serviceArea") || ""
  );

  const [sortBy, setSortBy] = useState<string | null>(
    searchParams.get("sortBy") || "createdAt"
  );

  const [sortOrder, setSortOrder] = useState<string | null>(
    searchParams.get("sortOrder") || "desc"
  );

  const handleApply = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (categoryId) params.set("categoryId", categoryId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (serviceArea) params.set("serviceArea", serviceArea);

    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    params.set("page", "1");

    startTransition(() => {
      router.push(`/services?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setServiceArea("");
    setSortBy("createdAt");
    setSortOrder("desc");

    router.push("/services");
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-5">
      
      {/* Header Title */}
      <div className="flex items-center justify-between pb-2 border-b">
        <h3 className="font-semibold text-base flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          Filter Services
        </h3>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl w-full"
          />
        </div>
      </div>

      {/* Category */}
    

      {/* Service Area */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Service Area</label>
        <Input
          placeholder="e.g. Dhaka"
          value={serviceArea}
          onChange={(e) => setServiceArea(e.target.value)}
          className="h-11 rounded-xl w-full"
        />
      </div>

      {/* Price Range (Min & Max) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Min Price</label>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="500"
            className="h-11 rounded-xl w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Max Price</label>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="5000"
            className="h-11 rounded-xl w-full"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Sort By</label>
        <Select value={sortBy || ""} onValueChange={(val) => setSortBy(val)}>
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Latest</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Order */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Order</label>
        <Select value={sortOrder || ""} onValueChange={(val) => setSortOrder(val)}>
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons (Apply & Reset stacked or side-by-side) */}
      <div className="pt-2 flex flex-col gap-2.5">
        <Button
          onClick={handleApply}
          disabled={isPending}
          className="w-full h-11 rounded-xl font-medium"
        >
          Apply Filters
        </Button>

        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full h-11 rounded-xl font-medium"
        >
          <RotateCcw className="mr-2 size-4" />
          Reset Filters
        </Button>
      </div>

    </div>
  );
}