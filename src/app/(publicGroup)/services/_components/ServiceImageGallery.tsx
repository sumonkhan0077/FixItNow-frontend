import Image from "next/image";

interface ServiceImageGalleryProps {
  image: string;
  title: string;
  categoryName: string;
}

export default function ServiceImageGallery({ image, title, categoryName }: ServiceImageGalleryProps) {
  return (
    <div className="relative h-[450px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-200/60 dark:border-slate-800">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-6 left-6 bg-[#2C3E50]/80 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-md">
        {categoryName}
      </div>
    </div>
  );
}