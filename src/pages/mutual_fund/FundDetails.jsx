// src/pages/funds/FundDetails.jsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { MdInfo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useParams } from "react-router-dom";
import DonutChart from "../../components/DonutChart";
import { BarChart, Bar, XAxis, LabelList } from "recharts";
import { motion } from "framer-motion";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const FundDetails = () => {
  const { name } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("sip"); // "sip" or "lumpsum"
  const [sipAmt, setSipAmt] = useState(5000);
  const [lumpAmt, setLumpAmt] = useState(10000);
  const [duration, setDuration] = useState(1); // years
  const [activeTab, setActiveTab] = useState("revenue");
  const [period, setPeriod] = useState("quarterly");
  const [expanded, setExpanded] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverIndex2, setHoverIndex2] = useState(null);

  // ---------------- Dummy Fund Data (kept same as you provided)
  const fund = {
    name: "SBI Gold Direct Plan Growth",
    category: "Gold",
    risk: "Very High Risk",
    nav: 37.67,
    fundSize: "₹8,456 Cr",
    expense: "0.35%",
    minSip: 500,
    minLumpsum: 1000,
    annualRates: {
      1: 0.10,
      3: 0.27,
      5: 0.18,
    },
    holdings: [
      {
        name: "SBI Gold ETF",
        sector: "Bank",
        instrument: "Mutual Fund",
        asset: 100.18,
      },
    ],
  };

  // ---------------- Chart (kept)
  const chartData = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [
      {
        data: Array.from({ length: 20 }, () => Math.random() * 100 + 100),
        borderColor: "#00A66C",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
  const chartOptions = {
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: { x: { display: true }, y: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Quarterly / Yearly data (kept)
  const quarterlyData = {
    revenue: [
      { name: "Sep '24", value: 7372 },
      { name: "Dec '24", value: 8187 },
      { name: "Mar '25", value: 8770 },
      { name: "Jun '25", value: 9422 },
      { name: "Sep '25", value: 10004 },
    ],
    profit: [
      { name: "Sep '24", value: 1220 },
      { name: "Dec '24", value: 1490 },
      { name: "Mar '25", value: 1580 },
      { name: "Jun '25", value: 1710 },
      { name: "Sep '25", value: 1890 },
    ],
  };

  const yearlyData = {
    revenue: [
      { name: "2021", value: 15000 },
      { name: "2022", value: 25000 },
      { name: "2023", value: 28500 },
      { name: "2024", value: 31200 },
      { name: "2025", value: 34000 },
    ],
    profit: [
      { name: "2021", value: 2500 },
      { name: "2022", value: 4500 },
      { name: "2023", value: 5200 },
      { name: "2024", value: 5800 },
      { name: "2025", value: 6200 },
    ],
    networth: [
      { name: "2021", value: 25000 },
      { name: "2022", value: 95000 },
      { name: "2023", value: 102000 },
      { name: "2024", value: 112000 },
      { name: "2025", value: 124000 },
    ],
  };

  const getData = () => {
    if (period === "quarterly") return quarterlyData[activeTab] || [];
    return yearlyData[activeTab] || [];
  };

  // Calculation helpers (kept)
  function futureValueSIP(P, annualR, years) {
    const i = annualR / 12;
    const n = years * 12;
    if (i === 0) return P * n;
    const fv = P * (Math.pow(1 + i, n) - 1) / i;
    return fv;
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

  // Donut chart data (kept)
  const dataDonut = [
    { label: "Consumer Discretionary", value: 33.3, color: "#C5F7B1" },
    { label: "Technology", value: 30.5, color: "#15B7E6" },
    { label: "Industrials", value: 18.5, color: "#3F61FF" },
    { label: "Others", value: 5.9, color: "#FFB44C" },
    { label: "Healthcare", value: 4.2, color: "#C45A8C" },
    { label: "Financial", value: 3.0, color: "#FF5C73" },
    { label: "Real Estate", value: 2.3, color: "#B8C4FF" },
    { label: "Materials", value: 2.2, color: "#FFE863" },
  ];

  const dataDonut2 = [
    { label: "Commodities", value: 98.6, color: "#C5F7B1" },
    { label: "Cash", value: 1.4, color: "#15B7E6" },
  ];

  // Minimal fundamentals definitions (kept separate so you can fetch later)
  const fundamentals = [
    { label: "Market Cap", value: "₹13,919 Cr" },
    { label: "P/E (TTM)", value: "18.81" },
    { label: "EPS (TTM)", value: "0.92" },
    { label: "ROE", value: "5.63%" },
    { label: "Debt/Equity", value: "0.28" },
    { label: "Book Value", value: "18.37" },
    { label: "Dividend Yield", value: "1.10%" },
    { label: "Beta", value: "0.92" },
  ];

  const fundamentalsDefinitions = {
    "Market Cap": "Total market value of a company's outstanding shares.",
    "P/E (TTM)": "Price-to-Earnings ratio (Trailing Twelve Months): price divided by EPS.",
    "EPS (TTM)": "Earnings Per Share — company's net profit divided by outstanding shares.",
    ROE: "Return on Equity — net income divided by shareholder equity.",
    "Debt/Equity": "Total liabilities divided by shareholder equity.",
    "Book Value": "Net asset value of the company divided by number of shares.",
    "Dividend Yield": "Annual dividends divided by current share price.",
    Beta: "Measure of stock volatility relative to the market.",
  };

  // ---------- UI START ----------
  return (
    <div className="w-full bg-white text-[#1A1A1A] py-10 lg:px-25 px-5 mb-5">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-blue-900">{fund.name}</h1>

      {/* top summary layout styled like stock details */}
      <div className="mt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-2xl shadow">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">NAV: ₹{fund.nav}</span>
            <span className="text-sm text-gray-600">({fund.category})</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm text-gray-700">{fund.risk}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">Fund Size: {fund.fundSize} • Expense: {fund.expense}</div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => alert("Invest SIP placeholder")}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Invest (SIP)
          </button>
          <button
            onClick={() => alert("Invest Lumpsum placeholder")}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
          >
            Invest (Lumpsum)
          </button>
          <button
            onClick={() => alert("Customize SIP placeholder")}
            className="px-3 py-2 rounded-lg bg-white border border-dashed text-gray-700"
          >
            Customize SIP
          </button>
        </div>
      </div>

      {/* Chart section (stock-style) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Price chart</h3>
            <div className="flex items-center gap-2">
              {["1M", "6M", "1Y", "3Y", "5Y", "ALL"].map((t) => (
                <button key={t} className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 220 }}>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Performance strip */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="text-gray-500">Today's Low</div>
              <div className="font-semibold">21.06</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="text-gray-500">Today's High</div>
              <div className="font-semibold">22.79</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="text-gray-500">52W Low</div>
              <div className="font-semibold">12.36</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="text-gray-500">52W High</div>
              <div className="font-semibold">27.70</div>
            </div>
          </div>
        </div>

        {/* Right: donut + quick info */}
        <aside className="bg-white rounded-2xl shadow p-4">
          <h4 className="text-lg font-semibold text-slate-900 mb-3">Fundamentals</h4>

          <div className="grid grid-cols-2 gap-3">
            {fundamentals.map((f, i) => (
              <div key={i} className="p-3 bg-white rounded-md shadow-sm border">
                <p className="text-xs text-slate-500">{f.label}</p>
                <p className="font-semibold">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MdInfo />
            <button className="underline" onClick={() => setIsFundModalOpen(true)}>
              View all definitions
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Allocation</h4>
            <div className="flex items-center justify-center">
              {/* keep donut chart intact */}
              <div style={{ width: 160, height: 160 }}>
                <DonutChart data={dataDonut2} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Return calculator (kept) */}
      <div className="mt-6 bg-white rounded-2xl shadow p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Return calculator</h3>
          <div className="text-sm text-gray-500">Estimate returns based on historical rates</div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex gap-3">
              <button
                onClick={() => setMode("sip")}
                className={`px-4 py-2 rounded-full border ${mode === "sip" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white"}`}
              >
                Monthly SIP
              </button>
              <button
                onClick={() => setMode("lumpsum")}
                className={`px-4 py-2 rounded-full border ${mode === "lumpsum" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white"}`}
              >
                One-Time
              </button>
            </div>

            {mode === "sip" ? (
              <div className="mt-4">
                <p className="font-semibold">₹{sipAmt.toLocaleString()} per month</p>
                <input
                  type="range"
                  min={fund.minSip}
                  max={50000}
                  step={500}
                  value={sipAmt}
                  onChange={(e) => setSipAmt(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <div className="flex gap-3 mt-4">
                  {[1, 3, 5].map((yr) => (
                    <button key={yr} onClick={() => setDuration(yr)} className={`px-4 py-2 rounded-full border ${duration === yr ? "border-emerald-600 bg-emerald-50" : "bg-white"}`}>
                      {yr} year
                    </button>
                  ))}
                </div>

                <div className="mt-4 border-t pt-4 text-sm">
                  <p>Total investment: ₹{totalSIPInvested.toLocaleString()}</p>
                  <p className="font-semibold mt-1">
                    Future value: <span className="text-emerald-600">₹{sipFV.toLocaleString()}</span> ({sipGainPct.toFixed(2)}%)
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-semibold">₹{lumpAmt.toLocaleString()}</p>
                <input
                  type="range"
                  min={fund.minLumpsum}
                  max={200000}
                  step={500}
                  value={lumpAmt}
                  onChange={(e) => setLumpAmt(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <div className="flex gap-3 mt-4">
                  {[1, 3, 5].map((yr) => (
                    <button key={yr} onClick={() => setDuration(yr)} className={`px-4 py-2 rounded-full border ${duration === yr ? "border-emerald-600 bg-emerald-50" : "bg-white"}`}>
                      {yr} years
                    </button>
                  ))}
                </div>

                <div className="mt-4 border-t pt-4 text-sm">
                  <p>Investment: ₹{lumpAmt.toLocaleString()}</p>
                  <p className="font-semibold mt-1">
                    Future value: <span className="text-emerald-600">₹{lumpFV_selected.toLocaleString()}</span> ({(lumpGainPct_selected * 100).toFixed(2)}%)
                  </p>

                  <div className="mt-3">
                    {lumpResults.map((res) => (
                      <div key={res.yr} className="flex justify-between py-2 border-b text-sm">
                        <div>
                          <div className="font-medium">{res.yr} year</div>
                          <div className="text-gray-500">Rate: {(res.r * 100).toFixed(2)}%</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{res.fv.toLocaleString()}</div>
                          <div className="text-emerald-600">{(res.gainPct * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: holdings + mini stats */}
          <div>
            <h4 className="text-md font-semibold mb-3">Fund information</h4>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-gray-500">NAV</p>
                <p className="font-semibold">₹{fund.nav}</p>
              </div>
              <div>
                <p className="text-gray-500">Fund Size</p>
                <p className="font-semibold">{fund.fundSize}</p>
              </div>
              <div>
                <p className="text-gray-500">Expense ratio</p>
                <p className="font-semibold">{fund.expense}</p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-semibold">{fund.category}</p>
              </div>
            </div>

            <h4 className="mt-6 mb-2 text-md font-semibold">Holdings</h4>
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left">Name</th>
                    <th className="py-2 px-3 text-left hidden lg:table-cell">Sector</th>
                    <th className="py-2 px-3 text-left hidden lg:table-cell">Instrument</th>
                    <th className="py-2 px-3 text-left">Assets</th>
                  </tr>
                </thead>
                <tbody>
                  {fund.holdings.map((h, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-3">{h.name}</td>
                      <td className="py-2 px-3 hidden lg:table-cell">{h.sector}</td>
                      <td className="py-2 px-3 hidden lg:table-cell">{h.instrument}</td>
                      <td className="py-2 px-3">{h.asset}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      {/* Financials + Donut / Sector Allocation arranged like StockDetails */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Financials</h3>
            <div className="flex gap-3">
              <button onClick={() => setPeriod("quarterly")} className={`px-3 py-1 rounded-full ${period === "quarterly" ? "bg-emerald-50 border border-emerald-200" : "bg-white border border-gray-200"}`}>Quarterly</button>
              <button onClick={() => setPeriod("yearly")} className={`px-3 py-1 rounded-full ${period === "yearly" ? "bg-emerald-50 border border-emerald-200" : "bg-white border border-gray-200"}`}>Yearly</button>
            </div>
          </div>

          <div>
            <div className="mb-3">
              {["revenue", "profit", "networth"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`mr-3 pb-2 ${activeTab === tab ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <BarChart width={650} height={260} data={getData()} barGap={12} barCategoryGap={30}>
                <XAxis dataKey="name" />
                <Bar dataKey="value" fill="#00A66C" barSize={18}>
                  <LabelList dataKey="value" position="top" style={{ fill: "#333", fontSize: 13, fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </motion.div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Equity sector allocation</h3>
          <div className="hidden lg:block">
            <div className="flex gap-6">
              <div className="w-1/2">
                {dataDonut.map((item, index) => {
                  const isActive = hoverIndex2 === index;
                  return (
                    <div key={index} className={`flex items-center justify-between mb-3 ${hoverIndex2 === null || isActive ? "opacity-100" : "opacity-40"}`}>
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ background: item.color }}></span>
                        <span className={`${isActive ? "font-semibold" : ""}`}>{item.label}</span>
                      </div>
                      <div className="text-gray-500">{item.value}%</div>
                    </div>
                  );
                })}
              </div>

              <div className="w-1/2 flex items-center justify-center">
                <div style={{ width: 200, height: 200 }}>
                  <DonutChart data={dataDonut} hoverIndex={hoverIndex2} setHoverIndex={setHoverIndex2} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-friendly simple legend */}
          <div className="lg:hidden grid grid-cols-2 gap-2">
            {dataDonut.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }}></span>
                <span>{d.label}</span>
                <span className="ml-auto text-gray-500">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Returns & Rankings + Expense */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Returns & Rankings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 px-2">Category: Commodities Gold</th>
                  <th className="py-2 px-2">1Y</th>
                  <th className="py-2 px-2">3Y</th>
                  <th className="py-2 px-2">5Y</th>
                  <th className="py-2 px-2">All</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-2 font-medium">Fund returns</td>
                  <td className="py-2 px-2">60.3%</td>
                  <td className="py-2 px-2">30.7%</td>
                  <td className="py-2 px-2">18.0%</td>
                  <td className="py-2 px-2">10.1%</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-2 font-medium">Category average</td>
                  <td className="py-2 px-2">60.2%</td>
                  <td className="py-2 px-2">30.3%</td>
                  <td className="py-2 px-2">17.9%</td>
                  <td className="py-2 px-2">NA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-3">Expense ratio, exit load & tax</h3>
          <p className="font-semibold">Expense ratio: 0.10% (Inclusive of GST)</p>
          <p className="mt-3"><span className="font-semibold">Exit load:</span> 1% if redeemed within 15 days.</p>
          <p className="mt-2"><span className="font-semibold">Stamp duty:</span> 0.005%</p>
          <p className="mt-2"><span className="font-semibold">Tax:</span> Short-term/long-term rules apply; consult tax guidance.</p>
        </div>
      </div>

      {/* Fundamentals definitions modal */}
      {isFundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative">
            <button className="absolute right-4 top-4 text-2xl" onClick={() => setIsFundModalOpen(false)}>×</button>
            <h3 className="text-xl font-semibold mb-4">Fundamentals definitions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(fundamentalsDefinitions).map((k) => (
                <div key={k} className="p-3 border rounded">
                  <div className="font-medium">{k}</div>
                  <div className="text-sm text-gray-600 mt-1">{fundamentalsDefinitions[k]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default FundDetails;
