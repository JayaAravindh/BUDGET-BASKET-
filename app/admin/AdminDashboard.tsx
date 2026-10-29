"use client";

import InactivityTimeout from "./InactivityTimeout";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";

type Availability = "in_stock" | "out_of_stock";

type Product = {
  id: number;
  name: string;
  selling_price: number;
  original_price: number | null;
  stock_quantity: number;
  image_url: string | null;
  is_active: boolean;
  availability: Availability;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLoggingOut(false);
      alert("Unable to log out. Please try again.");
      return;
    }

    window.location.replace("/login");
  }

  async function loadProducts() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, selling_price, original_price, stock_quantity, image_url, is_active, availability"
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Load products error:", error);
      setError(`Unable to load products: ${error.message}`);
    } else {
      setProducts(
        (data ?? []).map((product) => ({
          ...product,
          availability:
            product.availability === "out_of_stock"
              ? "out_of_stock"
              : "in_stock",
        })) as Product[]
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function updateAvailability(
    product: Product,
    newAvailability: Availability
  ) {
    if (
      product.availability === newAvailability ||
      updatingId !== null
    ) {
      return;
    }

    const oldAvailability = product.availability;

    const confirmed = window.confirm(
      `Are you sure you want to change "${product.name}" from "${
        oldAvailability === "in_stock" ? "In Stock" : "Out of Stock"
      }" to "${
        newAvailability === "in_stock" ? "In Stock" : "Out of Stock"
      }"?`
    );

    if (!confirmed) return;

    setUpdatingId(product.id);
    setError("");

    try {
  const {
  data: { user },
  error: authError,
} = await supabase.auth.getUser();

if (authError || !user) {
  const message = "Your session has expired. Please log in again.";
  setError(message);
  window.alert(message);
  return;
}

const { data, error: updateError } = await supabase
  .from("products")
  .update({ availability: newAvailability })
  .eq("id", product.id)
  .select("id, availability")
  .maybeSingle();

      if (updateError) {
        console.error("Update availability error:", updateError);

        const message = `Could not save "${product.name}": ${updateError.message}`;
        setError(message);
        window.alert(message);

        await loadProducts();
        return;
      }

      if (!data) {
        const message =
          `Supabase did not update "${product.name}". ` +
          "The owner update policy may be blocking this request.";

        setError(message);
        window.alert(message);

        await loadProducts();
        return;
      }

      const savedAvailability = data.availability as Availability;

      setProducts((currentProducts) =>
        currentProducts.map((item) =>
          item.id === product.id
            ? { ...item, availability: savedAvailability }
            : item
        )
      );

      window.alert(
        `${product.name} availability saved as ${
          savedAvailability === "in_stock" ? "In Stock" : "Out of Stock"
        }.`
      );
    } catch (err) {
      console.error("Unexpected availability update error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while saving availability.";

      setError(message);
      window.alert(`Save failed: ${message}`);

      await loadProducts();
    } finally {
      setUpdatingId(null);
    }
  }

  const activeProducts = products.filter((product) => product.is_active);

  const lowStockProducts = activeProducts.filter(
    (product) => product.stock_quantity < 5
  );

  return (
    <>
      <InactivityTimeout />

      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-5 shadow-sm md:px-10">
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
              <h1 className="text-2xl font-black">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your shop operations
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold hover:bg-yellow-500"
            >
              View Store →
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black">Welcome to your store</h2>
            <p className="mt-2 text-gray-600">
              Manage products and monitor your inventory.
            </p>
          </div>

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">
                Total Products
              </p>
              <p className="mt-3 text-4xl font-black">{products.length}</p>
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

          <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">
              <div>
                <h2 className="text-xl font-black">Product Inventory</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage prices, stock, and customer availability.
                </p>
              </div>

              <Link
                href="/admin/products/new"
                className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold hover:bg-yellow-500"
              >
                + Add Product
              </Link>

              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold">
                {products.length} products
              </span>
            </div>

            {error && (
              <div className="m-6 rounded-xl bg-red-50 p-5 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading products...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Selling Price</th>
                      <th className="px-6 py-4">Original Price</th>
                      <th className="px-6 py-4">Stock Quantity</th>
                      <th className="px-6 py-4">Customer Availability</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
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
                          {product.stock_quantity}
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={product.availability}
                            disabled={updatingId !== null}
                            onChange={(event) =>
                              void updateAvailability(
                                product,
                                event.target.value as Availability
                              )
                            }
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-semibold disabled:opacity-50"
                            aria-label={`Availability for ${product.name}`}
                          >
                            <option value="in_stock">In Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>

                          {updatingId === product.id && (
                            <p className="mt-1 text-xs text-gray-500">
                              Saving...
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={
                              "rounded-full px-3 py-1 text-xs font-bold " +
                              (product.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600")
                            }
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

          <footer className="mt-8 pb-4 text-center text-xs text-gray-500">
            © 2026 Budget Basket · Product Management
          </footer>
        </div>
      </main>
    </>
  );
} 
 