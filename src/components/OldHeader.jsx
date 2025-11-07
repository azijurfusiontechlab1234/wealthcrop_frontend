import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiBell, HiUserCircle } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import SearchPopup from "./SearchPopup";

export default function OldHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();


console.log("Current route:", location.pathname);
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

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
        <div className="flex justify-between items-center px-6 md:px-12 py-3">
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
            {/* Invest In */}
            <div className="relative group">
              <button className="text-blue-900 font-medium hover:text-blue-700 transition cursor-pointer">
                Invest In ▾
              </button>
              <div
                className="absolute left-0 top-full w-44 bg-white rounded-xl shadow-lg overflow-hidden
              opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1
              transition-all duration-300 ease-out border border-gray-100"
              >
                <Link
                  to="/user/mutual_fund"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  Mutual Fund
                </Link>
                <Link
                  to="/user/stocks"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  Stocks
                </Link>
                <Link
                  to="/user/f&o"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  F&O
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="relative group">
              <button className="text-blue-900 font-medium hover:text-blue-700 transition cursor-pointer">
                Tools ▾
              </button>
              <div
                className="absolute left-0 top-full w-60 bg-white rounded-xl shadow-lg overflow-hidden
              opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1
              transition-all duration-300 ease-out border border-gray-100"
              >
                <Link
                  to="/mutualFund"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  Mutual Fund Calculator
                </Link>
                <Link
                  to="/stocks"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  Fixed Deposit Calculator
                </Link>
                <Link
                  to="/bonds"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  Retirement Calculator
                </Link>
                <Link
                  to="/sip_Cal"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                >
                  SIP Calculator
                </Link>
              </div>
            </div>

            {/* Static Links */}
            <Link
              to="/blog"
              className="text-blue-900 font-medium hover:text-blue-700 hover:underline underline-offset-4 transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/help"
              className="text-blue-900 font-medium hover:text-blue-700 hover:underline underline-offset-4 transition-colors duration-200"
            >
              Help
            </Link>
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
                <Link to="/profile">
                  <HiUserCircle className="text-3xl text-blue-900 hover:text-blue-700 transition" />
                </Link>
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
          className={`md:hidden space-y-4 bg-white border-t border-gray-100 px-6 py-4 shadow-md transition-all duration-300 ease-in-out ${
            menuOpen
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

          <Link to="/blog" className="block text-blue-900 font-medium">
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
