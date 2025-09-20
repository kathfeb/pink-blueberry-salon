import React from "react";
import HeroSection from "../../components/home/HeroSection";
import ServiceShowcase from "../../components/home/ServiceShowcase";
import FeaturedProducts from "../../components/home/FeaturedProducts";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServiceShowcase />
      <FeaturedProducts />

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-500">500+</div>
              <p className="text-slate-600 mt-2">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500">10+</div>
              <p className="text-slate-600 mt-2">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-500">4.9★</div>
              <p className="text-slate-600 mt-2">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500">50+</div>
              <p className="text-slate-600 mt-2">Awards Won</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
