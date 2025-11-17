import React, { useState } from "react";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { CandlestickChart, Bookmark } from "lucide-react";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import TrendChart from "../../components/TrendChart";
import emptyWatchlist from "../../assets/watchlist/emptyWatchlist.svg"


const WatchlistMF = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWatchlist, setSelectedWatchlist] = useState(1); // default selected tab
  const [createWatchlist, setCreateWatchList] = useState(false)
  const [hoveredRow, setHoveredRow] = useState(null)

  const [watchlistName, setWatchlistName] = useState("");

const handleCreateWatchlist = () => {
  console.log("Creating watchlist:", watchlistName);
  setCreateWatchList(false);
  setWatchlistName("");
};

  const watchList = [
    // { name: "Canara Bank", trend: "up", price: "150.12", oneDvol: "1,92,54,808", trendData: [5, 8, 7, 10, 6, 9] },
    // { name: "Indian Oil Corporation", trend: "up", price: "187.14", oneDvol: "47,64,467",trendData: [10, 12, 9, 14, 13, 15] },
    // { name: "Eternal(Zomato)", trend: "up", price: "304.20", oneDvol: "68,77,503" },
    // { name: "PNB", trend: "up", price: "150.12", oneDvol: "1,92,54,808" },
    // { name: "BPCL", trend: "up", price: "150.12", oneDvol: "1,92,54,808" },
  ];

  const filteredList = watchList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    {
      watchList.length === 0 ? (
   <div className="mx-auto w-full min-h-[400px] p-6 bg-white">
  <div className="p-6 min-h-[350px] max-w-4xl w-full flex flex-col sm:flex-row items-center justify-center gap-10 mx-auto">
    <div>
      <img src={emptyWatchlist} alt="Empty state" className="w-xl object-contain" />
    </div>

    <div className="flex flex-col space-y-12 text-center sm:text-left">
      <h1 className="text-2xl font-semibold text-blue-950">Not Watching any funds</h1>
      <p className="text-sm text-gray-600">
        Keep a watch and stay updated about mutual funds of your interest
      </p>
      <button className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white px-2 w-36 py-2 rounded-lg text-sm font-medium transition focus:outline-none">
        Explore all funds
      </button>
    </div>
  </div>
</div>

      ):(
      <div className="m-auto w-[1200px] bg-white border border-gray-400 rounded-lg mt-5 h-auto">
      {/* Watchlist Tabs */}
      <div className="flex items-center px-5 py-4 gap-5 border-b border-gray-300">
        {Array.from({ length: 5 }).map((_, index) => {
          const tab = index + 1;
          const isSelected = selectedWatchlist === tab;

          return (
            <span
              key={index}
              onClick={() => setSelectedWatchlist(tab)}
              className={`
                cursor-pointer pb-1 
                ${isSelected
                  ? "text-blue-900 font-semibold border-b-2 border-blue-350"
                  : "text-gray-500 hover:text-blue-900 font-semibold"
                }
              `}
            >
              Watchlist {tab}
            </span>
          );
        })}

        <button className="text-lg text-green-500 font-semibold cursor-pointer"
        onClick={()=> setCreateWatchList(true)}>
          +Watchlist
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-6 w-84">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            placeholder="Search your watchlist"
            className="border border-gray-300 px-10 py-1.5 rounded-lg w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-300">
              <th className="py-2 px-3">Company ({filteredList.length})</th>
              <th className="py-2 px-3">Trend</th>
              <th className="py-2 px-3">Mkt price</th>
              <th className="py-2 px-3">1D change</th>
              <th className="py-2 px-3">1D Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 relative ${
                  index === filteredList.length - 1 ? "" : "border-b"
                }`}
                onMouseEnter={ () => setHoveredRow(index)}
                onMouseLeave={ () => setHoveredRow(null)}
              >
                <td className="py-4 px-3">
                  <NavLink className="hover:underline hover:text-emerald-500 font-semibold">
                    {item.name}
                  </NavLink>
                </td>

                <td className="py-4 px-3">
  <TrendChart data={item.trendData} />
</td>

                <td className="py-4 px-3 flex items-center"><IndianRupee className="w-4 h-4 text-gray-600" />
{item.price}</td>

                <td className="py-4 px-3">
                  <p
                    className={`text-sm font-medium ${
                      Math.random() > 0.5 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.random() > 0.5 ? "+" : "-"}
                    {(Math.random() * 2).toFixed(2)}%
                  </p>
                </td>

                <td className="py-4 px-3">{item.oneDvol}

                         {/* Icons visible on hover */}
                                  {hoveredRow === index && (
                                    <div className="flex items-center bg-gray-100 gap-2 absolute right-28 top-1/2 -translate-y-1/2 transition-opacity duration-200 z-40">
                                      {/* Candle icon */}
                                     <button
                    onClick={() =>
                      window.open(
                        `https://www.tradingview.com/chart/?symbol=NSE:${row.indexName}`,
                        "_blank"
                      )
                    }
                    className="p-1 rounded-lg border border-gray-300 hover:bg-blue-100"
                    title="View Chart"
                  >
                    <CandlestickChart size={24} className="text-blue-900 cursor-pointer" />
                  </button>
                  
                  
                                      {/* Bookmark icon */}
                                      <button
                                        onClick={() => handleBookmark(row.company)}
                                        className="p-1 bg-green-500 w-8 h-8 rounded-lg hover:cursor-pointer"
                                        title="Buy"
                                      >
                                        B
                                      </button>
                                      <button
                                        onClick={() => handleBookmark(row.company)}
                                        className="p-1 hover:cursor-pointer rounded-lg bg-orange-600 w-8 h-8"
                                        title="Sell"
                                      >
                                        S
                                      </button>
                                    </div>
                                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      )
    }
   

    

   {createWatchlist && (
  <div className="fixed inset-0 bg-black/40 animate-fadeInn flex justify-center items-center z-50"
      onClick={() => setCreateWatchList(false)}  >
    <div className="bg-white w-[400px] rounded-lg shadow-lg p-6"
     onClick={(e) => e.stopPropagation()}>
      
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create Watchlist
      </h2>

      {/* Input */}
      <input
        type="text"
        maxLength={20}
        placeholder="Enter watchlist name"
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        value={watchlistName}
        onChange={(e) => setWatchlistName(e.target.value)}
      />

      {/* Max letters info */}
      <p className="text-sm text-gray-500 mb-4">
        Max 20 characters
      </p>

      {/* Create Button */}
      <button
        onClick={handleCreateWatchlist}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
      >
        Create
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default WatchlistMF;
