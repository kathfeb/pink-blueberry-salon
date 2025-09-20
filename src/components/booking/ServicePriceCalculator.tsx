import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  addServiceAddOn,
  removeServiceAddOn,
  toggleSpecialRequest,
  applyDiscountCode,
  removeDiscountCode,
  ServiceAddOn,
} from "../../modules/booking/bookingSlice";
import {
  Calculator,
  Plus,
  Minus,
  Tag,
  Clock,
  Home,
  Zap,
  Calendar,
  X,
  CheckCircle,
} from "lucide-react";

// Add-ons disponibles según el servicio
const availableAddOns: { [key: string]: ServiceAddOn[] } = {
  cuts: [
    {
      id: "deep-condition",
      name: "Deep Conditioning",
      price: 45,
      description: "Intensive moisture treatment",
    },
    {
      id: "scalp-massage",
      name: "Scalp Massage",
      price: 20,
      description: "Relaxing 10-minute massage",
    },
    {
      id: "beard-trim",
      name: "Beard Trim & Shape",
      price: 25,
      description: "Professional beard grooming",
    },
  ],
  color: [
    {
      id: "olaplex",
      name: "Olaplex Treatment",
      price: 35,
      description: "Bond-building treatment",
    },
    {
      id: "gloss-treatment",
      name: "Gloss Treatment",
      price: 40,
      description: "Shine-enhancing gloss",
    },
    {
      id: "toner",
      name: "Custom Toner",
      price: 30,
      description: "Personalized color toning",
    },
  ],
  treatments: [
    {
      id: "hair-mask",
      name: "Luxury Hair Mask",
      price: 25,
      description: "Premium hair mask treatment",
    },
    {
      id: "steam-therapy",
      name: "Steam Therapy",
      price: 30,
      description: "Deep penetrating steam treatment",
    },
  ],
  styling: [
    {
      id: "heat-protection",
      name: "Heat Protection Package",
      price: 15,
      description: "Premium heat protection products",
    },
    {
      id: "finishing-spray",
      name: "Luxury Finishing Spray",
      price: 10,
      description: "Long-lasting hold",
    },
  ],
};

export const ServicePriceCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { service, addOns, specialRequests, discountCode, breakdown } =
    useSelector((state: RootState) => state.booking);
  const [promoCode, setPromoCode] = useState("");
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);
  const [showPromoError, setShowPromoError] = useState(false);

  if (!service) {
    return null;
  }

  const serviceAddOns = availableAddOns[service.category] || [];
  const isAddOnSelected = (addOnId: string) =>
    addOns.some((addon) => addon.id === addOnId);

  const handleAddOnToggle = (addon: ServiceAddOn) => {
    if (isAddOnSelected(addon.id)) {
      dispatch(removeServiceAddOn(addon.id));
    } else {
      dispatch(addServiceAddOn(addon));
    }
  };

  const handlePromoCode = () => {
    const validCodes = [
      "FIRST10",
      "SUMMER20",
      "WELCOME15",
      "SAVE25",
      "LOYAL50",
    ];
    if (validCodes.includes(promoCode.toUpperCase())) {
      dispatch(applyDiscountCode(promoCode.toUpperCase()));
      setShowPromoSuccess(true);
      setShowPromoError(false);
      setTimeout(() => setShowPromoSuccess(false), 3000);
    } else {
      setShowPromoError(true);
      setTimeout(() => setShowPromoError(false), 3000);
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscountCode());
    setPromoCode("");
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="text-pink-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-gray-800">
          Customize Your Experience
        </h3>
      </div>

      {/* Service Add-ons */}
      {serviceAddOns.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">
            Enhance Your Service
          </h4>
          <div className="space-y-3">
            {serviceAddOns.map((addon) => (
              <div
                key={addon.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isAddOnSelected(addon.id)
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 bg-white hover:border-pink-300"
                }`}
                onClick={() => handleAddOnToggle(addon)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isAddOnSelected(addon.id)
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isAddOnSelected(addon.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{addon.name}</p>
                      <p className="text-sm text-gray-600">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      isAddOnSelected(addon.id)
                        ? "text-pink-600"
                        : "text-gray-700"
                    }`}
                  >
                    +${addon.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Requests */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Special Requests</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer hover:border-pink-300 transition-all bg-white">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={specialRequests.expressService}
                onChange={() =>
                  dispatch(toggleSpecialRequest("expressService"))
                }
                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
              />
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Express Service</p>
                  <p className="text-sm text-gray-600">
                    Get it done 30% faster
                  </p>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-700">+30%</span>
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer hover:border-pink-300 transition-all bg-white">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={specialRequests.weekendAppointment}
                onChange={() =>
                  dispatch(toggleSpecialRequest("weekendAppointment"))
                }
                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
              />
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Weekend Appointment</p>
                  <p className="text-sm text-gray-600">
                    Saturday or Sunday booking
                  </p>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-700">+$20</span>
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer hover:border-pink-300 transition-all bg-white">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={specialRequests.homeService}
                onChange={() => dispatch(toggleSpecialRequest("homeService"))}
                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
              />
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Home Service</p>
                  <p className="text-sm text-gray-600">We come to you</p>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-700">+$50</span>
          </label>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Promo Code</h4>
        {!discountCode ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handlePromoCode}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                Code {discountCode} applied!
              </span>
            </div>
            <button
              onClick={handleRemoveDiscount}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {showPromoSuccess && (
          <p className="text-green-600 text-sm mt-2">
            ✓ Promo code applied successfully!
          </p>
        )}
        {showPromoError && (
          <p className="text-red-600 text-sm mt-2">
            ✗ Invalid promo code. Try FIRST10 or SUMMER20
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-lg p-5 space-y-3">
        <h4 className="font-semibold text-gray-700 mb-3">Price Breakdown</h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Base Service ({service.name}):
            </span>
            <span className="font-medium">
              ${breakdown.servicePrice.toFixed(2)}
            </span>
          </div>

          {breakdown.addOnsTotal > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Add-ons:</span>
              <span className="font-medium">
                +${breakdown.addOnsTotal.toFixed(2)}
              </span>
            </div>
          )}

          {breakdown.specialRequestsTotal > 0 && (
            <div className="flex justify-between text-blue-600">
              <span>Special Requests:</span>
              <span className="font-medium">
                +${breakdown.specialRequestsTotal.toFixed(2)}
              </span>
            </div>
          )}

          {breakdown.discountAmount > 0 && (
            <div className="flex justify-between text-pink-600">
              <span>Discount:</span>
              <span className="font-medium">
                -${breakdown.discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t pt-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-medium">
                ${(breakdown.subtotal - breakdown.discountAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%):</span>
              <span className="font-medium">${breakdown.tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-pink-600 text-xl">
                ${breakdown.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {breakdown.discountAmount > 0 && (
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-3 mt-3">
            <p className="text-center text-sm font-medium text-pink-600">
              🎉 You're saving ${breakdown.discountAmount.toFixed(2)}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
