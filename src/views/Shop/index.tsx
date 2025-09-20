import { useState } from "react";
import { products } from "../../data/products";
import ProductCard from "../../components/shop/ProductCard";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "Hair Care" | "Organic Soap"
  >("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const categories = ["all", "Hair Care", "Organic Soap"] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Shop Our Products
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
            >
              {category === "all" ? "All Products" : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
