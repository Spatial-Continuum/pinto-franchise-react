import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../../assets/images/logo.png";
import { GenerateOtp } from "../../../redux/slices/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [login, SetLogin] = useState({ phone: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGenerateOtp = (e) => {
    e.preventDefault();
    console.log("data sdwe", e);
    console.log("asjdfljelsd", login);
    dispatch(GenerateOtp(login))
      .unwrap()
      .then((response) => {
        console.log("otsadfad344", response);
        if (response.message == "OTP sent successfully") {
          navigate("/login/set-new-password", {
            state: { phone: login.phone },
          });
        } else {
          alert("Generate Otp failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        alert("Generate Otp failed. Please try again.");
      });
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
        <h2 className="text-lg font-semibold mb-1 mb-4">Forgot Password?</h2>

        {/* Phone Number Input */}
        <input
          type="text"
          name="phone"
          placeholder="Enter Registered Mobile number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={login.phone}
          onChange={handleInputChange}
        />

        {/* Login Button */}
        <button
          className="w-full bg-blue-500 text-white mb-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleGenerateOtp}
        >
          SEND OTP
        </button>

        <Link to="/" className="hover:underline mt-4">
          Back
        </Link>
      </div>
    </div>
  );
}
