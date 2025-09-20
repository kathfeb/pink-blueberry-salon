import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "../../config/redux/store";
import { clearCart } from "../../modules/cart/cartSlice";
import OrderSuccessModal from "./OrderSuccessModal";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CheckoutFormData {
  // Shipping Information
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  // Payment Information
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

// Validation schemas for each step
const shippingSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  phone: yup
    .string()
    .matches(/^[\d\s\-()+]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  city: yup
    .string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),
  zipCode: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Invalid zip code (e.g., 12345 or 12345-6789)")
    .required("Zip code is required"),
});

const paymentSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^[\d\s]+$/, "Invalid card number")
    .test("card-length", "Card number must be 16 digits", (value) => {
      const digits = value?.replace(/\s/g, "") || "";
      return digits.length === 16;
    })
    .required("Card number is required"),
  cardName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name on card is required"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)")
    .test("expiry-date", "Card has expired", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    })
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
});

// Combined schema for final validation
const fullSchema = shippingSchema.concat(paymentSchema);

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = total * 0.08; // 8% tax
  const shipping = total > 50 ? 0 : 7.99; // Free shipping over $50
  const finalTotal = total + tax + shipping;

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "email",
        "name",
        "phone",
        "address",
        "city",
        "zipCode",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["cardNumber", "cardName", "expiryDate", "cvv"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmitForm = (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      const newOrderNumber = `PB${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      setIsProcessing(false);

      // Close checkout modal and show success modal
      onClose();
      setShowSuccess(true);

      // Clear cart and reset form after a delay
      setTimeout(() => {
        dispatch(clearCart());
        reset();
        setStep(1);
        setShowSuccess(false);
        onSuccess();
      }, 5000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleClose = () => {
    if (!isProcessing && !showSuccess) {
      onClose();
    }
  };

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {/* Checkout Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                {["Shipping", "Payment", "Review"].map((label, index) => (
                  <div key={label} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step > index + 1
                          ? "bg-green-500 text-white"
                          : step === index + 1
                            ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step > index + 1 ? "✓" : index + 1}
                    </div>
                    <span
                      className={`ml-2 font-medium ${
                        step >= index + 1 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                    {index < 2 && (
                      <div
                        className={`w-12 h-0.5 mx-3 ${
                          step > index + 1 ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmitForm)}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          {...register("address")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.address
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="123 Main St"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          {...register("city")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          {...register("zipCode")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.zipCode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Information
                    </h3>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>Demo Mode:</strong> Use test card 4242 4242 4242
                        4242 with any future expiry date and any 3-digit CVV
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          {...register("cardNumber", {
                            onChange: (e) => {
                              e.target.value = formatCardNumber(e.target.value);
                            },
                          })}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.cardNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          {...register("cardName")}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.cardName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.cardName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            {...register("expiryDate")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.expiryDate
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.expiryDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            {...register("cvv")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.cvv ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Order Review */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Order Review</h3>

                    {/* Order Items */}
                    <div className="border rounded-lg p-4 space-y-2">
                      <h4 className="font-medium mb-2">Order Items</h4>
                      {items.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-gray-600 ml-2">
                              x{quantity}
                            </span>
                          </div>
                          <span className="font-medium">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {getValues("name")}
                        <br />
                        {getValues("address")}
                        <br />
                        {getValues("city")}, {getValues("zipCode")}
                        <br />
                        {getValues("email")}
                        <br />
                        {getValues("phone")}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600">
                        Card ending in{" "}
                        {getValues("cardNumber").slice(-4) || "****"}
                      </p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <h4 className="font-medium mb-2">Order Summary</h4>
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span
                          className={
                            shipping === 0 ? "text-green-600 font-medium" : ""
                          }
                        >
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-pink-500">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={isProcessing}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center"
                      >
                        {isProcessing ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Place Order"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal - Only show this after checkout modal closes */}
      <OrderSuccessModal
        isOpen={showSuccess}
        orderNumber={orderNumber}
        onClose={() => {
          setShowSuccess(false);
        }}
      />
    </>
  );
};

export default CheckoutModal;
