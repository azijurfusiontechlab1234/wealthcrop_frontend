import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const MutualFundInvestPage = () => {
  // Dummy values — replace with actual data later
  const schemeCode = "123456";
  const {name} = useParams();
  const fundCategory = "Equity • Flexi Cap";
  const risk = "Moderate";
  const rating = 5;
  const nav = 72.45;
  const returns = { "1Y": 32.1, "3Y": 22.8, "5Y": 20.4 };
  const minLumpsum = 1000;
  const minSip = 1000;
  const expenseRatio = 0.89;
  const exitLoad = "1% if redeemed within 365 days";

  const [investType, setInvestType] = useState("LUMPSUM");
  const [planType, setPlanType] = useState("GROWTH");
  const [amount, setAmount] = useState(5000);
  const [sipDay, setSipDay] = useState("05");

  const estimatedUnits = useMemo(() => {
    if (!amount || nav <= 0) return 0;
    return amount / nav;
  }, [amount, nav]);

  const formatReturn = (val) =>
    val != null ? `${val > 0 ? "+" : ""}${val.toFixed(2)}%` : "--";

  const Stars = ({ rating }) => (
    <span className="text-[11px] text-amber-500">
      {"★".repeat(rating)}
      <span className="text-slate-300">
        {"☆".repeat(5 - rating)}
      </span>
    </span>
  );

  const handleInvest = () => {
    const payload = {
      schemeCode,
      schemeName: name,
      investType,          // LUMPSUM or SIP
      planType,            // GROWTH or IDCW
      amount: Number(amount),
      nav,
      mode: "ONLINE",
      orderSource: "WEB_APP",

      sipDetails:
        investType === "SIP"
          ? {
              sipDay,
              sipFrequency: "MONTHLY", // always monthly
            }
          : null,
    };

    console.log("MF Invest Payload:", payload);

    alert(
      `${investType} order placed for ₹${amount} in ${name} (${planType})`
    );
  };

  return (
    <div className="min-h-screen rounded-2xl bg-slate-100 flex justify-center px-4 py-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Invest in Mutual Fund
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Choose lumpsum or SIP and review details before investing.
            </p>
          </div>
          <div className="flex gap-2 text-xs text-slate-500">
            <span>Mutual Funds</span>
            <span>/</span>
            <span className="text-slate-700 font-medium">Invest</span>
          </div>
        </div>

        {/* Fund header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-4 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
              MF
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{name}</p>
              <p className="text-[11px] text-slate-500">{fundCategory}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px]">
                <Stars rating={rating} />
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {risk} risk
                </span>
              </div>
            </div>
          </div>

          {/* NAV + returns */}
          <div className="flex items-end gap-6 text-xs">
            <div className="text-right">
              <p className="text-[11px] text-slate-500 uppercase">NAV</p>
              <p className="text-sm font-semibold text-slate-900">
                ₹{nav.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">As of today</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-500">1Y • 3Y • 5Y</p>
              <p className="text-[11px] font-medium text-emerald-600">
                {formatReturn(returns["1Y"])} • {formatReturn(returns["3Y"])} • {formatReturn(returns["5Y"])}
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-[1.5fr,1fr] gap-4 items-start">
          {/* LEFT SIDE – Invest Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">

            {/* Lumpsum / SIP Toggle */}
            <div className="flex gap-2 text-xs font-medium mb-2">
              <button
                onClick={() => setInvestType("LUMPSUM")}
                className={`flex-1 py-2 rounded-xl border text-center transition-all ${
                  investType === "LUMPSUM"
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-emerald-50 text-emerald-700 border-transparent"
                }`}
              >
                Lumpsum
              </button>

              <button
                onClick={() => setInvestType("SIP")}
                className={`flex-1 py-2 rounded-xl border text-center transition-all ${
                  investType === "SIP"
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-blue-50 text-blue-700 border-transparent"
                }`}
              >
                SIP
              </button>
            </div>

            {/* Plan type */}
            <div className="text-xs">
              <p className="text-[11px] text-slate-500 mb-1">Plan</p>
              <div className="flex gap-1 bg-slate-50 rounded-xl p-1">
                {["GROWTH", "IDCW"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPlanType(type)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] transition ${
                      planType === type ? "bg-slate-900 text-white" : "text-slate-600"
                    }`}
                  >
                    {type === "GROWTH" ? "Growth" : "IDCW"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="text-xs">
              <p className="text-[11px] text-slate-500 mb-1">
                {investType === "LUMPSUM"
                  ? "Lumpsum amount (₹)"
                  : "Monthly SIP amount (₹)"}
              </p>

              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="text-[11px] text-slate-500 mr-1">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none py-2"
                  min={0}
                />
              </div>

              <p className="mt-1 text-[11px] text-slate-500">
                Minimum {investType === "LUMPSUM" ? `₹${minLumpsum}` : `₹${minSip}`}
              </p>
            </div>

            {/* SIP ONLY – Date selector (NO duration) */}
            {investType === "SIP" && (
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div>
                  <p className="text-[11px] text-slate-500 mb-1">SIP date</p>
                  <select
                    value={sipDay}
                    onChange={(e) => setSipDay(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-xs outline-none"
                  >
                    {["01", "05", "10", "15", "25"].map((d) => (
                      <option key={d} value={d}>
                        {d} of every month
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Estimated units for Lumpsum */}
            {investType === "LUMPSUM" && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs">
                <p className="text-[11px] text-slate-500 mb-0.5">Estimated units (approx)</p>
                <p className="text-sm font-semibold text-slate-900">
                  {estimatedUnits.toFixed(4)} units
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Based on NAV. Actual allocated units may differ.
                </p>
              </div>
            )}

            {/* ACTION */}
            <div className="pt-1 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                <p>
                  Investing in:{" "}
                  <span className="font-medium text-slate-800">{name}</span>
                </p>
                <p className="mt-0.5">
                  Mode:{" "}
                  <span className="font-medium text-slate-800">
                    {investType === "LUMPSUM" ? "One-time lumpsum" : "Monthly SIP"}
                  </span>
                </p>
              </div>

              <button
                onClick={handleInvest}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition ${
                  investType === "LUMPSUM"
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {investType === "LUMPSUM" ? "Confirm & Invest" : "Start SIP"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE – Key Fund Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4 text-xs">

            {/* Key details */}
            <div>
              <p className="text-[11px] text-slate-500 mb-2">Key details</p>
              <div className="rounded-xl bg-slate-50 px-3 py-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="font-medium text-slate-800">{fundCategory}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Risk</span>
                  <span className="font-medium text-slate-800">{risk}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Expense ratio</span>
                  <span className="font-medium text-slate-800">{expenseRatio}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Exit load</span>
                  <span className="font-medium text-slate-800">{exitLoad}</span>
                </div>
              </div>
            </div>

            {/* Returns */}
            <div>
              <p className="text-[11px] text-slate-500 mb-2">Historical returns</p>
              <div className="rounded-xl border border-slate-100 px-3 py-2 space-y-1">
                {["1Y", "3Y", "5Y"].map((p) => (
                  <div className="flex justify-between" key={p}>
                    <span className="text-slate-500">{p}</span>
                    <span className="font-medium text-emerald-600">
                      {formatReturn(returns[p])}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-1 text-[10px] text-slate-400">
                Past performance is not indicative of future returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundInvestPage;
