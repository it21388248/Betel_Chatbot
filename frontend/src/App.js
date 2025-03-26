import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Chatbot from "./Chatbot/Chatbot";
import UploadPDF from "./Chatbot/UploadPDF";
import Navbar from "./Chatbot/Navbar";
import UploadedFiles from "./Chatbot/UploadedFiles";
import Home from "./Chatbot/Home";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<Chatbot />} />
        <Route path="/upload" element={<UploadPDF />} />
        <Route path="/files" element={<UploadedFiles />} />
      </Routes>
    </Router>
  );
}
