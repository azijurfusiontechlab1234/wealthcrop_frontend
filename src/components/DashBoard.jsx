import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import topInvest from "../assets/top investment/topinvest.svg"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CandlestickChart, Bookmark } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";


const Dashboard = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("Gainers");
  const [hoveredRow, setHoveredRow] = useState(null);

  // const [stocks, setStocks] = useState([]);

  //  const fetchData = async (category) => {
  //   try {
  //     // Example URLs — replace with your real API endpoints
  //     let url = "";
  //     if (category === "Gainers") url = "/api/market/gainers";
  //     if (category === "Losers") url = "/api/market/losers";
  //     if (category === "Volume shockers") url = "/api/market/volumes";

  //     const { data } = await axios.get(url);
  //     setStocks(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(activeTab); // default load Gainers
  // }, [activeTab]);

 

 const topTabs = [
  { name: "Explore", link: "explore" },
  { name: "Holdings", link: "holdings" },
  { name: "Positions", link: "positions" },
  { name: "Orders", link: "orders" },
  { name: "Watchlist", link: "watchlist" },
];

  const markets = [
    { name: "NIFTY", value: "25,597.65", change: "0.00 (0.00%)" },
    { name: "SENSEX", value: "83,459.15", change: "0.00 (0.00%)" },
    { name: "BANKNIFTY", value: "57,827.05", change: "0.00 (0.00%)" },
    { name: "MIDCPNIFTY", value: "13,375.25", change: "-130.75 (0.97%)" },
    { name: "FINNIFTY", value: "27,195.00", change: "0.00 (0.00%)" },
  ];

  //!for mobile view
    const marketIndices = [
    { name: "NIFTY", value: "25,492.30", change: "-17.40 (0.07%)", isPositive: false },
    { name: "SENSEX", value: "83,216.28", change: "-94.73 (0.11%)", isPositive: false },
    { name: "BANK NIFTY", value: "57,851.20", change: "322.55 (0.56%)", isPositive: true },
    { name: "FINNIFTY", value: "21,356.90", change: "74.25 (0.35%)", isPositive: true },
    { name: "MIDCAP", value: "47,158.40", change: "124.52 (0.27%)", isPositive: true },
    { name: "SMALLCAP", value: "16,728.20", change: "98.14 (0.59%)", isPositive: true },
  ];

  const topGainers = [
    { name: "Shriram Finance", price: "₹816.35", change: "28.65 (3.64%)", logo: "https://logo.clearbit.com/shriramfinance.in" },
    { name: "LIC", price: "₹924.15", change: "28.05 (3.13%)", logo: "https://logo.clearbit.com/licindia.in" },
    { name: "Britannia", price: "₹6,157.35", change: "144.00 (2.41%)", logo: "https://logo.clearbit.com/britannia.co.in" },
    { name: "ONGC", price: "₹216.50", change: "5.10 (2.42%)", logo: "https://logo.clearbit.com/ongcindia.com" },
    { name: "HDFC Bank", price: "₹1,534.25", change: "28.65 (1.91%)", logo: "https://logo.clearbit.com/hdfcbank.com" },
    { name: "TCS", price: "₹3,456.10", change: "68.25 (2.01%)", logo: "https://logo.clearbit.com/tcs.com" },
  ];
//!end


    const stocks = [
    {
      name: "Reliance Power",
      logo: "https://logo.clearbit.com/reliancepower.co.in",
    },
    {
      name: "Vodafone Idea",
      logo: "https://logo.clearbit.com/vodafone.in",
    },
    {
      name: "Infosys",
      logo: "https://logo.clearbit.com/infosys.com",
    },
    {
      name: "HDFC Bank",
      logo: "https://logo.clearbit.com/hdfcbank.com",
    },
  ];

    const options = [
    { label: "NIFTY 100", link: "/nifty-100" },
    { label: "NIFTY 500", link: "/nifty-500" },
    { label: "NIFTY Midcap 100", link: "/nifty-midcap-100" },
    { label: "NIFTY Smallcap 100", link: "/nifty-smallcap-100" },
    { label: "NIFTY Total Market", link: "/nifty-total-market" },
  ];

    const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("NIFTY 100");
  const dropdownRef = useRef(null);

  useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
    window.location.href = option.link; // redirect
  };  

   const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (index) => {
    setBookmarked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    // Optionally: send to API here
    // axios.post('/api/bookmark', { company: stocks[index].name })
  };

  return (
    <>
       <div className="min-h-screen bg-white text-blue-950 hidden lg:block">
      {/* Sticky header */}
      <div
        className={`bg-white transition-top duration-300 border-b ease-in-out hidden lg:block ${
          isSticky
            ? "fixed top-0 left-0 w-full shadow-sm z-50 transition duration-500"
            : "relative"
        }`}
      >
        {/* Tabs + Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center px-10 py-3 gap-4">
          {/* Tabs */}
          <nav className="flex gap-8 text-sm font-medium overflow-x-auto">
            {topTabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.link}
                end
                className={({ isActive }) =>
                  `relative text-gray-600 hover:text-blue-800 transition pb-1
                  after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-800 
                  after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300
                  ${isActive ? "text-blue-800 after:scale-x-100" : ""}`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-800 outline-none"
          />
        </div>

        {/* Market indexes */}
        <div className="flex justify-between items-center px-10 py-2 text-xs text-gray-600">
          <div className="flex gap-16">
            {markets.map((m) => (
              <span key={m.name}>
                <span className="font-semibold text-gray-800">{m.name}</span>{" "}
                {m.value}{" "}
                <span className="text-gray-500">{m.change}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
       <div className="">
        {/* 👇 This renders Explore, Holdings, etc. */}
        <Outlet />
      </div>
    </div>

      {/* For mobile view */}

      <div className="p-5 space-y-8 lg:hidden">
        {/* ===== Market Indices ===== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-semibold">Market Indices</h2>
            <button className="text-xs bg-green-100 uppercase text-green-700 px-3 py-1 rounded-full font-medium">
              Screener
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {marketIndices.map((item, i) => (
              <div
                key={i}
                className="min-w-[130px] bg-white shadow border border-gray-100 rounded-xl p-3 flex flex-col justify-between"
              >
                <h3 className="text-sm font-medium text-gray-700">
                  {item.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {item.value}
                </p>
                <span
                  className={`text-xs font-medium ${
                    item.isPositive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Top Gainers ===== */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-semibold">
              Top Gainers{" "}
              <span className="text-xs text-gray-500">NIFTY100</span>
            </h2>
            <button className="text-xs text-green-700 font-medium">
              See More
            </button>
          </div>

          {/* Wrapper with slight right padding to reveal next card */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pr-6 snap-x snap-mandatory scroll-smooth">
            {topGainers.map((item, i) => (
              <div
                key={i}
                className="min-w-[130px] bg-white shadow border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center snap-start"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 object-contain mb-2 rounded-md"
                />
                <h3 className="text-sm font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-900 font-semibold text-base mt-1">
                  {item.price}
                </p>
                <span className="text-green-600 text-sm mt-1">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks in news */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-semibold">
              Stocks in News{" "}
              <span className="text-xs text-gray-500">NIFTY100</span>
            </h2>
            <button className="text-xs text-green-700 font-medium bg-green-100 rounded-full px-3 py-1">
              NEWS
            </button>
          </div>

          {/* Wrapper with slight right padding to reveal next card */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pr-6 snap-x snap-mandatory scroll-smooth">
            {topGainers.map((item, i) => (
              <div
                key={i}
                className="min-w-[130px] bg-white shadow border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center snap-start"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 object-contain mb-2 rounded-md"
                />
                <h3 className="text-sm font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-900 font-semibold text-base mt-1">
                  {item.price}
                </p>
                <span className="text-green-600 text-sm mt-1">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Loosers */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-semibold">
              Top Loosers{" "}
              <span className="text-xs text-gray-500">NIFTY100</span>
            </h2>
            <button className="text-xs text-green-700 font-medium">
              See More
            </button>
          </div>

          {/* Wrapper with slight right padding to reveal next card */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pr-6 snap-x snap-mandatory scroll-smooth">
            {topGainers.map((item, i) => (
              <div
                key={i}
                className="min-w-[130px] bg-white shadow border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center snap-start"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 object-contain mb-2 rounded-md"
                />
                <h3 className="text-sm font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-900 font-semibold text-base mt-1">
                  {item.price}
                </p>
                <span className="text-green-600 text-sm mt-1">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product and Tools */}
        <div className="mt-15">
          <h2 className="font-semibold text-lg mb-4">Products & Tools</h2>
          <div className="space-y-5">
            {[
              {
                name: "IPO",
                count: 6,
                img: "https://cdn-icons-png.flaticon.com/512/481/481949.png",
              },
              {
                name: "Bonds",
                count: 1,
                img: "https://cdn-icons-png.flaticon.com/512/2716/2716999.png",
              },
              {
                name: "ETFs",
                count: 2,
                img: "https://cdn-icons-png.flaticon.com/512/7099/7099964.png",
              },
              {
                name: "Fixed Deposit",
                count: 3,
                img: "https://cdn-icons-png.flaticon.com/512/4228/4228704.png",
              },
            ].map((tool) => (
              <a
                href="#"
                key={tool.name}
                className="bg-white rounded-xl p-5 shadow hover:shadow-md transition flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-800">{tool.name}</span>
                </div>
                <span className="text-xs text-green-700 font-semibold">
                  {tool.count} open
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Most Valuable */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 font-semibold">
              Most Valuable{" "}
              <span className="text-xs text-gray-500">NIFTY100</span>
            </h2>
            {/* <button className="text-xs text-green-700 font-medium">
              See More
            </button> */}
          </div>

          {/* Wrapper with slight right padding to reveal next card */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pr-6 snap-x snap-mandatory scroll-smooth">
            {topGainers.map((item, i) => (
              <div
                key={i}
                className="min-w-[130px] bg-white shadow border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center snap-start"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 object-contain mb-2 rounded-md"
                />
                <h3 className="text-sm font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-900 font-semibold text-base mt-1">
                  {item.price}
                </p>
                <span className="text-green-600 text-sm mt-1">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

// Table for movers
const MarketTable = () => {
      const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
     // Bookmark API call
  const handleBookmark = async (company) => {
    try {
      await axios.post("/api/bookmark", { company });
      alert(`${company} bookmarked successfully!`);
    } catch (err) {
      console.error("Bookmark failed", err);
    }
  };
  const data = [
    { company: "Reliance", indexName: "RELIANCE", price: "₹2,987.30", volume: "12.3M" },
    { company: "Infosys Limited", indexName: "INFY", price: "₹1,540.25", volume: "9.8M" },
    { company: "TCS", indexName: "TCS", price: "₹3,700.00", volume: "8.1M" },
    { company: "HDFC", indexName: "HDFCBANK", price: "₹1,670.50", volume: "5.6M" },
    { company: "ICICI Bank", indexName: "ICICIBANK", price: "₹980.60", volume: "4.7M" },
  ];

   return (
    <div className="bg-white rounded-xl shadow overflow-x-auto relative">
      {/* Table */}
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="text-left px-6 py-3">Company</th>
            <th className="text-left px-6 py-3">Market price (1D)</th>
            <th className="text-left px-6 py-3">Volume</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.company}
              className="border-t hover:bg-gray-50 relative"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="px-6 py-3">
                <a
                  href="#"
                  className="text-blue-900 hover:underline font-medium"
                >
                  {row.company}
                </a>
              </td>
              <td className="px-6 py-3">{row.price}</td>
              <td className="px-6 py-3 flex items-center justify-between">
                {row.volume}

                {/* Icons visible on hover */}
                {hoveredRow === index && (
                  <div className="flex items-center gap-2 absolute right-6 top-2 transition-opacity duration-200">
                    {/* Candle icon */}
                   <button
  onClick={() =>
    window.open(
      `https://www.tradingview.com/chart/?symbol=NSE:${row.indexName}`,
      "_blank"
    )
  }
  className="p-1 rounded-full hover:bg-blue-100"
  title="View Chart"
>
  <CandlestickChart size={18} className="text-blue-900 cursor-pointer" />
</button>


                    {/* Bookmark icon */}
                    <button
                      onClick={() => handleBookmark(row.company)}
                      className="p-1 rounded-full hover:bg-yellow-100"
                      title="Bookmark"
                    >
                      <Bookmark
                        size={18}
                        className="text-yellow-600 cursor-pointer"
                      />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart Popup */}
      {selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] md:w-[60%] relative">
            <button
              onClick={() => setSelectedStock(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              {selectedStock} Chart
            </h2>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=1D&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=f1f3f6`}
              style={{ width: "100%", height: "400px", border: "none" }}
              title="TradingView Chart"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
