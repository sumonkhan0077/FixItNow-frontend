import { Star, ShieldCheck, Wrench, UserCheck } from "lucide-react";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";

interface Category {
  name: string;
}

interface ServiceItem {
  title: string;
  price: number | string;
  category: Category;
}


interface TechUser {
  name: string;
}

interface Technician {
  averageRating: number;
  serviceArea: string;
  experience: number;
  user: TechUser;
}

 export interface ServiceActionCardProps {
  service: ServiceItem;
  tech: Technician;
}

export default function ServiceActionCard({ service, tech }: ServiceActionCardProps) {
  return (
    <GsapWrapper animation="fadeUp" delay={0.2}>
      <div className="flex flex-col space-y-6">
        {/* Rating & Wishlist Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-[#F4EFE6] dark:bg-slate-900 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{tech.averageRating} / 5.0</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-stone-300 dark:border-slate-800 flex items-center justify-center text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-900 transition cursor-pointer">
            ❤️
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-serif font-normal text-slate-900 dark:text-white capitalize leading-tight">
          {service.title}
        </h1>

        {/* Price Box */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-semibold text-[#C05621] dark:text-amber-500">
              ৳ {service.price}
            </span>
            <span className="text-sm font-medium text-stone-500 dark:text-slate-400">
              starting price
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Service Area: <span className="font-medium text-stone-600 dark:text-slate-300">{tech.serviceArea}</span>
          </p>
        </div>

        {/* Order Button */}
        <button className="w-full py-4 bg-primary/95 hover:bg-slate-900 text-white font-medium rounded-2xl shadow-lg shadow-[#C05621]/20 transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer">
          <span>Place Order Now</span>
          <span>🛒</span>
        </button>

        {/* Specifications Card */}
        <div className="bg-slate-800 dark:bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl space-y-5 border border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[#E29578]">
            Specifications
          </h3>

          <div className="space-y-4 text-sm divide-y divide-slate-700/60">
            <div className="flex items-center justify-between pt-3 first:pt-0">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Wrench className="w-4 h-4 text-[#E29578]" />
                <span>Category</span>
              </div>
              <span className="font-medium text-right text-slate-100">{service.category.name}</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <UserCheck className="w-4 h-4 text-[#E29578]" />
                <span>Technician</span>
              </div>
              <span className="font-medium text-right text-slate-100 capitalize">{tech.user.name} ({tech.experience} Yrs Exp)</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                <span>Reliability</span>
              </div>
              <span className="font-medium text-right text-slate-100">100% Verified Professional</span>
            </div>
          </div>
        </div>
      </div>
    </GsapWrapper>
  );
}