// Import Next.js's Image component.
// This provides automatic image optimization.
import Image from "next/image";
// Import Next.js's Link component.
// This allows navigation between pages without a full page reload.
import Link from "next/link";
// Import the Product type.
// "type" tells TypeScript that this import is only being used for type checking.
import type { Product } from "@/types/product";
// Import the CSS Module containing styles specifically for ProductCard.
import styles from "./ProductCard.module.css";

// Define the props that ProductCard expects to receive.
interface ProductCardProps {
  // Each ProductCard receives one product object.
  product: Product;
}

// Create and export the ProductCard component.
// Destructure "product" from the component's props.
export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      {/* Check whether the product has an image URL. */}
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder}>
          No image available
        </div>
      )}

      {/* Container for the product's text and link. */}
      <div className={styles.content}>
        <h2 className={styles.name}>
          {product.name}
        </h2>

        <p className={styles.description}>
          {product.description}
        </p>

        <p className={styles.price}>
          ${product.price}
        </p>

        <Link
          href={`/products/${product.id}`}
          className={styles.link}
        >
          View Product
        </Link>
      </div>
    </article>
  );
}