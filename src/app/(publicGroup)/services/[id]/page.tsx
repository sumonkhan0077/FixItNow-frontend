import { getSingleService } from "@/service/customer/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, PhoneOff, ArrowLeft } from "lucide-react";
import ServiceImageGallery from "../_components/ServiceImageGallery";
import ServiceActionCard from "../_components/ServiceActionCard";
import ServiceAvailabilities from "../_components/ServiceAvailabilities";
import ServiceReviews from "../_components/ServiceReviews";
import ServiceDescriptionView from "../_components/ServiceDescriptionView";
import { getMe } from "@/service/getMe";

interface ServicesDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ServicesDetailsPage = async ({ params }: ServicesDetailsPageProps) => {
  const res = await getMe();
  const { id } = await params;
  const response = await getSingleService(id);

  if (!response || "error" in response || !("data" in response)) {
    notFound();
  }

   const userProfile = res?.data?.profile || res?.profile || res?.data || null;

  const service = response.data;
  const tech = service.technicianProfile;
  const techUser = tech.user;

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-32 px-4 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button Section */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs font-semibold text-white dark:text-slate-200 hover:bg-slate-900 dark:hover:bg-slate-800 transition shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 " />
            <span>Back to Services</span>
          </Link>
        </div>

        <div className="space-y-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <ServiceImageGallery
                image={service.image}
                title={service.title}
                categoryName={service.category.name}
              />
            </div>
            <div className="lg:col-span-5">
              <ServiceActionCard user={userProfile} service={service} tech={tech} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 border-t border-stone-200 dark:border-slate-800">
            {/* Left Details */}
            <div className="lg:col-span-7 space-y-8">
              <ServiceDescriptionView description={service.description} />

              {/* Technician Profile Card */}
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-slate-900 dark:text-white border-b border-stone-100 dark:border-slate-800 pb-4">
                  About the Technician
                </h3>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#F4EFE6] dark:border-slate-800 shrink-0 bg-stone-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
                    {techUser.profileImage ? (
                      <Image
                        src={techUser.profileImage}
                        alt={techUser.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-[#C05621] dark:text-amber-500 capitalize">
                        {techUser.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                        {techUser.name}
                        <span className="bg-[#E29578]/20 text-[#C05621] dark:text-[#E29578] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                          Pro
                        </span>
                      </h4>
                      <p className="text-sm text-stone-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {tech.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-600 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-[#C05621]" />
                        <span>{techUser.email}</span>
                      </div>

                      {techUser.phone ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-600 dark:text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-[#C05621]" />
                          <span>{techUser.phone}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-400 dark:text-slate-500">
                          <PhoneOff className="w-3.5 h-3.5 opacity-60" />
                          <span className="italic">Phone unlisted</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Availabilities & Reviews */}
            <div className="lg:col-span-5 space-y-8">
              <ServiceAvailabilities availabilities={tech.availabilities} />
              <ServiceReviews reviews={tech.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsPage;
