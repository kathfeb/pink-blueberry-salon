import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import { setService, nextStep } from "../../modules/booking/bookingSlice";
import { services } from "../../data";

export const ServiceSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedService = useSelector(
    (state: RootState) => state.booking.service
  );

  const handleServiceSelect = (service: (typeof services)[0]) => {
    dispatch(setService(service));
  };

  const handleNext = () => {
    if (selectedService) {
      dispatch(nextStep());
    }
  };

  // Group services by category
  const servicesByCategory = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof services>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-8 text-center">
        Select Your Service
      </h2>

      <div className="space-y-8">
        {Object.entries(servicesByCategory).map(
          ([category, categoryServices]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`
                    p-6 rounded-xl cursor-pointer transition-all duration-300
                    ${
                      selectedService?.id === service.id
                        ? "bg-gradient-to-r from-pink-50 to-blue-50 border-2 border-pink-400 shadow-lg"
                        : "bg-white border-2 border-gray-200 hover:border-pink-300 hover:shadow-md"
                    }
                  `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-slate-800">
                        {service.name}
                      </h4>
                      <span className="text-2xl font-bold text-pink-500">
                        ${service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-2">{service.description}</p>
                    <p className="text-sm text-slate-500">
                      {service.duration} minutes
                    </p>
                    {service.popular && (
                      <span className="inline-block mt-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold rounded-full">
                        Popular Choice
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-300
            ${
              selectedService
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Next: Choose Stylist
        </button>
      </div>
    </div>
  );
};
