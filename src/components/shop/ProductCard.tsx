import React from "react";
import { products as productsData } from "../../data/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { addToCart } from "../../modules/cart/cartSlice";

export type Product = (typeof productsData)[number];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const isInCart = cart.items.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-500">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
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
};

export default ProductCard;
