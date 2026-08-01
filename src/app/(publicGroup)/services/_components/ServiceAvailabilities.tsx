import { Calendar, Clock } from "lucide-react";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";

interface ServiceAvailabilitiesProps {
  availabilities: Array<{ dayOfWeek: string; startTime: string; endTime: string }>;
}

export default function ServiceAvailabilities({ availabilities }: ServiceAvailabilitiesProps) {
  return (
    <GsapWrapper animation="fadeUp" delay={0.3}>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
          <Calendar className="w-5 h-5 text-[#C05621]" />
          <h3>Available Schedule</h3>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {availabilities.map((slot, index) => (
            <div key={index} className="flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{slot.dayOfWeek}</span>
              <span className="text-stone-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {slot.startTime} - {slot.endTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GsapWrapper>
  );
}