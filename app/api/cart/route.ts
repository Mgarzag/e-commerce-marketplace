
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { getCart, addCartItem } from "@/services/cartService";

export async function GET() {
  try {
    // Identify the currently logged-in customer.
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Retrieve only this customer's cart.
    const cart = await getCart(session.user.id);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("GET /api/cart error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve cart." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Identify the currently logged-in customer.
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Read and validate the submitted product.
    const body: unknown = await request.json().catch(() => null);

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const product = body as Record<string, unknown>;

    const id = product.id;
    const name = product.name;
    const price = product.price;
    const imageUrl = product.imageUrl;

    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      id <= 0 ||
      typeof name !== "string" ||
      name.trim() === "" ||
      (typeof price !== "number" && typeof price !== "string") ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      (imageUrl !== null && imageUrl !== undefined &&
        typeof imageUrl !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid product information." },
        { status: 400 }
      );
    }

    // Save the product to this customer's Neon cart.
    await addCartItem(session.user.id, {
      id,
      name: name.trim(),
      price: String(price),
      imageUrl: typeof imageUrl === "string" ? imageUrl : null,
    });

    // Return the updated cart.
    const cart = await getCart(session.user.id);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("POST /api/cart error:", error);

    return NextResponse.json(
      { error: "Unable to add product to cart." },
      { status: 500 }
    );
  }
}
