import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between text-white">
      <Link to="/" className="text-lg font-bold">
        Chat with PDF
      </Link>
      <div className="space-x-4">
        <Link to="/upload" className="hover:underline">
          Upload PDF
        </Link>
        <Link to="/chat" className="hover:underline">
          Chat
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
