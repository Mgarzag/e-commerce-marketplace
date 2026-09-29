"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
        >
          Marketplace
        </Link>

        <div className={styles.links}>
          <Link
            href="/products"
            className={styles.link}
          >
            Products
          </Link>

          <Link
            href="/cart"
            className={styles.link}
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}