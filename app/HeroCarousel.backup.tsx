"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "WELCOME TO BUDGET BASKET",
    title: "Everything You Need",
    highlight: "For Everyday Life",
    description:
      "Discover kitchen essentials, home products, gadgets, bags and more at prices you'll love.",
    button: "Shop Now",
    background: "from-amber-100 via-yellow-50 to-orange-100",
    accent: "bg-red-600",
    products: [
      { icon: "🍳", label: "Kitchen" },
      { icon: "👜", label: "Fashion" },
      { icon: "🎧", label: "Gadgets" },
      { icon: "🧸", label: "Toys" },
    ],
  },
  {
    eyebrow: "SMART SHOPPING STARTS HERE",
    title: "Big Variety.",
    highlight: "Budget-Friendly Prices.",
    description:
      "Find useful products for your home and family, all in one convenient shopping destination.",
    button: "Explore Products",
    background: "from-red-50 via-orange-50 to-yellow-100",
    accent: "bg-yellow-400",
    products: [
      { icon: "🥣", label: "Home" },
      { icon: "💡", label: "Lighting" },
      { icon: "🧹", label: "Cleaning" },
      { icon: "🧺", label: "Storage" },
    ],
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
      className={`relative overflow-hidden bg-gradient-to-r ${slide.background} transition-colors duration-500`}
      aria-label="Budget Basket promotional banners"
    >
      <div className="mx-auto grid min-h-[390px] max-w-[1500px] items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-14">
        <div>
          <p className="mb-4 text-sm font-extrabold tracking-[0.18em] text-red-600">
            {slide.eyebrow}
          </p>

          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-gray-950 md:text-6xl">
            {slide.title}
            <span className="mt-1 block text-red-600">
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-700 md:text-lg">
            {slide.description}
          </p>

          <a
            href="#best-sellers"
            className={`mt-7 inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700 ${
              activeSlide === 0 ? "bg-red-600" : "bg-gray-950"
            }`}
          >
            {slide.button}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-yellow-300 px-4 py-2 text-xs font-black tracking-wide text-gray-950">
                BUDGET BASKET
              </span>

              <span className="text-sm font-semibold text-gray-500">
                HOME & MORE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {slide.products.map((product) => (
                <a
                  href="#categories"
                  key={product.label}
                  className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-5xl" aria-hidden="true">
                    {product.icon}
                  </span>

                  <span className="mt-3 text-sm font-bold text-gray-800">
                    {product.label}
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-5 text-center text-sm font-semibold text-gray-600">
              Everyday essentials. Prices you&apos;ll love.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => changeSlide(-1)}
        aria-label="Previous banner"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:bg-yellow-300 md:left-6"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => changeSlide(1)}
        aria-label="Next banner"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:bg-yellow-300 md:right-6"
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
              activeSlide === index
                ? "w-8 bg-red-600"
                : "w-2.5 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}