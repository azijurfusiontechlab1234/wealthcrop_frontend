import React, { useState } from "react";
import empty from "../../../assets/allorders.png";

const FutureandOptions = () => {
  // 🔹 Dummy F&O data
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: "NIFTY 20NOV25 20000 CE",
      type: "Call",
      strikePrice: 20000,
      expiryDate: "2025-11-20",
      lotSize: 50,
      ltp: 152.35,
      change: "+1.42%",
      orderDate: "2025-11-12",
    },
    {
      id: 2,
      name: "BANKNIFTY 27NOV25 47000 PE",
      type: "Put",
      strikePrice: 47000,
      expiryDate: "2025-11-27",
      lotSize: 25,
      ltp: 320.75,
      change: "-0.86%",
      orderDate: "2025-11-11",
    },
    {
      id: 3,
      name: "RELIANCE FUT 28NOV25",
      type: "Future",
      strikePrice: 0,
      expiryDate: "2025-11-28",
      lotSize: 250,
      ltp: 2502.6,
      change: "+0.54%",
      orderDate: "2025-11-13",
    },
  ]);

  // 🔸 Uncomment to test empty state
  // const [contracts, setContracts] = useState([]);

  return (
    <div className="bg-white min-h-[400px] rounded-xl shadow-sm p-6">
      {contracts.length === 0 ? (
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
                  Futures & Options
                </h2>
              </div>

              <p className="text-gray-600 text-sm md:text-base">
                Start trading in F&O and explore advanced derivatives
                opportunities with ease.
              </p>

              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                Try it out
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 🔹 F&O Table
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Your Futures & Options Positions
          </h2>
          <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Contract
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Type
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Strike Price
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Expiry Date
                </th>
                <th className="px-4 py-2 text-right text-gray-700 font-medium">
                  Lot Size
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
              {contracts.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-blue-950 font-medium whitespace-nowrap">
                    {item.name}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm font-medium ${
                      item.type === "Call"
                        ? "text-green-600"
                        : item.type === "Put"
                        ? "text-red-500"
                        : "text-blue-700"
                    }`}
                  >
                    {item.type}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {item.strikePrice > 0 ? `₹${item.strikePrice}` : "—"}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {item.expiryDate}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {item.lotSize}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    ₹{item.ltp.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 text-right font-medium ${
                      item.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.change}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {item.orderDate}
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

export default FutureandOptions;
