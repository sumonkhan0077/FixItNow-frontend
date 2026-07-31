"use client";

import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import { Clock, MapPin, PhoneCall, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <div className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors py-24">
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <GsapWrapper animation="fadeUp" delay={0.1} className="text-center flex flex-col items-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-normal text-slate-900 dark:text-white tracking-tight leading-tight">
            Powering homes and businesses <br />
            <span className="text-slate-400 font-light">with safe, efficient, and professional electrical care.</span>
          </h2>
        </GsapWrapper>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Working Hours (Dark Theme) */}
          <GsapWrapper animation="fadeUp" delay={0.2}>
            <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full border border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium">Working Hours</h3>
                  <Clock className="w-6 h-6 text-slate-400" />
                </div>

                <div className="space-y-4 text-sm divide-y divide-slate-800">
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Monday - Sunday</span>
                    <span className="font-medium">24 Hours Open</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Support Status</span>
                    <span className="font-semibold text-primary">Always Active</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Emergency</span>
                    <span className="font-semibold text-primary">24/7 Available</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center justify-between w-full bg-primary text-white py-3 px-6 rounded-full font-medium shadow-md hover:opacity-90 transition-all group"
                >
                  <span>24/7 Emergency Call</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </GsapWrapper>

          {/* Card 2: Our Location (Light/Soft Theme) */}
          <GsapWrapper animation="fadeUp" delay={0.3}>
            <div className="bg-[#fff7f5] dark:bg-slate-900 text-slate-900 dark:text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between h-full border border-orange-100 dark:border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium">Our Location</h3>
                  <MapPin className="w-6 h-6 text-primary" />
                </div>

                <div className="border-t border-orange-200/60 dark:border-slate-800 pt-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    110 Irving St NW First Floor, <br />
                    Washington, DC 20010, United States
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center justify-between w-full bg-slate-950 dark:bg-slate-800 text-white py-3 px-6 rounded-full font-medium shadow-md hover:bg-primary transition-all group"
                >
                  <span>All Service Areas</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </GsapWrapper>

          {/* Card 3: Book Service (Primary/Orange Theme) */}
          <GsapWrapper animation="fadeUp" delay={0.4}>
            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium mb-6">Book Service</h3>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm text-white/90 leading-relaxed">
                    Please feel free to contact our certified electricians for installations, repairs, inspections, or emergency electrical issues. We respond quickly and ensure safe, professional work every time.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs text-white/80 block">Emergency Call</span>
                  <span className="text-lg font-bold tracking-wide">(888) 4567890</span>
                </div>
              </div>
            </div>
          </GsapWrapper>

        </div>

      </section>
    </div>
  );
}