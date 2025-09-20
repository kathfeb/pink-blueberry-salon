import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import { previousStep, resetBooking } from "../../modules/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

export const BookingSummary: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector((state: RootState) => state.booking);

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleConfirm = () => {
    // In a real app, this would send to an API
    // For now, we'll just show a success message and reset
    alert("Booking Confirmed! We'll send you a confirmation email shortly.");
    dispatch(resetBooking());
    navigate("/");
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-8 text-center">
        Review Your Booking
      </h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-6">
          <h3 className="text-xl font-semibold">Booking Summary</h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Details */}
          <div className="border-b pb-4">
            <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
              Service
            </h4>
            <p className="text-lg font-semibold text-slate-800">
              {booking.service?.name}
            </p>
            <p className="text-slate-600">{booking.service?.description}</p>
            <div className="flex justify-between mt-2">
              <span className="text-slate-500">
                {booking.service?.duration} minutes
              </span>
              <span className="text-xl font-bold text-pink-500">
                ${booking.service?.price}
              </span>
            </div>
          </div>

          {/* Stylist Details */}
          <div className="border-b pb-4">
            <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
              Stylist
            </h4>
            <p className="text-lg font-semibold text-slate-800">
              {booking.stylist
                ? booking.stylist.name
                : "No Preference (We'll assign an available stylist)"}
            </p>
            {booking.stylist && (
              <p className="text-slate-600">{booking.stylist.title}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="border-b pb-4">
            <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
              Date & Time
            </h4>
            <p className="text-lg font-semibold text-slate-800">
              {formatDate(booking.date)}
            </p>
            <p className="text-slate-600">{booking.time}</p>
          </div>

          {/* Contact Information */}
          <div className="border-b pb-4">
            <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
              Contact Information
            </h4>
            <div className="space-y-1">
              <p className="text-slate-800">
                <span className="font-medium">Name:</span>{" "}
                {booking.customerInfo.name}
              </p>
              <p className="text-slate-800">
                <span className="font-medium">Email:</span>{" "}
                {booking.customerInfo.email}
              </p>
              <p className="text-slate-800">
                <span className="font-medium">Phone:</span>{" "}
                {booking.customerInfo.phone}
              </p>
              {booking.customerInfo.notes && (
                <p className="text-slate-800">
                  <span className="font-medium">Notes:</span>{" "}
                  {booking.customerInfo.notes}
                </p>
              )}
            </div>
          </div>

          {/* Add-ons if any */}
          {booking.addOns.length > 0 && (
            <div className="border-b pb-4">
              <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
                Service Add-ons
              </h4>
              <div className="space-y-2">
                {booking.addOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between">
                    <span className="text-slate-700">{addon.name}</span>
                    <span className="text-slate-700">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests if any */}
          {(booking.specialRequests.expressService ||
            booking.specialRequests.weekendAppointment ||
            booking.specialRequests.homeService) && (
            <div className="border-b pb-4">
              <h4 className="text-sm font-medium text-slate-500 uppercase mb-2">
                Special Requests
              </h4>
              <div className="space-y-2">
                {booking.specialRequests.expressService && (
                  <div className="flex justify-between">
                    <span className="text-slate-700">
                      Express Service (30% faster)
                    </span>
                    <span className="text-slate-700">+30%</span>
                  </div>
                )}
                {booking.specialRequests.weekendAppointment && (
                  <div className="flex justify-between">
                    <span className="text-slate-700">Weekend Appointment</span>
                    <span className="text-slate-700">+$20</span>
                  </div>
                )}
                {booking.specialRequests.homeService && (
                  <div className="flex justify-between">
                    <span className="text-slate-700">Home Service</span>
                    <span className="text-slate-700">+$50</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-500 uppercase mb-3">
              Price Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700">Service:</span>
                <span className="text-slate-800">
                  ${booking.breakdown.servicePrice.toFixed(2)}
                </span>
              </div>
              {booking.breakdown.addOnsTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-700">Add-ons:</span>
                  <span className="text-green-600">
                    +${booking.breakdown.addOnsTotal.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.breakdown.specialRequestsTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-700">Special Requests:</span>
                  <span className="text-blue-600">
                    +${booking.breakdown.specialRequestsTotal.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.breakdown.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-700">
                    Discount ({booking.discountCode}):
                  </span>
                  <span className="text-pink-600">
                    -${booking.breakdown.discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-slate-700">Subtotal:</span>
                  <span className="text-slate-800">
                    $
                    {(
                      booking.breakdown.subtotal -
                      booking.breakdown.discountAmount
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Tax (8%):</span>
                  <span className="text-slate-800">
                    ${booking.breakdown.tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-slate-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-pink-500">
                    ${booking.breakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {booking.breakdown.discountAmount > 0 && (
              <div className="mt-3 text-center">
                <span className="text-sm font-medium text-green-600">
                  🎉 You saved ${booking.breakdown.discountAmount.toFixed(2)}!
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm text-slate-500 mb-6">
            * Payment will be collected at the salon. We accept cash, credit,
            and debit cards.
          </p>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
