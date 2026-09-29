"use client";

import Link from "next/link";
// Imports the custom useCart hook so this component can access shopping cart information.
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // Gets the total number of items in the shopping cart from CartContext.
  const { cartCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* 
          Logo / marketplace name.
          Clicking this link sends the user to the home page.
        */}
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