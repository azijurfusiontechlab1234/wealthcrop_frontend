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
    {/* DESKTOP VIEW */}
    <div className="min-h-screen bg-white text-blue-950 hidden lg:block">
      
      {/* Sticky header */}
      <div
        className={`bg-white transition-top duration-300 border-b ease-in-out ${
          isSticky
            ? "fixed top-0 left-0 w-full shadow-sm z-50"
            : "relative"
        }`}
      >
        {/* Tabs + Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center px-10 py-3 gap-4">
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
              <NavLink key={m.name}
              to="/">
                <span className="font-semibold text-gray-800">{m.name}</span>{" "}
                {m.value}{" "}
                <span className="text-gray-500">{m.change}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP OUTLET */}
      <div className="mt-2">
        <Outlet />
      </div>
    </div>


    {/* MOBILE VIEW */}
    <div className="lg:hidden px-3 py-2 mb-8">
      {/* You can add mobile tabs or keep empty */}

      {/* MOBILE OUTLET → REQUIRED */}
      <Outlet />
    </div>
  </>
);

};


export default Dashboard;
