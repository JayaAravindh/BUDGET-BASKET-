"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "SMART SHOPPING STARTS HERE",
    title: "Everyday",
    highlight: "Essentials",
    ending: "at Budget Prices.",
    description:
      "Home, Kitchen, Decor, Gifts & More — all in one place for your family.",
    button: "Explore Products",
  },
  {
    eyebrow: "MAKE EVERY CORNER SPECIAL",
    title: "Beautiful Homes.",
    highlight: "Better Value.",
    ending: "",
    description:
      "Discover useful kitchen essentials, home accessories and thoughtful gifts.",
    button: "Discover More",
  },
  {
    eyebrow: "GREAT FINDS FOR EVERYDAY LIVING",
    title: "More Variety.",
    highlight: "More Savings.",
    ending: "",
    description:
      "Explore everyday essentials selected for your home and family.",
    button: "Shop Collection",
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  function changeSlide(direction: number) {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length
    );
  }

  return (
    <section
      aria-label="Budget Basket promotional banners"
      className="relative isolate min-h-[590px] overflow-hidden bg-[#fff8e8] md:min-h-[650px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/budget-basket-kitchen-hero.png')",
          backgroundPosition: "center right",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#fff9ec]/95 via-[#fff7e7]/70 to-transparent"
      />

      <div className="relative z-20 mx-auto flex min-h-[590px] max-w-[1500px] items-center px-6 py-14 md:min-h-[650px] md:px-12 lg:px-16">
        <div className="max-w-[650px]">
          <p className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-red-600 sm:text-sm">
            <span className="inline-block h-1 w-8 rounded-full bg-yellow-400" />
            {slide.eyebrow}
          </p>

          <h1 className="text-5xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            {slide.title}
            <span className="block text-red-600">{slide.highlight}</span>
            {slide.ending && (
              <span className="mt-1 block text-slate-950">
                {slide.ending}
              </span>
            )}
          </h1>

          <div className="mt-5 h-1.5 w-36 rounded-full bg-yellow-400" />

          <p className="mt-6 max-w-md text-base leading-7 text-slate-700 sm:text-lg">
            {slide.description}
          </p>

          <a
            href="#best-sellers"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            {slide.button}
            <span aria-hidden="true">→</span>
          </a>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg">✓</span>
              <span className="text-xs font-bold leading-4 text-slate-800">Affordable<br />Prices</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg">◇</span>
              <span className="text-xs font-bold leading-4 text-slate-800">Wide<br />Selection</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg">★</span>
              <span className="text-xs font-bold leading-4 text-slate-800">Quality<br />Products</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg">♡</span>
              <span className="text-xs font-bold leading-4 text-slate-800">Great for<br />Gifting</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => changeSlide(-1)}
        aria-label="Previous banner"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-900 shadow-lg transition hover:bg-yellow-400 md:left-5"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => changeSlide(1)}
        aria-label="Next banner"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-900 shadow-lg transition hover:bg-yellow-400 md:right-5"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show banner ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === index ? "w-8 bg-yellow-400" : "w-2.5 bg-white shadow"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

