import { db } from "@/src/prisma/db";

// Create and export an asynchronous function that retrieves all products.
// "export" allows this function to be imported and used in other files,
// such as app/products/page.tsx.
export async function getProducts() {
    // Access the Product model in the public PostgreSQL schema
  // and retrieve all Product records from the database.
  //
  // Because this database operation is asynchronous, the function
  // returns a Promise containing the products.
  return db.orm.public.Product.all();
}