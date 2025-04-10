import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-96 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="your-logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Welcome Text */}
        <h2 className="text-lg font-semibold mb-1">
          Welcome to the Franchise Admin
        </h2>
        <p className="text-gray-500 mb-6">Welcome, Log into your account</p>

        {/* Phone Number Input */}
        <input
          type="text"
          placeholder="Phone number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Eye Icon Placeholder */}
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
            👁️
          </span>
        </div>

        {/* Login Button */}
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
          LOGIN
        </button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-orange-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="hover:underline">
            OTP
          </a>
        </div>
      </div>
    </div>
  );
}
