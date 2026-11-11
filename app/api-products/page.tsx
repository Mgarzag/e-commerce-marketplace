import { getDummyProducts } from "@/services/dummyJsonService";
import DummyProductGrid from "@/components/products/DummyProductGrid";

export default async function APIProductsPage() {
  const products = await getDummyProducts();

  return (
    <main>
      <h1>DummyJSON Products</h1>

      <DummyProductGrid products={products} />
    </main>
  );
}