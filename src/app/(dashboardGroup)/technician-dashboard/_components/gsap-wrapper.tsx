"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "stagger";
  delay?: number;
}

export function GsapWrapper({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
}: GsapWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (animation === "stagger") {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay,
          ease: "power3.out",
        }
      );
    } else if (animation === "fadeUp") {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out" }
      );
    } else {
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay, ease: "power2.out" }
      );
    }
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
