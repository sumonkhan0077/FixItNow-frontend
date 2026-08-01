import React from "react";
import { Zap, Wrench, FileText, Headphones, ShieldCheck } from "lucide-react";

interface ServiceDescriptionViewProps {
  description: string;
}

// আইকন অ্যারেটি কম্পোনেন্টের বাইরে রাখা হলো
const iconList = [
  <Zap key="zap" className="w-5 h-5 text-[#C05621]" />,
  <Wrench key="wrench" className="w-5 h-5 text-[#C05621]" />,
  <FileText key="file" className="w-5 h-5 text-[#C05621]" />,
  <Headphones key="headphones" className="w-5 h-5 text-[#C05621]" />,
  <ShieldCheck key="shield" className="w-5 h-5 text-[#C05621]" />,
];

export default function ServiceDescriptionView({ description }: ServiceDescriptionViewProps) {
  const parts = description.split("Key components and offerings typically included in electric services are:");
  const introText = parts[0]?.trim();
  const rawPoints = parts[1] ? parts[1].split(".") : [];

  const parsedFeatures = rawPoints
    .map((point) => point.trim())
    .filter((point) => point.length > 0)
    .map((point) => {
      const [title, ...descArr] = point.split(":");
      return {
        title: title?.trim(),
        desc: descArr.join(":").trim(),
      };
    });

  return (
    <div className="space-y-8">
   
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white">
          The Service Details
        </h2>
        {introText && (
          <p className="text-stone-600 dark:text-slate-300 leading-relaxed text-base font-normal">
            {introText}
          </p>
        )}
      </div>

      
      {parsedFeatures.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-serif text-slate-900 dark:text-white">
            Key Offerings & Components
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parsedFeatures.map((item, index) => (
              item.title && (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 flex items-start gap-4 shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-[#F4EFE6] dark:bg-slate-800 shrink-0">
                    {iconList[index % iconList.length]}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                      {item.title}
                    </h4>
                    {item.desc && (
                      <p className="text-xs md:text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}.
                      </p>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}