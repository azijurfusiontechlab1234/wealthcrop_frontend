import React, { useState } from "react";
import empty from "../../../assets/allorders.png";
import { NavLink } from "react-router-dom";

const Stocks = () => {
  // 🔹 Dummy stock data (you can later fetch from API)
  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: "Reliance Industries",
      symbol: "RELIANCE",
      qty: 10,
      avgPrice: 2485.5,
      ltp: 2502.3,
      change: "+0.67%",
      orderDate: "2025-11-10",
    },
    {
      id: 2,
      name: "Tata Consultancy Services",
      symbol: "TCS",
      qty: 5,
      avgPrice: 3710.0,
      ltp: 3695.5,
      change: "-0.39%",
      orderDate: "2025-11-11",
    },
    {
      id: 3,
      name: "HDFC Bank",
      symbol: "HDFCBANK",
      qty: 8,
      avgPrice: 1530.2,
      ltp: 1555.1,
      change: "+1.63%",
      orderDate: "2025-11-12",
    },
  ]);

  // 🔸 Uncomment to test empty state
  // const [stocks, setStocks] = useState([]);

  return (
    <div className="bg-white min-h-[400px] p-6">
      {stocks.length === 0 ? (
        // 🔹 Empty State
        <div className="flex items-center justify-center min-h-[350px] bg-white">
          <div className="flex flex-col md:flex-row items-center gap-14 px-6 py-10">
            <div>
              <img
                src={empty}
                alt="Empty state"
                className="w-48 md:w-56 lg:w-80 object-contain"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div>
                <p className="text-gray-600 text-sm font-medium">Introducing</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-950 leading-snug">
                  Stocks
                </h2>
              </div>

              <p className="text-gray-600 text-sm md:text-base">
                Investing in stocks is now easier than ever.
                <br /> Start exploring and discover new opportunities.
              </p>

              <NavLink to="/" className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                Try it out
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        // 🔹 Stock List
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Your Stock Portfolio
          </h2>
          <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Symbol
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Qty
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Avg Price
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  LTP
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Change
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Order Date
                </th>
              </tr>
            </thead>

            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-blue-950 font-medium whitespace-nowrap">
                    <NavLink to="/">{stock.name}</NavLink>
                  </td>
                  <td className="px-4 py-2 text-gray-700">{stock.symbol}</td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {stock.qty}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    ₹{stock.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    ₹{stock.ltp.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 text-right font-medium ${
                      stock.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {stock.change}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {stock.orderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stocks;
