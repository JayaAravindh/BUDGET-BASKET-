"use client";

import { useCart } from "./CartContext";

export default function CartBadge() {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
      {itemCount}
    </span>
  );
}
