import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <div className="relative p-8 overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply opacity-50"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-red-200 rounded-full mix-blend-multiply opacity-40"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-emerald-200 rounded-full mix-blend-multiply opacity-30"></div>

      {/* Content */}
      <h2 className='text-blue-950 text-xl font-semibold mb-6 relative z-10'>Change Password</h2>

      {/* New Password */}
      <div className='mb-4 relative z-10'>
        <label className='block text-gray-600 mb-2 font-semibold'>New Password</label>
        <div className='relative'>
          <input
            type={showNew ? "text" : "password"}
            className='w-full border-b border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
          />
          <button
            type='button'
            className='absolute right-3 top-2.5 text-gray-500'
            onClick={() => setShowNew(!showNew)}
            aria-label="Toggle new password visibility"
          >
            {showNew ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-6 relative z-10">
        <label className="block text-gray-600 mb-2 font-semibold">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full border-b border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="relative z-10 bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-200 w-full font-semibold"
      >
        Update Password
      </button>
    </div>
  )
}

export default ChangePassword
