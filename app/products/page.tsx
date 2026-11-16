import { getDummyProducts } from "@/services/dummyJsonService";
import DummyProductGrid from "@/components/products/DummyProductGrid";
import styles from "@/components/products/products.module.css";

// Define the Products page as an async Server Component.
// It needs to be async because we're retrieving product data from the database.
export default async function ProductsPage() {

    // Retrieve products from the DummyJSON API.
  const products = await getDummyProducts();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Products
      </h1>

      <DummyProductGrid products={products} />
    
    </main>
  );
}