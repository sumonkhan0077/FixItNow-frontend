"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-blue px-6 text-center text-black">
      <AlertTriangle className="h-12 w-12 text-primary" />
      <h1 className="mt-6 font-display text-4xl uppercase">
        Something Went Wrong
      </h1>
      <p className="mt-4 max-w-md text-black">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button
      
          variant="outline"
          className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
}