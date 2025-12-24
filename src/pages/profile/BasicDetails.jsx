import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { TfiAngleRight } from "react-icons/tfi";
import { FaArrowLeftLong } from "react-icons/fa6";


const BasicDetails = () => {

    const navigate = useNavigate()

const handleBack = () => {
  navigate(-1); // Go to previous route
};


  return (
    <>
    
    <div className="w-full border hidden lg:block border-gray-300 dark:border-slate-700 rounded-lg ">
              {/* Basic Details */}
                <div className="w-full bg-white dark:bg-slate-900 rounded-md  ">
                  {/* Header */}
                  <div className="w-full px-6 py-6 border-b border-gray-200 dark:border-slate-700 ">
                    <h2 className="text-blue-950 dark:text-[var(--text-primary)] text-xl font-semibold">
                      Personal Details
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-[var(--text-secondary)] font-semibold">
                      PAN - EMUZX1234G
                    </span>
                  </div>
    
                  {/* Details */}
                  <div className="px-6 py-4 space-y-6">
                    {/* Full Name */}
                    <div>
                      <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Full Name</p>
                      <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">Fusion Techlab</p>
                    </div>
    
                    {/* Date of Birth */}
                    <div>
                      <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Date of Birth</p>
                      <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                    </div>
    
                    {/* Mobile Number */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Mobile Number</p>
                        <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">*****47038</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Email Address */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Email Address</p>
                        <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">
                          fus***********1@gmail.com
                        </p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Marital Status */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Marital Status</p>
                        <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Gender */}
                    <div>
                      <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Gender</p>
                      <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                    </div>
    
                    {/* Income Range */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Income Range</p>
                        <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Occupation */}
                    <div>
                      <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Occupation</p>
                      <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                    </div>
    
                    {/* Father’s Name */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Father's Name</p>
                        <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Address */}
                    <div>
                      <p className="text-gray-500 text-sm dark:text-[var(--text-primary)]">Address</p>
                      <p className="text-blue-950 font-semibold dark:text-[var(--text-secondary)]">-</p>
                    </div>
                  </div>
                </div>
            </div>


    {/* Less than lg view */}
 <div
  className="
    fixed inset-0 z-9999 overflow-y-auto lg:hidden
    bg-white
    dark:bg-[var(--app-bg)]
  "
>
  {/* Basic Details */}
  <div className="w-full h-full flex flex-col">

    {/* Header Row */}
    <div
      className="
        flex px-6 border-b
        border-gray-200
        dark:border-[var(--border-color)]
      "
    >
      <button
        className="
          p-2 rounded-full transition
          hover:bg-gray-100
          dark:hover:bg-[var(--white-5)]
        "
      >
        <FaArrowLeftLong
          onClick={handleBack}
          className="
            w-5 h-5
            text-gray-700
            dark:text-[var(--text-primary)]
          "
        />
      </button>

      {/* Header */}
      <div className="w-full px-6 py-6">
        <h2
          className="
            text-xl font-semibold
            text-blue-950
            dark:text-[var(--text-primary)]
          "
        >
          Personal Details
        </h2>

        <span
          className="
            text-sm font-semibold
            text-gray-600
            dark:text-[var(--text-secondary)]
          "
        >
          PAN - EMUZX1234G
        </span>
      </div>
    </div>

    {/* Details */}
    <div className="px-6 py-4 space-y-6 flex-1 overflow-y-auto">

      {/* Full Name */}
      <div
        className="
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
          Name (as on PAN Card)
        </p>
        <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
          Fusion Techlab
        </p>
      </div>

      {/* Date of Birth */}
      <div
        className="
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
          Date of Birth
        </p>
        <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
          -
        </p>
      </div>

      {/* Mobile Number */}
      <div
        className="
          flex justify-between items-center
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <div>
          <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
            Mobile Number
          </p>
          <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
            *****47038
          </p>
        </div>

        <button
          className="
            text-emerald-600 hover:text-emerald-800
            dark:text-emerald-400 dark:hover:text-emerald-300
          "
        >
          <FiEdit2 />
        </button>
      </div>

      {/* Email Address */}
      <div
        className="
          flex justify-between items-center
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <div>
          <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
            Email Address
          </p>
          <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
            fus***********1@gmail.com
          </p>
        </div>

        <button
          className="
            text-emerald-600 hover:text-emerald-800
            dark:text-emerald-400 dark:hover:text-emerald-300
          "
        >
          <FiEdit2 />
        </button>
      </div>

      {/* Unique Client ID */}
      <div
        className="
          flex justify-between items-center
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <div>
          <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
            Unique Client Code
          </p>
          <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
            1254789658
          </p>
        </div>

        <button
          className="
            text-emerald-600 hover:text-emerald-800
            dark:text-emerald-400 dark:hover:text-emerald-300
          "
        >
          <FiEdit2 />
        </button>
      </div>

      {/* Gender */}
      <div
        className="
          border-b border-gray-300
          dark:border-[var(--border-color)]
        "
      >
        <p className="text-gray-500 text-sm dark:text-[var(--text-secondary)]">
          Gender
        </p>
        <p className="text-blue-950 font-semibold dark:text-[var(--text-primary)]">
          -
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-col space-y-8">
        <div
          className="
            flex justify-between items-center py-4
            border-b border-gray-300
            dark:border-[var(--border-color)]
          "
        >
          <NavLink
            className="
              text-blue-900 text-sm font-semibold
              dark:text-[var(--text-primary)]
            "
          >
            Nominee Details
          </NavLink>
          <TfiAngleRight
            size={14}
            className="text-gray-400 dark:text-[var(--text-secondary)]"
          />
        </div>

        <div
          className="
            flex justify-between items-center py-4
            border-b border-gray-300
            dark:border-[var(--border-color)]
          "
        >
          <NavLink
            className="
              text-blue-900 font-semibold text-sm
              dark:text-[var(--text-primary)]
            "
          >
            Trading preference
          </NavLink>
          <TfiAngleRight
            size={14}
            className="text-gray-400 dark:text-[var(--text-secondary)]"
          />
        </div>
      </div>
    </div>
  </div>
</div>


      </>
  )
}

export default BasicDetails