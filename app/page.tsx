
import Link from "next/link";
import { getProducts } from "@/services/productService";
import { getDummyProducts } from "@/services/dummyJsonService";
import ProductGrid from "@/components/products/ProductGrid";
import DummyProductGrid from "@/components/products/DummyProductGrid";
import styles from "./page.module.css";

export default async function HomePage() {
  // Fetch products from both sources at the same time.
  const [products, dummyProducts] = await Promise.all([
    getProducts(),
    getDummyProducts(),
  ]);

  // Only show a few products from each catalog on the homepage.
  const featuredProducts = products.slice(0, 4);
  const featuredDummyProducts = dummyProducts.slice(0, 4);

  return (
    <main>
      {/* Homepage hero section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Discover Products You&apos;ll Love
          </h1>

          <p className={styles.subtitle}>
            Browse products from our growing marketplace.
          </p>

          <Link href="/products" className={styles.shopButton}>
            Shop Products
          </Link>
        </div>
      </section>

      {/* Products stored in your Neon database */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>

            <Link href="/products">
              View All Products
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Products retrieved from DummyJSON */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Explore More Products</h2>

            <Link href="/api-products">
              View All API Products
            </Link>
          </div>

          <DummyProductGrid products={featuredDummyProducts} />
        </div>
      </section>

      {/* Marketplace benefits */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2>Why Shop With Us?</h2>

          <div className={styles.benefitGrid}>
            <div>
              <h3>Wide Selection</h3>
              <p>
                Discover products across a growing marketplace.
              </p>
            </div>

            <div>
              <h3>Easy Shopping</h3>
              <p>
                Browse products and manage your cart in one place.
              </p>
            </div>

            <div>
              <h3>Marketplace Sellers</h3>
              <p>
                Support products from multiple sellers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
