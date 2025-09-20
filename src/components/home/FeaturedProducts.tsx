import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../shop/ProductCard";
import Button from "../common/Button";
import { products } from "../../data/products";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();

  // Show first 3 products as featured
  const featuredProducts = products.slice(0, 3);

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
            <div
              key={product.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
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
