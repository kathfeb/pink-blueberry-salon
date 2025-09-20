import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// React Hook Form + Yup
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type CustomerInfoForm = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

const customerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Enter your full name")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s()]{7,}$/, "Invalid phone")
    .required("Phone is required"),
  notes: yup.string().max(500, "Max 500 characters").optional(),
});

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedContactInfo, setConfirmedContactInfo] =
    useState<CustomerInfoForm | null>(null);
  const booking = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as any;

  // RHF inicializado con lo que haya en Redux (persiste entre pasos)
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CustomerInfoForm>({
    resolver: yupResolver(customerSchema),
    mode: "onBlur",
    defaultValues: booking.customerInfo,
  });

  // Si cambia algo en Redux (e.g. regresar al paso 4), sincronizamos el form
  useEffect(() => {
    reset(booking.customerInfo);
  }, [booking.customerInfo, reset]);

  // Prefill service when navigating from ServiceShowcase (Home) with selectedService in route state
  useEffect(() => {
    const selectedServiceId: number | undefined =
      location?.state?.selectedService;
    if (selectedServiceId) {
      const service: any =
        services.find((s) => s.id === selectedServiceId) || null;
      if (service) {
        dispatch(setService(service));
      }
    }
  }, [location?.state?.selectedService, dispatch]);

  // Prefill stylist when navigating from Stylists page with selectedStylist in route state
  useEffect(() => {
    const selectedStylistId: number | undefined =
      location?.state?.selectedStylist;
    if (selectedStylistId !== undefined) {
      const stylist: any =
        stylists.find((s) => s.id === selectedStylistId) || null;
      // Note: stylist can be null if not found; setStylist accepts null per handler behavior in this file
      dispatch(setStylist(stylist));
    }
  }, [location?.state?.selectedStylist, dispatch]);

  const steps = [
    { number: 1, name: "Service" },
    { number: 2, name: "Stylist" },
    { number: 3, name: "Date & Time" },
    { number: 4, name: "Your Info" },
    { number: 5, name: "Confirm" },
  ];

  const goNext = async () => {
    if (currentStep === 4) {
      // Valida y guarda al pasar de Step 4
      const valid = await trigger(); // valida todo el form
      if (!valid) return;
      dispatch(setCustomerInfo(getValues())); // persistimos a Redux
    }
    if (currentStep < 5) setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    // Si retrocedes desde Step 4, guarda lo actual del form
    if (currentStep === 4) {
      dispatch(setCustomerInfo(getValues()));
    }
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleServiceSelect = (serviceId: number) => {
    const service: any = services.find((s) => s.id === serviceId) || null;
    dispatch(setService(service));
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

  const handleConfirmBooking = () => {
    // Cache the current form values so the final view can display them even if Redux/RHF are cleared
    const currentValues = getValues();
    setConfirmedContactInfo(currentValues);
    // Clear only the contact info after confirming; keep the rest for the final view.
    dispatch(setCustomerInfo({ name: "", email: "", phone: "", notes: "" }));
    // Move to final confirmation view.
    setCurrentStep(6);
  };

  // Compute contact info to display depending on step
  const contactInfo: CustomerInfoForm = (() => {
    if (currentStep === 6 && confirmedContactInfo) return confirmedContactInfo;
    const info = booking.customerInfo as Partial<CustomerInfoForm> | undefined;
    const hasData = Boolean(
      info && (info.name || info.email || info.phone || info.notes)
    );
    return hasData ? (info as CustomerInfoForm) : getValues();
  })();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {currentStep !== 6 && (
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Book Your Appointment
          </h1>
        )}

        {/* Progress Bar (hidden on final confirmation step) */}
        {currentStep !== 6 && (
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
                  <span className="ml-2 hidden md:block text-sm font-medium text-gray-700">
                    {step.name}
                  </span>
                  {step.number < 5 && (
                    <div className="w-8 h-1 bg-gray-300 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Service */}
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

          {/* Step 2: Stylist */}
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

          {/* Step 3: Date & Time */}
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
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Your Info (React Hook Form + Yup) */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Information</h2>

              <form
                className="space-y-4"
                onSubmit={handleSubmit(() => {
                  // No se usa el submit del botón, validamos desde el botón Next externo
                })}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    {...register("notes")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {errors.notes && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.notes.message}
                    </p>
                  )}
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
                  <p>{contactInfo?.name ?? ""}</p>
                  <p>{contactInfo?.email ?? ""}</p>
                  <p>{contactInfo?.phone ?? ""}</p>
                  {contactInfo?.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      Notes: {contactInfo?.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Final Confirmation View */}
          {currentStep === 6 && (
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg">
                {/* Check Icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Booking Confirmed!
              </h2>
              <p className="text-slate-700 mb-8">
                We'll see you soon. A confirmation has been recorded with the
                details below.
              </p>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left max-w-xl mx-auto space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Service</h3>
                  <p className="text-lg">{booking.service?.name}</p>
                  {booking.service?.price != null && (
                    <p className="text-pink-500 font-bold">
                      ${booking.service?.price}
                    </p>
                  )}
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
                    {booking.date ?? ""}{" "}
                    {booking.time ? `at ${booking.time}` : ""}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Contact</h3>
                  <p>{contactInfo?.name ?? ""}</p>
                  <p>{contactInfo?.email ?? ""}</p>
                  <p>{contactInfo?.phone ?? ""}</p>
                  {contactInfo?.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      Notes: {contactInfo?.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                  onClick={() => navigate("/services")}
                  className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Continue exploring
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons (hidden on final confirmation step) */}
          {currentStep !== 6 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={goBack}
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
                  onClick={goNext}
                  disabled={
                    (currentStep === 1 && !booking.service) ||
                    (currentStep === 3 && (!booking.date || !booking.time))
                    // En Step 2 permitimos "No Preference" (stylist === null)
                    // En Step 4 la validación se hace dentro de goNext() con RHF
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
