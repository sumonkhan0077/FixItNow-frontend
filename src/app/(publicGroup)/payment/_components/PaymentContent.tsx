"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const isSuccess = success === "true";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-xl space-y-6">
        {/* Icon based on success status */}
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 animate-bounce">
              <CheckCircle2 className="size-10" />
            </div>
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <XCircle className="size-10" />
            </div>
          )}
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {isSuccess ? "Payment Successful!" : "Payment Failed!"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSuccess
              ? "Thank you! Your payment has been successfully processed and your booking is confirmed."
              : "Oops! Something went wrong with your payment process. Please try again."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          {isSuccess ? (
            <Button  className="w-full gap-2 h-11 text-base font-semibold ">
              <Link href="/dashboard/booking" className="flex justify-center items-center gap-2">
                View My Bookings <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button  variant="destructive" className="w-full gap-2 h-11 text-base font-semibold">
              <Link href="/dashboard/booking">
                Try Again / Go to Bookings
              </Link>
            </Button>
          )}

          <Button  variant="outline" className="w-full gap-2 h-11 text-base">
            <Link href="/" className="flex justify-center items-center gap-2" >
              <Home className="size-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

