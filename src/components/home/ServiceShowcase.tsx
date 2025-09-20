import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import { services } from "../../data";

const ServiceShowcase: React.FC = () => {
  const navigate = useNavigate();

  // Show featured services (first 3)
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-heading-xl md:text-display-md font-light text-slate-800 mb-4">
            Our Signature Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From precision cuts to stunning color transformations, experience
            excellence in every service
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <Card
              key={service.id}
              hover
              className="h-full animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                {/* Category badge */}
                <span className="inline-block px-3 py-1 text-sm font-medium text-pink-600 bg-pink-100 rounded-full mb-4">
                  {service.category.charAt(0).toUpperCase() +
                    service.category.slice(1)}
                </span>

                {/* Service name */}
                <h3 className="text-heading-md text-slate-800 mb-2">
                  {service.name}
                </h3>

                {/* Price */}
                <div className="text-3xl font-light text-pink-500 mb-4">
                  ${service.price}
                </div>

                {/* Duration */}
                <div className="text-sm text-slate-500 mb-4">
                  {service.duration} minutes
                </div>

                {/* Description */}
                <p className="text-slate-600 mb-6 min-h-[48px]">
                  {service.description}
                </p>

                {/* Book button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() =>
                    navigate("/book", {
                      state: { selectedService: service.id },
                    })
                  }
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View all services button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/services")}
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
