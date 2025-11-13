import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import topInvest from "../../assets/top investment/topinvest.svg"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CandlestickChart, Bookmark } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";


const Explore = () => {
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
     
        {/* PAGE CONTENT */}
        <div className="mt-10 px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* left side content */}
          <div className="lg:col-span-2 ">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Left Section */}
              <div className="lg:col-span-2">
                <h2 className="font-semibold text-xl mb-6 text-blue-950">
                  Most bought stocks on Wealthcrop
                </h2>

                {/* Stock grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {stocks.map((stock, index) => (
                    <div
                      key={stock.name}
                      className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-5 h-48 cursor-pointer"
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* 🔖 Bookmark Icon (appears on hover) */}
                      {hoveredRow === index && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(index);
                          }}
                          className="absolute top-2 right-2 bg-white  p-1  hover:scale-110 transition-transform hover:cursor-pointer"
                        >
                          {bookmarked[index] ? (
                            <FaBookmark className="text-blue-600" size={20} />
                          ) : (
                            <FaRegBookmark
                              className="text-gray-400"
                              size={20}
                            />
                          )}
                        </button>
                      )}

                      {/* Logo + Name */}
                      <div>
                        <div className="w-10 h-10 mb-2 border rounded border-gray-300 overflow-hidden">
                          <img
                            src={stock.logo}
                            alt={stock.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-blue-950 text-sm line-clamp-2 min-h-10">
                          {stock.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          NSE • Equity
                        </p>
                      </div>

                      {/* Price + Change */}
                      <div>
                        <p className="text-lg font-bold mt-2 text-gray-800">
                          ₹{(Math.random() * 3000 + 500).toFixed(2)}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            Math.random() > 0.5
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 2).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See more link */}
                <div className="mt-6 pl-2">
                  <Link
                    to="/"
                    className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    See more <FaAngleRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Top market movers */}
            <div className="hidden lg:block lg:col-span-2 mt-5 mb-10 ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Top market movers</h2>
                <div className="flex gap-2">
                  {["Gainers", "Losers", "Volume shockers"].map((btn) => (
                    <button
                      key={btn}
                      onClick={() => setActiveTab(btn)}
                      className={`border rounded-full px-3 py-1 text-sm transition ${
                        activeTab === btn
                          ? "bg-gray-200 text-gray-900 font-medium"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                  {/* dropdown */}
                  <div
                    className="relative inline-block text-sm"
                    ref={dropdownRef}
                  >
                    {/* Dropdown header */}
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1.5 hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-gray-700">
                        {selected}
                      </span>
                      {open ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>

                    {/* Dropdown list */}
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 space-y-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
                        >
                          {options.map((option) => (
                            <button
                              key={option.label}
                              onClick={() => handleSelect(option)}
                              className={`flex items-center gap-3 px-4 py-4 mt-4 w-full text-left hover:bg-gray-100 transition ${
                                selected === option.label ? "" : ""
                              }`}
                            >
                              {/* Custom radio button */}
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${
                                  selected === option.label
                                    ? "border-blue-600"
                                    : "border-blue-600"
                                }`}
                              >
                                {selected === option.label && (
                                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                                )}
                              </span>

                              <span className="text-gray-700 font-semibold">
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <MarketTable />
            </div>

            {/* Most traded stocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Left Section */}
              <div className="lg:col-span-2">
                <h2 className="font-semibold text-xl mb-6 text-blue-950">
                  Most traded stocks in MTF
                </h2>

                {/* Stock grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {stocks.map((stock, index) => (
                    <div
                      key={stock.name}
                      className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-5 h-48 cursor-pointer"
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* 🔖 Bookmark Icon (appears on hover) */}
                      {hoveredRow === index && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(index);
                          }}
                          className="absolute top-2 right-2 bg-white  p-1  hover:scale-110 transition-transform hover:cursor-pointer"
                        >
                          {bookmarked[index] ? (
                            <FaBookmark className="text-blue-600" size={20} />
                          ) : (
                            <FaRegBookmark
                              className="text-gray-400"
                              size={20}
                            />
                          )}
                        </button>
                      )}

                      {/* Logo + Name */}
                      <div>
                        <div className="w-10 h-10 mb-2 border rounded border-gray-300 overflow-hidden">
                          <img
                            src={stock.logo}
                            alt={stock.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-blue-950 text-sm line-clamp-2 min-h-10">
                          {stock.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          NSE • Equity
                        </p>
                      </div>

                      {/* Price + Change */}
                      <div>
                        <p className="text-lg font-bold mt-2 text-gray-800">
                          ₹{(Math.random() * 3000 + 500).toFixed(2)}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            Math.random() > 0.5
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 2).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See more link */}
                <div className="mt-6 pl-2">
                  <Link
                    to="/"
                    className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    See more <FaAngleRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Most Intraday stocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Left Section */}
              <div className="lg:col-span-2">
                <h2 className="font-semibold text-xl mb-6 text-blue-950">
                  Top intraday stocks
                </h2>

                {/* Stock grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {stocks.map((stock, index) => (
                    <div
                      key={stock.name}
                      className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-5 h-48 cursor-pointer"
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* 🔖 Bookmark Icon (appears on hover) */}
                      {hoveredRow === index && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(index);
                          }}
                          className="absolute top-2 right-2 bg-white  p-1  hover:scale-110 transition-transform hover:cursor-pointer"
                        >
                          {bookmarked[index] ? (
                            <FaBookmark className="text-blue-600" size={20} />
                          ) : (
                            <FaRegBookmark
                              className="text-gray-400"
                              size={20}
                            />
                          )}
                        </button>
                      )}

                      {/* Logo + Name */}
                      <div>
                        <div className="w-10 h-10 mb-2 border rounded border-gray-300 overflow-hidden">
                          <img
                            src={stock.logo}
                            alt={stock.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-blue-950 text-sm line-clamp-2 min-h-10">
                          {stock.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          NSE • Equity
                        </p>
                      </div>

                      {/* Price + Change */}
                      <div>
                        <p className="text-lg font-bold mt-2 text-gray-800">
                          ₹{(Math.random() * 3000 + 500).toFixed(2)}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            Math.random() > 0.5
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 2).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See more link */}
                <div className="mt-6 pl-2">
                  <Link
                    to="/"
                    className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    Intraday screener <FaAngleRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 3: News */}
            <div className="lg:col-span-2">
              <h2 className="font-semibold text-lg mb-4">Latest Market News</h2>
              <div className="bg-white rounded-xl shadow divide-y">
                {[
                  "Sensex edges higher amid IT buying",
                  "RBI holds repo rate steady at 6.5%",
                  "FII inflows push Nifty above 25,500",
                ].map((news, i) => (
                  <a
                    href="#"
                    key={i}
                    className="block px-5 py-3 hover:bg-gray-50 text-sm"
                  >
                    {news}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* right side content */}
          <div className="lg:col-span-1">
            {/* Investments */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Your investments</h2>
              <div className="bg-white rounded-xl shadow flex-col p-4 text-center text-gray-500 h-[250px] flex items-center justify-center">
                <img src={topInvest} alt="" />
                <p className="mt-5">You haven’t invested yet</p>
              </div>
            </div>

            {/* Product and Tools */}
            <div className="mt-15">
              <h2 className="font-semibold text-lg mb-4">Products & Tools</h2>
              <div className="space-y-5">
                {[
                  { name: "IPO", count: 6 },
                  { name: "Bonds", count: 1 },
                  { name: "ETFs", count: 2 },
                  { name: "Fixed Deposit", count: 3 },
                ].map((tool) => (
                  <a
                    href="#"
                    key={tool.name}
                    className="bg-white rounded-xl p-6 shadow hover:shadow-md transition flex justify-between items-center"
                  >
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-xs text-green-700 font-semibold">
                      {tool.count} open
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Trending ETFs */}
            <div>
              <h2 className="font-semibold text-lg mb-4 mt-16">
                Trending ETFs
              </h2>
              <div className="space-y-5">
                {[
                  "Nippon India ETF",
                  "HDFC Gold ETF",
                  "ICICI Prudential Nifty Next 50",
                ].map((etf) => (
                  <a
                    href="#"
                    key={etf}
                    className="bg-white rounded-xl p-4 shadow hover:shadow-md transition block"
                  >
                    <h3 className="font-medium text-sm">{etf}</h3>
                    <p className="text-gray-500 text-xs">ETF • NSE</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Knowledge Center */}
        <div className="px-10 mt-10">
          <h2 className="font-semibold text-lg mb-4">Knowledge Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "How to start SIPs effectively",
              "What is diversification in investing?",
              "Top 5 safe long-term investment plans",
            ].map((article) => (
              <a
                href="#"
                key={article}
                className="bg-white rounded-xl shadow p-5 hover:shadow-md transition block"
              >
                <h3 className="font-medium text-blue-950 text-sm">{article}</h3>
                <p className="text-gray-500 text-xs mt-1">
                  Learn about investment strategies and mutual funds
                </p>
              </a>
            ))}
          </div>
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

export default Explore;
