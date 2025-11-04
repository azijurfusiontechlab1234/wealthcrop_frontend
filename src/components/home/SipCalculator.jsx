import React, { useState, useEffect } from "react";
import { FaChartLine, FaBullseye, FaClock, FaPercent, FaMoneyBillWave } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, LineChart } from "recharts";

const SipCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [cagr, setCagr] = useState(9);
  const [inflation, setInflation] = useState(3);
  const [result, setResult] = useState({});
  const [data, setData] = useState([]);

  // 💹 SIP formula
  const calculateSIP = () => {
    const n = years * 12;
    const r = cagr / 100 / 12;
    const monthlySIP = (goalAmount * (r)) / (Math.pow(1 + r, n) - 1);

    let corpus = 0;
    let principal = 0;
    const yearlyData = [];
    for (let i = 1; i <= years; i++) {
      const months = i * 12;
      const val = monthlySIP * ((Math.pow(1 + r, months) - 1) / r);
      corpus = val;
      principal = monthlySIP * months;
      yearlyData.push({
        year: `Y${i}`,
        total: Math.round(corpus),
        principal: Math.round(principal),
      });
    }

    setData(yearlyData);

    setResult({
      monthlySIP: Math.round(monthlySIP),
      totalInvested: Math.round(monthlySIP * n),
      estimatedGrowth: Math.round(corpus - monthlySIP * n),
      futureValue: Math.round(corpus),
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [goalAmount, years, cagr, inflation]);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-10 grid md:grid-cols-2 gap-8">
      {/* Left side */}
      <div>
        <h2 className="text-xl font-semibold text-blue-950 flex items-center gap-2 mb-4">
          <FaChartLine className="text-red-600" />
          SIP Crorepati Goal Planner
        </h2>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2 text-blue-950">
          <p className="flex items-center gap-2">
            <FaBullseye className="text-red-600" /> Goal Amount:{" "}
            <strong>₹{goalAmount.toLocaleString()}</strong>
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-blue-950" /> Time Horizon:{" "}
            <strong>{years} Years</strong>
          </p>
          <p className="flex items-center gap-2">
            <FaPercent className="text-red-600" /> Expected CAGR:{" "}
            <strong>{cagr}%</strong>
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" /> Inflation Rate:{" "}
            <strong>{inflation}%</strong>
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl border-l-4 border-green-500 p-4 mb-6">
          <p>
            To reach <strong>₹{result.futureValue?.toLocaleString()}</strong> in{" "}
            <strong>{years} years</strong>,
          </p>
          <p>
            Invest <strong>₹{result.monthlySIP?.toLocaleString()}</strong> monthly.
          </p>
          <p>Total Invested: <strong>₹{result.totalInvested?.toLocaleString()}</strong></p>
          <p>Estimated Growth: <strong>₹{result.estimatedGrowth?.toLocaleString()}</strong></p>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
          💰 Invest Now
        </button>
      </div>

      {/* Right side */}
      <div className="space-y-4">
        {/* Sliders */}
        <div>
          <label className="text-sm font-medium text-blue-950">Goal Amount (₹)</label>
          <input
            type="range"
            min="500000"
            max="20000000"
            step="50000"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-950">Time Horizon (Years)</label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-950">Expected CAGR (%)</label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.5"
            value={cagr}
            onChange={(e) => setCagr(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-950">Inflation Rate (%)</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={inflation}
            onChange={(e) => setInflation(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        {/* Chart */}
        <div className="mt-4 bg-gray-50 rounded-2xl p-4 shadow-inner">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="principal" fill="#3b82f6" name="Principal Invested (₹)" />
              <Bar dataKey="total" fill="#86efac" name="Total Corpus (₹)" />
              <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
