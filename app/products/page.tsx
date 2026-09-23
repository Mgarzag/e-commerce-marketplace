import { getProducts } from "@/services/productService";
import ProductGrid from "@/components/products/ProductGrid";
import styles from "@/components/products/products.module.css";

// Define the Products page as an async Server Component.
// It needs to be async because we're retrieving product data from the database.
export default async function ProductsPage() {

    // Call getProducts() and wait for the database query to finish.
  // The returned products are stored in the products variable.
  const products = await getProducts();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Products
      </h1>

      <ProductGrid products={products} />
    
    </main>
  );
}