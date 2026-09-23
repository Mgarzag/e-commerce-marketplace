// Import the Product type so TypeScript knows what data each product object should contain
import type { Product } from "@/types/product";
// Import the ProductCard component used to display each individual product
import ProductCard from "./ProductCard";
// Import the CSS module containing styles for the product grid
import styles from "./ProductGrid.module.css";

// Define the props that the ProductGrid component expects
interface ProductGridProps {
  // products must be an array of Product objects
  products: Product[];
}

// Create the ProductGrid component and extract the products array from its props
export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={styles.grid}>
       {/* Loop through the products array */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}