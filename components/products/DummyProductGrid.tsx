// Import the DummyProduct type from the DummyJSON service. This ensures that each product follows the expected data structure.
import type { DummyProduct } from "@/services/dummyJsonService";
// Import the component responsible for displaying an individual product.
import DummyProductCard from "./DummyProductCard";

// Define the props that DummyProductGrid accepts. The component expects an array of DummyProduct objects.
interface DummyProductGridProps {
  products: DummyProduct[];
}

// Define the DummyProductGrid component. It receives the products array as a prop.
export default function DummyProductGrid({
  products,
}: DummyProductGridProps) {
  return (
    // Create a responsive CSS grid for displaying products.
    // 1 column on small screens.
    // 2 columns on medium screens.
    // 4 columns on large screens.
    // gap-6 adds spacing between product cards.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Loop through the products array and render a card for each product. */}
      {products.map((product) => (

        // Render an individual product card.
        // key={product.id} gives React a unique identifier
        // for each product when updating the list.
        // product={product} passes the current product's data
        // to the DummyProductCard component.
        <DummyProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}