
"use client";

// Import the DummyJSON product type.
import type { DummyProduct } from "@/services/dummyJsonService";

// Import the existing shopping cart hook.
import { useCart } from "@/context/CartContext";

interface DummyAddToCartButtonProps {
  product: DummyProduct;
}

export default function DummyAddToCartButton({
  product,
}: DummyAddToCartButtonProps) {
  // Get the addToCart function from CartContext.
  const { addToCart } = useCart();

  // Add the DummyJSON product to the shopping cart.
  const handleAddToCart = () => {
    addToCart({
      // DummyJSON uses id instead of a database-specific ID.
      id: product.id,

      // Convert DummyJSON's title into the cart's name field.
      name: product.title,

      // Convert the price into a string for the cart.
      price: String(product.price),

      // Use the DummyJSON thumbnail as the cart image.
      imageUrl: product.thumbnail,
    });

    alert("Added to cart!");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  );
}
