import type { ReactNode } from "react";
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
