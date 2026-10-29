"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddToCartButton from "@/app/AddToCartButton";

type Product = {
  id: number;
  name: string;
  description: string | null;
  selling_price: number;
  original_price: number | null;
  stock_quantity: number | null;
  image_url: string | null;
  availability: "in_stock" | "out_of_stock";
};

function ProductDetailsContent() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, selling_price, original_price, stock_quantity, image_url, availability"
        )
        .eq("id", productId)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Product fetch error:", error);
        setError("Unable to load this product. Please try again.");
        setProduct(null);
      } else if (!data) {
        setError("Product not found or no longer available.");
        setProduct(null);
      } else {
        setProduct(data as Product);
      }

      setLoading(false);
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-16 text-center">
        <p className="font-semibold text-gray-600">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Product unavailable
          </h1>

          <p className="mt-3 text-gray-600">
            {error || "We couldn't find this product."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const isInStock = product.availability === "in_stock";

  const hasDiscount =
    product.original_price !== null &&
    product.original_price > product.selling_price;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 hover:text-red-600"
        >
          ← Back to Shopping
        </Link>

        <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:min-h-[450px]">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="max-h-[450px] w-full object-contain"
              />
            ) : (
              <div className="p-10 text-center text-7xl">🛍️</div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span
                className={
                  "inline-flex rounded-full px-3 py-1 text-sm font-semibold " +
                  (isInStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700")
                }
              >
                {isInStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-red-600">
                ₹{Number(product.selling_price).toLocaleString("en-IN")}
              </span>

              {hasDiscount && product.original_price !== null && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{Number(product.original_price).toLocaleString("en-IN")}
                  </span>

                  <span className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-800">
                    {Math.round(
                      ((product.original_price - product.selling_price) /
                        product.original_price) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-bold text-gray-900">
                  Product Details
                </h2>

                <p className="whitespace-pre-line leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mt-6 rounded-xl bg-yellow-50 p-4">
              <p className="font-semibold text-gray-800">
                🚚 Delivery Information
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Free delivery on orders of ₹599 and above.
              </p>
            </div>

            <div className="mt-8">
              {isInStock ? (
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                   selling_price: Number(product.selling_price),
                    image_url: product.image_url,
                    stock_quantity: product.stock_quantity ?? 0,
                  }}
                />
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-gray-300 px-6 py-4 font-bold text-gray-600"
                >
                  Currently Out of Stock
                </button>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Prices are listed in Indian Rupees (₹).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 px-5 py-16 text-center">
          <p className="font-semibold text-gray-600">Loading product...</p>
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
