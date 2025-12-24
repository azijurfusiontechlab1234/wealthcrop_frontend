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
      <span className="text-slate-300 dark:text-[var(--text-secondary)]">
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
    <div className="
  min-h-screen rounded-2xl
  bg-slate-100 dark:bg-[var(--app-bg)]
  flex justify-center px-4 py-6
">
  <div className="w-full max-w-4xl">

    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="
          text-xl font-semibold
          text-slate-900 dark:text-[var(--text-primary)]
        ">
          Invest in Mutual Fund
        </h1>
        <p className="
          text-xs mt-1
          text-slate-500 dark:text-[var(--text-secondary)]
        ">
          Choose lumpsum or SIP and review details before investing.
        </p>
      </div>

      <div className="
        flex gap-2 text-xs
        text-slate-500 dark:text-[var(--text-secondary)]
      ">
        <span>Mutual Funds</span>
        <span>/</span>
        <span className="
          text-slate-700 font-medium
          dark:text-[var(--text-primary)]
        ">
          Invest
        </span>
      </div>
    </div>

    {/* Fund header */}
    <div className="
      bg-white dark:bg-[var(--card-bg)]
      rounded-2xl shadow-sm
      border border-slate-200 dark:border-[var(--border-color)]
      mb-4 p-4
      flex flex-wrap items-center justify-between gap-4
    ">
      <div className="flex items-center gap-3">
        <div className="
          h-9 w-9 rounded-lg
          bg-indigo-100 text-indigo-700
          dark:bg-indigo-500/15 dark:text-indigo-400
          flex items-center justify-center text-xs font-bold
        ">
          MF
        </div>

        <div>
          <p className="
            text-sm font-semibold
            text-slate-900 dark:text-[var(--text-primary)]
          ">
            {name}
          </p>
          <p className="
            text-[11px]
            text-slate-500 dark:text-[var(--text-secondary)]
          ">
            {fundCategory}
          </p>

          <div className="flex items-center gap-2 mt-1 text-[11px]">
            <Stars rating={rating} />
            <span className="
              px-2 py-0.5 rounded-full
              bg-slate-100 text-slate-600
              dark:bg-[var(--white-5)] dark:text-[var(--text-secondary)]
            ">
              {risk} risk
            </span>
          </div>
        </div>
      </div>

      {/* NAV + returns */}
      <div className="flex items-end gap-6 text-xs">
        <div className="text-right">
          <p className="
            text-[11px] uppercase
            text-slate-500 dark:text-[var(--text-secondary)]
          ">
            NAV
          </p>
          <p className="
            text-sm font-semibold
            text-slate-900 dark:text-[var(--text-primary)]
          ">
            ₹{nav.toFixed(2)}
          </p>
          <p className="
            text-[11px] mt-0.5
            text-slate-500 dark:text-[var(--text-secondary)]
          ">
            As of today
          </p>
        </div>

        <div className="text-right">
          <p className="
            text-[11px]
            text-slate-500 dark:text-[var(--text-secondary)]
          ">
            1Y • 3Y • 5Y
          </p>
          <p className="
            text-[11px] font-medium
            text-emerald-600 dark:text-emerald-400
          ">
            {formatReturn(returns["1Y"])} •{" "}
            {formatReturn(returns["3Y"])} •{" "}
            {formatReturn(returns["5Y"])}
          </p>
        </div>
      </div>
    </div>

    {/* Main content */}
    <div className="grid md:grid-cols-[1.5fr,1fr] gap-4 items-start">

      {/* LEFT – Invest Form */}
      <div className="
        bg-white dark:bg-[var(--card-bg)]
        rounded-2xl shadow-sm
        border border-slate-200 dark:border-[var(--border-color)]
        p-4 space-y-4
      ">

        {/* Lumpsum / SIP Toggle */}
        <div className="flex gap-2 text-xs font-medium mb-2">
          <button
            onClick={() => setInvestType("LUMPSUM")}
            className={`flex-1 py-2 rounded-xl transition-all ${
              investType === "LUMPSUM"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
            }`}
          >
            Lumpsum
          </button>

          <button
            onClick={() => setInvestType("SIP")}
            className={`flex-1 py-2 rounded-xl transition-all ${
              investType === "SIP"
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
            }`}
          >
            SIP
          </button>
        </div>

        {/* Plan type */}
        <div className="text-xs">
          <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mb-1">
            Plan
          </p>

          <div className="
            flex gap-1 rounded-xl p-1
            bg-slate-50 dark:bg-[var(--white-5)]
          ">
            {["GROWTH", "IDCW"].map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] transition ${
                  planType === type
                    ? "bg-slate-900 text-white dark:bg-[var(--text-primary)] dark:text-[var(--app-bg)]"
                    : "text-slate-600 dark:text-[var(--text-secondary)]"
                }`}
              >
                {type === "GROWTH" ? "Growth" : "IDCW"}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="text-xs">
          <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mb-1">
            {investType === "LUMPSUM"
              ? "Lumpsum amount (₹)"
              : "Monthly SIP amount (₹)"}
          </p>

          <div className="
            flex items-center rounded-xl px-3
            border border-slate-200 dark:border-[var(--border-color)]
            bg-slate-50 dark:bg-[var(--white-5)]
          ">
            <span className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mr-1">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                w-full bg-transparent py-2 outline-none text-sm
                text-slate-900 dark:text-[var(--text-primary)]
              "
            />
          </div>

          <p className="mt-1 text-[11px] text-slate-500 dark:text-[var(--text-secondary)]">
            Minimum {investType === "LUMPSUM" ? `₹${minLumpsum}` : `₹${minSip}`}
          </p>
        </div>

        {/* SIP Date */}
        {investType === "SIP" && (
          <div className="text-xs">
            <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mb-1">
              SIP date
            </p>
            <select
              value={sipDay}
              onChange={(e) => setSipDay(e.target.value)}
              className="
                w-full rounded-xl px-3 py-2 outline-none text-xs
                border border-slate-200 dark:border-[var(--border-color)]
                bg-slate-50 dark:bg-[var(--white-5)]
                text-slate-900 dark:text-[var(--text-primary)]
              "
            >
              {["01", "05", "10", "15", "25"].map((d) => (
                <option key={d} value={d}>
                  {d} of every month
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Estimated units */}
        {investType === "LUMPSUM" && (
          <div className="
            rounded-xl border border-dashed
            border-slate-300 dark:border-[var(--border-color)]
            bg-slate-50 dark:bg-[var(--white-5)]
            px-3 py-2 text-xs
          ">
            <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)]">
              Estimated units (approx)
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-[var(--text-primary)]">
              {estimatedUnits.toFixed(4)} units
            </p>
            <p className="text-[10px] text-slate-400 dark:text-[var(--text-secondary)]">
              Based on NAV. Actual allocated units may differ.
            </p>
          </div>
        )}

        {/* ACTION */}
        <div className="
          pt-1 mt-2 flex items-center justify-between gap-3
          border-t border-slate-100 dark:border-[var(--border-color)]
        ">
          <div className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)]">
            <p>
              Investing in{" "}
              <span className="font-medium text-slate-800 dark:text-[var(--text-primary)]">
                {name}
              </span>
            </p>
            <p className="mt-0.5">
              Mode{" "}
              <span className="font-medium text-slate-800 dark:text-[var(--text-primary)]">
                {investType === "LUMPSUM" ? "One-time lumpsum" : "Monthly SIP"}
              </span>
            </p>
          </div>

          <button
            onClick={handleInvest}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold text-white ${
              investType === "LUMPSUM"
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {investType === "LUMPSUM" ? "Confirm & Invest" : "Start SIP"}
          </button>
        </div>
      </div>

      {/* RIGHT – Key Fund Info */}
      <div className="
        bg-white dark:bg-[var(--card-bg)]
        rounded-2xl shadow-sm
        border border-slate-200 dark:border-[var(--border-color)]
        p-4 space-y-4 text-xs
      ">
        <div>
          <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mb-2">
            Key details
          </p>

          <div className="rounded-xl bg-slate-50 dark:bg-[var(--white-5)] px-3 py-2 space-y-1">
            {[
              ["Category", fundCategory],
              ["Risk", risk],
              ["Expense ratio", expenseRatio + "%"],
              ["Exit load", exitLoad],
            ].map(([k, v]) => (
              <div className="flex justify-between" key={k}>
                <span className="text-slate-500 dark:text-[var(--text-secondary)]">
                  {k}
                </span>
                <span className="font-medium text-slate-800 dark:text-[var(--text-primary)]">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] text-slate-500 dark:text-[var(--text-secondary)] mb-2">
            Historical returns
          </p>

          <div className="
            rounded-xl border border-slate-100 dark:border-[var(--border-color)]
            px-3 py-2 space-y-1
          ">
            {["1Y", "3Y", "5Y"].map((p) => (
              <div className="flex justify-between" key={p}>
                <span className="text-slate-500 dark:text-[var(--text-secondary)]">
                  {p}
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {formatReturn(returns[p])}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-1 text-[10px] text-slate-400 dark:text-[var(--text-secondary)]">
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
