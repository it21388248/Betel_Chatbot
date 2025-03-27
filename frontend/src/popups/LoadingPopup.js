import React from "react";

const LoadingPopup = ({ message = "Uploading file...", subText = "Please wait ⏳" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold">{message}</p>
        <p className="text-sm text-gray-500 mt-2">{subText}</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
