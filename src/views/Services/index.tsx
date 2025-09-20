import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../data/services";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(services.map((service) => service.category))),
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container-app">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="heading-display mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience luxury and transformation with our comprehensive range of
            professional hair services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:shadow-md"
              }`}
            >
              {category === "all"
                ? "All Services"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card group">
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
              <span className="badge-pink mb-4">{service.category}</span>

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
              <button onClick={handleBookNow} className="btn-primary w-full">
                Book This Service
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="heading-section mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our expert stylists are ready to help you achieve your dream hair.
            Book your appointment today!
          </p>
          <button onClick={handleBookNow} className="btn-primary btn-lg">
            Book Your Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
