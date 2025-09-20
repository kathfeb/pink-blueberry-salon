import React from "react";
import { Link } from "react-router-dom";
import { services, products } from "../data";
import { Button } from "../components/atoms/Button";
import { Card } from "../components/atoms/Card";

export const HomePage: React.FC = () => {
  const featuredServices = services.filter((s) => s.popular).slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-light text-slate-800 mb-4">
            Where Luxury Meets
            <span className="block font-normal bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Natural Beauty
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Experience premium salon services and discover our collection of
            organic beauty products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="shadow-pink">
                Book Appointment
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-4">
              Our Signature Services
            </h2>
            <p className="text-lg text-slate-600">
              Professional treatments tailored to your unique style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} hover>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-pink-500">
                      ${service.price}
                    </span>
                    <span className="text-sm text-slate-500">
                      {service.duration} min
                    </span>
                  </div>
                  <Link to="/booking">
                    <Button fullWidth>Book Now</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-slate-600">
              Professional hair care and organic beauty essentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} hover>
                <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg mb-4">
                  <div className="flex items-center justify-center h-48">
                    <span className="text-6xl">🧴</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-500">
                    ${product.price}
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline">Shop All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Book your appointment today and experience the difference
          </p>
          <Link to="/booking">
            <Button size="lg" className="shadow-pink">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
