import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100  left-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-12 py-3">
        {/* Left - Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img className="w-36 md:w-40 h-auto" src={logo} alt="Wealthcrop Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 relative">
          {/* Invest In Dropdown */}
          <div className="relative group">
            <button className="text-blue-900 font-medium hover:text-blue-700 transition cursor-pointer">
              Invest In ▾
            </button>
            <div
              className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg overflow-hidden
              opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1
              transition-all duration-300 ease-out border border-gray-100"
            >
              <Link
                to="/mutualFund"
                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
              >
                Mutual Fund
              </Link>
              <Link
                to="/stocks"
                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
              >
                Stocks
              </Link>
              <Link
                to="/bonds"
                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
              >
                Bonds
              </Link>
            </div>
          </div>

          {/* Calculators Dropdown */}
          <div className="relative group">
            <button className="text-blue-900 font-medium hover:text-blue-700 transition cursor-pointer">
              Calculators ▾
            </button>
            <div
              className="absolute left-0 top-full mt-1 w-60 bg-white rounded-xl shadow-lg overflow-hidden
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
            </div>
          </div>

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

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
          <input
            type="text"
            placeholder="Search for stocks, mutual funds..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm 
            focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-900 shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
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

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="bg-blue-900 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 shadow-sm transition"
          >
            Login / Signup
          </Link>
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
        className={`md:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-md transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {/* Invest In Section */}
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
              <Link to="/mutualFund" className="block text-blue-900">
                Mutual Fund
              </Link>
              <Link to="/stocks" className="block text-blue-900">
                Stocks
              </Link>
              <Link to="/bonds" className="block text-blue-900">
                Bonds
              </Link>
            </div>
          )}
        </div>

        {/* Calculators Section */}
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
              <Link to="/mutualFund" className="block text-blue-900">
                Mutual Fund Calculator
              </Link>
              <Link to="/stocks" className="block text-blue-900">
                Fixed Deposit Calculator
              </Link>
              <Link to="/bonds" className="block text-blue-900">
                Retirement Calculator
              </Link>
            </div>
          )}
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="block text-center bg-blue-900 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 shadow-sm transition mt-4"
        >
          Login / Signup
        </Link>

        {/* Search Input */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700 text-blue-900"
          />
        </div>
      </div>
    </nav>
  );
}
