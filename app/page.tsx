import Link from "next/link";
import { getProducts } from "@/services/productService";
import ProductGrid from "@/components/products/ProductGrid";
import styles from "./page.module.css";

export default async function HomePage() {
  const products = await getProducts();

  // Only show a few products on the homepage.
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Discover Products You&apos;ll Love
          </h1>

          <p className={styles.subtitle}>
            Browse products from our growing marketplace.
          </p>

          <Link
            href="/products"
            className={styles.shopButton}
          >
            Shop Products
          </Link>
        </div>
      </section>

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