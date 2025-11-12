import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import invest from "../assets/top investment/topinvest.svg";
import { FaAngleRight } from "react-icons/fa6";

const Profile = () => {
  const options = [
    { name: "Basic Details", path: "basic" },
    { name: "Change Password", path: "change-password" },
    { name: "Change PIN", path: "change-pin" },
    { name: "Report suspicious activity", path: "report-activity" },
    { name: "Account Related Forms", path: "account-forms" },
  ];

  return (
    <div className="mt-10 bg-white px-16 py-8">
      {/* Main container using flex with percentage widths */}
      <div className="flex gap-6 items-start w-full">
        
        {/* LEFT SIDEBAR (40%) */}
        <div className="w-[30%] border border-gray-300 rounded-lg flex flex-col">
          {/* Profile picture section */}
          <div className="w-full h-52 flex justify-center items-center">
            <img src={invest} alt="Profile" className="w-44" />
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 bg-gray-300"></div>

          {/* Sidebar options */}
          <div className="w-full text-left mt-2 flex flex-col">
            {options.map((option, index) => (
              <NavLink
                key={index}
                to={option.path}
                end
                className={({ isActive }) =>
                  `flex items-center justify-between w-full px-4 py-4 text-blue-950 font-semibold transition-colors duration-200 hover:bg-gray-100 ${
                    isActive ? "bg-gray-200 hover:bg-gray-200" : ""
                  }`
                }
              >
                <span>{option.name}</span>
                <FaAngleRight />
              </NavLink>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT AREA (60%) */}
        <div className="w-[70%] border border-gray-300 rounded-lg bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
