import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import invest from "../assets/top investment/topinvest.svg";
import { FaAngleRight } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import { HiBell } from "react-icons/hi";
import {
  IndianRupee,
  FileText,
  Headphones,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/authenticationSlice";
import { useDispatch } from "react-redux";
import ThemeToggle from "../utils/ThemeToggle";

const Profile = () => {
  const options = [
    { name: "Basic Details", path: "basic" },
    { name: "Change Password", path: "change-password" },
    { name: "Change PIN", path: "change-pin" },
    { name: "Report suspicious activity", path: "report-activity" },
    { name: "Nominee Details", path: "nominee_details" },
    { name: "Account Related Forms", path: "account-forms" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const handleSetting = () => {
    navigate("/profile/basic");
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block mt-10 px-16 py-8 bg-white dark:bg-[#020617]">
        <div className="flex gap-6 items-start w-full">

          {/* LEFT SIDEBAR */}
          <div className="w-[30%] border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
            <div className="w-full h-52 flex justify-center items-center">
              <img src={invest} alt="Profile" className="w-44 opacity-90" />
            </div>

            <div className="h-px bg-gray-300 dark:bg-slate-700"></div>

            <div className="flex flex-col">
              {options.map((option, index) => (
                <NavLink
                  key={index}
                  to={option.path}
                  end
                  className={({ isActive }) =>
                    `
                      flex items-center justify-between px-4 py-4
                      font-semibold transition-colors
                      text-gray-800 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-slate-800
                      ${isActive ? "bg-gray-200 dark:bg-slate-800" : ""}
                    `
                  }
                >
                  <span>{option.name}</span>
                  <FaAngleRight />
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-[70%] border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
            <Outlet />
          </div>
        </div>
      </div>

      {/* ================= MOBILE / TAB ================= */}
      <div
        className="
          fixed inset-0 flex items-center justify-center lg:hidden
          bg-black/40 dark:bg-black/70
          z-[99999]
        "
      >
        <div className="w-full h-full bg-white dark:bg-slate-900 overflow-y-auto">

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-5 py-3 sticky top-0
                          bg-white dark:bg-slate-900
                          border-b border-gray-100 dark:border-slate-700">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            <HiBell className="text-2xl text-gray-700 dark:text-gray-200" />
          </div>

          {/* PROFILE HEADER */}
          <div
            onClick={handleSetting}
            className="flex items-start justify-between px-4 py-3
                       border-b border-gray-100 dark:border-slate-700
                       hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Fusion Techlab
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                fusionbusiness001@gmail.com
              </p>
            </div>
            <FaAngleRight className="text-gray-500" />
          </div>

          {/* BALANCE */}
          <div className="flex items-center gap-3 px-4 py-3
                          border-b border-gray-100 dark:border-slate-700">
            <IndianRupee size={18} className="text-gray-600 dark:text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                ₹0.00
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Stocks, F&O balance
              </p>
            </div>
          </div>

          {/* LINKS */}
          <div className="py-2">
            {[
              { to: "/user/order/stocks", icon: <FileText size={18} />, label: "All Orders" },
              { to: "/support", icon: <Headphones size={18} />, label: "24 × 7 Customer Support" },
              { to: "/reports", icon: <BarChart3 size={18} />, label: "Reports" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="flex items-center gap-3 px-4 py-2
                           text-gray-800 dark:text-gray-200
                           hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between px-4 py-3
                          border-t border-gray-100 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2
                         text-gray-700 dark:text-gray-300
                         hover:text-blue-700 dark:hover:text-blue-400
                         font-medium"
            >
              <LogOut size={18} />
              Log out
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
