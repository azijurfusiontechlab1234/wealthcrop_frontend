import React, { useEffect, useState } from 'react'
import { BookOpen, Newspaper, User, HelpCircle, Download, Gift, Landmark, Calculator } from "lucide-react";
import { ArrowRight, TrendingUp, Layers, BarChart2, Shield, CandlestickChart, LineChart } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';


const MoreMenu = ({token}) => {
    const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    setOpenMenu(false)
  },[location.pathname])

  return (

<div className="relative group"
onMouseEnter={() => setOpenMenu(true)}
    onMouseLeave={() => setOpenMenu(false)}
>
  <button className="text-blue-900 font-semibold hover:text-blue-600 cursor-pointer h-16 px-4">
    More
  </button>

  {/* Mega Menu */}
  {
    (openMenu && !token) && (
  <div
    className="fixed left-0 top-full right-0 w-full bg-white shadow-md
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-all duration-300 ease-out z-50"
  >
    <div className="max-w-[1280px] mx-auto px-10 pb-12 pt-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-blue-950 font-semibold text-lg">More Tools & Resources</h2>

        <button
          onClick={() => navigate("/calculators")}
          className="flex items-center gap-1 text-blue-700 hover:underline font-medium cursor-pointer text-sm"
        >
          Explore All Calculators
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-10 text-sm">

        {/* 1 — Calculators */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Calculators</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/calculators")}
          >
            <Calculator size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">SIP Calculator</p>
              <p className="text-slate-500 text-xs">Plan future wealth.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/calculators")}
          >
            <Landmark size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">FD Calculator</p>
              <p className="text-slate-500 text-xs">Calculate FD maturity.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/calculators")}
          >
            <Gift size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">SWP Calculator</p>
              <p className="text-slate-500 text-xs">Smart withdrawal planning.</p>
            </div>
          </div>
        </div>

        {/* 2 — Research */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Research</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/market-news")}
          >
            <Newspaper size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Market News</p>
              <p className="text-slate-500 text-xs">Stay updated daily.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/learning-centre")}
          >
            <BookOpen size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Learning Center</p>
              <p className="text-slate-500 text-xs">Beginner to advanced.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/blogs")}
          >
            <Newspaper size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Blog</p>
              <p className="text-slate-500 text-xs">Insights & articles.</p>
            </div>
          </div>
        </div>

        {/* 3 — Account & Support */}
        <div className="space-y-4 border-r pr-8">
          <h3 className="text-blue-950 font-semibold mb-1">Account & Support</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
          >
            <User size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Profile</p>
              <p className="text-slate-500 text-xs">Manage your account.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/support")}
          >
            <HelpCircle size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Help & Support</p>
              <p className="text-slate-500 text-xs">FAQs & guidance.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/signup")}
          >
            <Download size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Documents</p>
              <p className="text-slate-500 text-xs">Statements & reports.</p>
            </div>
          </div>
        </div>

        {/* 4 — Others */}
        <div className="space-y-4">
          <h3 className="text-blue-950 font-semibold mb-1">Others</h3>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/calculators")}
          >
            <Newspaper size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Retirement Calculator</p>
              <p className="text-slate-500 text-xs">Calculate your wealth till retirement.</p>
            </div>
          </div>

          <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
          onClick={() => navigate("/calculator/inflation-calculator")}
          >
            <Calculator size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">Inflation Calculator</p>
              <p className="text-slate-500 text-xs">Plan your future wealth.</p>
            </div>
          </div>

            <div className="hover:bg-blue-50/70 rounded-lg p-2 flex gap-3 cursor-pointer"
            onClick={() => navigate("/calculator/emi-calculator")}
            >
            <Newspaper size={18} className="text-blue-700 mt-1" />
            <div>
              <p className="font-medium text-blue-950">EMI Calculator</p>
              <p className="text-slate-500 text-xs">iOS & Android versions.</p>
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

export default MoreMenu