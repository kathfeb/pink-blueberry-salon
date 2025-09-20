import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { addToCart } from "../../modules/cart/cartSlice";
import { products } from "../../data/products";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "Hair Care" | "Organic Soap"
  >("all");
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

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
          {filteredProducts.map((product) => {
            const isInCart = cart.items.some(
              (item) => item.product.id === product.id
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                  <span className="text-6xl">
                    {product.category === "Hair Care" ? "🧴" : "🧼"}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-500">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isInCart}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        isInCart
                          ? "bg-gray-200 text-gray-500 cursor-default"
                          : "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105"
                      }`}
                    >
                      {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
