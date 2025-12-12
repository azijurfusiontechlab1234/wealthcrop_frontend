import React, { useEffect, useState } from 'react'
import { TrendingUp, Wallet, BarChart2, Shield, Layers, Calculator, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

const MutualFundsMenu = ({token}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    setOpenMenu(false)
  },[location.pathname])

  const redirect = ()=>{
    if(token) navigate("/user/mutual_fund")
  }

  return (
    <div className="relative group"
    onMouseEnter={() => setOpenMenu(true)}
    onMouseLeave={() => setOpenMenu(false)}
    >
  <button
    onClick={redirect}
    className="text-blue-900 font-semibold hover:text-blue-600 cursor-pointer h-16 px-4"
  >
    Mutual Funds
  </button>

  {/* --- MEGA MENU --- */}
{
  (openMenu && !token) && (
      <div
    className="fixed left-0 top-full right-0 w-full bg-white shadow-md 
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-300 ease-out z-50"
  >
    <div className="max-w-[1280px] mx-auto px-10 pb-12 pt-6">

      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-blue-950 font-semibold text-lg">
          Mutual Fund Menu
        </h2>

        {/* Redirect to main page */}
        <button
          onClick={() => navigate("/user/mutual_fund")}
          className="flex items-center gap-1 text-blue-700 hover:underline cursor-pointer text-sm font-medium"
        >
          Explore Mutual Funds
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-4 gap-10 text-sm">

        {/* 1 — Investing */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Investing</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={()=> navigate("/sip-investment")}
          >
            <TrendingUp size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">SIP Investment</p>
              <p className="text-slate-500 text-xs">
                Automate wealth building monthly.
              </p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={()=> navigate("/one-time-investment")}
          >
            <Wallet size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">One-Time Investment</p>
              <p className="text-slate-500 text-xs">
                Invest lump sum during market opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* 2 — Explore */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Explore</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={()=> navigate("/track")}
          >
            <BarChart2 size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Track Funds</p>
              <p className="text-slate-500 text-xs">
                Import funds and track all your investments.
              </p>
            </div>
          </div>

         <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={() => navigate("/calculator/lumpsum-calculator")}
          >
            <Calculator size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Lumpsum Calculator</p>
              <p className="text-slate-500 text-xs">
                Plan long-term wealth forecasting.
              </p>
            </div>
          </div>
        </div>

        {/* 3 — Categories */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Categories</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={()=> navigate("/mutual_fund/collections/high-return")}
          >
            <Layers size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">High-Return Funds</p>
              <p className="text-slate-500 text-xs">
                Explore aggressive growth funds.
              </p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={()=> navigate("/mutual_fund/collections/low_risk")}
          >
            <Shield size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Low Risk Funds</p>
              <p className="text-slate-500 text-xs">
                Safer options for stable growth.
              </p>
            </div>
          </div>
        </div>

        {/* 4 — Tools */}
        <div className="space-y-4">
          <h3 className="text-blue-950 font-semibold mb-1">Tools</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={() => navigate("/nfo")}
          >
            <BarChart2 size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">NFO's</p>
              <p className="text-slate-500 text-xs">
                Track all active NFOs in one place.
              </p>
            </div>
          </div>
          {/* <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3">
            <BarChart2 size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Fund Screener</p>
              <p className="text-slate-500 text-xs">
                Filter by risk, AMC, rating & more.
              </p>
            </div>
          </div> */}

          <div className="hover:bg-blue-50/70 rounded-lg p-2 cursor-pointer flex gap-3"
          onClick={() => navigate("/calculator/sip-calculator")}
          >
            <Calculator size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">SIP Calculator</p>
              <p className="text-slate-500 text-xs">
                Plan long-term wealth forecasting.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}
</div>
  )
}

export default MutualFundsMenu