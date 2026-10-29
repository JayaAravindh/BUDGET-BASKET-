"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";

type Product = {
  id: number;
  name: string;
  selling_price: number;
  original_price: number | null;
  stock_quantity: number;
  image_url: string | null;
  is_active: boolean;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, selling_price, original_price, stock_quantity, image_url, is_active"
        )
        .order("id", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const activeProducts = products.filter((product) => product.is_active);

  const lowStockProducts = activeProducts.filter(
    (product) => product.stock_quantity < 5
  );

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Dashboard Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 py-5 shadow-sm md:px-10">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="shrink-0">
            <Image
              src="/images/budget-basket-logo.png"
              alt="Budget Basket Logo"
              width={180}
              height={80}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="border-l border-gray-200 pl-4">
            <h1 className="text-2xl font-black text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your shop operations
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
        >
          View Store →
        </Link>
      </header>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black">
            Welcome to your store
          </h2>

          <p className="mt-2 text-gray-600">
            Manage products and monitor your inventory.
          </p>
        </div>

        {/* Dashboard Statistics */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">
              Total Products
            </p>

            <p className="mt-3 text-4xl font-black">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">
              Active Products
            </p>

            <p className="mt-3 text-4xl font-black text-green-600">
              {activeProducts.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">
              Low Stock Products
            </p>

            <p className="mt-3 text-4xl font-black text-red-600">
              {lowStockProducts.length}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Active products with fewer than 5 items in stock
            </p>
          </div>
        </section>

        {/* Product Inventory */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-6">
            <div>
              <h2 className="text-xl font-black">
                Product Inventory
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Products stored in your Supabase database.
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-gray-800">
              {products.length} products
            </span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading products...
            </div>
          ) : error ? (
            <div className="m-6 rounded-xl bg-red-50 p-5 text-sm text-red-700">
              <p className="font-bold">
                Unable to load products
              </p>

              <p className="mt-2">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl">📦</div>

              <h3 className="mt-4 text-xl font-bold">
                No products added yet
              </h3>

              <p className="mt-2 text-gray-500">
                Your inventory will appear here once products are added.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      Product
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Selling Price
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Original Price
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Stock
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {product.name}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        ₹{Number(product.selling_price).toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {product.original_price == null
                          ? "—"
                          : `₹${Number(product.original_price).toFixed(2)}`}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            product.stock_quantity < 5
                              ? "font-bold text-red-600"
                              : "font-semibold text-gray-700"
                          }
                        >
                          {product.stock_quantity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            product.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-8 pb-4 text-center text-xs text-gray-500">
          © 2026 Budget Basket · Product Management
        </footer>
      </div>
    </main>
  );
}