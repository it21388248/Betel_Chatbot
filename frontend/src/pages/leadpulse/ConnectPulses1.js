import {
  FaHome,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaFacebook,
  FaGoogle,
  FaArrowRight,
  FaSearch,
  FaCheck,
} from "react-icons/fa";
import { useState } from "react";

export default function ConnectPulses() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const leadSources = [
    { name: "Facebook", icon: <FaFacebook /> },
    { name: "Outlook", icon: "📧" },
    { name: "Gmail", icon: <FaGoogle /> },
  ];

  const destinations = [
    { name: "WorkHub", icon: "📊" },
    { name: "Zoho", icon: "⚙️" },
    { name: "PipeDrive", icon: "🔄" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-blue-600 p-6 flex flex-col justify-between shadow-lg border-r border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-6">LeadPulse</h1>
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
            >
              <FaHome className="mr-2" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
            >
              <FaEnvelope className="mr-2" /> Pulses
            </a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
            >
              <FaCog className="mr-2" /> Settings
            </a>
          </nav>
        </div>
        <button className="flex items-center text-gray-700 hover:text-blue-600 transition">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">
          Connect Your Pulses
        </h2>
        <p className="text-gray-700 mb-8">
          Easily move lead data from one source to another.
        </p>

        {/* Step Progress Bar */}
        <div className="flex items-center w-full max-w-3xl justify-center mb-8">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                  step === 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-600"
                }`}
              >
                {step}
              </div>
              {index < 3 && <div className="w-12 h-1 bg-gray-400"></div>}
            </div>
          ))}
        </div>

        {/* Selection Containers */}
        <div className="flex space-x-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300">
          {/* Select A Source */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Select A Source
            </h3>
            <div className="relative mb-4">
              <input
                className="w-full bg-gray-200 p-3 rounded-md text-gray-900 pl-10"
                placeholder="Search Among Our Available LeadPoints"
              />
              <FaSearch className="absolute left-3 top-4 text-gray-500" />
            </div>
            <div className="space-y-2">
              {leadSources.map((source) => (
                <button
                  key={source.name}
                  onClick={() => setSelectedSource(source.name)}
                  className={`w-full flex items-center p-3 rounded-md border ${
                    selectedSource === source.name
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  } hover:bg-blue-50`}
                >
                  <span className="mr-2">{source.icon}</span> {source.name}
                </button>
              ))}
            </div>
          </div>

          <FaArrowRight className="text-3xl text-gray-500 mt-12" />

          {/* Select A Destination */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Select A Destination
            </h3>
            <div className="relative mb-4">
              <input
                className="w-full bg-gray-200 p-3 rounded-md text-gray-900 pl-10"
                placeholder="Search Among Our Available Endpoints"
              />
              <FaSearch className="absolute left-3 top-4 text-gray-500" />
            </div>
            <div className="space-y-2">
              {destinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setSelectedDestination(dest.name)}
                  className={`w-full flex items-center p-3 rounded-md border ${
                    selectedDestination === dest.name
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  } hover:bg-blue-50`}
                >
                  <span className="mr-2">{dest.icon}</span> {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end w-full max-w-4xl mt-6">
          <button className="bg-blue-600 px-6 py-3 rounded-md text-white text-lg font-semibold hover:bg-blue-500 shadow-md">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
