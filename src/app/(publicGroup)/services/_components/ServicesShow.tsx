import { ServiceSectionProps } from "@/components/HomePage/TopServices";

import { ArrowRight, Star } from "lucide-react";

import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import Link from "next/link";
import Image from "next/image";

const ServicesShow = ({ services }: ServiceSectionProps) => {
  return (
    <div>
      <section className="px-4 md:px-8 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 transition-colors">
        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {services.map((item, index) => {
            return (
              <GsapWrapper
                key={item.id}
                animation="fadeUp"
                delay={0.2 + index * 0.1}
              >
                <div className="group bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  {/* Top Image Container */}
                  <div className="relative w-full h-56">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Optional Badge: Category Name */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {item.category.name}
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute bg-black/70 backdrop-blur-xl shadow-xl backdrop-saturate-150 top-4 right-4 text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex items-center justify-center gap-2">
                      <Star className="text-primary size-4" />{" "}
                      {item.technicianProfile?.averageRating || 0}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 pt-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div>
                        <h1 className="text-primary/95 text-md font-bold">৳ {item.price}</h1>
                      </div>

                      <h3 className="text-xl capitalize font-normal text-slate-900 line-clamp-2 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-md text-slate-500 dark:text-slate-400 leading-relaxed font-normal line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Technician Info & Explore Link */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.technicianProfile?.user?.profileImage && (
                          <Image
                            src={item.technicianProfile.user.profileImage}
                            alt={
                              item.technicianProfile?.user?.name || "Technician"
                            }
                            width={32}
                            height={32}
                            className="rounded-full object-cover w-8 h-8"
                          />
                        )}
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {item.technicianProfile?.user?.name}
                        </span>
                      </div>

                      <Link
                        href={`/services/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </GsapWrapper>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ServicesShow;
