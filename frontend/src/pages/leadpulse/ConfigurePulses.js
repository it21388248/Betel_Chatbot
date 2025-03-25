import {
  FaHome,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

export default function ConfigurePulses() {
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
          Configure Your Pulses
        </h2>
        <p className="text-gray-700 mb-8">Select Settings for the Sources</p>

        {/* Step Progress Bar */}
        <div className="flex items-center w-full max-w-3xl justify-center mb-10">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                  step === 2
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

        {/* Configuration Containers */}
        <div className="flex space-x-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300">
          {/* Configure LeadPoints Settings */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Configure LeadPoints Settings
            </h3>
            <div className="space-y-4">
              <label className="block text-gray-700">Facebook Pages</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Please Select a Facebook Page</option>
              </select>
              <label className="block text-gray-700">Ad Accounts</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Choose an option...</option>
              </select>
              <label className="block text-gray-700">
                Messenger Lead Forms
              </label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Please Select a Facebook Page</option>
              </select>
            </div>
          </div>

          <FaArrowRight className="text-3xl text-gray-500 mt-12" />

          {/* Configure EndPoints Settings */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Configure EndPoints Settings
            </h3>
            <div className="space-y-4">
              <label className="block text-gray-700">Client ID</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Choose an option...</option>
              </select>
              <label className="block text-gray-700">Client Secret</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Choose an option...</option>
              </select>
              <label className="block text-gray-700">Workflow ID</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Choose an option...</option>
              </select>
              <label className="block text-gray-700">Tenant ID</label>
              <select className="w-full p-3 rounded-md bg-gray-200">
                <option>Choose an option...</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Button with FIXED Alignment */}
        <div className="flex justify-end w-full max-w-4xl mx-auto mt-10">
          <button className="bg-blue-600 px-6 py-3 rounded-md text-white text-lg font-semibold hover:bg-blue-500 shadow-md">
            Start Your Pulse
          </button>
        </div>
      </main>
    </div>
  );
}
