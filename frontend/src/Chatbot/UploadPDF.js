import React, { useState } from "react";
import axios from "axios";

const UploadPDF = () => {
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
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Upload a PDF</h2>
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 w-full border" />
      <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2 w-full rounded-lg">
        Upload
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UploadPDF;
