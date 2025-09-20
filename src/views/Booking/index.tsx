import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  setService,
  setStylist,
  setDateTime,
  setCustomerInfo,
  resetBooking,
} from "../../modules/booking/bookingSlice";
import { services } from "../../data/services";
import { stylists } from "../../data/stylists";

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const booking = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  const steps = [
    { number: 1, name: "Service" },
    { number: 2, name: "Stylist" },
    { number: 3, name: "Date & Time" },
    { number: 4, name: "Your Info" },
    { number: 5, name: "Confirm" },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleServiceSelect = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) dispatch(setService(service));
  };

  const handleStylistSelect = (stylistId: number | null) => {
    const stylist: any = stylistId
      ? stylists.find((s) => s.id === stylistId)
      : null;
    dispatch(setStylist(stylist));
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    dispatch(setDateTime({ date, time }));
  };

  // Opción 2: enviar SIEMPRE el objeto completo de customerInfo
  type CustomerInfo = {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };

  const handleCustomerInfo = (info: CustomerInfo) => {
    console.log(info);
    dispatch(setCustomerInfo(info));
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", booking);
    alert("Booking confirmed! We'll see you soon!");
    dispatch(resetBooking());
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Book Your Appointment
        </h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-pink-500 to-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  {step.number}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {step.name}
                </span>
                {step.number < 5 && (
                  <div className="w-8 h-1 bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      booking.service?.id === service.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold text-pink-500">
                        ${service.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Stylist Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Choose Your Stylist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => handleStylistSelect(null)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    booking.stylist === null
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <h3 className="text-lg font-semibold">No Preference</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Let us match you with an available stylist
                  </p>
                </div>
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    onClick={() => handleStylistSelect(stylist.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      booking.stylist?.id === stylist.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{stylist.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {stylist.title}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{stylist.bio}</p>
                    <div className="flex items-center mt-3">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">
                        {stylist.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Select Date & Time
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={booking.date || ""}
                    onChange={(e) =>
                      handleDateTimeSelect(e.target.value, booking.time || "")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    value={booking.time || ""}
                    onChange={(e) =>
                      handleDateTimeSelect(booking.date || "", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {[
                      "9:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "1:00 PM",
                      "2:00 PM",
                      "3:00 PM",
                      "4:00 PM",
                      "5:00 PM",
                    ].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.customerInfo?.name || ""}
                    onChange={(e) =>
                      handleCustomerInfo({
                        ...booking.customerInfo,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={booking.customerInfo?.email || ""}
                    onChange={(e) =>
                      handleCustomerInfo({
                        ...booking.customerInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={booking.customerInfo?.phone || ""}
                    onChange={(e) =>
                      handleCustomerInfo({
                        ...booking.customerInfo,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={booking.customerInfo?.notes || ""}
                    onChange={(e) =>
                      handleCustomerInfo({
                        ...booking.customerInfo,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Confirm Your Booking
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Service</h3>
                  <p className="text-lg">{booking.service?.name}</p>
                  <p className="text-pink-500 font-bold">
                    ${booking.service?.price}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Stylist</h3>
                  <p className="text-lg">
                    {booking.stylist?.name || "No preference"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Date & Time</h3>
                  <p className="text-lg">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Contact</h3>
                  <p>{booking.customerInfo?.name}</p>
                  <p>{booking.customerInfo?.email}</p>
                  <p>{booking.customerInfo?.phone}</p>
                  {booking.customerInfo?.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      Notes: {booking.customerInfo.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Back
            </button>
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !booking.service) ||
                  // Si tu slice usa null como "no seleccionado", cambia la siguiente línea a (booking.stylist === null)
                  (currentStep === 2 && booking.stylist === undefined) ||
                  (currentStep === 3 && (!booking.date || !booking.time)) ||
                  (currentStep === 4 &&
                    (!booking.customerInfo?.name ||
                      !booking.customerInfo?.email ||
                      !booking.customerInfo?.phone))
                }
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
