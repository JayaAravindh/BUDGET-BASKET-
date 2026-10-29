"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase-browser";
import AddToCartButton from "../app/AddToCartButton";

type Product = {
  id: number;
  name: string;
  description: string | null;
  selling_price: number;
  original_price: number | null;
  stock_quantity: number;
  image_url: string | null;
  category_id: number | null;
  availability: "in_stock" | "out_of_stock";
};

type Category = {
  id: number;
  name: string;
};

export default function LiveProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function loadProducts() {
      const [productResult, categoryResult] = await Promise.all([
        supabase
          .from("products")
          .select(
            "id, name, description, selling_price, original_price, stock_quantity, image_url, category_id, availability"
          )
          .eq("is_active", true)
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("id, name"),
      ]);

      if (!mounted) return;

      if (productResult.error) {
        console.error("Product loading error:", productResult.error);
        setError("We couldn't load products right now. Please try again later.");
      } else {
        setProducts(
          (productResult.data ?? []).map((product) => ({
            ...product,
            availability:
              product.availability === "out_of_stock"
                ? "out_of_stock"
                : "in_stock",
          })) as Product[]
        );
      }

      if (!categoryResult.error) {
        setCategories(categoryResult.data ?? []);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="best-sellers" className="bg-gray-50 py-14">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Customer Favourites
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Our Products
            </h2>
            <p className="mt-2 text-gray-500">
              Discover the latest products from Budget Basket.
            </p>
          </div>

          <Link
            href="/shop"
            className="font-bold text-red-600 transition hover:text-red-800"
          >
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white p-12 text-center text-red-600">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <p className="text-xl font-bold">New products coming soon!</p>
            <p className="mt-2 text-gray-500">
              Check back soon for products from Budget Basket.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const category = categories.find(
                (item) => item.id === product.category_id
              );

              const hasDiscount =
                product.original_price !== null &&
                product.original_price > product.selling_price;

              const isInStock = product.availability === "in_stock";

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-white sm:h-56">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-6xl" aria-hidden="true">
                          🛍️
                        </span>
                      )}

                      {hasDiscount && (
                        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                          Special Price
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-400">
                        {category?.name ?? "Budget Basket"}
                      </p>

                      <h3 className="mt-2 min-h-10 text-sm font-bold leading-5 text-gray-800 sm:text-base">
                        {product.name}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xl font-black text-red-600">
                          ₹{Number(product.selling_price).toFixed(0)}
                        </span>

                        {product.original_price !== null && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{Number(product.original_price).toFixed(0)}
                          </span>
                        )}
                      </div>

                      {hasDiscount && (
                        <p className="mt-2 text-xs font-bold text-green-600">
                          You save ₹
                          {(
                            Number(product.original_price) -
                            Number(product.selling_price)
                          ).toFixed(0)}
                        </p>
                      )}

                      <p
                        className={
                          "mt-3 text-xs font-bold " +
                          (isInStock ? "text-green-600" : "text-red-600")
                        }
                      >
                        {isInStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    {isInStock ? (
                      <AddToCartButton
                        product={{
                          id: product.id,
                          name: product.name,
                          selling_price: Number(product.selling_price),
                          image_url: product.image_url,
                          stock_quantity: product.stock_quantity,
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-full bg-gray-200 py-3 text-sm font-bold text-gray-500"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}