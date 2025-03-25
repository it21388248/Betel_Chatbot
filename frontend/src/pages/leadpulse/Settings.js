import { FaCog, FaLink, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-blue-600 p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-6">LeadPulse</h1>
          <nav className="space-y-4">
            <a
              href="/dashboard"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <FaHome className="mr-2" /> Dashboard
            </a>
            <a
              href="/settings"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
              onClick={() => navigate("/settings")}
            >
              <FaCog className="mr-2" /> Settings
            </a>
          </nav>
        </div>
        <button className="flex items-center text-gray-700 hover:text-blue-600">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 shadow-2xl rounded-lg bg-white mx-4 mt-6">
        {/* Header */}
        <div className="mb-6 border-b pb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Settings</h2>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-3">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">
            Integrations
          </button>
          <button className="text-gray-600 hover:text-blue-600 pb-2">
            API
          </button>
        </div>

        {/* Integrations */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Lead Sources</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "TikTok", status: "Not Available, Coming Soon" },
              { name: "Facebook", status: "Link Another Account" },
              { name: "Gmail", status: "Click to Link" },
              {
                name: "Outlook",
                status: "Link Another Account",
                highlight: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${
                  item.highlight
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm mt-2 flex items-center">
                  <FaLink className="mr-2" /> {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CRMs */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">CRMs</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Zoho", status: "Not Available, Coming Soon" },
              { name: "WorkHub", status: "Linked", highlight: true },
              { name: "PipeDrive", status: "Not Available, Coming Soon" },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${
                  item.highlight
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm mt-2 flex items-center">
                  <FaLink className="mr-2" /> {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
