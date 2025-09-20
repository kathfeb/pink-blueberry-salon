import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import {
  setCustomerInfo,
  nextStep,
  previousStep,
} from "../../modules/booking/bookingSlice";

export const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const customerInfo = useSelector(
    (state: RootState) => state.booking.customerInfo
  );

  const [formData, setFormData] = useState({
    name: customerInfo.name || "",
    email: customerInfo.email || "",
    phone: customerInfo.phone || "",
    notes: customerInfo.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/[^@]+@[^@]+\.[^@]+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s()-]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(setCustomerInfo(formData));
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-8 text-center">
        Your Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-400"
              }
              focus:outline-none
            `}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-400"
              }
              focus:outline-none
            `}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors
              ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-400"
              }
              focus:outline-none
            `}
            placeholder="555-123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Special Requests or Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
            placeholder="Any special requests or things we should know?"
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Next: Review Booking
          </button>
        </div>
      </form>
    </div>
  );
};
