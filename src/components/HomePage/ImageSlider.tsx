'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative, SwiperOptions } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Swiper-এর প্রয়োজনীয় CSS ইম্পোর্ট করুন
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

interface SlideItem {
  id: number;
  name: string;
  description: string;
  image: string;
  buttonText: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    name: 'SWITZERLAND',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/qCkd9jS/img1.jpg', // আপনার প্রথম ইমেজ
    buttonText: 'See More',
  },
  {
    id: 2,
    name: 'FINLAND',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/jrRb11q/img2.jpg',
    buttonText: 'See More',
  },
  {
    id: 3,
    name: 'ICELAND',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/NSwVv8D/img3.jpg', // আপনার দ্বিতীয় ইমেজের পেছনের দৃশ্য
    buttonText: 'See More',
  },
  {
    id: 4,
    name: 'AUSTRALIA',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/Bq4Q0M8/img4.jpg',
    buttonText: 'See More',
  },
  {
    id: 5,
    name: 'NETHERLAND',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/jTQfmTq/img5.jpg', // আপনার দ্বিতীয় ইমেজের সামনের দৃশ্য
    buttonText: 'See More',
  },
  {
    id: 6,
    name: 'IRELAND',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    image: 'https://i.ibb.co/RNkk6L0/img6.jpg',
    buttonText: 'See More',
  },
];

export default function ImageSlider() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const swiperParams: SwiperOptions = {
    modules: [Navigation, EffectCreative],
    // এটি আপনার দেওয়া স্ক্রিপ্টের appendChild/prepend কার্যকারিতা অনুকরণ করে
    loop: true, 
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    // এটি আপনার স্লাইডের পেছনের 'stack' ইফেক্ট তৈরি করে
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [-220, 0, -500],
        rotate: [0, 0, -5], // সামান্য ঘোরানো
      },
      next: {
        shadow: true,
        translate: [220, 0, -500],
        rotate: [0, 0, 5], // সামান্য ঘোরানো
      },
    },
    navigation: {
      prevEl: '.prev-arrow',
      nextEl: '.next-arrow',
    },
  };

  return (
    <div className="bg-[#eaeaea] overflow-hidden h-screen w-screen flex items-center justify-center relative font-sans">
      {/* Main Container */}
      <div className="relative w-[1000px] h-[600px] bg-[#f5f5f5] shadow-[0_30px_50px_#dbdbdb] rounded-2xl overflow-hidden">
        
        {/* Swiper Slider */}
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          {...swiperParams}
          className="w-full h-full relative"
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              // স্লাইডের ডিফল্ট আকার (background slide)
              className="!w-[200px] !h-[300px] absolute top-1/2 -translate-y-1/2 rounded-[20px] shadow-[0_30px_50px_#505050] bg-center bg-cover transition-all duration-500 overflow-hidden !flex !items-center !justify-start"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Content: এটি শুধুমাত্র একটি নির্দিষ্ট স্লাইড (যেমন .swiper-slide-active) এর জন্য দৃশ্যমান হবে */}
              {/* Tailwind এর group ব্যবহার করে আমরা শুধুমাত্র অ্যাক্টিভ স্লাইডের ভিতরের কন্টেন্ট দেখাবো */}
              <div className="absolute top-1/2 left-[-500px] w-[300px] text-left text-[#eee] -translate-y-1/2 pl-4 opacity-0 transition-all duration-500 delay-300 ease-in-out group-[.swiper-slide-active]:left-[100px] group-[.swiper-slide-active]:opacity-100">
                <div className="text-[40px] uppercase font-bold leading-none animate-[animate_1s_ease-in-out_1_forwards]">
                  {slide.name}
                </div>
                <div className="mt-[10px] mb-[20px] opacity-0 animate-[animate_1s_ease-in-out_0.3s_1_forwards] text-sm">
                  {slide.description}
                </div>
                <button className="py-[10px] px-[20px] border-none cursor-pointer opacity-0 animate-[animate_1s_ease-in-out_0.6s_1_forwards] bg-white text-black font-semibold rounded text-xs hover:bg-gray-200 transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="w-full text-center absolute bottom-[20px] z-50 flex justify-center items-center gap-2">
          <button
            aria-label="Previous Slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="prev-arrow w-[40px] h-[35px] rounded-lg border border-black cursor-pointer transition-all duration-300 hover:bg-[#ababab] hover:text-white flex items-center justify-center bg-transparent"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <button
            aria-label="Next Slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="next-arrow w-[40px] h-[35px] rounded-lg border border-black cursor-pointer transition-all duration-300 hover:bg-[#ababab] hover:text-white flex items-center justify-center bg-transparent"
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>

      </div>
    </div>
  );
}