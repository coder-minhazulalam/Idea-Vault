"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    src: "/assets/1.png",
    alt: "IdeaVault Future Technology",

    badge: "OVER 4,200+ VALIDATED IDEAS",
    badgeColor: "pink",

    title: (
      <>
        Turn Bold Sparks into{" "}
        <span className="gradient-pink">Billion-Dollar</span>{" "}
        Ventures.
      </>
    ),

    description:
      "Validate startup ideas, gather community critique, and co-build the future with global innovators before writing a single line of production code.",

    primaryButton: "EXPLORE IDEAS",
    secondaryButton: "SUBMIT YOUR PITCH",

    bottomText: (
      <>
        <span>Decentralized IP Timestamping</span>
        <span>Zero-Noise Builder Network</span>
      </>
    ),
  },

  {
    src: "/assets/2.png",
    alt: "AI and CleanTech",

    badge: "NEXT-GEN CLIMATE & NEURO TECH",
    badgeColor: "pink",

    title: (
      <>
        AI & CleanTech: The{" "}
        <span className="gradient-blue">New Frontier</span>{" "}
        of Global Impact.
      </>
    ),

    description:
      "Discover breakthroughs in autonomous climate agents, decentralized compute, and bio-tech algorithms backed by cross-domain scientific collectives.",

    primaryButton: "DISCOVER AI TRENDS",
    secondaryButton: "BROWSE CLEAN ENERGY",

    bottomText: (
      <>
        <span>Active ESG Grants: $1.4M</span>
      </>
    ),
  },

  {
    src: "/assets/3.png",
    alt: "Co-Founders and Angel Community",

    badge: "ANGEL SYNDICATE ACCESS",
    badgeColor: "purple",

    title: (
      <>
        Co-Founders & Angel{" "}
        <span className="gradient-purple">Critique</span> at Hand.
      </>
    ),

    description:
      "Stop building in isolation. Post problem statements, receive instant tactical critiques, and iterate your product architecture before code.",

    primaryButton: "JOIN THE COMMUNITY",
    secondaryButton: "HOW IT WORKS",

    bottomText: (
      <>
        <span>Avg Feedback Time: 14 Mins</span>
      </>
    ),
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Next slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  // Auto slide
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = slides[currentIndex];

  return (
    <section className="w-full px-4 md:px-6">
      <div
        className="relative mx-auto max-w-7xl h-[500px] md:h-[460px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ================= BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* ================= GRADIENT OVERLAY ================= */}

        {/* Main desktop gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

        {/* Extra image fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20" />

        {/* ================= CONTENT ================= */}

        <div
          key={currentIndex}
          className="relative z-10 flex h-full w-full md:w-[58%] items-center px-7 py-8 md:px-10 lg:px-11 animate-slideContent"
        >
          <div className="max-w-[570px]">

            {/* ================= BADGE ================= */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-3 py-1 text-[9px] md:text-[10px] font-bold tracking-wide text-pink-500 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              {slide.badge}
            </div>

            {/* ================= HEADING ================= */}
            <h1 className="text-[34px] leading-[0.98] font-extrabold tracking-[-1.8px] text-[#111827] sm:text-[40px] md:text-[42px] lg:text-[48px]">
              {slide.title}
            </h1>

            {/* ================= DESCRIPTION ================= */}
            <p className="mt-5 max-w-[510px] text-[12px] md:text-[13px] leading-5 text-slate-500">
              {slide.description}
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="mt-6 flex flex-wrap gap-3">

              {/* Primary Button */}
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2.5 text-[10px] font-bold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {slide.primaryButton}

                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/80 px-4 py-2.5 text-[10px] font-bold text-slate-600 backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
              >
                <Sparkles size={12} />

                {slide.secondaryButton}
              </button>
            </div>

            {/* ================= BOTTOM FEATURES ================= */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[8px] md:text-[9px] font-medium text-slate-400">
              {slide.bottomText}
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="absolute bottom-5 right-4 md:right-5 z-20 flex items-center gap-2">

          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          >
            <ChevronLeft size={17} />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-1.5 rounded-md bg-white/70 px-3 py-2 backdrop-blur-md">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-5 bg-pink-500"
                    : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          >
            <ChevronRight size={17} />
          </button>

        </div>
      </div>
    </section>
  );
}