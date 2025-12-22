import React from "react";
import emptyDashboardImg from "../../assets/stocks/stockEmptyDashboard.svg";

const Positions = () => {
  // 🔥 Replace with API data later
  const hasStocks = true;

  const stocks = [
    {
      name: "Tata Motors",
      qty: 10,
      avgBuy: 600,
      current: 720,
    },
    {
      name: "HDFC Bank",
      qty: 5,
      avgBuy: 1520,
      current: 1480,
    },
    {
      name: "Infosys",
      qty: 8,
      avgBuy: 1320,
      current: 1410,
    },
  ];

  // 👉 Calculate totals
  const totalInvested = stocks.reduce(
    (sum, s) => sum + s.avgBuy * s.qty,
    0
  );

  const totalCurrent = stocks.reduce(
    (sum, s) => sum + s.current * s.qty,
    0
  );

  const totalPnL = totalCurrent - totalInvested;

  const totalPnLPercent =
    ((totalPnL / totalInvested) * 100).toFixed(2);

  return (
  <div className="
  py-5 px-14 min-h-screen
  bg-slate-100
  dark:bg-[var(--app-bg)]
">
  {/* ❌ EMPTY STATE */}
  {!hasStocks ? (
    <div className="flex flex-col items-center text-center mt-16">
      <img
        src={emptyDashboardImg}
        alt="Empty Portfolio"
        className="w-64 h-64 mb-6"
      />

      <h2 className="
        font-semibold text-xl mb-2
        text-blue-900
        dark:text-[var(--text-primary)]
      ">
        No Stocks Added Yet
      </h2>

      <p className="
        text-sm max-w-xs mb-4
        text-gray-500
        dark:text-[var(--text-secondary)]
      ">
        Track all your stock positions here once you start investing.
      </p>

      <button className="bg-teal-600 text-white px-5 py-2 rounded-md">
        Import Positions
      </button>
    </div>
  ) : (
    /* 📌 STOCK POSITIONS SECTION */
    <div className="space-y-5">
      {/* HEADER SUMMARY */}
      <div className="
        p-4 rounded-lg
        bg-teal-50 border border-teal-100
        dark:bg-[var(--white-5)]
        dark:border-[var(--border-color)]
      ">
        <h2 className="
          text-xl font-semibold mb-2 flex justify-between
          text-blue-900
          dark:text-[var(--text-primary)]
        ">
          Your Stock Positions
        </h2>

        <div className="mt-2">
          <p className="
            text-md
            text-gray-700
            dark:text-[var(--text-secondary)]
          ">
            Total Invested:{" "}
            <span className="text-teal-700 font-semibold">
              ₹ {totalInvested.toLocaleString()}
            </span>
          </p>

          <p className="
            text-sm
            text-gray-700
            dark:text-[var(--text-secondary)]
          ">
            Current Value:{" "}
            <span className="
              font-semibold
              text-blue-900
              dark:text-[var(--text-primary)]
            ">
              ₹{totalCurrent.toLocaleString()}
            </span>
          </p>

          <p
            className={`text-lg font-semibold mt-1 ${
              totalPnL >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}
            ₹ {totalPnL.toLocaleString()} (
            {totalPnL >= 0 ? "+" : ""}
            {totalPnLPercent}% )
          </p>
        </div>
      </div>

      {/* STOCK LIST */}
      <div className="space-y-3">
        {stocks.map((s, i) => {
          const stockInvested = s.avgBuy * s.qty;
          const stockCurrent = s.current * s.qty;
          const pnl = stockCurrent - stockInvested;
          const pnlPercent = ((pnl / stockInvested) * 100).toFixed(2);

          return (
            <div
              key={i}
              className="
                p-4 rounded-lg flex items-center justify-between
                bg-white border border-gray-200
                dark:bg-[var(--card-bg)]
                dark:border-[var(--border-color)]
              "
            >
              {/* LEFT */}
              <div>
                <p className="
                  font-semibold
                  text-blue-900
                  dark:text-[var(--text-primary)]
                ">
                  {s.name}
                </p>

                <p className="
                  text-sm
                  text-gray-600
                  dark:text-[var(--text-secondary)]
                ">
                  Qty: {s.qty}
                </p>

                <p className="
                  text-xs
                  text-gray-500
                  dark:text-[var(--text-secondary)]
                ">
                  Buy @ ₹{s.avgBuy} | Curr: ₹{s.current}
                </p>
              </div>

              {/* RIGHT — P&L */}
              <div
                className={`text-right font-semibold ${
                  pnl >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                <p>
                  {pnl >= 0 ? "+" : ""}
                  ₹ {pnl.toLocaleString()}
                </p>
                <p className="text-xs">
                  ({pnl >= 0 ? "+" : ""}
                  {pnlPercent}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>

  );
};

export default Positions;
