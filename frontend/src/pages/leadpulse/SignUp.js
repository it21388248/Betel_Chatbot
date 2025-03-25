import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaGoogle,
  FaMicrosoft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheck,
} from "react-icons/fa";

export default function SignUp() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[400px] bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                placeholder="Name"
                className="w-full pl-10 p-2 border rounded-md"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                placeholder="Email"
                className="w-full pl-10 p-2 border rounded-md"
                type="email"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                placeholder="Password"
                className="w-full pl-10 p-2 border rounded-md"
                type="password"
              />
            </div>
            <div className="relative">
              <FaCheck className="absolute left-3 top-3 text-gray-500" />
              <input
                placeholder="Confirm Password"
                className="w-full pl-10 p-2 border rounded-md"
                type="password"
              />
            </div>
            <button className="w-full bg-black text-white p-2 rounded-md">
              Sign-Up
            </button>
            <div className="flex flex-col gap-2 mt-4">
              <button className="w-full flex items-center justify-center border p-2 rounded-md">
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center border p-2 rounded-md">
                <FaMicrosoft className="mr-2" /> Sign in with Microsoft
              </button>
            </div>
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/signin")} // Navigate on click
              >
                Login!
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-blue-100 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Lead<span className="text-blue-800">Pluse</span>
        </h1>
      </div>
    </div>
  );
}
