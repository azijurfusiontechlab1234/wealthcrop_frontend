import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, TrendingUp, Layers, CandlestickChart } from "lucide-react";

const StocksMenu = ({ token }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    setOpenMenu(false)
  },[location.pathname])

  const redirect = ()=>{
    if(token) navigate("/user/stocks/explore")
  }


  return (
    <div
      className="relative group"
     onMouseEnter={() => setOpenMenu(true)}
    onMouseLeave={() => setOpenMenu(false)}
    >
      {/* NAV ITEM */}
      <button
        onClick={redirect}
        className="text-blue-900 font-semibold hover:text-blue-600 cursor-pointer h-16 px-4"
      >
        Stocks
      </button>

      {/* MEGA MENU */}
      {
        (openMenu && !token) && (
      <div
        className={`
          fixed left-0 top-full right-0 w-full bg-white shadow-lg border-t
          transition-all duration-300 ease-out z-50
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div className="max-w-[1280px] mx-auto px-10 pb-12 pt-8">

          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-blue-950 font-semibold text-lg">Stocks Menu</h2>

            <button
              onClick={() => navigate("/user/stocks")}
              className="flex items-center gap-1 text-blue-700 hover:underline cursor-pointer font-medium  text-sm"
            >
              Explore Stocks <ArrowRight size={16} />
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-4 gap-10 text-sm">

            {/* 1 — Trading */}
            <div className="space-y-4 border-r pr-8">
              <h3 className="text-blue-950 font-semibold mb-1">Trading</h3>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <TrendingUp size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Intraday Trading</p>
                  <p className="text-slate-500 text-xs">Fast buy–sell opportunities.</p>
                </div>
              </div>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <CandlestickChart size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">IPO Investments</p>
                  <p className="text-slate-500 text-xs">Apply for upcoming IPOs.</p>
                </div>
              </div>
            </div>

            {/* 2 — Tools */}
            <div className="space-y-4 border-r pr-8">
              <h3 className="text-blue-950 font-semibold mb-1">Tools</h3>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <BarChart2 size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Stock Screener</p>
                  <p className="text-slate-500 text-xs">
                    Filter stocks by PE, volume, trend.
                  </p>
                </div>
              </div>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <Layers size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">ETF Investing</p>
                  <p className="text-slate-500 text-xs">Diversified index investing.</p>
                </div>
              </div>
            </div>

            {/* 3 — Portfolio */}
            <div className="space-y-4 border-r pr-8">
              <h3 className="text-blue-950 font-semibold mb-1">Portfolio</h3>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <TrendingUp size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Market Watchlist</p>
                  <p className="text-slate-500 text-xs">
                    Track all your stocks live.
                  </p>
                </div>
              </div>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <Layers size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Demat + Trading</p>
                  <p className="text-slate-500 text-xs">
                    Open an instant free Demat account.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 — Insights */}
            <div className="space-y-4">
              <h3 className="text-blue-950 font-semibold mb-1">Insights</h3>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <BarChart2 size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Top Gainers</p>
                  <p className="text-slate-500 text-xs">
                    Stocks rising today.
                  </p>
                </div>
              </div>

              <div className="hover:bg-blue-50/70 p-2 rounded-lg flex gap-3 cursor-pointer">
                <TrendingUp size={18} className="text-blue-700 mt-1" />
                <div>
                  <p className="font-medium text-blue-950">Market Trends</p>
                  <p className="text-slate-500 text-xs">
                    Analyst insights and charts.
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
  );
};

export default StocksMenu;
