import {
  FaHome,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaCheck,
} from "react-icons/fa";
import { useState } from "react";

export default function MapLeadPoints() {
  const [currentStep] = useState(3); // Active Step 3

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

        {/* Mapping Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl border-2 border-blue-600 mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            Outlook Mapping
          </h3>

          <table className="w-full text-left border-collapse border-2 border-blue-600 rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 border border-blue-500">Outlook Fields</th>
                <th className="p-4 border border-blue-500">WorkHub Fields</th>
              </tr>
            </thead>
            <tbody>
              {["Name", "SenderEmail", "ConversationID", "RecipientEmail"].map(
                (field, index) => (
                  <tr key={index} className="border border-blue-500">
                    <td className="p-4 border border-blue-500 text-gray-900 font-medium">
                      {field}
                    </td>
                    <td className="p-4 border border-blue-500">
                      <select className="w-full p-3 rounded-md border border-blue-500 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition duration-200">
                        <option value="">Select Mapping</option>
                        {[ 
                          "name",
                          "SenderEmail",
                          "ConversationID",
                          "RecipientEmail",
                        ].map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Finish Setup Button */}
        <div className="flex justify-end w-full max-w-4xl mx-auto mt-6">
          <button className="bg-green-600 px-6 py-3 rounded-md text-white text-lg font-semibold hover:bg-green-500 shadow-md transition duration-200">
            Finish Set-Up
          </button>
        </div>
      </main>
    </div>
  );
}
