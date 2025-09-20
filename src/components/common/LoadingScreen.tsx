import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-pulse mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">
          Loading The Pink Blueberry
        </h2>
        <p className="text-gray-600 mt-2">Preparing your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
