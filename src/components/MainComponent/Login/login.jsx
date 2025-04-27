import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../../assets/images/logo.png";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, SetLogin] = useState({ phone_number: "", password: "" });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("asjdfljelsd", login);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background:
          "linear-gradient(51.73deg, #000742 64.69%, #0419D4 144.16%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-10 w-96 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        {/* Welcome Text */}
        <h2 className="text-lg font-semibold mb-1 mb-4">
          Welcome to the Franchise Admin
        </h2>

        {/* Phone Number Input */}
        <input
          type="text"
          name="phone_number"
          placeholder="Phone number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={login.phone_number}
          onChange={handleInputChange}
        />

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          onClick={handleLogin}
        >
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
