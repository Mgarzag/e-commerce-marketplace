"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: String(product.price),
      imageUrl: product.imageUrl,
    });
    alert("Added to cart!");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}