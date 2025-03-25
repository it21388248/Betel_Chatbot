import React from "react";

const IntegrationSetup = function () {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Setup Integration</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Add a WorkHub Account. Input the Client ID, Client Secret, Tenant ID, and Workflow ID.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Field ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-600 text-sm">Is Your WorkHub Application</span>
          <div className="flex space-x-2">
            <label className="flex items-center space-x-1">
              <input type="radio" name="applicationType" className="text-blue-500" />
              <span className="text-gray-600 text-sm">Simple</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="radio" name="applicationType" className="text-blue-500" defaultChecked />
              <span className="text-gray-600 text-sm">Structured</span>
            </label>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button className="w-1/2 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button className="w-1/2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Change and Test</button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSetup;
