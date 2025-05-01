import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetNewPassword } from "../../../redux/slices/login";

export default function OTPResetPassword() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setOtp(new Array(6).fill(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    dispatch(
      SetNewPassword({
        phone: location.state.phone,
        otp: enteredOtp,
        new_password: newPassword,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("aslkdfjo;awek", response);
        if (response?.message === "Password reset successfully") {
          alert("Password reset successful. Please log in.");
          navigate("/login");
        } else {
          alert("Failed to reset password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        alert("Failed to reset password. Please try again.");
      });
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(51.73deg, #000742 64.69%, #0419D4 144.16%)",
      }}
    >
      <div className="bg-white p-10 rounded-2xl w-[400px] text-center">
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-10 h-10 text-center text-xl border border-gray-400 rounded"
            />
          ))}
        </div>

        <div className="text-sm text-gray-600 mb-6">
          Time Left: {formatTime()}{" "}
          <button
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`ml-2 ${
              timeLeft === 0 ? "text-pink-500 hover:underline" : "text-gray-400"
            }`}
          >
            RESEND
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-md font-semibold mb-3">Create new password</h3>
          <input
            type="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Re-Enter Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-5 border border-gray-300 rounded focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
