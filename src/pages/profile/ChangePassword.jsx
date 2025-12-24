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
    <div
  className="
    relative p-8 overflow-hidden rounded-lg
    bg-white
    dark:bg-[var(--card-bg)]
  "
>
  {/* Decorative blobs */}
  <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply opacity-50 dark:opacity-20"></div>
  <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-red-200 rounded-full mix-blend-multiply opacity-40 dark:opacity-20"></div>
  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-emerald-200 rounded-full mix-blend-multiply opacity-30 dark:opacity-20"></div>

  {/* Content */}
  <h2
    className="
      text-blue-950 text-xl font-semibold mb-6 relative z-10
      dark:text-[var(--text-primary)]
    "
  >
    Change Password
  </h2>

  {/* New Password */}
  <div className="mb-4 relative z-10">
    <label
      className="
        block mb-2 font-semibold
        text-gray-600
        dark:text-[var(--text-secondary)]
      "
    >
      New Password
    </label>

    <div className="relative">
      <input
        type={showNew ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        className="
          w-full px-4 py-2 rounded-lg
          border-b border-gray-300
          focus:outline-none focus:border-blue-400

          bg-transparent
          text-blue-950
          dark:text-[var(--text-primary)]
          dark:border-[var(--border-color)]
          dark:focus:border-blue-400
        "
      />

      <button
        type="button"
        aria-label="Toggle new password visibility"
        onClick={() => setShowNew(!showNew)}
        className="
          absolute right-3 top-2.5
          text-gray-500
          dark:text-[var(--text-secondary)]
        "
      >
        {showNew ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div className="mb-6 relative z-10">
    <label
      className="
        block mb-2 font-semibold
        text-gray-600
        dark:text-[var(--text-secondary)]
      "
    >
      Confirm Password
    </label>

    <div className="relative">
      <input
        type={showConfirm ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        className="
          w-full px-4 py-2 rounded-lg
          border-b border-gray-300
          focus:outline-none focus:border-blue-400

          bg-transparent
          text-blue-950
          dark:text-[var(--text-primary)]
          dark:border-[var(--border-color)]
          dark:focus:border-blue-400
        "
      />

      <button
        type="button"
        aria-label="Toggle confirm password visibility"
        onClick={() => setShowConfirm(!showConfirm)}
        className="
          absolute right-3 top-2.5
          text-gray-500
          dark:text-[var(--text-secondary)]
        "
      >
        {showConfirm ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>

  {/* Action */}
  <button
    onClick={handleUpdate}
    className="
      relative z-10 w-full px-6 py-2 rounded-lg font-semibold
      bg-blue-900 hover:bg-blue-800 text-white
      transition-all duration-200

      dark:bg-blue-600 dark:hover:bg-blue-500
    "
  >
    Update Password
  </button>
</div>

  )
}

export default ChangePassword
