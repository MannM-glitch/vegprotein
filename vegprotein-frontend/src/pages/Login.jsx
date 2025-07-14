import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Connect with Supabase or backend here
    console.log("Logging in:", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full animate-fade-in space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 animate-slide-in-down">
            Login to VegProtein
          </h1>
          <p className="text-gray-500 mt-2 animate-fade-in delay-100">
            Start tracking your nutrition today!
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 animate-slide-in-up">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 animate-fade-in delay-200">
          Don’t have an account? <span className="text-green-600 underline">Sign up</span>
        </p>
      </div>
    </div>
  );
}
