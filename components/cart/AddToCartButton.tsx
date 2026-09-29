"use client";

// Import the Product type so this component knows what shape the product object should have.
import type { Product } from "@/types/product";
// Import the custom cart hook so we can access cart-related functions such as addToCart().
import { useCart } from "@/context/CartContext";

// Define the props this component expects. The component receives one Product object.
interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  // Get the addToCart function from the CartContext.
  const { addToCart } = useCart();

  // This function runs when the user clicks the "Add to Cart" button.
  const handleAddToCart = () => {
    // Pass the product information needed by the cart into the addToCart function.
    addToCart({
      id: product.id,
      name: product.name,
      // Convert the product price to a string before storing it in the cart.
      price: String(product.price),
      // Store the product image path if one exists. imageUrl may also be null.
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