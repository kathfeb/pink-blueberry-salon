import React, { useEffect } from "react";

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderNumber?: string;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderNumber = "12345",
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center transform animate-scale-in shadow-2xl">
        {/* Success Icon Animation */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in shadow-lg">
          <svg
            className="w-16 h-16 text-white animate-fade-in"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              className="animate-draw-check"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-3 text-gray-800">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            #{orderNumber}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">
            A confirmation email has been sent to:
          </p>
          <p className="font-medium text-gray-800">customer@example.com</p>
        </div>

        {/* Estimated Delivery */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Estimated delivery: 3-5 business days</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              // In a real app, this would generate a PDF receipt
              window.print();
            }}
            className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Auto-close notice */}
        <p className="text-xs text-gray-500 mt-4">
          This window will close automatically in 5 seconds
        </p>
      </div>

      <style jsx>{`
        @keyframes draw-check {
          0% {
            stroke-dasharray: 0 100;
          }
          100% {
            stroke-dasharray: 100 0;
          }
        }

        .animate-draw-check {
          animation: draw-check 0.6s ease-in-out 0.3s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessModal;
