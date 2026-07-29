"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Wrench,
  Zap,
  Paintbrush,
} from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import Image from "next/image";

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

export default function HeaderSection() {
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = useCallback(
    (nextIndex: number) => {
      if (isAnimating.current || nextIndex === current) return;
      isAnimating.current = true;

      gsap.to(".slide-content", {
        y: -15,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          setCurrent(nextIndex);
        },
      });

      gsap.to(".bg-image", {
        scale: 1.1,
        opacity: 0.3,
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
    [current],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1.12, opacity: 0.2 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      );

      gsap.fromTo(
        ".slide-content",
        { y: 30, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
          },
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, [current]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      changeSlide((current + 1) % slides.length);
    }, 5000); // 5000ms = 5 seconds
  }, [changeSlide, current]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  const activeSlide = slides[current];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* ================= HERO SLIDER SECTION ================= */}
      <section
        ref={heroRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[88vh] min-h-[700px] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeSlide.bgImage}
            alt={activeSlide.tag}
            fill
            priority
            sizes="100vw"
            className="bg-image object-cover object-center"
          />
          {/* Overlay Gradient  */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
          {/* Left Content Box */}
          <div className="max-w-2xl space-y-7 text-white pt-10">
            {/* Badge Tag */}
            <div className="slide-content inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <span className="p-1 rounded-full bg-primary text-primary-foreground">
                <BadgeIcon className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold tracking-widest text-slate-200 uppercase">
                {activeSlide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="slide-content text-4xl sm:text-6xl lg:text-7xl font-medium font-black tracking-tight leading-[1.08] whitespace-pre-line drop-shadow-md">
              {activeSlide.title}
            </h1>

            {/* Description */}
            <p className="slide-content text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
              {activeSlide.description}
            </p>

            {/* Action Button */}
            <div className="slide-content pt-2">
              <button className="group flex items-center gap-3 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all duration-300 cursor-pointer">
                <span>{activeSlide.cta}</span>
                <span className="p-1 rounded-lg bg-white/20 group-hover:translate-x-1.5 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Vertical Navigation Controls */}
          <div className="hidden sm:flex flex-col gap-3 z-20">
            {/* Prev Button */}
            <button
              onClick={() =>
                changeSlide(current === 0 ? slides.length - 1 : current - 1)
              }
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-slate-900 hover:scale-110 active:scale-90 transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => changeSlide((current + 1) % slides.length)}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-slate-900 hover:scale-110 active:scale-90 transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Progress Indicators */}
          <div className="absolute bottom-8 left-4 sm:left-6 lg:left-10 z-20 flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  current === index
                    ? "w-10 bg-primary shadow-lg shadow-primary/50"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Next Section Placeholder */}
      <div className="min-h-screen bg-background font-sans p-10">dfdsf</div>
    </main>
  );
}
