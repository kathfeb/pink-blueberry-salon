import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";

const steps = [
  { number: 1, name: "Service" },
  { number: 2, name: "Stylist" },
  { number: 3, name: "Date & Time" },
  { number: 4, name: "Information" },
  { number: 5, name: "Confirmation" },
];

export const BookingProgress: React.FC = () => {
  const currentStep = useSelector(
    (state: RootState) => state.booking.currentStep
  );

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-semibold transition-all duration-300
                    ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {step.number}
                </div>
                <span
                  className={`
                  mt-2 text-xs sm:text-sm font-medium
                  ${currentStep >= step.number ? "text-slate-800" : "text-gray-400"}
                `}
                >
                  {step.name}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                  flex-1 h-1 mx-2 transition-all duration-300
                  ${currentStep > step.number ? "bg-gradient-to-r from-pink-500 to-blue-500" : "bg-gray-200"}
                `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
