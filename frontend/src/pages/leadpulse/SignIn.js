import { FaEnvelope, FaLock, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[400px] bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-900">
            Log In
          </h2>
          <div className="space-y-4">
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
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Remember Me</span>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-md font-semibold">
              Log-In
            </button>
            <div className="flex flex-col gap-2 mt-4">
              <button className="w-full flex items-center justify-center border p-2 rounded-md">
                <FcGoogle className="mr-2" /> Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center border p-2 rounded-md">
                <FaMicrosoft className="mr-2 text-blue-600" /> Sign in with
                Microsoft
              </button>
            </div>
            <p className="text-center text-sm mt-2">
              Not Signed Up?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Register!
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex-1 bg-blue-100 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Lead<span className="text-blue-800">Pulse</span>
        </h1>
      </div>
    </div>
  );
}
