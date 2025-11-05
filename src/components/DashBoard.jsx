import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stocks");

  const tabs = [
    { key: "stocks", label: "Stocks" },
    { key: "mutualFunds", label: "Mutual Funds" },
    { key: "etfs", label: "ETFs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-blue-950">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow-sm px-6 py-3">
        <h1 className="text-xl font-bold text-blue-950">Wealthcrop</h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search stocks, funds..."
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-800 outline-none"
          />
          <Bell className="text-blue-900 cursor-pointer" />
          <User className="text-blue-900 cursor-pointer" />
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center mt-5 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 border-b-2 transition font-medium ${
              activeTab === tab.key
                ? "border-blue-950 text-blue-950"
                : "border-transparent text-gray-500 hover:text-blue-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "stocks" && <StocksSection />}
          {activeTab === "mutualFunds" && <FundsSection />}
          {activeTab === "etfs" && <ETFSection />}
        </motion.div>
      </main>
    </div>
  );
};

// Dummy section components
const StocksSection = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {["TCS", "INFY", "HDFC", "RELIANCE", "ICICI"].map((stock) => (
      <div
        key={stock}
        className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
      >
        <h3 className="font-semibold text-blue-950">{stock}</h3>
        <p className="text-gray-500 text-sm">NSE • Equity</p>
        <p className="text-lg font-bold mt-2">₹{(Math.random() * 3000 + 500).toFixed(2)}</p>
        <p
          className={`text-sm font-medium ${
            Math.random() > 0.5 ? "text-green-600" : "text-red-600"
          }`}
        >
          {Math.random() > 0.5 ? "+" : "-"}
          {(Math.random() * 2).toFixed(2)}%
        </p>
      </div>
    ))}
  </div>
);

const FundsSection = () => (
  <div className="text-center text-gray-600">Top Mutual Funds Coming Soon</div>
);
const ETFSection = () => (
  <div className="text-center text-gray-600">ETF Data Coming Soon</div>
);

export default Dashboard;
