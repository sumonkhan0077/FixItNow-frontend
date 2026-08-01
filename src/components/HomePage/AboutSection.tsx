import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <GsapWrapper animation="fadeUp" delay={0.1} className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              ABOUT US
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-normal text-slate-900 dark:text-white tracking-tight leading-tight ">
            Your Trusted Home <br />
            <span className="text-primary italic font-light">Service </span> Partner
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-[1.9] tracking-wide font-normal max-w-lg">
            We are a modern home service brand built for today&apos;s busy lifestyle. We help homeowners save time and energy by taking care of repairs, maintenance, plumbing, electrical, and overall home solutions with precision and professionalism.
          </p>

          <div className="pt-2">
            <button className="group inline-flex bg-primary  text-white  font-medium text-sm hover:bg-slate-900 dark:hover:bg-primary  transition-all duration-300 items-center gap-2  px-7 py-3.5 rounded-full  cursor-pointer shadow-lg shadow-primary/20">
              <span>More About Us</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </GsapWrapper>

        {/* Right Side Image & Overlapping Stats Box */}
        <GsapWrapper animation="fadeUp" delay={0.2} className="lg:col-span-6 relative flex justify-end">
          <div className="relative w-full max-w-xl">
            
            {/* Top Big Image */}
            <div className="relative w-full h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1646640381839-02748ae8ddf0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Home Service Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Overlapping Bottom Stats Card */}
            <div className="relative lg:absolute lg:-bottom-16 lg:-left-12 mt-6 lg:mt-0 w-full sm:w-[90%] bg-slate-900 dark:bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 grid grid-cols-2 gap-6 z-20">
              
              {/* Stat 1 */}
              <div className="space-y-3">
                <h3 className="!text-5xl sm:text-4xl tracking-tight text-white">
                  1,500+
                </h3>
                <h4 className="text-xl text-slate-200">
                  Services Done
                </h4>
                <p className="text-[12px] text-slate-400 leading-relaxed tracking-wide">
                  Providing spotless and reliable spaces for happy customers.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 border-l border-slate-800 pl-6">
                <h3 className="!text-5xl sm:text-4xl font-medium tracking-tight text-white">
                  120+
                </h3>
                <h4 className="text-xl text-slate-200">
                  Expert Technicians
                </h4>
                <p className="text-[12px] text-slate-400 leading-relaxed tracking-wide">
                  Trained and experienced team ready to serve you.
                </p>
              </div>

            </div>

          </div>
        </GsapWrapper>

      </div>

    </section>
  );
}