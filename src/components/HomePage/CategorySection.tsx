import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Layers,
  Home,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Plumbing",
    description:
      "From pipe installations to complete bathroom fittings, we provide reliable residential plumbing solutions.",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    icon: Wrench,
  },
  {
    id: 2,
    title: "Electrical",
    description:
      "Professional wiring, circuit repairs, and smart home electrical solutions carried out by certified experts.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    icon: Zap,
  },
  {
    id: 3,
    title: "Carpentry",
    description:
      "Custom woodwork, furniture repair, door installations, and fine carpentry tailored for your home.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18fcd07?q=80&w=800&auto=format&fit=crop",
    icon: Hammer,
  },
  {
    id: 4,
    title: "Painting",
    description:
      "Give your property a fresh, modern aesthetic with top-tier interior and exterior professional painting.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    icon: Paintbrush,
  },
  {
    id: 5,
    title: "Flooring",
    description:
      "Expert floor installation, tile fixing, and wooden flooring repairs to enhance your indoor spaces.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    icon: Layers,
  },
  {
    id: 6,
    title: "Home Renovation",
    description:
      "Complete home remodeling and upgrade services handled with precision and guaranteed workmanship.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    icon: Home,
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* --- Section Header --- */}
      <GsapWrapper animation="fadeUp" delay={0.1} className="mb-20 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-[11px] font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase mb-4 backdrop-blur-sm">
          Our Handyman Services
        </span>
        <h2 className="text-3xl md:text-5xl font-normal text-slate-900 dark:text-white tracking-tight leading-tight">
          Reliable Handyman Solutions, <br />
          From Repairs{" "}
          <span className="text-primary italic font-light">to Upgrades</span>
        </h2>
      </GsapWrapper>

      {/* --- Categories Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {categories.map((item, index) => {
          const IconComponent = item.icon;
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

                  {/* Floating Icon Box (Positioned absolutely on the bottom edge of the image) */}
                  <div className="absolute -bottom-6 left-6 w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg dark:border-slate-900 z-20">
                    <IconComponent className="w-5 h-5 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />{" "}
                  </div>
                </div>

                {/* Content Box (Added pt-8 to give space for the overlapping icon) */}
                <div className="p-6 pt-9 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-md text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Explore Service Link */}
                  <div className="pt-2">
                    <a
                      href="#service"
                      className="inline-flex items-center gap-1.5 text-md font-medium text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </GsapWrapper>
          );
        })}
      </div>
    </section>
  );
}
