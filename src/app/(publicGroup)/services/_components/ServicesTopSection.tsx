import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

const ServicesTopSection = () => {
  return (
    <div className="mt-10">
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden bg-slate-900 flex items-center  rounded-b-4xl">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1625148230889-8195e85aae6b?q=80&w=1470&auto=format&fit=crop"
          alt="Services Banner"
          fill
          priority
          className="object-cover object-center opacity-60 rounded-b-4xl"
        />

        {/* Dark Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Banner Title */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full space-y-3">
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            All Services
          </h1>
          <p className="text-stone-300 text-sm md:text-base max-w-xl font-light">
            Explore our wide range of professional handyman and repair solutions
            tailored for your home and office.
          </p>
        </div>

        <div className="absolute bottom-0 left-8 bg-white dark:bg-slate-900 px-6 py-3.5 rounded-t-[20px] shadow-lg flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase hover:opacity-80 transition"
          >
            <span className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
              <Home className="w-3.5 h-3.5" />
            </span>
            <span>Home</span>
          </Link>
          <span className="text-stone-300 dark:text-slate-600">/</span>
          <span className="text-xs font-semibold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
            Services
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServicesTopSection;
