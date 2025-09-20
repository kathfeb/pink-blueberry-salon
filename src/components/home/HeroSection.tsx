import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-subtle min-h-[600px] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-display-md md:text-display-lg font-light text-slate-800 mb-2 animate-fade-in">
              The Pink Blueberry
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light animate-slide-up animation-delay-200">
              Where Luxury Meets Natural Beauty
            </p>
          </div>

          {/* Hero content */}
          <div className="space-y-6 animate-slide-up animation-delay-400">
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
              Experience the art of hair transformation with our expert
              stylists, premium products, and personalized service in a
              luxurious setting.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => navigate("/book")}
                className="animate-scale-in animation-delay-600"
              >
                Book Your Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/services")}
                className="animate-scale-in animation-delay-800"
              >
                Explore Services
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-600 animate-fade-in animation-delay-1000">
            <div className="flex items-center gap-2">
              <span className="text-pink-500">★★★★★</span>
              <span>4.9 Average Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🏆</span>
              <span>Award Winning Salon</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="text-pink-500">💎</span>
              <span>Premium Products Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
