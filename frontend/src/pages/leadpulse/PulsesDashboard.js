import {
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaSignOutAlt,
  FaChartLine,
  FaHome,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";

export default function PulsesDashboard() {
  const pulses = [
    {
      name: "New Pulse",
      connection: "Outlook Leads <> Workhub",
      date: "Jan 27, 2025",
      active: true,
    },
    {
      name: "New Pulse",
      connection: "Outlook Leads <> Workhub",
      date: "Feb 6, 2025",
      active: true,
    },
  ];

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-blue-600 p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-6">LeadPulse</h1>
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
            >
              <FaHome className="mr-2" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
            ></a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <FaEnvelope className="mr-2" /> Pulses
            </a>
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <FaCog className="mr-2" />
              Settings
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Your Pulses</h2>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500">
            <FaPlus className="mr-2" /> Create a Pulse
          </button>
        </div>

        {/* Pulses Table */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden text-gray-900 p-6">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 border">Name</th>
                <th className="p-4 border">Connections</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pulses.map((pulse, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-4 border">{pulse.name}</td>
                  <td className="p-4 border">{pulse.connection}</td>
                  <td className="p-4 border">{pulse.date}</td>
                  <td className="p-4 border text-center">
                    {pulse.active ? (
                      <FaToggleOn className="text-green-500 text-xl" />
                    ) : (
                      <FaToggleOff className="text-red-500 text-xl" />
                    )}
                  </td>
                  <td className="p-4 border text-center">
                    <button className="text-red-500 hover:text-red-300 text-xl">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
