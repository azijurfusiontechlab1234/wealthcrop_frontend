import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";

const BasicDetails = () => {
  return (
    <div className="w-full border border-gray-300 rounded-lg">
              {/* Basic Details */}
                <div className="w-full bg-white rounded-md">
                  {/* Header */}
                  <div className="w-full px-6 py-6 border-b border-gray-200">
                    <h2 className="text-blue-950 text-xl font-semibold">
                      Personal Details
                    </h2>
                    <span className="text-sm text-gray-600 font-semibold">
                      PAN - EMUZX1234G
                    </span>
                  </div>
    
                  {/* Details */}
                  <div className="px-6 py-4 space-y-6">
                    {/* Full Name */}
                    <div>
                      <p className="text-gray-500 text-sm">Full Name</p>
                      <p className="text-blue-950 font-semibold">Fusion Techlab</p>
                    </div>
    
                    {/* Date of Birth */}
                    <div>
                      <p className="text-gray-500 text-sm">Date of Birth</p>
                      <p className="text-blue-950 font-semibold">-</p>
                    </div>
    
                    {/* Mobile Number */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">Mobile Number</p>
                        <p className="text-blue-950 font-semibold">*****47038</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Email Address */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">Email Address</p>
                        <p className="text-blue-950 font-semibold">
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
                        <p className="text-gray-500 text-sm">Marital Status</p>
                        <p className="text-blue-950 font-semibold">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Gender */}
                    <div>
                      <p className="text-gray-500 text-sm">Gender</p>
                      <p className="text-blue-950 font-semibold">-</p>
                    </div>
    
                    {/* Income Range */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">Income Range</p>
                        <p className="text-blue-950 font-semibold">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Occupation */}
                    <div>
                      <p className="text-gray-500 text-sm">Occupation</p>
                      <p className="text-blue-950 font-semibold">-</p>
                    </div>
    
                    {/* Father’s Name */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">Father's Name</p>
                        <p className="text-blue-950 font-semibold">-</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <FiEdit2 />
                      </button>
                    </div>
    
                    {/* Address */}
                    <div>
                      <p className="text-gray-500 text-sm">Address</p>
                      <p className="text-blue-950 font-semibold">-</p>
                    </div>
                  </div>
                </div>
            </div>
  )
}

export default BasicDetails