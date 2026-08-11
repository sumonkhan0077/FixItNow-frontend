import Image from "next/image";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const technicianFAQs = [
  {
    id: "item-1",
    question: "How do I book a technician or service?",
    answer:
      "You can easily book a service by selecting your required professional, choosing a convenient date and time, and confirming your appointment through our dashboard.",
  },
  {
    id: "item-2",
    question: "Are your technicians verified and certified?",
    answer:
      "Yes, all our technicians, installers, and electricians undergo strict background checks, skill verifications, and hold professional certifications.",
  },
  {
    id: "item-3",
    question: "What should I do in case of an emergency repair?",
    answer:
      "For emergency services like urgent plumbing or electrical issues, you can contact our priority support or book an immediate express dispatch through your account.",
  },
  {
    id: "item-4",
    question: "Do you offer a warranty on your repair services?",
    answer:
      "Yes, we provide a service warranty on all completed repairs and installations to ensure complete peace of mind and quality assurance.",
  },
  {
    id: "item-5",
    question: "How are the service rates and pricing calculated?",
    answer:
      "Our pricing is transparent and based on the type of service, complexity of the work, and required parts. You will see an upfront estimate before confirming your booking.",
  },
  {
    id: "item-6",
    question: "Can I reschedule or cancel my booked appointment?",
    answer:
      "Yes, you can easily reschedule or cancel your appointment free of charge up to a few hours before the scheduled service time from your dashboard.",
  },
];

export default function QuestionAnswer() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
      {/* Section Header */}
      <GsapWrapper
        animation="fadeUp"
        delay={0.1}
        className="mb-20 text-center flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-6 h-[2px] bg-primary"></span>
          <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            Quick Answers
          </span>
          <span className="w-6 h-[2px] bg-primary"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight leading-tight">
          Frequently Asked 
          <span className="text-primary italic font-light"> Question?</span>
        </h2>
      </GsapWrapper>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Shadcn Accordion Section */}
        <div className="w-full lg:w-7/12">
          <GsapWrapper animation="fadeUp" delay={0.2}>
         
            <Accordion 
             
              defaultValue={["item-1"]} 
              className="w-full space-y-4 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-6"
            >
              {technicianFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-slate-200 dark:border-slate-800 px-3 py-4 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-medium text-lg sm:text-xl text-gray-800 dark:text-gray-200 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-gray-600 dark:text-gray-400 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GsapWrapper>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-5/12 flex-shrink-0 lg:sticky lg:top-20 self-start flex justify-center">
          <GsapWrapper animation="fadeUp" delay={0.3} className="w-full flex justify-center">
            <div className="relative w-full max-w-md h-[400px] sm:h-[450px] lg:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/photo111.jpg"
                alt="Frequently Asked Questions Illustration"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </GsapWrapper>
        </div>
      </div>
    </section>
  );
}