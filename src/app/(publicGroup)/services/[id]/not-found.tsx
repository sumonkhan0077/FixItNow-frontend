"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, SearchX } from "lucide-react";

export default function ServiceNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
      <div className="relative max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl text-center flex flex-col items-center space-y-6">
        
        {/* Glow Effect Background */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon Box */}
        <div className="relative w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shadow-inner">
          <SearchX className="w-10 h-10 animate-pulse" />
        </div>

        {/* Texts */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Service Not Found
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Sorry, the service you are looking for might have been removed, temporarily unavailable, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          {/* Back Button (Previous Page) */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          {/* Browse Services Button */}
          <Link
            href="/services"
            className="w-full sm:w-1/2 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white text-sm font-medium shadow-lg shadow-primary/25 hover:opacity-95 transition-all duration-200"
          >
            All Services
          </Link>
        </div>

      </div>
    </div>
  );
}