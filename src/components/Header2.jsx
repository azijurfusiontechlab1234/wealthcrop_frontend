import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import icon from "../assets/favicon.png";
import SearchPopup from "./SearchPopup";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header2({ activeCategory }) {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Detect which tab is active
  const activeTab = location.pathname.includes("explore")
    ? "Explore"
    : "Dashboard";

  // ⭐ FIXED: Redirect only when category changes AND user is not already in correct explore route
 useEffect(() => {
  if (activeCategory === "stocks") {
    // redirect only if the user is NOT in the stocks category at all
    if (!location.pathname.startsWith("/user/stocks")) {
      navigate("/user/stocks/explore");
    }
  }

  if (activeCategory === "funds") {
    // redirect only if the user is NOT in the funds category at all
    if (!location.pathname.startsWith("/user/mutual_fund")) {
      navigate("/user/mutual_fund/explore");
    }
  }
}, [activeCategory]);


  // Tab switching
  const handleTab = (tab) => {
    if (activeCategory === "stocks") {
      tab === "Explore"
        ? navigate("/user/stocks/explore")
        : navigate("/user/stocks/holdings");
    } else if (activeCategory === "funds") {
      tab === "Explore"
        ? navigate("/user/mutual_fund/explore")
        : navigate("/user/mutual_fund/investments");
    }
  };

  // Sticky scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MAIN HEADER */}
      <div
        className={`w-full bg-white shadow-sm px-5 py-3 flex flex-col items-center transition-all ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Search */}
        <div className="relative w-full max-w-md">
          <img src={icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-6" />
          <div
            onClick={() => setShowSearch(true)}
            className="flex items-center justify-center border border-gray-200 rounded-full py-2 pl-10 pr-10 bg-gray-50 text-gray-500 cursor-pointer"
          >
            <Search className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">Search Wealthcrop...</span>
          </div>
          <img
            src={icon}
            onClick={() => navigate("/profile")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 cursor-pointer"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center w-full max-w-md mt-4">
          {["Explore", "Dashboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`flex-1 text-center pb-2 font-medium ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* STICKY HEADER */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-center w-full py-2">
          {["Explore", "Dashboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`flex-1 text-center pb-2 font-medium ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {showSearch && <SearchPopup onClose={() => setShowSearch(false)} />}
    </>
  );
}
