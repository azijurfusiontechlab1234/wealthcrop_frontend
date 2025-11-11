import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import icon from "../assets/favicon.png";
import SearchPopup from "./SearchPopup";
import { useNavigate } from "react-router-dom";

export default function Header2() {
  const [activeTab, setActiveTab] = useState("Explore");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // ✅ Function to check window width
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      // lg breakpoint in Tailwind is 1024px
      setActiveTab("Explore");
      navigate("/user/stocks", { replace: true });
    }
  };

  // ✅ Run on mount and whenever window resizes
  useEffect(() => {
    handleResize(); // check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-white shadow-sm px-5 py-3 flex flex-col items-center relative">
      {/* 🔹 Top Search Section */}
      <div className="relative w-full max-w-md">
        <img
          src={icon}
          alt="left logo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6"
        />
        <div
          onClick={() => setShowSearch(true)}
          className="flex items-center justify-center border border-gray-200 rounded-full py-2 pl-10 pr-10 bg-gray-50 text-gray-500 cursor-pointer"
        >
          <Search className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">Search Wealthcrop...</span>
        </div>
        <img
          src={icon}
          alt="right logo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6"
        />
      </div>

      {/* 🔹 Tabs Section */}
      <div className="flex justify-center w-full max-w-md mt-4 relative border-b border-gray-200">
        {["Explore", "Dashboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "Explore") navigate("/user/stocks");
              if (tab === "Dashboard") navigate("/dashboard2");
            }}
            className={`flex-1 text-center pb-2 font-medium transition-all duration-200 ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-700 border-b-2 border-transparent hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {showSearch && <SearchPopup onClose={() => setShowSearch(false)} />}
    </div>
  );
}
