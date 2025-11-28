import React, { useState, useEffect } from "react";
import {
  FaChartLine,
  FaBullseye,
  FaClock,
  FaPercent,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

const SipCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [cagr, setCagr] = useState(9);
  const [inflation, setInflation] = useState(3);
  const [result, setResult] = useState({});
  const [data, setData] = useState([]);

  const [openFAQ, setOpenFAQ] = useState(null);

  const navigate = useNavigate();
  const handleRedirect = (url) => {
    navigate(url);
  };

  // 🔷 SIP Calculation Formula
  const calculateSIP = () => {
    const n = years * 12;
    const r = cagr / 100 / 12;
    const monthlySIP = (goalAmount * r) / (Math.pow(1 + r, n) - 1);

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

  // 🔶 FAQs Data
  const faqs = [
    {
      q: "What is SIP?",
      a: "SIP (Systematic Investment Plan) is a disciplined investment method to invest in mutual funds at regular intervals like monthly or weekly.",
    },
    {
      q: "Is SIP better than Lump Sum Investment?",
      a: "SIP is suitable for regular income earners and reduces market timing risk, whereas lump sum is preferred when you have large capital ready to invest.",
    },
    {
      q: "What is the minimum amount to start SIP?",
      a: "You can start SIP from as low as ₹100 per month depending on the mutual fund scheme.",
    },
    {
      q: "Is SIP safe?",
      a: "SIP invests in mutual funds which are market-linked. Risk reduces over long term due to rupee cost averaging.",
    },
    {
      q: "Can I pause or stop SIP anytime?",
      a: "Yes, SIP can be paused or stopped anytime without penalties.",
    },
    {
      q: "Are SIP returns guaranteed?",
      a: "No. SIP returns depend on market performance. However, long-term investments tend to give better returns historically.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 to-green-100 pb-10">
      {/* 🔷 HEADER */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow">
          SIP Calculator – Grow Your Wealth Smartly
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg leading-relaxed">
          Use this SIP Calculator to estimate monthly investments required to
          reach your financial goal. Understand expected returns, invested
          amount, and long-term wealth creation through SIPs.
        </p>
      </div>

      {/* 🔷 MAIN BOX */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-6 grid md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-xl font-semibold text-blue-950 flex items-center gap-2 mb-4">
            <FaChartLine className="text-red-600" /> SIP Crorepati Goal Planner
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

          {/* Result */}
          <div className="bg-green-50 rounded-2xl border-l-4 border-green-500 p-4 mb-6">
            <p>
              To reach <strong>₹{result.futureValue?.toLocaleString()}</strong>{" "}
              in <strong>{years} years</strong>,
            </p>
            <p>
              Invest <strong>₹{result.monthlySIP?.toLocaleString()}</strong>{" "}
              monthly.
            </p>
            <p>
              Total Invested:{" "}
              <strong>₹{result.totalInvested?.toLocaleString()}</strong>
            </p>
            <p>
              Estimated Growth:{" "}
              <strong>₹{result.estimatedGrowth?.toLocaleString()}</strong>
            </p>
          </div>

          <button
            onClick={() => handleRedirect("/sip_cal")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            💰 Invest Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {/* Sliders */}
          <div>
            <label className="text-sm font-medium text-blue-950">
              Goal Amount (₹)
            </label>
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
            <label className="text-sm font-medium text-blue-950">
              Time Horizon (Years)
            </label>
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
            <label className="text-sm font-medium text-blue-950">
              Expected CAGR (%)
            </label>
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
            <label className="text-sm font-medium text-blue-950">
              Inflation Rate (%)
            </label>
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
                <Bar dataKey="principal" fill="#3b82f6" name="Principal (₹)" />
                <Bar dataKey="total" fill="#86efac" name="Total Corpus (₹)" />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔷 FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow bg-gradient-to-r from-blue-200 to-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions (SIP)
        </h2>

        {faqs.map((item, index) => (
          <div key={index} className="border-b py-3">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center text-left text-gray-700 font-medium"
            >
              {item.q}
              <span>{openFAQ === index ? "−" : "+"}</span>
            </button>

            {openFAQ === index && (
              <p className="mt-2 text-gray-600">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* 🔷 RELATED LINKS */}
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Related Calculators
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => handleRedirect("/calculator/retirement-calculator")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Retirement Calculator
          </button>
          <button
            onClick={() => handleRedirect("/calculator/sip-calculator")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Lumpsum Calculator
          </button>
          <button
            onClick={() => handleRedirect("/calculator/fd-calculator")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          >
            FD Calculator
          </button>
          <button
            onClick={() => handleRedirect("/calculator/nps-cal")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
          >
            NPS Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
