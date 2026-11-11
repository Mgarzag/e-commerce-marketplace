// Base URL for the DummyJSON Products API. All product requests will use this URL.
const API_URL = "https://dummyjson.com";

// Defines the structure of an individual product returned by the DummyJSON API.
export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  rating: number;
  stock: number;
}

// Defines the structure of the response returned when requesting multiple products.
interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Retrieve products from DummyJSON
export async function getDummyProducts() {
  // Send an HTTP GET request to retrieve up to 30 products.
  const response = await fetch(
    `${API_URL}/products?limit=30`,
    {
      // Cache the API response for one hour (3600 seconds).
      // After that, Next.js can refresh the cached data.
      next: { revalidate: 3600 },
    }
  );

  // Check whether the API request was successful. If the server returns an error, throw an exception.
  if (!response.ok) {
    throw new Error("Failed to fetch DummyJSON products");
  }
  // Convert the response body from JSON into a JavaScript object. TypeScript treats the result as DummyProductsResponse.
  const data: DummyProductsResponse = await response.json();

  // Return only the products array instead of the entire response.
  return data.products;
}

// Retrieves one specific product using its ID.
export async function getDummyProductById(id: number) {

  // Send an HTTP GET request for the product matching the supplied ID.
  const response = await fetch(
    `${API_URL}/products/${id}`,
    {
      // Cache the individual product response for one hour.
      next: { revalidate: 3600 },
    }
  );

  // If the product doesn't exist or the request fails, return null instead of throwing an error.
  if (!response.ok) {
    return null;
  }

  // Convert the JSON response into a DummyProduct object.
  const product: DummyProduct = await response.json();

  return product;
}