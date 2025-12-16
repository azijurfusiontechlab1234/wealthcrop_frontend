import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import topInvest from "../assets/top investment/topinvest.svg"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CandlestickChart, Bookmark } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { FaBasketballBall } from 'react-icons/fa'; // Import the basket icon


const MFDashboard = () => {
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
  { name: "Dashboard", link: "investments" },
  { name: "SIPs", link: "sip" },
  { name: "Watchlist", link: "watchlist" },
];


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
    <div className="min-h-screen bg-white text-blue-950 hidden lg:block pb-2">
      
      {/* Sticky header */}
      <div
        className={`bg-white transition-top duration-300 border-b ease-in-out ${
          isSticky
            ? "fixed top-0 left-0 w-full shadow-sm z-50"
            : "relative"
        }`}
      >
        {/* Tabs + Search */}
        <div className="flex flex-col px-10 py-5 gap-3.5">

          <p className="text-[10px] text-gray-400 tracking-wide uppercase ">
      Explore Mutual Fund 
    </p>
          <div className="flex flex-col lg:flex-row justify-between items-center">
          <nav className="flex gap-8 text-md font-medium overflow-x-auto">
            {topTabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.link}
                end
                className={({ isActive }) =>
                  `relative text-gray-600 hover:text-blue-800 transition pb-1
                  after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-800 
                  after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300
                  ${isActive ? "text-blue-800 after:scale-x-100" : ""}`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>



<Link to="/baskets">
  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm">
    <FaBasketballBall className="mr-2 text-sm" />
    Baskets
  </button>
</Link>


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


export default MFDashboard;
