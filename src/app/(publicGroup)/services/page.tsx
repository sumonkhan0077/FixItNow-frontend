import { ServiceItem } from "@/lib/types";
import { getAllServices } from "@/service/customer/services";
import ServicesShow from "./_components/ServicesShow";
import ServicesTopSection from "./_components/ServicesTopSection";
import ServicesFilterBar from "./_components/ServicesFilterBar";
import ServicesPagination from "./_components/ServicesPagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SlidersHorizontal } from "lucide-react";

const ServicesPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const resolvedParams = await searchParams;

  const rawLimit = resolvedParams.limit;
  const limitValue =
    typeof rawLimit === "string"
      ? Number(rawLimit)
      : Array.isArray(rawLimit)
        ? Number(rawLimit[0])
        : 9;

  const queryParams = {
    ...resolvedParams,
    page: resolvedParams.page
      ? Number(
          Array.isArray(resolvedParams.page)
            ? resolvedParams.page[0]
            : resolvedParams.page,
        )
      : undefined,
    limit: isNaN(limitValue) ? 9 : limitValue,
  };

  const response = await getAllServices(queryParams);

  let servicesList: ServiceItem[] = [];
  let totalPages = 1;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = Number(queryParams.limit) || 9;

  if (response && typeof response === "object" && "data" in response) {
    const apiData = response.data;

    if (
      apiData &&
      typeof apiData === "object" &&
      "data" in apiData &&
      Array.isArray(apiData.data)
    ) {
      servicesList = apiData.data;

      // ব্যাকএন্ডের meta থেকে total এবং limit দিয়ে totalPages বের করে নেওয়া হলো
      if (
        "meta" in apiData &&
        apiData.meta &&
        typeof apiData.meta === "object"
      ) {
        const meta = apiData.meta as any;
        if (meta.total) {
          const totalItems = Number(meta.total) || 0;
          const itemsPerPage = Number(meta.limit) || limit;
          // Math.ceil দিয়ে মোট পেজ সংখ্যা হিসাব করা (যেমন: ১৪ / ৯ = ২)
          totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        }
      }
    } else if (Array.isArray(apiData)) {
      servicesList = apiData;
    }
  }

  return (
    <div>
      <ServicesTopSection />

      {/* --- Services Content Section --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        {/* Mobile & Tablet Filter Toggle Bar (Visible only on screens below lg) */}
        <div className="flex lg:hidden items-center justify-between mb-6 bg-card border rounded-2xl p-4 shadow-sm">
          <div>
            <h3 className="font-semibold text-sm">
              Looking for something specific?
            </h3>
            <p className="text-xs text-muted-foreground">
              Filter & sort available services
            </p>
          </div>

          <Sheet>
            <SheetTrigger>
              <div className="inline-flex items-center justify-center gap-2 rounded-xl h-10 px-4 py-2 bg-primary text-primary-foreground font-medium cursor-pointer shadow-sm hover:bg-primary/90 transition-colors">
                <SlidersHorizontal className="size-4 text-primary-foreground" />
                <span>Filters</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[320px] sm:w-[380px] overflow-y-auto p-6"
            >
              <SheetHeader className="mb-4 text-left">
                <SheetTitle className="text-lg font-bold flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-primary" />
                  Filter Services
                </SheetTitle>
              </SheetHeader>
              <div className="mt-2">
                <ServicesFilterBar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Side: Filter Bar with Custom Scrollbar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 custom-scrollbar">
            <ServicesFilterBar />
          </div>

          {/* Right Side: Services Show Component & Pagination */}
          <div className="lg:col-span-3 flex flex-col w-full">
            <ServicesShow services={servicesList} />

            {/* পেজিনেশন কম্পোনেন্ট */}
            <div className="w-full mt-8 mb-4">
              <ServicesPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
