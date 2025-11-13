import React, { useState } from "react";
import { IndianRupee, Wallet, CreditCard } from "lucide-react";
import moneyImg from "../assets/add_money.svg"; // 🟠 replace with your PNG

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");

  const handleQuickAdd = (value) => {
    setAmount((prev) => (prev ? parseInt(prev) + value : value));
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    alert(`₹${amount} will be added using ${method}`);
  };

  return (
    <div className="min-h-[90vh] bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        {/* 🔸 Left Side Image */}
        <div className="bg-green-50 w-full md:w-1/2 flex justify-center items-center p-10">
          <img
            src={moneyImg}
            alt="Add Money"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* 🔸 Right Side Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Wallet size={26} className="text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Add Money</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Fund your account securely in seconds
            </p>
          </div>

          {/* Amount Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Amount
            </label>
            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-3 top-3 text-gray-500"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="flex justify-between mb-6">
            {[500, 1000, 5000].map((val) => (
              <button
                key={val}
                onClick={() => handleQuickAdd(val)}
                className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium transition"
              >
                + ₹{val}
              </button>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "UPI", color: "border-green-500 text-green-700" },
                { name: "NetBanking", color: "border-orange-400 text-orange-600" },
                { name: "Card", color: "border-green-400 text-green-600" },
                { name: "Wallet", color: "border-orange-400 text-orange-600" },
              ].map((m) => (
                <button
                  key={m.name}
                  onClick={() => setMethod(m.name)}
                  className={`border-2 rounded-lg py-2 font-medium transition ${
                    method === m.name
                      ? `${m.color} bg-opacity-10`
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg font-semibold transition active:scale-95"
          >
            Proceed to Add ₹{amount || "0"}
          </button>

          {/* Info Section */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 flex items-center gap-2">
            <CreditCard size={16} className="text-green-600" />
            <p>100% Secure payments via UPI, Netbanking or Cards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
