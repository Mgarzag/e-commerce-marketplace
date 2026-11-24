// Import Next.js Image component for optimized image loading.
import Image from "next/image";
// Import Next.js Link component for client-side navigation.
import Link from "next/link";
// Import the DummyProduct interface as a type from our API service.
import type { DummyProduct } from "@/services/dummyJsonService";

import DummyAddToCartButton from "./DummyAddToCartButton";

// Define the props that this component expects. The component must receive a product object matching the DummyProduct interface.
interface DummyProductCardProps {
  product: DummyProduct;
}

// Create and export the DummyProductCard component. Destructure the product object from the component's props.
export default function DummyProductCard({
  product,
}: DummyProductCardProps) {
  return (
    // Main container for an individual product card. Tailwind classes add a border, rounded corners, padding, and shadow effects.
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">

      {/* Make the product image and title clickable. */}
      {/* Clicking either takes the user to that product's detail page. */}
      <Link href={`/products/${product.id}`}>

      {/* Image container.
            "relative" allows the Image component to use the "fill" property.
            "h-48" sets the image container's height.
            "mb-4" adds space below the image. */}
        <div className="relative w-full h-48 mb-4">

          {/* Display the product's thumbnail image from DummyJSON. */}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain"
          />
        </div>

        <h2 className="font-semibold text-lg mb-2">
          {product.title}
        </h2>
      </Link>

      <p className="text-gray-600 text-sm mb-3">
        {product.description}
      </p>

        {/* Container for the product price and rating.
          Flexbox places them on opposite sides of the card. */}
      <div className="flex justify-between items-center">

        {/* Display the product price with two decimal places. */}
        <span className="font-bold text-lg">
          ${product.price.toFixed(2)}
        </span>

          {/* Display the product's rating with a star symbol. */}
        <span className="text-sm text-yellow-600">
          ★ {product.rating}
        </span>
      </div>

      <DummyAddToCartButton product={product} />
      
    </div>
  );
}
