import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from "recharts";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";
import { useParams } from "react-router-dom";
import DonutChart from "../../components/DonutChart";
import logo from "../../assets/mutualFund/sbi.webp"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const FundDetails = () => {
  const { name } = useParams();
  const [hideChart, setHideChart] = useState(false);

  const fund = {
    name: "SBI Gold Direct Plan Growth",
    category: "Gold",
    risk: "Very High Risk",
    nav: 37.67,
    fundSize: "₹8,456 Cr",
    expense: "0.35%",
    minSip: 500,
    minLumpsum: 1000,
    annualRates: { 1: 0.10, 3: 0.27, 5: 0.18 },
    holdings: [{ name: "SBI Gold ETF", sector: "Bank", instrument: "Mutual Fund", asset: 100.18 }],
  };

  const [mode, setMode] = useState("sip");
  const [sipAmt, setSipAmt] = useState(5000);
  const [lumpAmt, setLumpAmt] = useState(10000);
  const [duration, setDuration] = useState(1);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30D");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverIndex2, setHoverIndex2] = useState(null);
   const [saved, setSaved] = useState(false);

  function futureValueSIP(P, annualR, years) {
    const i = annualR / 12;
    const n = years * 12;
    if (i === 0) return P * n;
    return P * (Math.pow(1 + i, n) - 1) / i;
  }

  function futureValueLumpsum(PV, annualR, years) {
    return PV * Math.pow(1 + annualR, years);
  }

  function percentGain(fv, invested) {
    if (invested === 0) return 0;
    return ((fv - invested) / invested) * 100;
  }

  const annualR_for_duration = fund.annualRates[duration] ?? fund.annualRates[3];

  const totalSIPInvested = sipAmt * 12 * duration;
  const sipFV = Math.round(futureValueSIP(sipAmt, annualR_for_duration, duration));
  const sipGainPct = percentGain(sipFV, totalSIPInvested);

  const lumpResults = [1, 3, 5].map((yr) => {
    const r = fund.annualRates[yr] ?? fund.annualRates[3];
    const invested = lumpAmt;
    const fv = Math.round(futureValueLumpsum(lumpAmt, r, yr));
    const gainPct = percentGain(fv, invested);
    return { yr, invested, fv, gainPct, r };
  });

  const selectedLumpRate = fund.annualRates[duration] ?? fund.annualRates[3];
  const lumpFV_selected = Math.round(futureValueLumpsum(lumpAmt, selectedLumpRate, duration));
  const lumpGainPct_selected = percentGain(lumpFV_selected, lumpAmt);

  const data = [
    { label: "Technology", value: 35.5, color: "#15B7E6" },
    { label: "Industrials", value: 18.5, color: "#3F61FF" },
    { label: "Others", value: 5.9, color: "#FFB44C" },
    { label: "Healthcare", value: 4.2, color: "#C45A8C" },
    { label: "Financial", value: 3.0, color: "#FF5C73" },
    { label: "Real Estate", value: 2.3, color: "#B8C4FF" },
    { label: "Materials", value: 2.2, color: "#FFE863" },
  ];

  const data2 = [
    { label: "Commodities", value: 98.6, color: "#C5F7B1" },
    { label: "Cash", value: 1.4, color: "#15B7E6" },
  ];

  const timeseries = useMemo(() => {
    const arr = [];
    let base = 1420;
    for (let i = 29; i >= 0; i--) {
      base += Math.sin(i / 3) * 5 + (Math.random() - 0.5) * 10;
      arr.push({ x: `D-${i}`, price: Math.round(base * 100) / 100 });
    }
    return arr;
  }, []);
  const areaData = timeseries.map((d) => ({ name: d.x, price: d.price }));

  const baseStock = {
    name: "AetherTech Solutions Ltd.",
    symbol: "AETHER",
    price: 1489.6,
    week52High: 1750,
    week52Low: 820,
  };

   const shareWhatsApp = () => {
    const msg = `Check ${baseStock.name} (${baseStock.symbol}) price ₹${livePrice} (${pctChange}%).`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };
  const [livePrice, setLivePrice] = useState(baseStock.price);
  const pctChange = Math.round(((livePrice - baseStock.price) / baseStock.price) * 10000) / 100;
   const openBuy = () => setBuySellModal({ open: true, type: "buy" });
  const openSell = () => setBuySellModal({ open: true, type: "sell" });

  const fundamentals = [
  { label: "Top 5", value: "45%" },
  { label: "Top 20", value: "87%" },
  { label: "P/E Ratio", value: "66.22" },
  { label: "P/B Ratio", value: "9.00" },

  { label: "Alpha", value: "4.56" },
  { label: "Beta", value: "0.92" },
  { label: "Sharpe", value: "1.10" },
  { label: "Sortino", value: "1.37" },
];

const advancedDefinitions = {
  "Top 5": "Represents the combined portfolio weight or contribution of the top 5 holdings. Higher concentration indicates more exposure to a small group of assets.",
  "Top 20": "Indicates the cumulative weight or contribution of the top 20 assets. Shows how diversified the broader portfolio allocation is.",
  "P/E Ratio": "Price-to-Earnings Ratio shows how much investors are willing to pay for each unit of earnings. A higher P/E may indicate growth expectations.",
  "P/B Ratio": "Price-to-Book Ratio compares a company's market price to its book value. A lower P/B can indicate undervaluation or financial stability.",
  "Alpha": "Alpha measures the excess return generated by an investment relative to its benchmark. Positive alpha means outperformance.",
  "Beta": "Beta measures a stock’s volatility relative to the market. A beta above 1 indicates higher volatility; below 1 indicates more stability.",
  "Sharpe": "Sharpe Ratio evaluates risk-adjusted returns by comparing excess returns to volatility. Higher Sharpe indicates better risk-adjusted performance.",
  "Sortino": "Sortino Ratio measures risk-adjusted returns but only considers downside volatility. It is more accurate for evaluating downside risk.",
};

const [activeInfo, setActiveInfo] = useState(null); 


  return (
    <div className="w-full bg-gray-50 text-[#1A1A1A] py-10 px-5 lg:px-24 space-y-10">
      {/* HEADER */}
      <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="logo"
                className="w-16 h-16 rounded-xl object-cover shadow"
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 capitalize">{name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-slate-500">
                    {fund.category}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-100">
                    {fund.risk}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                  saved
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                <AiOutlineStar /> {saved ? "Saved" : "Save"}
              </button>

              <button
                onClick={shareWhatsApp}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:shadow"
              >
                <FiShare2 /> Share
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 justify-between">
            <div>
              <div className=" items-end gap-3">
                <h2 className="text-4xl font-extrabold text-emerald-600">
                  +31.29%{" "}
                  <span className="text-gray-400 text-sm font-medium">
                    3Y annualized
                  </span>
                </h2>
                <div
                  className={`px-3 py-1 rounded-md text-sm font-semibold 
                          ${
                            pctChange >= 0
                              ? " text-emerald-700"
                              : " text-red-600"
                          }
                          `}
                >
                  {/* {pctChange >= 0 ? "+" : ""}{pctChange}% */}
                  +0.11%{" "}
                  <span className="text-gray-400 text-sm font-medium">1D</span>
                </div>
              </div>
              {/* <p className="text-xs text-slate-500 mt-1">As of {new Date().toLocaleString()}</p> */}
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={openBuy}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
              >
                Invest Now
              </button>

              <div className="text-right text-sm text-slate-500">
                <div>
                  Nav:{" "}
                  <span className="text-slate-900 font-medium">{fund.nav}</span>
                </div>
                <div>
                  Fund size:{" "}
                  <span className="text-slate-900 font-medium">
                    {fund.fundSize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MINI */}
        <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md h-full">
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-r from-sky-50 to-white p-3 rounded-lg">
              <p className="text-xs text-slate-500">Expence Ratio</p>
              <p className="text-lg font-semibold">{fund.expense}</p>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-white p-3 rounded-lg">
              <p className="text-xs text-slate-500">52W Range</p>
              <p className="text-sm font-semibold">
                ₹{baseStock.week52Low} - ₹{baseStock.week52High}
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-white p-3 rounded-lg">
              <p className="text-xs text-slate-500">Analyst Rating</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  {4.5}
                </div>
                <div className="text-sm text-slate-700">Strong Buy</div>
              </div>
            </div>
          </div>
        </aside>
      </header>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-500">Timeframe:</span>
              {["7D", "30D", "6M", "1Y"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTimeframe === tf
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaData}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.18} />
                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis hide domain={["dataMin - 20", "dataMax + 20"]} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
                <ReTooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  fill="url(#g1)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-4 bg-green-50 rounded-xl shadow-sm text-center">
              <p className="text-xs text-gray-500">1-Year Return</p>
              <p className="font-semibold">12.5%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl shadow-sm text-center">
              <p className="text-xs text-gray-500">Min. SIP</p>
              <p className="font-semibold">₹{fund.minSip}</p>
            </div>
          </div>
        </div>

        <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md">
          <h4 className="text-lg font-semibold text-slate-900 mb-3">
            Advanced Ratios
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {fundamentals.map((item, index) => (
              <div
                key={index}
                className="relative p-3 bg-white rounded-md shadow-sm border border-gray-100 cursor-pointer"
                onClick={() =>
                  setActiveInfo(activeInfo === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <span className="text-gray-500 text-xs">
                    <MdOutlineInfo />
                  </span>
                </div>

                <p className="font-semibold mt-1">{item.value}</p>

                {activeInfo === index && (
                  <div className="absolute top-14 left-0 w-56 p-3 bg-white border border-gray-200 rounded-lg shadow-md text-xs text-gray-700 z-50">
                    {advancedDefinitions[item.label]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <span className="text-gray-500">
              <MdOutlineInfo />
            </span>
            <span>Click any metric to view its definition</span>
          </div>
        </aside>
      </div>

      {/* Return Calculator */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Return Calculator */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Return Calculator</h2>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
        Invest in Fund
      </button> */}
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode("sip")}
              className={`px-4 py-2 rounded-full border font-medium ${
                mode === "sip"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-gray-300"
              }`}
            >
              Monthly SIP
            </button>

            <button
              onClick={() => setMode("lumpsum")}
              className={`px-4 py-2 rounded-full border font-medium ${
                mode === "lumpsum"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-gray-300"
              }`}
            >
              One-Time
            </button>
          </div>

          {mode === "sip" && (
            <div>
              <p className="font-semibold text-lg mb-2">
                ₹{sipAmt.toLocaleString()} per month
              </p>
              <input
                type="range"
                min={fund.minSip}
                max={50000}
                step={500}
                value={sipAmt}
                onChange={(e) => setSipAmt(Number(e.target.value))}
                className="w-full mb-4"
              />

              <p className="text-gray-600 mb-2">
                Duration: {duration} year{duration > 1 ? "s" : ""}
              </p>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mb-4"
              />

              <div className="mt-4 border-t pt-4 text-sm">
                <p>Total investment of ₹{totalSIPInvested.toLocaleString()}</p>
                <p className="font-semibold mt-2">
                  Would have become{" "}
                  <span className="text-green-600">
                    ₹{sipFV.toLocaleString()} ({sipGainPct.toFixed(2)}%)
                  </span>
                </p>
              </div>
            </div>
          )}

          {mode === "lumpsum" && (
            <div>
              <p className="font-semibold text-lg mb-2">
                ₹{lumpAmt.toLocaleString()}
              </p>
              <input
                type="range"
                min={fund.minLumpsum}
                max={200000}
                step={500}
                value={lumpAmt}
                onChange={(e) => setLumpAmt(Number(e.target.value))}
                className="w-full mb-4"
              />

              <p className="text-gray-600 mb-2">
                Duration: {duration} year{duration > 1 ? "s" : ""}
              </p>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mb-4"
              />

              <div className="mt-4 border-t pt-4 text-sm">
                <p>Investment of ₹{lumpAmt.toLocaleString()}</p>
                <p className="font-semibold mt-2">
                  Would have become{" "}
                  <span className="text-green-600">
                    ₹{lumpFV_selected.toLocaleString()} (
                    {lumpGainPct_selected.toFixed(2)}%)
                  </span>
                </p>

                {/* <div className="mt-4">
            <p className="text-gray-600 mb-2 font-medium">Breakdown</p>
            {lumpResults.map((res) => (
              <div key={res.yr} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                <div>
                  <div className="font-medium">{res.yr} year{res.yr > 1 ? "s" : ""}</div>
                  <div className="text-gray-500">Annual rate: {(res.r * 100).toFixed(2)}%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{res.fv.toLocaleString()}</div>
                  <div className="text-green-600">{res.gainPct.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div> */}
              </div>
            </div>
          )}
        </div>

        {/* Minimum Investments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 h-80">
          <h2 className="text-2xl font-semibold mb-6">
            Minimum Investment Amounts
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Min. for 1st investment</span>
              <span className="font-semibold">₹5,000</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">
                Min. for 2nd investment onwards
              </span>
              <span className="font-semibold">₹1,000</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Min. for SIP</span>
              <span className="font-semibold">₹500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining sections like Fund Information, Holdings, Donut Charts, Ratios, Minimum Investments, Returns & Rankings, and Expense Ratio remain the same but with better spacing and shadows */}

      {/* Holdings */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 hidden lg:table-cell">
                  Sector
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700 hidden lg:table-cell">
                  Instrument
                </th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                  Assets
                </th>
              </tr>
            </thead>
            <tbody>
              {fund.holdings.map((h, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{h.name}</td>
                  <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">
                    {h.sector}
                  </td>
                  <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">
                    {h.instrument}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{h.asset}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Holdings Analysis - Donut Charts */}
      <div className="lg:flex gap-12 items-start mt-10 hidden">
        {/* Equity/Debt/Cash Split */}
        <div className="space-y-3 w-1/2">
          <h2 className="text-lg font-semibold mb-3">Holding Analysis</h2>
          <p className="text-gray-500 mb-3">Equity/Debt/Cash Split</p>
          {data2.map((item, index) => {
            const isActive = index === hoverIndex;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${
                  hoverIndex === null || isActive ? "opacity-100" : "opacity-30"
                }`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: item.color }}
                ></span>
                <span className={`${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
                <span className="text-gray-500">{item.value}%</span>
              </div>
            );
          })}
        </div>
        <div className="w-1/2">
          <DonutChart
            data={data2}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        </div>
      </div>

      {/* Equity Sector Donut */}
      <div className="lg:flex gap-12 items-start mt-10 hidden">
        <div className="space-y-3 w-1/2">
          <h2 className="text-lg font-semibold mb-3">
            Equity Sector Allocation
          </h2>
          {data.map((item, index) => {
            const isActive = index === hoverIndex2;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${
                  hoverIndex2 === null || isActive
                    ? "opacity-100"
                    : "opacity-30"
                }`}
                onMouseEnter={() => setHoverIndex2(index)}
                onMouseLeave={() => setHoverIndex2(null)}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: item.color }}
                ></span>
                <span className={`${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
                <span className="text-gray-500">{item.value}%</span>
              </div>
            );
          })}
        </div>
        <div className="w-1/2">
          <DonutChart
            data={data}
            hoverIndex={hoverIndex2}
            setHoverIndex={setHoverIndex2}
          />
        </div>
      </div>

      {/* Returns & Rankings */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-6 max-w-4xl mt-10 overflow-x-auto border border-gray-200">
        <h2 className="text-2xl font-bold mb-5 text-blue-900 flex items-center gap-2">
          📊 Returns & Rankings
        </h2>

        <table className="min-w-full table-auto border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-green-50 border-y">
              <th
                colSpan={1}
                className="py-3 px-4 font-semibold text-gray-700 text-left"
              >
                Category:{" "}
                <span className="text-blue-700 font-bold">
                  Commodities Gold
                </span>
              </th>
              <th className="py-3 px-4 font-semibold text-green-700 text-left">
                Annualised Returns
              </th>
              <th className="py-3 px-4 font-semibold text-gray-700 text-left">
                Absolute Returns
              </th>
            </tr>

            <tr className="text-gray-600 text-xs sm:text-sm bg-gray-50">
              <th className="py-2 px-4"></th>
              <th className="py-2 px-4">1Y</th>
              <th className="py-2 px-4">3Y</th>
              <th className="py-2 px-4">5Y</th>
              <th className="py-2 px-4">All</th>
            </tr>
          </thead>

          <tbody>
            {/* Fund Returns */}
            <tr className="hover:bg-blue-50 transition">
              <td className="py-3 px-4 font-medium text-gray-800">
                Fund returns
              </td>
              <td className="py-3 px-4 font-semibold text-green-700">60.3%</td>
              <td className="py-3 px-4 text-blue-700 font-semibold">30.7%</td>
              <td className="py-3 px-4 text-indigo-700 font-semibold">18.0%</td>
              <td className="py-3 px-4 text-gray-700 font-semibold">10.1%</td>
            </tr>

            {/* Category average */}
            <tr className="hover:bg-blue-50 transition border-y">
              <td className="py-3 px-4 font-medium text-gray-800">
                Category average
              </td>
              <td className="py-3 px-4 text-green-600">60.2%</td>
              <td className="py-3 px-4 text-blue-600">30.3%</td>
              <td className="py-3 px-4 text-indigo-600">17.9%</td>
              <td className="py-3 px-4 text-gray-500">NA</td>
            </tr>

            {/* Ranking */}
            <tr className="hover:bg-blue-50 transition">
              <td className="py-3 px-4 font-medium text-gray-800">
                Rank within category
              </td>
              <td className="py-3 px-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  7
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  4
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                  3
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500 font-semibold">NA</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Expense Ratio, Exit Load & Tax */}
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mt-10 border border-gray-200 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">
          Expense Ratio, Exit Load & Tax
        </h2>

        {/* Expense Ratio */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <p className="font-semibold text-gray-800">Expense Ratio</p>
          <p className="text-gray-700 mt-1">0.10%</p>
          <p className="text-gray-500 text-sm mt-1">Inclusive of GST</p>
        </div>

        {/* Exit Load */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <p className="font-semibold text-gray-800">Exit Load</p>
          <p className="text-gray-700 text-sm mt-1">
            Exit load of 1% if redeemed within 15 days.
          </p>
        </div>

        {/* Stamp Duty */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <p className="font-semibold text-gray-800">Stamp Duty</p>
          <p className="text-gray-700 text-sm mt-1">
            0.005% (from July 1st, 2020)
          </p>
        </div>

        {/* Tax Implication */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <p className="font-semibold text-gray-800">Tax Implication</p>
          <p className="text-gray-700 text-sm mt-1 leading-relaxed">
            If you redeem within two years, returns are taxed as per your Income
            Tax slab. If you redeem after two years, returns exceeding ₹1.25
            lakh in a financial year are taxed at 12.5%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundDetails;
