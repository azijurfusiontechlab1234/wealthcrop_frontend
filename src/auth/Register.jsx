import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { formSchema } from "../utils/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../utils/notifyCustom";
import { FaEye, FaEyeSlash } from "react-icons/fa";



export default function Register() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {register, handleSubmit, formState:{errors, isDirty, isValid}} = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        mobile: "",
        password: ""
      }
    })

   

const submitForm = async (data) => {
  console.log("Form Data:", data);
  setLoading(true);

  try {
    // Simulate API call (2-second delay)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success toast after "API call"
    toastSuccess("Form submitted successfully! 🚀");
  } catch (error) {
    toastError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-950">
            Create your account ✨
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Start investing smarter with Wealthcrop
          </p>
        </div>

        {/* Register Form */}
        <form className="space-y-5" noValidate onSubmit={handleSubmit(submitForm)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Username
            </label>
            <input
            // name="name"
            // value={formData.name}
            // onChange={handleChange}
              {...register("name")}
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1 ">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Email
            </label>
            <input
            // name="email"
            // value={formData.email}
            // onChange={handleChange}
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1 ">{errors.email.message}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Mobile Number
            </label>
            <input
            // name="mobile"
            // value={formData.mobile}
            // onChange={handleChange}
              type="tel"
              {...register("mobile")}
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
            {errors.mobile && <p className="text-red-600 text-sm mt-1 ">{errors.mobile.message}</p>}
          </div>

          {/* Password */}
          {/* Password Field */}
{/* Password Field */}
<div>
  <label className="block text-sm font-medium text-blue-950 mb-1">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      {...register("password")}
      placeholder="Create a password"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm 
      focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
    />

    {/* Eye Icon Button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-700 focus:outline-none"
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
</div>



          {/* Create Account Button */}
          <button
  type="submit"
  className="w-full bg-blue-950 cursor-pointer text-white rounded-lg py-2 font-medium hover:bg-blue-900 transition"
  disabled={loading}
>
  {loading ? "Submitting..." : "Create Account"}
</button>


          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full border border-gray-300 text-blue-950 rounded-lg py-2 font-medium 
            hover:bg-gray-50 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-800 hover:text-blue-950 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
