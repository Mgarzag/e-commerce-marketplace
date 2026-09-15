import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Make each product card link to its product */}
      <Link href={`/products/${product.id}`}>
        View Product
      </Link>
    </div>
  );
}