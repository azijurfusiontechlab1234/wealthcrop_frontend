import React, { useEffect, useState } from 'react'
import { ArrowRight, TrendingUp, Layers, BarChart2, Calculator, Shield, CandlestickChart, LineChart } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

const FOMenu = ({token}) => {

    const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    setOpenMenu(false)
  },[location.pathname])

  const redirect = ()=>{
    if(token) navigate("/user/fno/explore")
  }

  return (
<>

  <div className="relative group"
    onMouseEnter={() => setOpenMenu(true)}
    onMouseLeave={() => setOpenMenu(false)}
  >
    <button 
    onClick={redirect} 
    className="text-blue-900 font-semibold hover:text-blue-600 cursor-pointer h-16 px-4"
    
    >
      F&O
    </button>

    {/* Mega Menu */}
    {(openMenu && !token) && (
    <div
      className="fixed left-0 top-full right-0 w-full bg-white shadow-md
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-300 ease-out z-50"
    >
      <div className="max-w-[1280px] mx-auto px-10 pb-12 pt-6">

        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-blue-950 font-semibold text-lg">F&O Menu</h2>

          <button
            onClick={() => navigate("/user/fno/explore")}
            className="flex items-center gap-1 text-blue-700 hover:underline font-medium cursor-pointer text-sm"
          >
            Explore F&O
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-10 text-sm">

          {/* 1 — Futures */}
          <div className="space-y-4 border-r pr-8">
            <h3 className="text-blue-950 font-semibold mb-1">Futures</h3>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <TrendingUp size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Index Futures</p>
                <p className="text-slate-500 text-xs">Trade NIFTY & BANKNIFTY futures.</p>
              </div>
            </div>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <Layers size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Stock Futures</p>
                <p className="text-slate-500 text-xs">Trade futures of leading stocks.</p>
              </div>
            </div>
          </div>

          {/* 2 — Options */}
          <div className="space-y-4 border-r pr-8">
            <h3 className="text-blue-950 font-semibold mb-1">Options</h3>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <CandlestickChart size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Options Trading</p>
                <p className="text-slate-500 text-xs">Trade Calls & Puts with insights.</p>
              </div>
            </div>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <LineChart size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Option Chain</p>
                <p className="text-slate-500 text-xs">Track OI, IV, Greeks in real-time.</p>
              </div>
            </div>
          </div>

          {/* 3 — Strategies */}
          {/* <div className="space-y-4 border-r pr-8">
            <h3 className="text-blue-950 font-semibold mb-1">Strategies</h3>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <BarChart2 size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Strategy Builder</p>
                <p className="text-slate-500 text-xs">Create multi-leg strategies.</p>
              </div>
            </div>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <Shield size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Greeks & Analysis</p>
                <p className="text-slate-500 text-xs">Analyze Delta, Theta, Vega etc.</p>
              </div>
            </div>
          </div> */}

          {/* 4 — Tools */}
          <div className="space-y-4">
            <h3 className="text-blue-950 font-semibold mb-1">Tools</h3>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <Calculator size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Margin Calculator</p>
                <p className="text-slate-500 text-xs">Check margin required for trades.</p>
              </div>
            </div>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer">
              <BarChart2 size={18} className="text-blue-700 mt-1" />
              <div>
                <p className="font-medium text-blue-950">Brokerage Estimator</p>
                <p className="text-slate-500 text-xs">Estimate charges before trading.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
)}
  </div>
</>
  )
}

export default FOMenu