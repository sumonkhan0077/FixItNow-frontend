"use client";

import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import {
  Share2,
  Globe,
  MessageCircle,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const teamMembers = [
  {
    id: 1,
    name: "Tania Shaine",
    role: "Technician",
    image:
      "https://images.unsplash.com/photo-1613063074391-12ed77ac5a13?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
  {
    id: 2,
    name: "Preston Harley",
    role: "Installer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
  {
    id: 3,
    name: "Violet Jessie",
    role: "Electrician",
    image:
      "https://images.unsplash.com/photo-1714331251780-db56109a9887?q=80&w=713&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
  {
    id: 4,
    name: "Michael Smith",
    role: "Plumber",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    role: "Painter",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
  {
    id: 6,
    name: "David Warner",
    role: "Carpenter",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: [
      { icon: Globe, href: "#", label: "Website" },
      { icon: Send, href: "#", label: "Telegram" },
      { icon: MessageCircle, href: "#", label: "Chat" },
    ],
  },
];

export default function TeamSection() {
  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 transition-colors mt-20 pt-36 pb-36 md:pt-44 md:pb-44 overflow-hidden">
      
      {/* ================= TOP ASYMMETRIC / SMOOTH CURVE SVG SHAPE ================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-16 md:h-28 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,0 L0,0 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* ================= BOTTOM ASYMMETRIC / SMOOTH CURVE SVG SHAPE ================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-16 md:h-28 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,30 550,110 800,25 C950,-20 1100,70 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <section className="relative px-4 md:px-8 max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <GsapWrapper
          animation="fadeUp"
          delay={0.1}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs font-bold tracking-widest text-white/80 dark:text-slate-400 uppercase">
              OUR EXPERTS
            </span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white/90 dark:text-white tracking-tight leading-tight">
            Meet Our Professional <br />
            <span className="text-primary italic font-light">Service Team</span>
          </h2>
        </GsapWrapper>

        {/* Swiper Slider */}
        <GsapWrapper animation="fadeUp" delay={0.2}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".custom-prev-btn",
              nextEl: ".custom-next-btn",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="group flex flex-col space-y-4">
                  {/* Image Box with Hover Social Icons */}
                  <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Social Icons Container */}
                    <div className="absolute bottom-6 right-6 flex flex-col-reverse items-center gap-2 z-20">
                      {/* Share Toggle Button */}
                      <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer">
                        <Share2 className="w-5 h-5" />
                      </button>

                      {/* Social Links */}
                      <div className="flex flex-col gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                        {member.socials.map((social, idx) => {
                          const Icon = social.icon;
                          return (
                            <a
                              key={idx}
                              href={social.href}
                              aria-label={social.label}
                              className="w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
                            >
                              <Icon className="w-4 h-4" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="px-2 space-y-1">
                    <h3 className="text-2xl font-medium text-white/90">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-white/80">
                      {member.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="custom-prev-btn w-14 h-14 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md cursor-pointer">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="custom-next-btn w-14 h-14 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md cursor-pointer">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </GsapWrapper>
      </section>
    </div>
  );
}