"use client";

import { useEffect, useRef } from "react";
import {
  Search,
  CalendarCheck,
  UserCheck,
  CreditCard,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const steps = [
  {
    id: 1,
    title: "Find a Service",
    description:
      "Browse trusted local professionals and choose the right service based on your needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Book a Service",
    description:
      "Choose your preferred date, provide your location, and send a booking request.",
    icon: CalendarCheck,
  },
  {
    id: 3,
    title: "Technician Approval",
    description:
      "Your selected technician reviews the request and accepts the booking.",
    icon: UserCheck,
  },
  {
    id: 4,
    title: "Secure Payment",
    description:
      "Once your booking is accepted, complete the payment securely online.",
    icon: CreditCard,
  },
  {
    id: 5,
    title: "Get the Service",
    description:
      "A verified professional arrives at your location and completes the requested service.",
    icon: Wrench,
  },
  {
    id: 6,
    title: "Review & Complete",
    description:
      "Review the service, rate your experience, and complete your booking journey.",
    icon: CheckCircle2,
  },
];

export default function ServiceProcess() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const pointer = pointerRef.current;
    const container = containerRef.current;

    if (!path || !pointer || !container) return;

    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,

        onUpdate: (self) => {
          const progress = self.progress;
          const point = path.getPointAtLength(progress * pathLength);

          const offset = 1;
          const prevPoint = path.getPointAtLength(
            Math.max(0, progress * pathLength - offset)
          );
          const nextPoint = path.getPointAtLength(
            Math.min(pathLength, progress * pathLength + offset)
          );

          const radians = Math.atan2(
            nextPoint.y - prevPoint.y,
            nextPoint.x - prevPoint.x
          );
          const degrees = radians * (180 / Math.PI);

          gsap.set(pointer, {
            x: point.x,
            y: point.y,
            xPercent: -50,
            yPercent: -50,
            rotation: degrees,
          });
        },
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 transition-colors pt-36 pb-36 md:pt-44 md:pb-44">
      {/* ================= TOP CURVED SVG WAVE BACKGROUND ================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-16 md:h-28 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* ================= BOTTOM CURVED SVG WAVE BACKGROUND ================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
        <svg
          className="relative block w-full h-16 md:h-28 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div
        ref={containerRef}
        className="relative mx-auto max-w-6xl px-4 md:px-8 z-10"
      >
        {/* ================= HEADER ================= */}
        <GsapWrapper
          animation="fadeUp"
          delay={0.1}
          className="relative z-10 mb-20 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              How It Works
            </span>

            <span className="h-[2px] w-8 bg-primary" />
          </div>

          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white/90 ">
            Simple Steps to Get
            <br />

            <span className="font-light italic text-primary">
              Quality Service
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            From finding a trusted professional to completing your service,
            FixItNow makes the entire booking process simple, transparent,
            and hassle-free.
          </p>
        </GsapWrapper>

        {/* ================= PROCESS AREA ================= */}
        <div className="relative mx-auto max-w-5xl">
          {/* =================================================
              DESKTOP SVG PATH
          ================================================= */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full w-full -translate-x-1/2 md:block"
            viewBox="0 0 1000 1250"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Background path */}
            <path
              d="
                M500 70
                C300 150 300 250 500 320
                C700 390 700 490 500 560
                C300 630 300 730 500 800
                C700 870 700 970 500 1040
                C400 1080 400 1140 500 1190
              "
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 10"
              className="text-slate-800"
            />

            {/* Animated path */}
            <path
              ref={pathRef}
              d="
                M500 70
                C300 150 300 250 500 320
                C700 390 700 490 500 560
                C300 630 300 730 500 800
                C700 870 700 970 500 1040
                C400 1080 400 1140 500 1190
              "
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>

          {/* =================================================
              MOVING POINTER
          ================================================= */}
          <div
            ref={pointerRef}
            className="pointer-events-none absolute left-1/2 top-[70px] z-30 hidden"
          />

          {/* =================================================
              STEPS
          ================================================= */}
          <div className="relative z-10 flex flex-col gap-16 md:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <GsapWrapper
                  key={step.id}
                  animation="fadeUp"
                  delay={0.15 + index * 0.08}
                  className={`
                    relative flex min-h-[180px] items-center
                    ${
                      isLeft
                        ? "justify-start md:pr-[50%]"
                        : "justify-end md:pl-[50%]"
                    }
                  `}
                >
                  {/* Mobile Connector */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-1/2 top-[155px] h-16 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent md:hidden" />
                  )}

                  {/* ================= CARD ================= */}
                  <div
                    className={`
                      group relative flex w-full max-w-md items-center gap-5
                      rounded-3xl border border-slate-800/80
                      bg-slate-900/10 p-5
                      shadow-2xl backdrop-blur-xl
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-primary/50
                      hover:shadow-primary/10
                      ${
                        isLeft
                          ? "md:mr-10 md:flex-row"
                          : "md:ml-10 md:flex-row-reverse"
                      }
                    `}
                  >
                    {/* Connector Dot */}
                    <div
                      className={`
                        absolute top-1/2 hidden h-3 w-3
                        -translate-y-1/2 rounded-full
                        bg-primary shadow-lg shadow-primary/50
                        md:block
                        ${
                          isLeft
                            ? "-right-[47px]"
                            : "-left-[47px]"
                        }
                      `}
                    />

                    {/* Card Number */}
                    <div
                      className={`
                        absolute -top-3 flex h-8 w-8
                        items-center justify-center rounded-full
                        border-4 border-slate-950
                        bg-primary text-xs font-bold text-white
                        ${
                          isLeft
                            ? "right-5"
                            : "left-5"
                        }
                      `}
                    >
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div
                      className="
                        flex h-20 w-20 shrink-0
                        items-center justify-center
                        rounded-2xl
                        border border-primary/20
                        bg-primary/10
                        transition-all duration-500
                        group-hover:scale-105
                        group-hover:bg-primary
                      "
                    >
                      <Icon
                        className="
                          h-8 w-8 text-primary
                          transition-colors duration-500
                          group-hover:text-white
                        "
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`
                        flex-1
                        ${
                          isLeft
                            ? "md:text-left"
                            : "md:text-right"
                        }
                      `}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Step {step.id}
                      </span>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-400 md:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </GsapWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}