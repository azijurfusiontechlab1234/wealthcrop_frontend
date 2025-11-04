import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name:'', mobile:'', email:'', password:''
    })
    const [errors, setErrors] = useState('')
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

     const validate = () => {
    let formErrors = {};

    if (!formData.username) {
      formErrors.username = 'Username is required';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.mobile) {
      formErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      formErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

      const handleSubmit = (e)=>{
        e.preventDefault()
        if(validate){

            console.log("Register Data" ,formData);
        }
    }

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
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Username
            </label>
            <input
            name="name"
            value={formData.name}
            onChange={handleChange}
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Email
            </label>
            <input
            name="email"
            value={formData.email}
            onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
          </div>

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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Password
            </label>
            <input
            name="password"
            value={formData.password}
            onChange={handleChange}
              type="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-950"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 cursor-pointer text-white rounded-lg py-2 font-medium hover:bg-blue-900 transition"
          >
            Create Account
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
