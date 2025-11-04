import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [loginMode, setLoginMode] = useState("password"); // "password" | "otp"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMode === "password") {
      console.log("Login with password:", formData);
    } else {
      console.log("Send OTP to:", formData.mobile);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-950">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue investing with Wealthcrop
          </p>
        </div>

        {/* Tabs (Password / OTP) */}
        <div className="flex mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setLoginMode("password")}
            className={`w-1/2 py-2 text-sm font-medium transition ${
              loginMode === "password"
                ? "bg-blue-950 text-white"
                : "bg-gray-50 text-blue-950 hover:bg-gray-100"
            }`}
          >
            Login with Password
          </button>
          <button
            onClick={() => setLoginMode("otp")}
            className={`w-1/2 py-2 text-sm font-medium transition ${
              loginMode === "otp"
                ? "bg-blue-950 text-white"
                : "bg-gray-50 text-blue-950 hover:bg-gray-100"
            }`}
          >
            Login with OTP
          </button>
        </div>

        {/* Conditional Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Mobile Number
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
          </div>

          {/* Password Field (only for password login) */}
          {loginMode === "password" && (
            <div>
              <label className="block text-sm font-medium text-blue-950 mb-1">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
              />
            </div>
          )}

          {/* Remember / Forgot (only for password login) */}
          {loginMode === "password" && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded accent-blue-700" />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-800 hover:text-blue-950 font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white rounded-lg py-2 font-medium hover:bg-blue-900 transition"
          >
            {loginMode === "password" ? "Login" : "Send OTP"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google & Mobile Options */}
          <div className="flex flex-col items-center justify-between gap-3 mt-3">
            {/* Google */}
            <button
              type="button"
              className="w-full border border-gray-300 text-blue-950 rounded-lg py-2 font-medium 
              hover:bg-gray-50 flex items-center justify-center gap-2 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            {/* Login with Mobile */}
            {/* <button
              type="button"
              onClick={() => setLoginMode("otp")}
              className="w-full sm:w-1/2 border border-gray-300 text-blue-950 rounded-lg py-2 font-medium 
              hover:bg-gray-50 flex items-center justify-center gap-2 transition"
            >
              📱 Login with Mobile
            </button> */}
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-800 hover:text-blue-950 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
