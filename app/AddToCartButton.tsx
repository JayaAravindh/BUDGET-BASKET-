"use client";

import { useCart } from "../components/CartContext";

type Product = {
  id: number;
  name: string;
  selling_price: number;
  image_url: string | null;
  stock_quantity: number;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addItem, changeQuantity, removeItem, items } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(product)}
        className="w-full rounded-full bg-yellow-400 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-500"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-full border-2 border-yellow-400 bg-yellow-50 p-1">
      <button
        type="button"
        onClick={() => {
          if (quantity === 1) {
            removeItem(product.id);
          } else {
            changeQuantity(product.id, quantity - 1);
          }
        }}
        aria-label="Decrease quantity"
        className="flex h-10 w-12 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold hover:bg-yellow-500"
      >
        −
      </button>

      <span className="min-w-10 text-center text-lg font-extrabold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => changeQuantity(product.id, quantity + 1)}
        aria-label="Increase quantity"
        className="flex h-10 w-12 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold hover:bg-yellow-500"
      >
        +
      </button>
    </div>
  );
}
