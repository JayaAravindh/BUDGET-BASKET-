import type { Metadata } from "next";
import { CartProvider } from "../components/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Basket | Home & More",
  description: "Shop useful home essentials at Budget Basket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
