import Image from "next/image";
// Import the function that retrieves a single product
// from the database using its ID.
import { getProductById } from "@/services/productService";
// Import Next.js's notFound function.
// This displays the 404 Not Found page when called.
import { notFound } from "next/navigation";

// Define the props that Next.js passes to this dynamic page.
interface ProductPageProps {
     // Because this page is inside products/[id],
  // Next.js provides the dynamic URL parameter through params.
  //
  // In current Next.js versions, params is a Promise,
  // so it needs to be awaited before accessing id.
  params: Promise<{
    // URL parameters are initially strings.
    // For example, /products/3 gives us id = "3".
    id: string;
  }>;
}

// Define the dynamic product details page.
//
// This is an async Server Component because we need to
// wait for both the route parameters and the database query.
export default async function ProductPage({
  params,
}: ProductPageProps) {
  // Get the id from the URL
  const { id } = await params;

  // Convert the id from a string to a number
  const productId = Number(id);

   // Validate the product ID before querying the database.
  // The ID must be an integer greater than 0.
  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  // Retrieve the product from the database
  const product = await getProductById(productId);

  // Show Next.js's 404 page if the product doesn't exist
  if (!product) {
    notFound();
  }

  return (
    <main>
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
        />
      ) : (
        <div>No image available</div>
      )}
      
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>${product.price}</p>
    </main>
  );
}