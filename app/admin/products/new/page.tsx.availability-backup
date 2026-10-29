"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BudgetBasketLogo from "../../../../components/BudgetBasketLogo";
import { createClient } from "../../../../lib/supabase-browser";

type Category = {
  id: number;
  name: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (!mounted) return;

      if (error) {
        setError("Could not load categories. Please refresh the page.");
      } else {
        setCategories(data ?? []);
      }

      setLoadingCategories(false);
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const supabase = createClient();

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError || profile?.role !== "owner") {
        setError("Only the store owner can add products.");
        return;
      }

      const parsedPrice = Number(sellingPrice);
      const parsedStock = Number(stock);
      const parsedOriginalPrice =
        originalPrice.trim() === "" ? null : Number(originalPrice);

      if (!name.trim()) {
        setError("Please enter a product name.");
        return;
      }

      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        setError("Enter a valid selling price.");
        return;
      }

      if (
        parsedOriginalPrice !== null &&
        (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0)
      ) {
        setError("Enter a valid original price.");
        return;
      }

      if (!Number.isInteger(parsedStock) || parsedStock < 0) {
        setError("Stock must be a whole number of zero or more.");
        return;
      }

      let finalImageUrl = imageUrl.trim() || null;

      if (finalImageUrl) {
        try {
          const parsedUrl = new URL(finalImageUrl);
          if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            throw new Error("Invalid protocol");
          }
        } catch {
          setError("Please enter a valid image URL starting with https:// or http://.");
          return;
        }
      }

      if (imageFile) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(imageFile.type)) {
          setError("Choose a JPG, PNG, or WebP image.");
          return;
        }

        if (imageFile.size > 5 * 1024 * 1024) {
          setError("Image size must be 5 MB or less.");
          return;
        }

        const extensionByType: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
        };

        const extension = extensionByType[imageFile.type];
        const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile, {
            contentType: imageFile.type,
            upsert: false,
          });

        if (uploadError) {
          setError("Image upload failed. Check your Storage permissions and try again.");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("products")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          category_id: categoryId ? Number(categoryId) : null,
          selling_price: parsedPrice,
          original_price: parsedOriginalPrice,
          stock_quantity: parsedStock,
          image_url: finalImageUrl,
          is_active: isActive,
        });

      if (insertError) {
        setError(
          "Product could not be saved. Check your database permissions and try again."
        );
        return;
      }

      setMessage("Product added successfully!");

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 shadow-sm md:px-10">
        <div className="flex items-center gap-4">
          <BudgetBasketLogo
            width={180}
            height={80}
            href="/admin"
            className="h-14 w-auto"
          />
          <div className="border-l border-gray-200 pl-4">
            <h1 className="text-2xl font-black">Add New Product</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add products to your Budget Basket store
            </p>
          </div>
        </div>

        <Link
          href="/admin"
          className="rounded-full border border-gray-300 px-5 py-3 text-sm font-bold hover:bg-gray-50"
        >
          ← Back to Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <section>
            <h2 className="mb-5 text-xl font-extrabold">Product Details</h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold">
                  Product Name *
                </label>
                <input
                  id="name"
                  required
                  maxLength={150}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-bold">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  maxLength={5000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-bold">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={loadingCategories}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-yellow-500"
                >
                  <option value="">
                    {loadingCategories ? "Loading categories..." : "Select a category"}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 pt-7">
            <h2 className="mb-5 text-xl font-extrabold">Pricing & Inventory</h2>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="sellingPrice" className="mb-2 block text-sm font-bold">
                  Selling Price (₹) *
                </label>
                <input
                  id="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="160"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="originalPrice" className="mb-2 block text-sm font-bold">
                  Original Price (₹)
                </label>
                <input
                  id="originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="299"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="stock" className="mb-2 block text-sm font-bold">
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 pt-7">
            <h2 className="mb-2 text-xl font-extrabold">Product Image</h2>
            <p className="mb-5 text-sm text-gray-500">
              Upload a JPG, PNG, or WebP image up to 5 MB, or paste an image URL.
              You can choose photos from your iPhone when opening this page on it.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="imageFile" className="mb-2 block text-sm font-bold">
                  Upload Image
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    setImageFile(e.target.files?.[0] ?? null);
                    setError("");
                  }}
                  className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
                />
              </div>

              <div className="text-center text-sm font-bold text-gray-400">
                OR
              </div>

              <div>
                <label htmlFor="imageUrl" className="mb-2 block text-sm font-bold">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setError("");
                  }}
                  placeholder="https://example.com/product.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              {(previewUrl || imageUrl.trim()) && (
                <div>
                  <p className="mb-2 text-sm font-bold">Image Preview</p>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Selected product preview"
                      className="h-48 w-48 rounded-xl border border-gray-200 object-contain"
                    />
                  ) : (
                    <img
                      src={imageUrl}
                      alt="Product URL preview"
                      className="h-48 w-48 rounded-xl border border-gray-200 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="border-t border-gray-100 pt-7">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-5 w-5 accent-yellow-500"
              />
              <span className="text-sm font-bold">
                Make this product visible to customers
              </span>
            </label>
          </section>

          {error && (
            <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div role="status" className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={saving || loadingCategories}
              className="rounded-full bg-yellow-400 px-8 py-3 font-extrabold text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Product..." : "Save Product"}
            </button>

            <Link
              href="/admin"
              className="rounded-full border border-gray-300 px-8 py-3 font-bold transition hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

