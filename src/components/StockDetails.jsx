// StockDetailsPremiumFull.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";

/**
 * NOTE: use your uploaded image path here (developer provided).
 * The image is available at:
 * /mnt/data/489847be-2715-4255-af96-6c64dad8bb92.png
 */
const LOGO_PATH = "/mnt/data/489847be-2715-4255-af96-6c64dad8bb92.png";

export default function StockDetailsPremiumFull() {
  // ---------------- MOCK STOCK DATA ----------------
  const baseStock = {
    name: "AetherTech Solutions Ltd.",
    symbol: "AETHER",
    price: 1489.6,
    marketCap: "₹1,95,200 Cr",
    pe: 28.3,
    volume: 5_820_321,
    week52High: 1750,
    week52Low: 820,
    beta: 1.12,
    dividendYield: "0.95%",
    description:
      "AetherTech Solutions is a technology & cloud solutions provider focused on enterprise digital transformation, AI services and edge computing platforms.",
    rating: 4.4,
  };

  // timeseries (30 points) - mock
  const timeseries = useMemo(() => {
    const arr = [];
    let base = 1420;
    for (let i = 29; i >= 0; i--) {
      base += (Math.sin(i / 3) * 5 + (Math.random() - 0.5) * 10);
      arr.push({
        x: `D-${i}`,
        price: Math.round(base * 100) / 100,
      });
    }
    return arr;
  }, []);

  // Financials: quarterly and yearly (mock)
  const financialsQuarterly = {
    revenue: [
      { name: "Q2'24", value: 7372 },
      { name: "Q3'24", value: 8187 },
      { name: "Q4'24", value: 8770 },
      { name: "Q1'25", value: 9422 },
    ],
    profit: [
      { name: "Q2'24", value: 1220 },
      { name: "Q3'24", value: 1490 },
      { name: "Q4'24", value: 1580 },
      { name: "Q1'25", value: 1710 },
    ],
  };

  const financialsYearly = {
    revenue: [
      { name: "2021", value: 15000 },
      { name: "2022", value: 25000 },
      { name: "2023", value: 28500 },
      { name: "2024", value: 31200 },
    ],
    profit: [
      { name: "2021", value: 2500 },
      { name: "2022", value: 4500 },
      { name: "2023", value: 5200 },
      { name: "2024", value: 5800 },
    ],
  };

  // Fundamentals (mock)
  const fundamentals = [
    { label: "Market Cap", value: baseStock.marketCap },
    { label: "P/E (TTM)", value: baseStock.pe },
    { label: "EPS (TTM)", value: "₹52.8" },
    { label: "ROE", value: "15.6%" },
    { label: "Debt/Equity", value: "0.38" },
    { label: "Book Value", value: "₹780" },
    { label: "Dividend Yield", value: baseStock.dividendYield },
    { label: "Beta", value: baseStock.beta },
  ];

  //! Definitons
  const fundamentalsDefinitions = {
  "Market Cap":
    "Market Capitalization represents the total value of a company's outstanding shares. It indicates the company’s overall size in the stock market.",

  "P/E (TTM)":
    "Price-to-Earnings (Trailing Twelve Months) shows how much investors are willing to pay per rupee of earnings over the last 12 months.",

  "EPS (TTM)":
    "Earnings Per Share (TTM) represents the company’s profit allocated per outstanding share over the last 12 months.",

  "ROE":
    "Return on Equity measures how effectively a company generates profit from shareholders' equity. Higher ROE indicates better profitability.",

  "Debt/Equity":
    "Debt-to-Equity ratio compares a company’s total debt to its shareholder equity. Lower D/E indicates lower financial risk.",

  "Book Value":
    "Book Value represents the net value of a company's assets per share after liabilities are deducted.",

  "Dividend Yield":
    "Dividend Yield shows how much a company pays in dividends relative to its share price. A higher yield indicates better cash returns.",

  "Beta":
    "Beta measures the volatility of a stock compared to the overall market. A beta above 1 means higher volatility; below 1 means lower volatility.",
};
const [activeInfo, setActiveInfo] = useState(null); 

  // Market Depth (mock)
  const bids = [
    { price: 1489.3, qty: 2 },
    { price: 1489.2, qty: 58 },
    { price: 1489.1, qty: 50 },
    { price: 1489.0, qty: 4 },
    { price: 1488.9, qty: 161 },
  ];
  const asks = [
    { price: 1489.4, qty: 44 },
    { price: 1489.5, qty: 105 },
    { price: 1489.6, qty: 59 },
    { price: 1489.7, qty: 31 },
    { price: 1489.8, qty: 251 },
  ];

  // Peers
  const peers = [
    { company: "CloudNova", price: 980, change: 0.8, mcap: "₹82,300 Cr" },
    { company: "HyperEdge", price: 2245, change: -0.6, mcap: "₹1,12,480 Cr" },
    { company: baseStock.name, price: baseStock.price, change: 1.42, mcap: baseStock.marketCap },
  ];

  // News
  const news = [
    { title: "AetherTech announces strategic AI chip partnership", src: "BusinessTech", time: "2h ago" },
    { title: "Q1 results beat estimates: Revenue +18%", src: "MarketWatch", time: "1d ago" },
    { title: "New data center to expand capacity in South India", src: "InfraDaily", time: "3d ago" },
  ];

  // ---------------- UI state ----------------
  const [livePrice, setLivePrice] = useState(baseStock.price);
  const [isTicking, setIsTicking] = useState(true);
  const [saved, setSaved] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30D");
  const [finTab, setFinTab] = useState("revenue");
  const [finPeriod, setFinPeriod] = useState("quarterly");
  const [buySellModal, setBuySellModal] = useState({ open: false, type: "buy" });
  const [qty, setQty] = useState(1);
  const [orderType, setOrderType] = useState("Market");

  // animate live price a little
  useEffect(() => {
    if (!isTicking) return;
    const id = setInterval(() => {
      setLivePrice((p) => Math.round((p + (Math.random() - 0.48) * 2) * 100) / 100);
    }, 1400);
    return () => clearInterval(id);
  }, [isTicking]);

  const pctChange = Math.round(((livePrice - baseStock.price) / baseStock.price) * 10000) / 100;

  // handlers
  const openBuy = () => setBuySellModal({ open: true, type: "buy" });
  const openSell = () => setBuySellModal({ open: true, type: "sell" });
  const closeModal = () => setBuySellModal({ open: false, type: "buy" });
  const placeOrder = () => {
    alert(`${buySellModal.type.toUpperCase()} order placed: ${qty} shares (${orderType}) — total ₹${(livePrice * qty).toFixed(2)}`);
    closeModal();
  };
  const shareWhatsApp = () => {
    const msg = `Check ${baseStock.name} (${baseStock.symbol}) price ₹${livePrice} (${pctChange}%).`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // prepare chart data
  const areaData = timeseries.map((d) => ({ name: d.x, price: d.price }));
  const finData = finPeriod === "quarterly" ? financialsQuarterly[finTab] : financialsYearly[finTab];

  // market-depth scaling
  const maxQty = Math.max(...bids.map((b) => b.qty), ...asks.map((a) => a.qty));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={LOGO_PATH} alt="logo" className="w-16 h-16 rounded-xl object-cover shadow" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{baseStock.name}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-slate-500">{baseStock.symbol}</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-100">Technology</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${saved ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-700"}`}>
                  <AiOutlineStar /> {saved ? "Saved" : "Save"}
                </button>

                <button onClick={shareWhatsApp} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:shadow">
                  <FiShare2 /> Share
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-6 justify-between">
              <div>
                <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-extrabold text-slate-900">₹{livePrice.toFixed(2)}</h2>
                  <div className={`px-3 py-1 rounded-md text-sm font-semibold ${pctChange >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {pctChange >= 0 ? "+" : ""}{pctChange}%
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">As of {new Date().toLocaleString()}</p>
              </div>

              <div className="flex gap-3 items-center">
                <button onClick={openBuy} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">Buy</button>
                <button onClick={openSell} className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold shadow hover:bg-red-700">Sell</button>

                <div className="text-right text-sm text-slate-500">
                  <div>Vol: <span className="text-slate-900 font-medium">{baseStock.volume.toLocaleString()}</span></div>
                  <div>Mkt Cap: <span className="text-slate-900 font-medium">{baseStock.marketCap}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT MINI */}
          <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md h-full">
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-r from-sky-50 to-white p-3 rounded-lg">
                <p className="text-xs text-slate-500">P/E Ratio</p>
                <p className="text-lg font-semibold">{baseStock.pe}</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-white p-3 rounded-lg">
                <p className="text-xs text-slate-500">52W Range</p>
                <p className="text-sm font-semibold">₹{baseStock.week52Low} - ₹{baseStock.week52High}</p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-white p-3 rounded-lg">
                <p className="text-xs text-slate-500">Analyst Rating</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">{baseStock.rating}</div>
                  <div className="text-sm text-slate-700">Strong Buy</div>
                </div>
              </div>
            </div>
          </aside>
        </header>

        {/* CHART + QUICK METRICS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Timeframe:</span>
                {["7D","30D","6M","1Y"].map((tf) => (
                  <button key={tf} onClick={() => setSelectedTimeframe(tf)} className={`px-3 py-1 rounded-md text-sm font-medium ${selectedTimeframe===tf ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-700"}`}>{tf}</button>
                ))}
              </div>
              <div className="text-sm text-slate-500">Updated: {new Date().toLocaleTimeString()}</div>
            </div>

            <div style={{width:"100%", height: 280}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.18}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.03}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{fontSize:11}}/>
                  <YAxis hide domain={["dataMin - 20", "dataMax + 20"]}/>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.08}/>
                  <ReTooltip/>
                  <Area type="monotone" dataKey="price" stroke="#10b981" fill="url(#g1)" strokeWidth={2} dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <p className="text-xs text-slate-500">Day High</p>
                <p className="font-semibold">₹{baseStock.week52High}</p>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <p className="text-xs text-slate-500">Day Low</p>
                <p className="font-semibold">₹{baseStock.week52Low}</p>
              </div>
            </div>
          </div>

          <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md space-y-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-slate-500">Avg Volume (3M)</p>
              <p className="font-semibold">{Math.round(baseStock.volume/1e6 *10)/10}M</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-slate-500">Beta</p>
              <p className="font-semibold">{baseStock.beta}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-xs text-slate-500">Dividend Yield</p>
              <p className="font-semibold">{baseStock.dividendYield}</p>
            </div>
          </aside>
        </section>

        {/* FINANCIALS (quarterly/yearly) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Financials</h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button onClick={() => setFinPeriod("quarterly")} className={`px-3 py-1 rounded-md ${finPeriod==="quarterly" ? "bg-slate-900 text-white" : "bg-white border border-slate-200"}`}>Quarterly</button>
                  <button onClick={() => setFinPeriod("yearly")} className={`px-3 py-1 rounded-md ${finPeriod==="yearly" ? "bg-slate-900 text-white" : "bg-white border border-slate-200"}`}>Yearly</button>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setFinTab("revenue")} className={`px-3 py-1 rounded-md ${finTab==="revenue" ? "bg-emerald-600 text-white" : "bg-white border border-slate-200"}`}>Revenue</button>
                  <button onClick={() => setFinTab("profit")} className={`px-3 py-1 rounded-md ${finTab==="profit" ? "bg-emerald-600 text-white" : "bg-white border border-slate-200"}`}>Profit</button>
                </div>
              </div>
            </div>

            <div style={{width:"100%", height: 260}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={finData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <ReTooltip />
                  <Bar dataKey="value" fill="#06b6d4" barSize={18}>
                    <LabelList dataKey="value" position="top" style={{ fontSize: 12, fontWeight: 700 }}/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-xs text-slate-500">Net Profit (TTM)</p>
                <p className="font-semibold">₹3,820 Cr</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-xs text-slate-500">EBITDA Margin</p>
                <p className="font-semibold">24.7%</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-xs text-slate-500">Operating Cashflow</p>
                <p className="font-semibold">₹5,200 Cr</p>
              </div>
            </div>
          </div>

          {/* Fundamentals */}
          <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md">
  <h4 className="text-lg font-semibold text-slate-900 mb-3">Fundamentals</h4>

  <div className="grid grid-cols-2 gap-3">
    {fundamentals.map((item, index) => (
      <div
        key={index}
        className="relative p-3 bg-white rounded-md shadow-sm border border-gray-100 cursor-pointer"
        onClick={() => setActiveInfo(activeInfo === index ? null : index)}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">{item.label}</p>
          <span className="text-gray-500 text-xs"><MdOutlineInfo /></span>
        </div>

        <p className="font-semibold mt-1">{item.value}</p>

        {activeInfo === index && (
          <div className="absolute top-14 left-0 w-56 p-3 bg-white border border-gray-200 rounded-lg shadow-md text-xs text-gray-700 z-50">
            {fundamentalsDefinitions[item.label]}
          </div>
        )}
      </div>
    ))}
  </div>

  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
    <span className="text-gray-500"><MdOutlineInfo /></span>
    <span>Click any metric to view its definition</span>
  </div>
</aside>

        </section>

        {/* MARKET DEPTH + PEERS + NEWS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Depth */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Depth</h3>

            <div className="w-full">
              <div className="flex justify-between text-md text-slate-600 font-medium">
                <span>Buy order quantity</span>
                <span>Sell order quantity</span>
              </div>

              <div className="flex w-full h-2 rounded-full overflow-hidden mt-2 bg-slate-200">
                <div className="bg-emerald-500" style={{width: `${33}%`}}></div>
                <div className="bg-red-500" style={{width: `${67}%`}}></div>
              </div>

              <div className="flex justify-between mt-1 text-sm font-medium">
                <span className="text-emerald-600">33%</span>
                <span className="text-red-500">67%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 divide-x">
              <div className="pr-4">
                <div className="grid grid-cols-2 text-sm text-slate-600 mb-2">
                  <span className="text-slate-500 font-medium">Bid Price</span>
                  <span className="text-right text-slate-500 font-medium">Qty</span>
                </div>

                {bids.map((b, i) => (
                  <div key={i} className="grid grid-cols-2 items-center text-sm mb-2 relative">
                    <span>{b.price.toLocaleString()}</span>
                    <div className="relative text-right">
                      <span className="text-emerald-600 font-medium relative z-10">{b.qty.toLocaleString()}</span>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full bg-emerald-100 rounded" style={{width:`${(b.qty/maxQty)*100}%`}}/>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-3 font-semibold">
                  <span>Bid Total</span>
                  <span>{bids.reduce((acc,c)=>acc+c.qty,0).toLocaleString()}</span>
                </div>
              </div>

              <div className="pl-4">
                <div className="grid grid-cols-2 text-sm text-slate-600 mb-2">
                  <span className="text-slate-500 font-medium">Ask Price</span>
                  <span className="text-right text-slate-500 font-medium">Qty</span>
                </div>

                {asks.map((a,i)=>(
                  <div key={i} className="grid grid-cols-2 items-center text-sm mb-2 relative">
                    <span>{a.price.toLocaleString()}</span>
                    <div className="relative text-right">
                      <span className="text-red-500 font-medium relative z-10">{a.qty.toLocaleString()}</span>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full bg-red-100 rounded" style={{width:`${(a.qty/maxQty)*100}%`}}/>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-3 font-semibold">
                  <span>Ask Total</span>
                  <span>{asks.reduce((acc,c)=>acc+c.qty,0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Peers & News */}
          <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md">
            <h4 className="text-lg font-semibold mb-3">Peers</h4>
            <div className="space-y-2">
              {peers.map((p,i)=>(
                <div key={i} className="flex justify-between items-center p-2 rounded-md hover:bg-white transition">
                  <div>
                    <div className="font-medium">{p.company}</div>
                    <div className="text-xs text-slate-500">{p.mcap}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{p.price}</div>
                    <div className={`text-sm ${p.change>=0? "text-emerald-600":"text-red-600"}`}>{p.change>=0?"+":""}{p.change}%</div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4"/>

            <h4 className="text-lg font-semibold mb-3">Latest News</h4>
            <ul className="space-y-3">
              {news.map((n,i)=>(
                <li key={i} className="p-3 rounded-lg hover:bg-white transition flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-slate-900">{n.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{n.src} • {n.time}</div>
                  </div>
                  <button className="text-slate-500 text-sm">Read</button>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* ABOUT & FOOTER */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-3">About {baseStock.name}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{baseStock.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-md shadow-sm">
                <p className="text-xs text-slate-500">Parent Organisation</p>
                <p className="font-semibold">Aether Group</p>
              </div>
              <div className="p-4 bg-white rounded-md shadow-sm">
                <p className="text-xs text-slate-500">Headquarters</p>
                <p className="font-semibold">Bengaluru, India</p>
              </div>
            </div>
          </div>

          <aside className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 shadow-md">
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><a className="text-slate-700 hover:underline" href="#">Quarterly results</a></li>
              <li><a className="text-slate-700 hover:underline" href="#">Shareholding pattern</a></li>
              <li><a className="text-slate-700 hover:underline" href="#">Corporate announcements</a></li>
            </ul>
          </aside>
        </section>

        {/* sticky quick order */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(900px,95%)] z-50">
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-4 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-500">Quick Order</div>
              <div className="text-lg font-semibold">₹{livePrice.toFixed(2)}</div>
              <div className={`px-2 py-1 rounded text-sm ${pctChange>=0 ? "bg-emerald-50 text-emerald-700":"bg-red-50 text-red-600"}`}>{pctChange>=0?"+":""}{pctChange}%</div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={openBuy} className="px-6 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Buy</button>
              <button onClick={openSell} className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700">Sell</button>
            </div>
          </div>
        </div>

        <div className="h-28" />
      </div>

      {/* BUY / SELL modal */}
      {buySellModal.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{buySellModal.type === "buy" ? "Buy Shares" : "Sell Shares"}</h3>
                <p className="text-sm text-slate-500">Place a simple {orderType} order</p>
              </div>
              <button onClick={closeModal} className="text-2xl text-slate-400">×</button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-500">Quantity</label>
                <input type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value||1)))} className="mt-2 w-full p-3 border rounded-lg"/>
              </div>

              <div>
                <label className="text-sm text-slate-500">Order Type</label>
                <select value={orderType} onChange={(e)=>setOrderType(e.target.value)} className="mt-2 w-full p-3 border rounded-lg">
                  <option>Market</option>
                  <option>Limit</option>
                  <option>Stop Loss</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Estimated Total</p>
                <p className="text-lg font-semibold">₹{(livePrice*qty).toFixed(2)}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={closeModal} className="px-6 py-2 rounded-xl border">Cancel</button>
                <button onClick={placeOrder} className="px-6 py-2 rounded-xl bg-emerald-600 text-white">Confirm {buySellModal.type === "buy" ? "Buy" : "Sell"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
