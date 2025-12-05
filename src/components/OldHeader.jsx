import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiBell, HiUserCircle } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import SearchPopup from "./SearchPopup";
import { logout } from "../redux/authenticationSlice";
import StockImage from "../assets/mutualFund/stock.jpg";
import StockImage2 from "../assets/mutualFund/stock1.jpg";
import StockImage3 from "../assets/mutualFund/stock2.jpg";
import {
  User,
  Mail,
  IndianRupee,
  FileText,
  Headphones,
  BarChart3,
  LogOut,
  Settings,
  Sun,
  ChevronRight,
} from "lucide-react";
import MutualFundCarousel from "../carousel/MutualFundCarousel";

export default function OldHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate()

  // To Scroll open
  const [isScroll, setIsScroll] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        // scrolling DOWN → hide header
        setIsScroll(true);
      } else {
        // scrolling UP → show header
        setIsScroll(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);



  // ✅ Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ✅ Keep Redux in sync if localStorage token removed manually
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken && token) {
        dispatch({ type: "auth/logout" });
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to home
    window.location.reload()
  };

  const handleSetting = () => {
    navigate("/profile")
  }

  return (
    <>
      <nav className={`w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50 transition-all duration-300
       ${isScroll ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        {/* ⭐ Always on top of everything */}

        <MutualFundCarousel />
        <div className="flex justify-between items-center px-6 md:px-12 pb-1">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                className="w-36 md:w-40 h-auto"
                src={logo}
                alt="Wealthcrop Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {/* Mutual Fund */}
            <div className="relative group">
              <button className="text-[#1C2434] font-semibold hover:text-[#4A5FFF]">
                Mutual Funds
              </button>
              {/* Full width mega dropdown */}
              <div className="fixed left-0 top-full right-0 w-full bg-white shadow-lg 
                py-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                 transition-all duration-300 ease-out">

                {/* Center Content */}
                <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-10 px-6">
                  {/* Left Image + Text */}
                  <div className="col-span-1 flex flex-col gap-5 pr-10 border-r">
                    <img src={StockImage} className="w-56 h-56 object-contain" />
                    <a href="#" className="hover:text-[#4A5FFF] transition">
                      <h3 className="text-xl font-semibold text-[#0F172A]">
                        Invest in Mutual Funds
                      </h3>
                    </a>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Explore SIP, tax-saving ELSS, aggressive funds, and track returns in real-time.
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="col-span-3 grid grid-cols-3 gap-10 text-sm">
                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">SIP Investment</h4>
                      </a>
                      <p className="text-gray-500">Start monthly investing in best performing funds.</p>
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">One-Time Investment</h4>
                      </a>
                      <p className="text-gray-500">Invest lump sum when the market is favorable.</p>
                    </div>
                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Compare Funds</h4>
                      </a>
                      <p className="text-gray-500">Compare risk level, past returns & ratings.</p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Tax Saving (ELSS)</h4>
                      </a>
                      <p className="text-gray-500">Save up to ₹1.5L under section 80C.</p>
                    </div>

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">High-Return Funds</h4>
                      </a>
                      <p className="text-gray-500">Explore aggressive growth mutual funds.</p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Low Risk Funds</h4>
                      </a>
                      <p className="text-gray-500">Ideal for safe and stable investment planning.</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* Stocks */}
            <div className="relative group">
              <button className="text-[#1C2434] font-semibold hover:text-[#4A5FFF]">
                Stocks
              </button>

              {/* Full width mega dropdown */}
              <div className="fixed left-0 top-full right-0 w-full bg-white shadow-lg 
             py-8 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
             transition-all duration-300 ease-out">

                {/* Center content */}
                <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-10 px-6">
                  {/* Left Image + Text */}
                  <div className="col-span-1 flex flex-col gap-5 pr-10 border-r">
                    <img src={StockImage2} className="w-56 h-56 object-contain" />
                    <a href="#" className="hover:text-[#4A5FFF] transition">
                      <h3 className="text-xl font-semibold text-[#0F172A]">
                        Invest in Stocks
                      </h3>
                    </a>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Buy, track, and manage your stock market portfolio with real-time updates,
                      market news and analytics.
                    </p>
                  </div>

                  {/* Right Section - 3 columns */}
                  <div className="col-span-3 grid grid-cols-3 gap-10 text-sm">

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Intraday Trading</h4>
                      </a>
                      <p className="text-gray-500">Trade stocks within the day for quick opportunities.</p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">IPO Investments</h4>
                      </a>
                      <p className="text-gray-500">Apply for new IPOs before they get listed.</p>
                    </div>

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Stock Screener</h4>
                      </a>
                      <p className="text-gray-500">Filter stocks by price, PE ratio, volume & more.</p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">ETF Investing</h4>
                      </a>
                      <p className="text-gray-500">Diversify your investments with exchange-traded funds.</p>
                    </div>

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Market Watchlist</h4>
                      </a>
                      <p className="text-gray-500">Track your favorite stocks in real-time.</p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Demat + Trading</h4>
                      </a>
                      <p className="text-gray-500">Open a free Demat account & start investing instantly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* F&O Section */}
            <div className="relative group">
              <button className="text-[#1C2434] font-semibold hover:text-[#4A5FFF]">
                F&O
              </button>
              {/* Full width mega dropdown */}
              <div className="fixed left-0 top-full right-0 w-full bg-white shadow-lg 
                   py-8 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                   transition-all duration-300 ease-out">
                {/* Center content */}
                <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-10 px-6">
                  {/* Left Section */}
                  <div className="col-span-1 flex flex-col gap-5 pr-10 border-r">
                    <img src={StockImage3} className="w-56 h-56 object-contain" />
                    <a href="#" className="hover:text-[#4A5FFF] transition">
                      <h3 className="text-xl font-semibold text-[#0F172A]">
                        Futures & Options
                      </h3>
                    </a>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Trade index and stock derivatives, hedge risks, or use leverage to
                      amplify gains with live charts and smart order tools.
                    </p>
                  </div>

                  {/* Right Section - F&O Items */}
                  <div className="col-span-3 grid grid-cols-3 gap-10 text-sm">
                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Index Futures</h4>
                      </a>
                      <p className="text-gray-500">
                        Trade NIFTY & BANKNIFTY futures with advanced indicators and tools.
                      </p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Stock Futures</h4>
                      </a>
                      <p className="text-gray-500">
                        Buy & sell futures of top performing Indian stocks.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Options Trading</h4>
                      </a>
                      <p className="text-gray-500">
                        Trade call & put options with strike price insights.
                      </p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Option Chains</h4>
                      </a>
                      <p className="text-gray-500">
                        View OI, IV, Greeks & price movement in real-time.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Strategies Builder</h4>
                      </a>
                      <p className="text-gray-500">
                        Create multi-leg strategies like Straddle, Strangle & Iron Condor.
                      </p>

                      <a href="#" className="hover:text-[#4A5FFF] transition">
                        <h4 className="font-semibold text-[#0F172A]">Margin Calculator</h4>
                      </a>
                      <p className="text-gray-500">
                        Check margin requirements before placing leveraged trades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* More Section */}
            <div className="relative group">
              <button className="text-[#1C2434] font-semibold hover:text-[#4A5FFF]">
                More
              </button>
              {/* Full width mega dropdown */}
              <div className="fixed left-0 top-full right-0 w-full bg-white shadow-lg 
                py-12 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-300 ease-out">
                {/* Center content */}
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-16 px-6 text-sm">
                  {/* LEFT COLUMN */}
                  <div className="space-y-6">
                    <div>
                      <Link to="" className="hover:text-[#4A5FFF] transition text-lg font-semibold text-[#0F172A]">
                        SIP Calculator
                      </Link>
                      <p className="text-gray-500">Calculate future wealth based on SIP investments.</p>
                    </div>
                    <div>
                      <a href="#" className="hover:text-[#4A5FFF] text-lg transition font-semibold text-[#0F172A]">
                        Brokerage Calculator
                      </a>
                      <p className="text-gray-500">Check charges before placing equity or F&O orders.</p>
                    </div>
                    <div>
                      <a href="#" className="hover:text-[#4A5FFF] text-lg transition font-semibold text-[#0F172A]">
                        Margin Calculator
                      </a>
                      <p className="text-gray-500">Estimate required margin for F&O trading.</p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-6">
                    <div>
                      <a href="#" className="hover:text-[#4A5FFF] text-lg transition font-semibold text-[#0F172A]">
                        Swap Calculator
                      </a>
                      <p className="text-gray-500">Check overnight swap charges in leveraged trading.</p>
                    </div>
                    <div>
                      <Link
                        to="/blogs"
                        className="hover:text-[#4A5FFF] transition text-lg font-semibold text-[#0F172A]"
                      >
                        Blog
                      </Link>
                      <p className="text-gray-500">Learn investing, trading strategies & financial tips.</p>
                    </div>
                    <div>
                      <Link
                        to="/help"
                        className="hover:text-[#4A5FFF] transition text-lg font-semibold text-[#0F172A]"
                      >
                        Help & Support
                      </Link>
                      <p className="text-gray-500">Get FAQs, customer care, and instant assistance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Links */}
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
            <input
              type="text"
              placeholder="Search for stocks, mutual funds..."
              onFocus={() => token && setIsSearchOpen(true)}
              className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-900 shadow-sm cursor-pointer"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-5">
            {token ? (
              <>
                <button className="text-blue-900 hover:text-blue-700 transition relative">
                  <HiBell className="text-2xl" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>

                {/* <HiBell className="text-2xl" /> */}
                <div className="relative group">
                  {/* Profile Icon Button */}
                  <button className="text-blue-900 hover:text-blue-700 transition cursor-pointer mt-1.5">
                    <User className="text-3xl" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className="absolute -right-2.5 top-full mt-1 w-80 bg-white rounded-xl shadow-xl border border-gray-100
      opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1
      transition-all duration-300 ease-out z-50"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between px-4 py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Fusion Techlab
                        </h3>
                        <p className="text-sm text-gray-500">
                          fusionbusiness001@gmail.com
                        </p>
                      </div>
                      <Settings
                        onClick={handleSetting}
                        size={18}
                        className="text-gray-500 mt-1 cursor-pointer"
                      />
                    </div>

                    {/* 🔹 Balance (clickable) */}
                    <Link
                      to="/user/balance"
                      className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <IndianRupee size={18} className="text-gray-600" />
                        <div>
                          <p className="text-gray-900 font-medium">₹0.00</p>
                          <p className="text-xs text-gray-500">
                            Stocks, F&O balance
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </Link>

                    {/* 🔹 Links */}
                    <div className="py-2 space-y-1">
                      <Link
                        to="/user/order/stocks"
                        className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={18} />
                          <span>All Orders</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>

                      <Link
                        to="/support"
                        className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Headphones size={18} />
                          <span>24 × 7 Customer Support</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>

                      <Link
                        to="/reports"
                        className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <BarChart3 size={18} />
                          <span>Reports</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    </div>

                    {/* 🔹 Footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-700 font-medium border-b border-dashed"
                      >
                        <LogOut size={18} />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-900 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 shadow-sm transition"
              >
                Login / Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-900 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden space-y-4 bg-white border-t border-gray-100 px-6 py-4 shadow-md transition-all duration-300 ease-in-out ${menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div>
            <button
              onClick={() => setInvestOpen(!investOpen)}
              className="w-full flex justify-between items-center text-blue-900 font-medium"
            >
              <span>Invest In</span>
              <span>{investOpen ? "▴" : "▾"}</span>
            </button>
            {investOpen && (
              <div className="pl-4 pt-2 space-y-1">
                <Link to="/user/mutual_fund" className="block text-blue-900">
                  Mutual Fund
                </Link>
                <Link to="/user/stocks" className="block text-blue-900">
                  Stocks
                </Link>
                <Link to="/user/f&o" className="block text-blue-900">
                  F&O
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              className="w-full flex justify-between items-center text-blue-900 font-medium"
            >
              <span>Calculators</span>
              <span>{calcOpen ? "▴" : "▾"}</span>
            </button>
            {calcOpen && (
              <div className="pl-4 pt-2 space-y-1">
                <Link className="block text-blue-900">
                  Mutual Fund Calculator
                </Link>
                <Link className="block text-blue-900">
                  Fixed Deposit Calculator
                </Link>
                <Link className="block text-blue-900">
                  Retirement Calculator
                </Link>
              </div>
            )}
          </div>

          <Link to="/blogs" className="block text-blue-900 font-medium">
            Blog
          </Link>
          <Link to="/help" className="block text-blue-900 font-medium">
            Help
          </Link>

          {token ? (
            <div className="flex items-center justify-center gap-5 mt-5 text-blue-900">
              <HiBell className="text-2xl" />
              <Link to="/profile">
                <HiUserCircle className="text-3xl" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="block text-center bg-blue-900 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 shadow-sm transition mt-4"
            >
              Login / Signup
            </Link>
          )}

          {/* Mobile Search */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => token && setIsSearchOpen(true)}
              className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-900"
            />
          </div>
        </div>
      </nav>

      {/* ✅ Global Search Popup */}
      {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
