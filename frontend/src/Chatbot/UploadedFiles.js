import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/files/list");
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Uploaded Files</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-center">No files uploaded yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Filename</th>
              <th className="border p-2">Uploaded At</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{file.filename}</td>
                <td className="border p-2">{new Date(file.timestamp).toLocaleString()}</td>
                <td className="border p-2">
                  <a
                    href={`http://localhost:5000/uploads/${file.filename}`}
                    download={file.filename}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadedFiles;
