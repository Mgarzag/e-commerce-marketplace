// Import Image for optimized product image rendering.
import Image from "next/image";

// Import Link for navigation between pages.
import Link from "next/link";

// Import notFound to display a 404 page when a product doesn't exist.
import { notFound } from "next/navigation";

// Import the function that retrieves an individual product from DummyJSON.
import { getDummyProductById } from "@/services/dummyJsonService";

// Define the props expected by this dynamic page.
// Next.js provides the product ID through the URL parameters.
interface DummyProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Create the product detail page.
export default async function DummyProductPage({
  params,
}: DummyProductPageProps) {

  // Retrieve the ID from the URL.
  const { id } = await params;

  // Convert the URL ID from a string into a number.
  const productId = Number(id);

  // Validate the ID before making an API request.
  // If the ID isn't a positive integer, display a 404 page.
  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  // Retrieve the product from the DummyJSON API.
  const product = await getDummyProductById(productId);

  // If the API doesn't return a product, display a 404 page.
  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* Link back to the DummyJSON product catalog. */}
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to Products
      </Link>

      {/* Main product details container. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product image section. */}
        <div className="relative w-full h-96 bg-gray-100 rounded-lg">

          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />

        </div>

        {/* Product information section. */}
        <div>

          {/* Product title. */}
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          {/* Product category. */}
          <p className="text-gray-500 mb-4 capitalize">
            Category: {product.category}
          </p>

          {/* Product price. */}
          <p className="text-2xl font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Product rating. */}
          <p className="text-yellow-600 mb-4">
            ★ {product.rating} / 5
          </p>

          {/* Product description. */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Product stock information. */}
          <p className="text-sm text-gray-600 mb-6">
            Stock available: {product.stock}
          </p>

        </div>
      </div>
    </main>
  );
}