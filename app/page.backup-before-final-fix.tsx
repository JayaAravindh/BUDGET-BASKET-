import HeroCarousel from "./HeroCarousel";
import LiveProducts from "../components/LiveProducts";

const categories = [
  { name: "Kitchen Essentials", icon: "🍳" },
  { name: "Home & Living", icon: "🏠" },
  { name: "Fashion & Bags", icon: "👜" },
  { name: "Gadgets", icon: "🎧" },
  { name: "Toys & Games", icon: "🧸" },
  { name: "Storage & Organisers", icon: "🧺" },
  { name: "Cleaning Essentials", icon: "🧹" },
  { name: "Daily Use Products", icon: "✨" },
];
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Announcement bar */}
      <div className="bg-red-600 px-4 py-2 text-center text-sm font-bold text-white">
        Welcome to Budget Basket! Shop More, Spend Less.
      </div>

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
          <a href="/" className="flex shrink-0 items-center">
            <img
              src="/images/budget-basket-logo.png"
              alt="Budget Basket - Home & More"
              className="h-auto w-[175px] object-contain md:w-[205px]"
            />
          </a>

          {/* Search bar */}
          <form
            action="/shop"
            method="get"
            className="order-3 flex w-full overflow-hidden rounded-full border-2 border-yellow-400 md:order-none md:max-w-xl md:flex-1"
          >
            <input
              type="search"
              name="q"
              placeholder="Search for products..."
              aria-label="Search products"
              className="min-w-0 flex-1 px-5 py-3 text-sm outline-none"
            />

            <button
              type="submit"
              className="bg-yellow-400 px-6 font-bold text-gray-900 transition hover:bg-yellow-500"
            >
              Search
            </button>
          </form>

          {/* Account and shopping links */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a
              href="/account"
              aria-label="Account"
              className="flex items-center gap-2 transition hover:text-red-600"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
              </svg>
              <span>Account</span>
            </a>

            <a
              href="/wishlist"
              aria-label="Wishlist"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
              <span className="hidden sm:inline">Wishlist</span>
            </a>

            <a
              href="/cart"
              aria-label="Cart"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
                <circle cx="10" cy="20" r="1.2" />
                <circle cx="18" cy="20" r="1.2" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-yellow-400 shadow-sm">
        <div className="mx-auto flex max-w-[1500px] gap-7 overflow-x-auto whitespace-nowrap px-5 py-3 text-sm font-bold md:justify-center md:px-10">
          <a href="#categories" className="hover:text-red-700">
            All Categories
          </a>
          <a href="#categories" className="hover:text-red-700">
            Home & Living
          </a>
          <a href="#categories" className="hover:text-red-700">
            Kitchen
          </a>
          <a href="#categories" className="hover:text-red-700">
            Fashion & Bags
          </a>
          <a href="#categories" className="hover:text-red-700">
            Gadgets
          </a>
          <a href="#categories" className="hover:text-red-700">
            Toys & Games
          </a>
          <a href="#best-sellers" className="hover:text-red-700">
            Best Sellers
          </a>
        </div>
      </nav>

      {/* Rotating hero banner */}
      <HeroCarousel />

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-[1500px] px-5 py-14 md:px-10"
      >
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Explore Our Collection
          </p>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 text-gray-500">
            Find something useful for every corner of your home.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <a
              href="/shop"
              key={category.name}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 text-4xl transition group-hover:bg-yellow-100">
                {category.icon}
              </span>

              <span className="mt-3 text-sm font-bold">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Promotional banners */}
      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-14 md:grid-cols-2 md:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-8 text-white md:p-12">
          <div className="relative z-10 max-w-md">
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase text-gray-900">
              Budget Friendly
            </span>

            <h2 className="mt-6 text-3xl font-black md:text-4xl">
              Everyday Essentials
            </h2>

            <p className="mt-3 leading-7 text-white/90">
              Discover useful products for your home and everyday life.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-3 font-bold text-gray-900 transition hover:bg-yellow-300"
            >
              Explore Products →
            </a>
          </div>

          <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute -right-4 -bottom-4 h-44 w-44 text-white opacity-20" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 55 60 18 105 55V103H15Z"/><path d="M45 103V70H75V103"/></svg>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-200 to-amber-100 p-8 md:p-12">
          <div className="relative z-10 max-w-md">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-red-600">
              Smart Shopping
            </span>

            <h2 className="mt-6 text-3xl font-black md:text-4xl">
              More Variety.
              <span className="block text-red-600">
                Better Value.
              </span>
            </h2>

            <p className="mt-3 leading-7 text-gray-700">
              Shop kitchen products, gadgets, fashion accessories and more.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
            >
              Shop Now →
            </a>
          </div>

          <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute -right-4 -bottom-4 h-44 w-44 text-red-600 opacity-20" fill="none" stroke="currentColor" strokeWidth="3"><path d="M60 12 72 44 105 30 91 60 112 81 79 84 60 112 41 84 8 81 29 60 15 30 48 44Z"/></svg>
        </div>
      </section>
      <LiveProducts />
      {/* Shopping benefits */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:px-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-red-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5h12v12H3zM15 9h4l3 4v4h-7z"/><circle cx="7.5" cy="19" r="2"/><circle cx="18.5" cy="19" r="2"/>
              </svg>
            </div>
            <h3 className="mt-3 font-bold">Delivery Options</h3>
            <p className="mt-1 text-sm text-gray-500">Delivery details at checkout</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-red-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M15.5 8.5c-.7-.7-1.8-1-3.1-1-1.6 0-2.8.8-2.8 2s1.2 1.8 2.8 2.2 2.8 1 2.8 2.2-1.2 2-2.8 2c-1.3 0-2.5-.4-3.2-1.2M12 5.5v13"/>
              </svg>
            </div>
            <h3 className="mt-3 font-bold">Budget-Friendly Prices</h3>
            <p className="mt-1 text-sm text-gray-500">Great value for everyday shopping</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-red-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1"/>
              </svg>
            </div>
            <h3 className="mt-3 font-bold">Secure Shopping</h3>
            <p className="mt-1 text-sm text-gray-500">Checkout security to be configured</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-red-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-.9L3 21l1.8-4.5A8.4 8.4 0 0 1 3 11.5a9 9 0 0 1 18 0Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>
              </svg>
            </div>
            <h3 className="mt-3 font-bold">Customer Support</h3>
            <p className="mt-1 text-sm text-gray-500">We're here to help</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-10">
          <div>
            <a href="/" className="inline-block rounded-xl bg-white p-3">
              <img
                src="/images/budget-basket-logo.png"
                alt="Budget Basket"
                className="h-auto w-44 object-contain"
              />
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
              Budget Basket - Home & More. Discover everyday essentials at
              prices you'll love.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-400">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
              <a href="/" className="hover:text-yellow-400">
                Home
              </a>
              <a href="/shop" className="hover:text-yellow-400">
                Shop Products
              </a>
              <a href="#categories" className="hover:text-yellow-400">
                Categories
              </a>
              <a href="#best-sellers" className="hover:text-yellow-400">
                Best Sellers
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-400">
              Customer Service
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
              <a href="/contact" className="hover:text-yellow-400">
                Contact Us
              </a>
              <a href="/shipping" className="hover:text-yellow-400">
                Shipping Information
              </a>
              <a href="/returns" className="hover:text-yellow-400">
                Returns & Refunds
              </a>
              <a href="/privacy" className="hover:text-yellow-400">
                Privacy Policy
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-400">
              Budget Basket
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              Your destination for home essentials, kitchen products, fashion
              accessories, gadgets and more.
            </p>

            <p className="mt-4 font-bold">
              Pick Anything{" "}
              <span className="text-yellow-400">160 & 260</span>
            </p>
          </div>
        </div>

        {/* Fixed year avoids the prerendering error */}
        <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-gray-400">
         &copy; 2026 Budget Basket. All rights reserved.
        </div>
      </footer>
    </main>
  );
}





