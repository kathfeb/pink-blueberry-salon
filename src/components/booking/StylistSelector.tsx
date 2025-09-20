import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  setStylist,
  nextStep,
  previousStep,
} from "../../modules/booking/bookingSlice";
import { stylists } from "../../data";

export const StylistSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStylist = useSelector(
    (state: RootState) => state.booking.stylist
  );
  const selectedService = useSelector(
    (state: RootState) => state.booking.service
  );

  const handleStylistSelect = (stylist: (typeof stylists)[0] | null) => {
    dispatch(setStylist(stylist));
  };

  const handleNext = () => {
    if (selectedStylist !== undefined) {
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-8 text-center">
        Choose Your Stylist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stylists.map((stylist) => (
          <div
            key={stylist.id}
            onClick={() => handleStylistSelect(stylist)}
            className={`
              p-6 rounded-xl cursor-pointer transition-all duration-300
              ${
                selectedStylist?.id === stylist.id
                  ? "bg-gradient-to-r from-pink-50 to-blue-50 border-2 border-pink-400 shadow-lg"
                  : "bg-white border-2 border-gray-200 hover:border-pink-300 hover:shadow-md"
              }
            `}
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center text-3xl">
                {stylist.image || "👤"}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {stylist.name}
                </h3>
                <p className="text-sm text-slate-600 mb-2">{stylist.title}</p>
                <div className="flex items-center space-x-1 mb-2">
                  {renderRatingStars(stylist.rating)}
                  <span className="text-sm text-slate-500 ml-1">
                    ({stylist.rating})
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{stylist.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {stylist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-pink-100 to-blue-100 text-slate-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* No Preference Option */}
        <div
          onClick={() => handleStylistSelect(null)}
          className={`
            p-6 rounded-xl cursor-pointer transition-all duration-300
            ${
              selectedStylist === null
                ? "bg-gradient-to-r from-pink-50 to-blue-50 border-2 border-pink-400 shadow-lg"
                : "bg-white border-2 border-gray-200 hover:border-pink-300 hover:shadow-md"
            }
          `}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl mb-4">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No Preference
            </h3>
            <p className="text-sm text-slate-600">
              Let us match you with an available stylist based on your service
              needs
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={selectedStylist === undefined}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-300
            ${
              selectedStylist !== undefined
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Next: Select Date & Time
        </button>
      </div>
    </div>
  );
};
