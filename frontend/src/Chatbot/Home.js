import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Chat with PDF</h1>
      <div className="space-x-4">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload PDF
        </Link>
        <Link
          to="/chat"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Chatbot
        </Link>
      </div>
    </div>
  );
};

export default Home;
