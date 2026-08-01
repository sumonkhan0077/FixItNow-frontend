"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Wrench, UserCheck, Loader2, CheckCircle2 } from "lucide-react";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking } from "@/service/booikng/booking";
import { NavbarProps } from "@/lib/types";


interface Category {
  name: string;
}

interface ServiceItem {
  id: string;
  title: string;
  price: number | string;
  category: Category;
}

interface TechUser {
  name: string;
}

interface Technician {
  averageRating: number;
  serviceArea: string;
  experience: number;
  user: TechUser;
}

export interface ServiceActionCardProps {
  service: ServiceItem;
  tech: Technician;
}



type CombinedProps = ServiceActionCardProps & NavbarProps;

export default function ServiceActionCard({ service, tech , user}: CombinedProps ) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Error & Success states
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Form input states
  const [bookingDate, setBookingDate] = useState("");
  const [address, setAddress] = useState("");

  const handleBookingSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const bookingData = {
      serviceId: service.id,
      bookingDate,
      address,
    };

    try {
      const result = await createBooking(bookingData);

      if (result?.error || !result || (result.success === false)) {
        setErrorMessage(result?.message || "Technician is not available on this day. Please choose another date.");
        setLoading(false);
        return;
      }

    
      setIsOpen(false);
      setIsSuccessModalOpen(true);

    } catch (error) {
      console.error("Booking failed", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessRedirect = () => {
    setIsSuccessModalOpen(false);
    const destination = 
    user?.role === "ADMIN"
      ? "/admin-dashboard"
      : user?.role === "TECHNICIAN"
      ? "/technician-dashboard"
      : "/dashboard/bookings";

  router.push(destination);
  };

  return (
    <GsapWrapper animation="fadeUp" delay={0.2}>
      <div className="flex flex-col space-y-6">
        {/* Rating & Wishlist Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-[#F4EFE6] dark:bg-slate-900 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{tech.averageRating} / 5.0</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-stone-300 dark:border-slate-800 flex items-center justify-center text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-900 transition cursor-pointer">
            ❤️
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-serif font-normal text-slate-900 dark:text-white capitalize leading-tight">
          {service.title}
        </h1>

        {/* Price Box */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-semibold text-[#C05621] dark:text-amber-500">
              ৳ {service.price}
            </span>
            <span className="text-sm font-medium text-stone-500 dark:text-slate-400">
              starting price
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Service Area: <span className="font-medium text-stone-600 dark:text-slate-300">{tech.serviceArea}</span>
          </p>
        </div>

        {/* Place Order Button */}
        <button 
          onClick={() => {
            setErrorMessage("");
            setIsOpen(true);
          }}
          className="w-full py-4 bg-primary/95 hover:bg-slate-900 text-white font-medium rounded-2xl shadow-lg shadow-[#C05621]/20 transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer"
        >
          <span>Place Order Now</span>
          <span>🛒</span>
        </button>

        {/* 1. Booking Input Dialog / Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Your Booking</DialogTitle>
              <DialogDescription>
                Provide your service date and address to complete the order for <span className="font-semibold text-primary">{service.title}</span>.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
              {/* Error Message Show */}
              {errorMessage && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="bookingDate">Booking Date</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="e.g. Pabna Sadar, Pabna"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 2. Success Modal (OK button click -> Dashboard/booking) */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
          <DialogContent className="sm:max-w-[380px] text-center py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-center">Booking Successful!</DialogTitle>
                <DialogDescription className="text-center">
                  Your booking has been placed successfully. Click below to view your bookings.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleSuccessRedirect} className="w-full mt-2">
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Specifications Card */}
        <div className="bg-slate-800 dark:bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl space-y-5 border border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[#E29578]">
            Specifications
          </h3>

          <div className="space-y-4 text-sm divide-y divide-slate-700/60">
            <div className="flex items-center justify-between pt-3 first:pt-0">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Wrench className="w-4 h-4 text-[#E29578]" />
                <span>Category</span>
              </div>
              <span className="font-medium text-right text-slate-100">{service.category.name}</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <UserCheck className="w-4 h-4 text-[#E29578]" />
                <span>Technician</span>
              </div>
              <span className="font-medium text-right text-slate-100 capitalize">{tech.user.name} ({tech.experience} Yrs Exp)</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                <span>Reliability</span>
              </div>
              <span className="font-medium text-right text-slate-100">100% Verified Professional</span>
            </div>
          </div>
        </div>
      </div>
    </GsapWrapper>
  );
}