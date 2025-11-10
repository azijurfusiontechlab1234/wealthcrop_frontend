import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordLoginSchema, otpLoginSchema } from "../utils/FormSchema";
import { toastError, toastSuccess } from "../utils/notifyCustom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authenticationSlice";
import { postApi } from "../api/api";

function LoginPage() {
  const [loginMode, setLoginMode] = useState("password"); // "password" | "otp"
  const [otpSent, setOtpSent] = useState(false);
  const [saveOTP, setSaveOTP] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue, reset, trigger } = useForm({
    resolver: loginMode === "password"
      ? zodResolver(passwordLoginSchema)
      : zodResolver(otpLoginSchema),
    defaultValues: { mobile: "", password: "", otp: "" },
  });

  // Handle OTP input changes
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
  if (loginMode === "password") {
    console.log("Password Login:", data);
    toastSuccess("Logged in successfully!");
    dispatch(login("123456kjhhikk111"))
    // ✅ Dispatch event to update App state
    window.dispatchEvent(new Event("storage"));

    // ✅ Instantly redirect without reload
    navigate("/");
    window.location.reload()
reset();

  } else {
if (!otpSent) {
  const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_SEND_OTP}`;

  try {
    // 📨 Step 1: Send OTP API call
    const res = await postApi(url, { mob_number: data.mobile }); // change payload key if API expects something else

    if (res.status === 200 || res.data.success) {
      setSaveOTP(res.data.otp)
      console.log("otp",res.data.otp);
      
      setOtpSent(true);
      setOtp(["", "", "", "", "", ""]);
      toastSuccess(res.data.message);
    } else {
      toastError(res.data.message || "Failed to send OTP ❌");
    }
  } catch (error) {
    console.error("OTP Send Error:", error);
    toastError(error.response?.data?.message || "Server error while sending OTP ❌");
  }
}
 else {
      const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_VERIFY_OTP}`;
      // ✅ Step 2: Verify OTP
      const enteredOtp = otp.join("");
      if (!enteredOtp || enteredOtp.length !== 6) {
        toastError("Please enter the 6-digit OTP");
        return;
      }

      console.log("OTP entered:", enteredOtp);
      toastSuccess("OTP verified successfully!");
      setOtp(["", "", "", "", "", ""]);
      setValue("otp", "");
    }
  }
};


  // Reset form on mode change
  useEffect(() => {
    reset();
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
  }, [loginMode, reset]);

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

        {/* Tabs */}
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

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Mobile Number
            </label>
            <input
              {...register("mobile")}
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
              required
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Password */}
          {loginMode === "password" && (
            <>
              <div>
                <label className="block text-sm font-medium text-blue-950 mb-1">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

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
            </>
          )}

          {/* OTP Inputs */}
          <AnimatePresence>
            {loginMode === "otp" && otpSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center gap-2 mt-3"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-10 h-10 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
                  />
                ))}
                {errors.otp && (
                  <p className="text-red-600 text-sm mt-1 col-span-6">
                    {errors.otp.message}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white rounded-lg py-2 font-medium hover:bg-blue-900 transition"
          >
            {loginMode === "password"
              ? "Login"
              : otpSent
              ? "Verify OTP"
              : "Send OTP"}
          </button>
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
