import { getProductById } from "@/services/productService";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  // Get the id from the URL
  const { id } = await params;

  // Convert the id from a string to a number
  const productId = Number(id);

  // Retrieve the product from the database
  const product = await getProductById(productId);

  // Show Next.js's 404 page if the product doesn't exist
  if (!product) {
    notFound();
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>${product.price}</p>
    </main>
  );
}