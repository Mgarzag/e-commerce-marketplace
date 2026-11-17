
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

export default function Navbar() {
  // Gets the total number of items in the shopping cart.
  const { cartCount } = useCart();

  // Checks whether a customer is logged in.
  const { data: session, isPending } = authClient.useSession();

  // Allows navigation after logging out.
  const router = useRouter();

  // Logs out the current customer.
  async function handleLogout() {
    await authClient.signOut();
    router.refresh();
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Marketplace logo */}
        <Link href="/" className={styles.logo}>
          Marketplace
        </Link>

        {/* Main navigation links */}
        <div className={styles.links}>
          <Link href="/products" className={styles.link}>
            Products
          </Link>

          <Link href="/cart" className={styles.link}>
            Cart ({cartCount})
          </Link>
        </div>

        {/* Customer account links */}
        <div className={styles.accountLinks}>
          {!isPending && !session && (
            <>
              <Link href="/login" className={styles.link}>
                Login
              </Link>

              <Link href="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}

          {!isPending && session && (
            <>
              <span className={styles.link}>
                Welcome, {session.user.name}
              </span>

              <button
                type="button"
                className={styles.link}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
