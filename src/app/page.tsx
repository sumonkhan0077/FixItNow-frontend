"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUp, ArrowDown, ArrowRight, Wrench, Zap, Paintbrush } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";

// ৩টি ভিন্ন সার্ভিসের স্লাইডার ডেটা
const slides = [
  {
    id: 1,
    tag: "FIXINO TRUSTED LOCAL PLUMBING",
    title: "Smart Water,\nHappy Home",
    description:
      "From pipe installations to bathroom fittings, we provide complete residential plumbing services with guaranteed workmanship and long-lasting results.",
    bgImage:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1600&auto=format&fit=crop",
    cta: "Schedule Inspection",
    badgeIcon: Wrench,
  },
  {
    id: 2,
    tag: "EXPERT ELECTRICAL SERVICES",
    title: "Powering Your Life,\nSafely & Clean",
    description:
      "Professional wiring, circuit repairs, and smart home electrical solutions carried out by certified electricians with precision safety.",
    bgImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop",
    cta: "Book Electrical Repair",
    badgeIcon: Zap,
  },
  {
    id: 3,
    tag: "PREMIUM HOME PAINTING",
    title: "Transform Walls,\nBrighten Spaces",
    description:
      "Give your home a fresh modern vibrant aesthetic. High quality interior and exterior painting services tailored for your unique style.",
    bgImage:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1600&auto=format&fit=crop",
    cta: "Get Painting Estimate",
    badgeIcon: Paintbrush,
  },
];

export default function HomeServicesHeroSlider() {
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // স্লাইড নেভিগেশন হ্যান্ডলার
  const changeSlide = (nextIndex: number) => {
    if (isAnimating.current || nextIndex === current) return;
    isAnimating.current = true;

    // ১. আগের কনটেন্ট হালকা নিচে নেমে উধাও হবে
    gsap.to(".slide-content", {
      y: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrent(nextIndex);
      },
    });

    // ২. আগের ব্যাকগ্রাউন্ড জুম/ফেড আউট হবে
    gsap.to(".bg-image", {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
    });
  };

  // নতুন স্লাইড লোড হলে GSAP অ্যানিমেশন ট্রিগার হবে
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ব্যাকগ্রাউন্ড ইমেজ স্মুথ জুম-ইন ও ফেড-ইন
      gsap.fromTo(
        ".bg-image",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // কনটেন্ট একটার পর একটা স্মুথ রিভিল হবে (Staggered Animation)
      gsap.fromTo(
        ".slide-content",
        { y: 35, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [current]);

  const activeSlide = slides[current];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* ================= HERO SLIDER SECTION ================= */}
      <section
        ref={heroRef}
        className="relative w-full h-[85vh] min-h-[700px] overflow-hidden flex items-center justify-center"
      >
        {/* Background Image Container (Full Width) */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeSlide.bgImage}
            alt={activeSlide.tag}
            className="bg-image w-full h-full object-cover object-center"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        </div>

        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
          
          {/* Left Content Box */}
          <div className="max-w-2xl space-y-6 text-white pt-12">
            {/* Badge Tag */}
            <div className="slide-content inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20">
              <span className="p-1 rounded bg-primary text-primary-foreground">
                <BadgeIcon className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-gray-200 uppercase">
                {activeSlide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="slide-content text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] whitespace-pre-line">
              {activeSlide.title}
            </h1>

            {/* Description */}
            <p className="slide-content text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
              {activeSlide.description}
            </p>

            {/* Action Button */}
            <div className="slide-content pt-2">
              <button className="group flex items-center gap-3 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-primary/25 cursor-pointer">
                <span>{activeSlide.cta}</span>
                <span className="p-1 rounded-md bg-white/20 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Vertical Navigation Controls (Max width কন্টেইনারের সীমানার ডানপাশে থাকবে) */}
          <div className="hidden sm:flex flex-col gap-2">
            {/* Prev Button */}
            <button
              onClick={() =>
                changeSlide(current === 0 ? slides.length - 1 : current - 1)
              }
              className="p-3.5 rounded-xl bg-white/90 text-slate-900 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => changeSlide((current + 1) % slides.length)}
              className="p-3.5 rounded-xl bg-white/90 text-slate-900 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Indicators Container inside Max-Width */}
          <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 z-20 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  current === index ? "w-8 bg-primary" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-background font-sans">
         dfdsf
      </div>
    </main>
  );
}