import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import Image from "next/image";

const ChooseUs = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 transition-colors overflow-hidden py-24 md:py-32">

      {/* ================= TOP ASYMMETRIC / SMOOTH CURVE SVG SHAPE ================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-16 md:h-28 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 120V0H1200Z"
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
            d="M0 120L1200 0V120H0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <GsapWrapper
          animation="fadeUp"
          delay={0.1}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs font-bold tracking-widest text-white/80 dark:text-slate-400 uppercase">
              WHY CHOOSE US
            </span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white/90 dark:text-white tracking-tight leading-tight">
            Experience The Best <br />
            <span className="text-primary italic font-light">Services With Us</span>
          </h2>
        </GsapWrapper>

        {/* Cards Grid Wrapped with GsapWrapper */}
        <GsapWrapper animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-center">
            {/* Card 1 */}
            <div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-48 sm:h-52 mb-6">
                <Image
                  src="/undraw_booking_8vl5.svg"
                  alt="Quick & Easy Booking"
                  fill
                  className="object-contain transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 text-center">
                Quick & Easy Booking
              </h3>
            </div>

            {/* Card 2 (Highlighted/Middle Card) */}
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center hover:shadow-3xl transition-all duration-300 transform md:-translate-y-3 border-2 border-primary/20"
            >
              <div className="relative w-full h-48 sm:h-52 mb-6">
                <Image
                  src="/undraw_business-deal_nx2n (1).svg"
                  alt="Trustworthy & Verified Professionals"
                  fill
                  className="object-contain transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <h3 className="text-xl sm:text-2xl text-center font-medium text-gray-800">
                Trustworthy & Verified Professionals
              </h3>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-48 sm:h-52 mb-6">
                <Image
                  src="/undraw_online-payments_d5ef.svg"
                  alt="Fast & Safe Transportation"
                  fill
                  className="object-contain transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 text-center">
                Fast & Safe Transportation
              </h3>
            </div>
          </div>
        </GsapWrapper>
      </div>
    </div>
  );
};

export default ChooseUs;