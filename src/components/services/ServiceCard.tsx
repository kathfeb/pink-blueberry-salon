import React from "react";
import { services as servicesData } from "../../data/services";

export type Service = (typeof servicesData)[number];

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="service-card group">
      {/* Service Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="text-2xl">
          {service.category === "cuts" && "✂️"}
          {service.category === "color" && "🎨"}
          {service.category === "treatments" && "✨"}
          {service.category === "styling" && "💫"}
        </span>
      </div>

      {/* Service Details */}
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-slate-600 mb-4">{service.description}</p>

      {/* Category Badge */}
      <span className="badge-pink mb-4">
        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
      </span>

      {/* Price and Duration */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-pink-500">
          ${service.price}
        </span>
        <span className="text-slate-500">
          <svg
            className="w-5 h-5 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {service.duration} min
        </span>
      </div>

      {/* Book Button */}
      <button onClick={() => onBook(service.id)} className="btn-primary w-full">
        Book This Service
      </button>
    </div>
  );
};

export default ServiceCard;
