"use client";

import Image from "next/image";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

const categories: CategoryCard[] = [
  {
    id: 1,
    title: "Plumbing",
    description: "From pipe installations to complete bathroom fittings, we provide reliable residential plumbing solutions.",
    image: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Flooring",
    description: "Expert floor installation, tile fixing, and wooden flooring repairs to enhance your indoor spaces.",
    image: "https://images.unsplash.com/photo-1737040621533-6cc229f1e506?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Carpentry",
    description: "Custom woodwork, furniture repair, door installations, and fine carpentry tailored for your home.",
    image: "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Painting",
    description: "Give your property a fresh, modern aesthetic with top-tier interior and exterior professional painting.",
    image: "https://images.unsplash.com/photo-1585676737728-432f58d5fdba?q=80&w=735&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Electrical",
    description: "Professional wiring, circuit repairs, and smart home electrical solutions carried out by certified experts.",
    image: "https://images.unsplash.com/photo-1660330589827-da8ab7dd3c02?q=80&w=1632&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Home Renovation",
    description: "Complete home remodeling and upgrade services handled with precision and guaranteed workmanship.",
    image: "https://images.unsplash.com/photo-1685812446704-53a66e86c6fc?q=80&w=764&auto=format&fit=crop",
  },
];

export default function CategorySection() {
  return (
    <div className="relative bg-slate-50 transition-colors py-20 mt-8 overflow-hidden">
      
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto z-10">
        
        {/* --- Section Header --- */}
        <GsapWrapper
          animation="fadeUp"
          delay={0.1}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
              OUR CATEGORY SERVICES
            </span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight">
            Reliable Handyman Solutions, <br />
            Designed in Your <span className="text-primary italic font-light">Exact Sketch Layout</span>
          </h2>
        </GsapWrapper>

        {/* --- Bento Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. বাম কলাম: ওপরের অংশ ছোট (4) এবং নিচের অংশ বড় (8) */}
          <div className="flex flex-col gap-6">
            {/* ওপরের ছোট বক্স (4) */}
            <GsapWrapper animation="fadeUp" delay={0.2} className="h-[200px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[0].image} alt={categories[0].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{categories[0].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[0].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>

            {/* নিচের বড় বক্স (8) */}
            <GsapWrapper animation="fadeUp" delay={0.3} className="h-[320px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[1].image} alt={categories[1].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors">{categories[1].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[1].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>
          </div>

          {/* 2. মাঝের কলাম: ওপরের অংশ বড় (8) এবং নিচের অংশ ছোট (4) */}
          <div className="flex flex-col gap-6">
            {/* ওপরের বড় বক্স (8) */}
            <GsapWrapper animation="fadeUp" delay={0.4} className="h-[320px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[2].image} alt={categories[2].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Featured</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors">{categories[2].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[2].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>

            {/* নিচের ছোট বক্স (4) */}
            <GsapWrapper animation="fadeUp" delay={0.5} className="h-[200px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[3].image} alt={categories[3].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{categories[3].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[3].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>
          </div>

          {/* 3. ডান কলাম: দুটি সমান ভাগে বিভক্ত (6 এবং 6) */}
          <div className="flex flex-col gap-6">
           
            <GsapWrapper animation="fadeUp" delay={0.6} className="h-[258px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[4].image} alt={categories[4].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{categories[4].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[4].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>

            <GsapWrapper animation="fadeUp" delay={0.7} className="h-[258px]">
              <div className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image src={categories[5].image} alt={categories[5].title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="relative p-6 z-20 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{categories[5].title}</h3>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-xs leading-relaxed pt-2 mb-3">{categories[5].description}</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-white">
                        <span>Explore</span> <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>
          </div>

        </div>
      </section>
    </div>
  );
}