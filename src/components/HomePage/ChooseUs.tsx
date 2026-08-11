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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Why <span className="text-primary font-normal">Choose Us</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            We deliver exceptional services with complete reliability,
            transparency, and professional expertise.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-center">
          {/* Card 1 */}
          <div
            data-aos="flip-up"
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
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Quick & Easy Booking
            </h3>
          </div>

          {/* Card 2 (Highlighted/Middle Card) */}
          <div
            data-aos="flip-up"
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
            <h3 className="text-xl sm:text-2xl text-center font-semibold text-gray-800">
              Trustworthy & Verified Professionals
            </h3>
          </div>

          {/* Card 3 */}
          <div
            data-aos="flip-up"
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
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Fast & Safe Transportation
            </h3>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ChooseUs;