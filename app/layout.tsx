import type { ReactNode } from "react";
// Imports the CartProvider. This makes the shopping cart state available to components throughout the application.
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
