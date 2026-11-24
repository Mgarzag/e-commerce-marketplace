
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
} from "@/services/cartService";

// Defines the parameters received by this dynamic API route. Next.js provides the product ID through the URL.
interface RouteContext {
  params: Promise<{ id: string }>;
}

// Handles PATCH requests to update a product's quantity.
export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Retrieve the current customer's authentication session.
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Prevent customers who are not logged in from modifying a cart.
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Extract the product ID from the URL.
    const { id } = await params;
    const productId = Number(id);

    // Make sure the product ID is a valid positive integer.
    if (!Number.isSafeInteger(productId) || productId <= 0) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    // Read the request body containing the new product quantity.
    // Use unknown because incoming request data should be validated.
    const body: unknown = await request.json().catch(() => null);

    // Validate that the request contains a valid quantity.
    if (
      typeof body !== "object" ||
      body === null ||
      !("quantity" in body) ||
      typeof body.quantity !== "number" ||
      !Number.isInteger(body.quantity) ||
      body.quantity < 1
    ) {
      return NextResponse.json(
        { error: "Quantity must be a positive integer." },
        { status: 400 }
      );
    }

    // Update the product quantity in this customer's Neon cart.
    // The customer ID comes from the authenticated session.
    await updateCartItemQuantity(
      session.user.id,
      productId,
      body.quantity
    );

    // Retrieve the updated cart so the frontend receives the latest data.
    const cart = await getCart(session.user.id);

    // Return the updated cart as a JSON response.
    return NextResponse.json({ cart });
  } catch (error) {
    // Log unexpected errors for debugging.
    console.error("PATCH /api/cart/[id] error:", error);

    // Return an error response if the quantity update fails.
    return NextResponse.json(
      { error: "Unable to update cart item." },
      { status: 500 }
    );
  }
}

// Handles DELETE requests to remove a product from the cart.
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Retrieve the current customer's authentication session.
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Prevent customers who are not logged in from removing products.
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Extract the product ID from the URL.
    const { id } = await params;
    const productId = Number(id);

    // Make sure the product ID is a valid positive integer.
    if (!Number.isSafeInteger(productId) || productId <= 0) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    // Remove the specified product from this customer's Neon cart.
    await removeCartItem(session.user.id, productId);

    // Retrieve the updated cart after removing the product.
    const cart = await getCart(session.user.id);

    // Return the updated cart to the frontend.
    return NextResponse.json({ cart });
  } catch (error) {
    // Log unexpected errors for debugging.
    console.error("DELETE /api/cart/[id] error:", error);

    // Return an error response if removing the product fails.
    return NextResponse.json(
      { error: "Unable to remove cart item." },
      { status: 500 }
    );
  }
}
