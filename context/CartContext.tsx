"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/types/cart";

// Defines the data and functions available
// throughout the shopping cart.
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cartCount: number;
}

// Create the context.
const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Provider props.
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Store all products currently in the cart.
  const [cart, setCart] = useState<CartItem[]>([]);

  // Tracks whether the saved cart has been loaded.
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the saved cart when the application starts.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        const parsed = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch {
      // Ignore invalid saved cart data.
    }

    setIsLoaded(true);
  }, []);

  // Save cart changes to localStorage.
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Add a product or increase its quantity.
  const addToCart = (
    product: Omit<CartItem, "quantity">
  ) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        { ...product, quantity: 1 },
      ];
    });
  };

  // Remove a product from the cart.
  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Change the quantity of a product.
  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Count all items, including quantities.
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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

// Custom hook for accessing the cart.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}