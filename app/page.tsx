
import Link from "next/link";
import { getDummyProducts } from "@/services/dummyJsonService";
import DummyProductGrid from "@/components/products/DummyProductGrid";
import styles from "./page.module.css";

export default async function HomePage() {
  // Retrieve products exclusively from DummyJSON.
  const dummyProducts = await getDummyProducts();

  // Display only four featured products.
  const featuredProducts = dummyProducts.slice(0, 4);

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

      {/* Featured DummyJSON products */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>

            <Link href="/products">
              View All Products
            </Link>
          </div>

          <DummyProductGrid products={featuredProducts} />
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
                Explore products across different categories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
