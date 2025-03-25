import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Background/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import APOD from "./components/APOD";
import MarsRoverPhotos from "./components/MarsRoverPhotos";
import Profile from "./pages/Profile";

import FeatureDisplay from "./components/FeatureDisplay";
import EarthImageryComponent from "./components/EarthImageryComponent";
import SignUp from "./pages/leadpulse/SignUp";
import SignIn from "./pages/leadpulse/SignIn";
import PulsesDashboard from "./pages/leadpulse/PulsesDashboard";
import Settings from "./pages/leadpulse/Settings";
import ConnectPulses1 from "./pages/leadpulse/ConnectPulses1";
import ConfigurePulses from "./pages/leadpulse/ConfigurePulses";
import MapLeadPoints from "./pages/leadpulse/MapLeadPoints";
import SetupIntegration from "./pages/leadpulse/SetupIntegration";
import ConfirmLeadPulse from "./pages/leadpulse/ConfirmLeadPulse";

import Chatbot from "./Chatbot/Chatbot";
import UploadPDF from "./Chatbot/UploadPDF";

export default function App() {
  const heroData = [
    { text1: "Journey Beyond", text2: "the Stars" },
    { text1: "Your Portal", text2: "to the Universe" },
    { text1: "Your Gateway", text2: "to Space" },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          // element={
          //   <Home
          //     playStatus={playStatus}
          //     heroCount={heroCount}
          //     setPlayStatus={setPlayStatus}
          //     heroData={heroData} // Pass heroData as a prop
          //     setHeroCount={setHeroCount}
          //   />
          // }

          element={<SignUp />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PulsesDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/step1" element={<ConnectPulses1 />} />
        <Route path="/step2" element={<ConfigurePulses />} />
        <Route path="/step3" element={<MapLeadPoints />} />
        <Route path="/popup" element={<SetupIntegration />} />
        <Route path="/step4" element={<ConfirmLeadPulse />} />

        <Route path="/chat" element={<Chatbot />} />
        <Route path="/upload" element={<UploadPDF />} />

        <Route path="/register" element={<Register />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars" element={<MarsRoverPhotos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/features" element={<FeatureDisplay />} />
        <Route path="/earth" element={<EarthImageryComponent />} />
      </Routes>
    </Router>
  );
}
