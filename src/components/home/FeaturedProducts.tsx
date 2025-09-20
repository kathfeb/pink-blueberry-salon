import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "../common/Card";
import Button from "../common/Button";
import { addToCart } from "../../modules/cart/cartSlice";
import { products } from "../../data/products";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Show first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-heading-xl md:text-display-md font-light text-slate-800 mb-4">
            Premium Products
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take the salon experience home with our curated selection of
            professional hair care and organic beauty products
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              hover
              className="h-full flex flex-col animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product image placeholder */}
              <div className="bg-gradient-subtle rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-6xl">
                  {product.category === "Hair Care" ? "🧴" : "🧼"}
                </span>
              </div>

              {/* Product info */}
              <div className="flex-1 flex flex-col">
                {/* Category badge */}
                <span className="inline-block self-start px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-2">
                  {product.category}
                </span>

                {/* Product name */}
                <h3 className="text-heading-sm text-slate-800 mb-2 flex-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  {product.description}
                </p>

                {/* Price and action */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-light text-slate-800">
                      ${product.price}
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Shop CTA */}
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={() => navigate("/shop")}>
            Shop All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
