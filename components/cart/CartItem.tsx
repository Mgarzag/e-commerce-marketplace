"use client";

import Image from "next/image";
import type { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({
  item,
}: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <article>
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={120}
          height={120}
        />
      )}

      <h2>{item.name}</h2>

      <p>${item.price}</p>

      <div>
        <button
          onClick={() =>
            updateQuantity(item.id, item.quantity - 1)
          }
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() =>
            updateQuantity(item.id, item.quantity + 1)
          }
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </article>
  );
}