import { ServiceItem } from "@/lib/types";
import { getAllServices } from "@/service/customer/services";
import ServicesShow from "./_components/ServicesShow";
import ServicesTopSection from "./_components/ServicesTopSection";
import ServicesFilterBar from "./_components/ServicesFilterBar";
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
  const response = await getAllServices(resolvedParams);

  let servicesList: ServiceItem[] = [];

  if (response && typeof response === "object" && "data" in response) {
    const apiData = response.data;
    if (
      apiData &&
      typeof apiData === "object" &&
      "data" in apiData &&
      Array.isArray(apiData.data)
    ) {
      servicesList = apiData.data;
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
          {/* Right Side: Services Show Component */}
          <div className="lg:col-span-3">
            <ServicesShow services={servicesList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
