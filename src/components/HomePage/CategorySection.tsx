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
  rotation: string;
}

const categories: CategoryCard[] = [
  {
    id: 1,
    title: "Plumbing",
    description:
      "From pipe installations to complete bathroom fittings, we provide reliable residential plumbing solutions.",
    image:
      "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "-rotate-8",
  },
  {
    id: 2,
    title: "Flooring",
    description:
      "Expert floor installation, tile fixing, and wooden flooring repairs to enhance your indoor spaces.",
    image:
      "https://images.unsplash.com/photo-1737040621533-6cc229f1e506?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "rotate-2",
  },

  {
    id: 3,
    title: "Carpentry",
    description:
      "Custom woodwork, furniture repair, door installations, and fine carpentry tailored for your home.",
    image:
      "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "-rotate-2",
  },
  {
    id: 4,
    title: "Painting",
    description:
      "Give your property a fresh, modern aesthetic with top-tier interior and exterior professional painting.",
    image:
      "https://images.unsplash.com/photo-1585676737728-432f58d5fdba?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "rotate-6",
  },
  {
    id: 5,
    title: "Electrical",
    description:
      "Professional wiring, circuit repairs, and smart home electrical solutions carried out by certified experts.",
    image:
      "https://images.unsplash.com/photo-1660330589827-da8ab7dd3c02?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "rotate-8",
  },
  {
    id: 6,
    title: "Home Renovation",
    description:
      "Complete home remodeling and upgrade services handled with precision and guaranteed workmanship.",
    image:
      "https://images.unsplash.com/photo-1685812446704-53a66e86c6fc?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotation: "-rotate-3",
  },
];

export default function CategorySection() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors mt-8">
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto transition-colors">
        {/* --- Section Header (Centered) --- */}
        <GsapWrapper
          animation="fadeUp"
          delay={0.1}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs font-semibold tracking-widest text-white/80 dark:text-slate-400 uppercase">
              Our Category Services
            </span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-normal text-white/90 tracking-tight leading-tight">
            Reliable Handyman Solutions, <br />
            Hover to{" "}
            <span className="text-primary italic font-light">
              Straighten Up
            </span>
          </h2>
        </GsapWrapper>

        {/* --- Categories Grid / Flex Container --- */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
          {categories.map((item, index) => (
            <GsapWrapper
              key={item.id}
              animation="fadeUp"
              delay={0.2 + index * 0.1}
            >
              <div
                className={`group relative h-[400px] w-[280px] overflow-hidden rounded-3xl bg-slate-900 shadow-xl transition-all duration-500 ease-in-out transform ${item.rotation} hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50 cursor-pointer flex flex-col justify-end`}
              >
                {/* Full Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[3px] group-hover:brightness-75"
                />

                {/* Dark Overlay Gradient */}
                {/* <div className=" absolute inset-0
    bg-gradient-to-t
    from-black/75
    via-black/15
    to-transparent
    opacity-40
    group-hover:opacity-85
    transition-all duration-500" /> */}

                {/* Content Container */}
                <div className="relative p-6 z-10 flex flex-col justify-end h-full">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Description & Link (Appears on Hover) */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-300 leading-relaxed font-normal pt-1 pb-4">
                        {item.description}
                      </p>

                      <div className="pt-1">
                       
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GsapWrapper>
          ))}
        </div>
      </section>
    </div>
  );
}
