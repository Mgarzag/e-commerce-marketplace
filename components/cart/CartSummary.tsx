"use client";

import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cart } = useCart();

  // Calculate the total price of all cart items.
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <section>
      <h2>Order Summary</h2>

      <p>
        Subtotal: ${subtotal.toFixed(2)}
      </p>

      <p>
        Shipping and taxes calculated at checkout.
      </p>
    </section>
  );
}