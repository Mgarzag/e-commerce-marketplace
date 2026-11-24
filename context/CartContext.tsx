
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/types/cart";
import { authClient } from "@/src/lib/auth-client";

// Describes the functions and data available to components using the cart.
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  cartCount: number;
}

// Describes the JSON returned by your cart API routes.
interface CartApiResponse {
  cart: CartItem[];
}

// Create the context that components will use to access the cart.
const CartContext = createContext<CartContextType | undefined>(undefined);

// Keep a separate cart for visitors who are not logged in.
const GUEST_CART_KEY = "cart";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Get the current customer's authentication session.
  const { data: session, isPending } = authClient.useSession();

  // Get the logged-in customer's ID, or undefined for a guest.
  const userId = session?.user?.id;

  // Store the cart items in React state.
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load the appropriate cart whenever the authentication state changes.
  useEffect(() => {
    // Wait until Better Auth finishes checking the session.
    if (isPending) return;

    let cancelled = false;

    async function loadCart() {
      // If the customer is logged in, retrieve their cart from Neon.
      if (userId) {
        try {
          const response = await fetch("/api/cart");

          if (!response.ok) {
            throw new Error("Unable to retrieve your cart.");
          }

          const data: CartApiResponse = await response.json();

          // Avoid updating state if the customer has changed sessions.
          if (!cancelled) {
            setCart(data.cart);
          }
        } catch (error) {
          console.error("Error loading customer cart:", error);

          if (!cancelled) {
            setCart([]);
          }
        }

        return;
      }

      // If the visitor is not logged in, load their browser-only cart.
      try {
        const savedCart = localStorage.getItem(GUEST_CART_KEY);

        if (savedCart) {
          const parsedCart: unknown = JSON.parse(savedCart);

          if (Array.isArray(parsedCart) && !cancelled) {
            setCart(parsedCart as CartItem[]);
          }
        } else if (!cancelled) {
          setCart([]);
        }
      } catch (error) {
        console.error("Error loading guest cart:", error);

        if (!cancelled) {
          setCart([]);
        }
      }
    }

    loadCart();

    // Prevent an old request from updating state after a session change.
    return () => {
      cancelled = true;
    };
  }, [userId, isPending]);

  // Add a product to the cart.
  const addToCart = useCallback(
    async (product: Omit<CartItem, "quantity">) => {
      // Logged-in customers save their cart in Neon through the API.
      if (userId) {
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          if (!response.ok) {
            throw new Error("Unable to add product to cart.");
          }

          const data: CartApiResponse = await response.json();

          // Replace the current cart with the updated database cart.
          setCart(data.cart);
        } catch (error) {
          console.error("Error adding product to customer cart:", error);
        }

        return;
      }

      // Visitors who are not logged in use localStorage.
      setCart((currentCart) => {
        const existingItem = currentCart.find(
          (item) => item.id === product.id
        );

        const updatedCart = existingItem
          ? currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...currentCart, { ...product, quantity: 1 }];

        localStorage.setItem(
          GUEST_CART_KEY,
          JSON.stringify(updatedCart)
        );

        return updatedCart;
      });
    },
    [userId]
  );

  // Update the quantity of a product in the cart.
  const updateQuantity = useCallback(
    async (id: number, quantity: number) => {
      // Only allow positive whole-number quantities.
      if (!Number.isInteger(quantity) || quantity < 1) {
        return;
      }

      // Logged-in customers update their Neon cart through PATCH.
      if (userId) {
        try {
          const response = await fetch(`/api/cart/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });

          if (!response.ok) {
            throw new Error("Unable to update cart quantity.");
          }

          const data: CartApiResponse = await response.json();

          setCart(data.cart);
        } catch (error) {
          console.error("Error updating customer cart:", error);
        }

        return;
      }

      // Update the browser-only cart for visitors.
      setCart((currentCart) => {
        const updatedCart = currentCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        localStorage.setItem(
          GUEST_CART_KEY,
          JSON.stringify(updatedCart)
        );

        return updatedCart;
      });
    },
    [userId]
  );

  // Remove a product from the cart.
  const removeFromCart = useCallback(
    async (id: number) => {
      // Logged-in customers remove products through DELETE.
      if (userId) {
        try {
          const response = await fetch(`/api/cart/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Unable to remove product from cart.");
          }

          const data: CartApiResponse = await response.json();

          setCart(data.cart);
        } catch (error) {
          console.error("Error removing product from customer cart:", error);
        }

        return;
      }

      // Remove the product from the browser-only cart.
      setCart((currentCart) => {
        const updatedCart = currentCart.filter(
          (item) => item.id !== id
        );

        localStorage.setItem(
          GUEST_CART_KEY,
          JSON.stringify(updatedCart)
        );

        return updatedCart;
      });
    },
    [userId]
  );

  // Calculate the total number of individual products in the cart.
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  // Make the cart data and functions available to child components.
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook that allows components to access the cart.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
