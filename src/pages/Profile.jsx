import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get token from Redux store
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to home
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      {token ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> user@example.com
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Member Since:</span> Jan 2024
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-gray-500 text-center">You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
