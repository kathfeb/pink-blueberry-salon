import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  setShippingOption,
  applyPromoCode,
  removePromoCode,
  selectShippingOptions,
  selectCartBreakdown,
} from "../../modules/cart/cartSlice";
import {
  Truck,
  Tag,
  X,
  CheckCircle,
  Package,
  Zap,
  Clock,
  Gift,
} from "lucide-react";

export const CartPriceCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const breakdown = useSelector(selectCartBreakdown);
  const shippingOptions = selectShippingOptions();
  const { shippingOption, promoCode } = useSelector(
    (state: RootState) => state.cart
  );
  const [promoInput, setPromoInput] = useState("");
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);
  const [showPromoError, setShowPromoError] = useState(false);

  const handleShippingChange = (optionId: string) => {
    dispatch(setShippingOption(optionId));
  };

  const handleApplyPromo = () => {
    const validCodes = ["SAVE10", "WELCOME20", "SHIP5", "BEAUTY15"];
    if (validCodes.includes(promoInput.toUpperCase())) {
      dispatch(applyPromoCode(promoInput.toUpperCase()));
      setShowPromoSuccess(true);
      setShowPromoError(false);
      setTimeout(() => setShowPromoSuccess(false), 3000);
    } else {
      setShowPromoError(true);
      setTimeout(() => setShowPromoError(false), 3000);
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
    setPromoInput("");
  };

  const isFreeShipping = breakdown.subtotal >= 50;

  return (
    <div className="space-y-4">
      {/* Shipping Options */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-500" />
          Shipping Options
        </h4>

        {isFreeShipping && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
            <p className="text-green-700 text-sm flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Congratulations! You qualify for FREE shipping!
            </p>
          </div>
        )}

        <div className="space-y-2">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                shippingOption?.id === option.id
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 bg-white hover:border-pink-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingOption?.id === option.id}
                  onChange={() => handleShippingChange(option.id)}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <div>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    {option.name}
                    {option.id === "express" && (
                      <Zap className="w-4 h-4 text-yellow-500" />
                    )}
                    {option.id === "overnight" && (
                      <Clock className="w-4 h-4 text-red-500" />
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
              <span
                className={`font-semibold ${isFreeShipping ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                ${option.price}
              </span>
            </label>
          ))}
        </div>

        {!isFreeShipping && (
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-medium">
              Add ${(50 - breakdown.subtotal).toFixed(2)}
            </span>{" "}
            more to qualify for free shipping!
          </p>
        )}
      </div>

      {/* Promo Code */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-pink-500" />
          Promo Code
        </h4>

        {!promoCode ? (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all"
              >
                Apply
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p>Try: SAVE10 (10% off $30+) or WELCOME20 (20% off $50+)</p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-500 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                {promoCode} applied!
              </span>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {showPromoSuccess && (
          <p className="text-green-600 text-sm mt-2">✓ Promo code applied!</p>
        )}
        {showPromoError && (
          <p className="text-red-600 text-sm mt-2">
            ✗ Invalid code. Try SAVE10 or WELCOME20
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Order Summary</h4>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              ${breakdown.subtotal.toFixed(2)}
            </span>
          </div>

          {breakdown.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-pink-600">
              <span>Discount:</span>
              <span className="font-medium">
                -${breakdown.discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">
              {isFreeShipping ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${breakdown.shippingCost.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (8%):</span>
            <span className="font-medium">${breakdown.tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-pink-600">
                ${breakdown.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {breakdown.discountAmount > 0 && (
          <div className="bg-white rounded-lg p-3 mt-3">
            <p className="text-center text-sm font-medium text-green-600">
              🎉 You saved ${breakdown.discountAmount.toFixed(2)}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
