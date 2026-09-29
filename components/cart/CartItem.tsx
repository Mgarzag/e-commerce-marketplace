"use client";

// Import Next.js's optimized Image component.
import Image from "next/image";
// Import the CartItem type. It is renamed to CartItemType so it does not conflict with the CartItem component name below.
import type { CartItem as CartItemType } from "@/types/cart";
// Import the custom cart hook so this component can update and remove items from the cart.
import { useCart } from "@/context/CartContext";

// Define the props that this component expects. It receives one cart item object.
interface CartItemProps {
  item: CartItemType;
}

// Create the CartItem component. The item prop is destructured from the component props.
export default function CartItem({
  item,
}: CartItemProps) {
  // Get the cart functions needed by this component.
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <article>
      {/* Only display an image if the item has an image URL. */}
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
          // Prevent the quantity from going below 1.
          disabled={item.quantity <= 1}
        >
          -
        </button>
        {/* Display the current quantity. */}
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