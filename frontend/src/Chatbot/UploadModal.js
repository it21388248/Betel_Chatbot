import React, { useState } from "react";
import axios from "axios";

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData
      );
      setMessage(response.data.message);
      onUploadSuccess();
      onClose(); // Close modal after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload a PDF</h2>

        <input type="file" onChange={handleFileChange} className="mb-4 p-2 w-full border rounded-lg" />

        {message && <p className="text-center text-red-500">{message}</p>}

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
