import React from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../data";
import ServiceCard from "../services/ServiceCard";
import Button from "../common/Button";

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

        {/* Service cards (reuse the same as /services) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <div
              key={service.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                service={service}
                onBook={(serviceId) =>
                  navigate("/book", { state: { selectedService: serviceId } })
                }
              />
            </div>
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
