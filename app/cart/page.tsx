"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main>
        <h1>Your Cart</h1>

        <p>Your shopping cart is empty.</p>

        <Link href="/products">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your Cart</h1>

      <div>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <CartSummary />

      <Link href="/products">
        Continue Shopping
      </Link>
    </main>
  );
}