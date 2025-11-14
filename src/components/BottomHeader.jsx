import React from "react";
import { useNavigate } from "react-router-dom";
import { PiChartLineUpFill } from "react-icons/pi";
import { FaChartPie } from "react-icons/fa";


const BottomHeader = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const handleStock = () => {
    setActiveCategory("stocks");   // ✅ FIXED
    navigate("/user/stocks/explore");
  };

  const handleFund = () => {
    setActiveCategory("funds");    // ✅ FIXED
    navigate("/user/mutual_fund/explore");
  };

  return (
    <div className="fixed bottom-0 left-0 bg-white w-full shadow-lg border-t border-gray-200 z-50 h-20 flex items-center">
      <div className="flex justify-around items-center w-full">

        {/* STOCKS */}
        <button
          onClick={handleStock}
          className={`flex flex-col items-center gap-1 
            ${activeCategory === "stocks" ? "text-green-600" : "text-gray-500"}`}
        >
          <PiChartLineUpFill size={26} />
          <p className="text-sm font-medium">Stocks</p>
        </button>

        {/* FUNDS */}
        <button
          onClick={handleFund}
          className={`flex flex-col items-center gap-1 
            ${activeCategory === "funds" ? "text-green-600" : "text-gray-500"}`}
        >
          <FaChartPie size={22} />
          <p className="text-sm font-medium">Mutual Funds</p>
        </button>

      </div>
    </div>
  );
};
export default BottomHeader