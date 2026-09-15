import { db } from "@/src/prisma/db";

// Retrieves all products from the Product table
export async function getProducts() {
  return db.orm.public.Product.all();
}

// Retrieves a single product that matches the given ID
export async function getProductById(id: number) {
  return db.orm.public.Product
    .where({ id })
    .first();
}