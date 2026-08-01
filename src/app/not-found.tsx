import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10 animate-pulse" />

      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5">
        
        {/* Animated Icon Container with Floating Effect */}
        <div className="flex justify-center">
          <div className="relative flex size-24 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-inner animate-bounce duration-1000">
            <FileQuestion className="size-12 animate-pulse" />
            <div className="absolute inset-0 rounded-3xl bg-primary/5 animate-ping opacity-75" />
          </div>
        </div>

        {/* Error Code & Message */}
        <div className="space-y-3">
          <span className="inline-flex items-center px-3 py-1 text-xs font-extrabold uppercase tracking-widest bg-destructive/10 text-destructive rounded-full border border-destructive/20 shadow-sm">
            Error 404
          </span>
          
          <h1 className="text-3xl font-black tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Page Not Found
          </h1>
          
          <p className="text-sm text-muted-foreground leading-relaxed px-2">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons with asChild for proper Link integration */}
        <div className="flex flex-col gap-3 pt-2">
          <Button  className="w-full gap-2 h-11 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            <Link href="/" className="flex justify-center items-center gap-2">
              <Home className="size-4" /> Return Home
            </Link>
          </Button>

          <Button  variant="outline" className="w-full gap-2 h-11 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-border/80">
            <Link href="/" className="flex justify-center items-center gap-2">
              <ArrowLeft className="size-4" /> Go Back
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}