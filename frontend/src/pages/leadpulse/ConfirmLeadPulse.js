import {
  FaHome,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaCheck,
  FaSyncAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function ConfirmLeadPulse() {
  const [currentStep] = useState(4); // Active Step 4

  const steps = [1, 2, 3, 4];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-blue-600 p-6 flex flex-col justify-between shadow-lg border-r border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-6">LeadPulse</h1>
          <nav className="space-y-4">
            <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition">
              <FaHome className="mr-2" /> Dashboard
            </a>
            <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition">
              <FaEnvelope className="mr-2" /> Pulses
            </a>
            <a href="#" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition">
              <FaCog className="mr-2" /> Settings
            </a>
          </nav>
        </div>
        <button className="flex items-center text-gray-700 hover:text-blue-600 transition">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-6 text-blue-600 text-center">
          Connect Your Pulses
        </h2>

        {/* Step Progress Bar */}
        <div className="flex items-center w-full max-w-3xl mx-auto justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all duration-300
                ${
                  step === currentStep
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-600"
                }`}
              >
                {step === 4 ? <FaCheck /> : step}
              </div>

              {/* Connecting Line (Always Grey) */}
              {index < steps.length - 1 && (
                <div className="w-16 h-1 bg-gray-400"></div>
              )}
            </div>
          ))}
        </div>

        {/* Confirmation Box */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300 mx-auto">
          <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">
            Confirm and Save Your Lead Pulse
          </h3>

          <input
            type="text"
            placeholder="Please Provide a Name for the Pulse"
            className="w-full px-4 py-3 mb-6 text-center rounded-lg border bg-gray-100 shadow-inner"
          />

          <div className="flex justify-between items-center">
            {/* Outlook LeadPoint */}
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 border border-gray-200 mr-4">
              <h4 className="text-lg font-semibold text-blue-600">
                Outlook LeadPoint
              </h4>
              <p className="text-gray-700 font-medium">
                <strong>Outlook Email:</strong> Demo Folder
              </p>
              <p className="text-gray-700 font-medium">
                <strong>Outlook Mail Box:</strong> Demo Folder
              </p>
            </div>

            {/* Sync Icon */}
            <FaSyncAlt className="text-gray-500 text-2xl" />

            {/* Workhub LeadPoint */}
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 border border-gray-200 ml-4">
              <h4 className="text-lg font-semibold text-blue-600">
                Workhub LeadPoint
              </h4>
              <div className="overflow-y-auto max-h-32 p-2 bg-gray-100 rounded-md shadow-inner">
                <p className="text-gray-700 font-medium">
                  <strong>Workhub Client ID:</strong> 6UGTX2AJMQT...
                </p>
                <p className="text-gray-700 font-medium">
                  <strong>Workhub Client Secret:</strong> rHPfAH5LR81...
                </p>
                <p className="text-gray-700 font-medium">
                  <strong>Workhub Tenant ID:</strong> HTHP42LB6AL...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activate Button */}
        <div className="flex justify-end w-full max-w-4xl mx-auto mt-6">
          <button className="bg-green-600 px-6 py-3 rounded-md text-white text-lg font-semibold hover:bg-green-500 shadow-lg transition">
            Activate
          </button>
        </div>
      </main>
    </div>
  );
}
