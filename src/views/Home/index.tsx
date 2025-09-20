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

      {/* Testimonials */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container-app">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-3">
              What Our Clients Say
            </h2>
            <p className="text-slate-600">Real stories from happy guests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  💖
                </div>
                <div>
                  <p className="font-medium text-slate-800">Sofia R.</p>
                  <p className="text-xs text-slate-500">Color & Styling</p>
                </div>
              </div>
              <p className="text-slate-700">
                “Absolutely in love with my new look. The team is so talented
                and made me feel pampered from start to finish.”
              </p>
              <div className="mt-4 text-pink-500">★★★★★</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  ✨
                </div>
                <div>
                  <p className="font-medium text-slate-800">Maya L.</p>
                  <p className="text-xs text-slate-500">Keratin Treatment</p>
                </div>
              </div>
              <p className="text-slate-700">
                “My hair has never felt this smooth. Lovely ambience and premium
                products. Highly recommend!”
              </p>
              <div className="mt-4 text-pink-500">★★★★★</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  🌸
                </div>
                <div>
                  <p className="font-medium text-slate-800">Emily K.</p>
                  <p className="text-xs text-slate-500">Bridal Package</p>
                </div>
              </div>
              <p className="text-slate-700">
                “They brought my bridal vision to life. The attention to detail
                and care was exceptional.”
              </p>
              <div className="mt-4 text-pink-500">★★★★★</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
