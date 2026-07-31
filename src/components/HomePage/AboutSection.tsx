import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";
import { Check, Wrench, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "01",
    title: "Expert Technicians",
    description: "Skilled and certified professionals for reliable, long-lasting residential solutions.",
    icon: Wrench,
    highlight: false,
  },
  {
    id: "02",
    title: "On-Time Service",
    description: "We respect your time and always arrive as scheduled. Always fast and reliable.",
    icon: Clock,
    highlight: true, // মাঝখানের বক্সটি প্রাইমারি কালারে হাইলাইট করা
  },
  {
    id: "03",
    title: "Customer Satisfaction",
    description: "Dedicated to providing a smooth and stress-free experience for every home project.",
    icon: ShieldCheck,
    highlight: false,
  },
];

const checklist = [
  "Trusted and experienced local service professionals",
  "Fast response and reliable scheduling",
  "High-quality workmanship and lasting solutions",
  "Customer satisfaction as our top priority",
];

export default function AboutSection() {
  return (
    <div>
        
    </div>
  );
}