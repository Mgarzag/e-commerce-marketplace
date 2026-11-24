
import { pool } from "@/src/lib/postgres";
import type { CartItem } from "@/types/cart";

// Retrieve an existing cart or create one for the customer.
async function getOrCreateCartId(userId: string): Promise<string> {
  const result = await pool.query(
    `
    INSERT INTO public."Cart" (user_id)
    VALUES ($1)
    ON CONFLICT (user_id)
    DO UPDATE SET updated_at = NOW()
    RETURNING id;
    `,
    [userId]
  );

  return result.rows[0].id;
}

// Retrieve all items belonging to a customer's cart.
export async function getCart(userId: string): Promise<CartItem[]> {
  const result = await pool.query(
    `
    SELECT
      product_id AS id,
      title AS name,
      price::text AS price,
      thumbnail AS "imageUrl",
      quantity
    FROM public."CartItem"
    WHERE cart_id = (
      SELECT id
      FROM public."Cart"
      WHERE user_id = $1
    )
    ORDER BY title;
    `,
    [userId]
  );

  return result.rows.map((item) => ({
    ...item,
    id: Number(item.id),
    quantity: Number(item.quantity),
  })) as CartItem[];
}

// Add a product to the customer's cart.
export async function addCartItem(
  userId: string,
  product: Omit<CartItem, "quantity">
): Promise<void> {
  const cartId = await getOrCreateCartId(userId);

  await pool.query(
    `
    INSERT INTO public."CartItem" (
      cart_id,
      product_id,
      title,
      price,
      thumbnail,
      quantity
    )
    VALUES ($1, $2, $3, $4, $5, 1)
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET
      quantity = "CartItem".quantity + 1,
      title = EXCLUDED.title,
      price = EXCLUDED.price,
      thumbnail = EXCLUDED.thumbnail;
    `,
    [
      cartId,
      product.id,
      product.name,
      product.price,
      product.imageUrl ?? null,
    ]
  );

  await pool.query(
    `UPDATE public."Cart" SET updated_at = NOW() WHERE id = $1`,
    [cartId]
  );
}

// Update the quantity of a product in the customer's cart.
export async function updateCartItemQuantity(
  userId: string,
  productId: number,
  quantity: number
): Promise<void> {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer.");
  }

  await pool.query(
    `
    UPDATE public."CartItem"
    SET quantity = $1
    WHERE product_id = $2
      AND cart_id = (
        SELECT id
        FROM public."Cart"
        WHERE user_id = $3
      );
    `,
    [quantity, productId, userId]
  );
}

// Remove a product from the customer's cart.
export async function removeCartItem(
  userId: string,
  productId: number
): Promise<void> {
  await pool.query(
    `
    DELETE FROM public."CartItem"
    WHERE product_id = $1
      AND cart_id = (
        SELECT id
        FROM public."Cart"
        WHERE user_id = $2
      );
    `,
    [productId, userId]
  );
}
