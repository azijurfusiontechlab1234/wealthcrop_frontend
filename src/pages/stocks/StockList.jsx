import React from "react";
import { useParams } from "react-router-dom";

const formatTitle = (param = "") =>
  param
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const stocks = [
  {
    name: "Rolex Rings",
    symbol: "ROLEX",
    price: 161.2,
    change: 21.72,
    percent: 15.57,
    volume: "3,76,84,943",
  },
  {
    name: "OLA Electric Mobility",
    symbol: "OLA",
    price: 37.53,
    change: -1.69,
    percent: -4.31,
    volume: "9,46,79,164",
  },
  {
    name: "Groww",
    symbol: "GROWW",
    price: 214.05,
    change: 17.94,
    percent: 9.15,
    volume: "18,13,98,603",
  },
];

const StockList = () => {
  const { name } = useParams();
  const title = formatTitle(name);

  return (
    <div className="min-h-screen px-4 py-6 bg-[var(--app-bg)]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-xl font-semibold text-blue-900 dark:text-[var(--text-primary)]">
          {title}
        </h1>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-[var(--border-color)] bg-white dark:bg-[var(--card-bg)] shadow-sm">

        {/* HEADER ROW */}
        <div className="grid grid-cols-3 px-5 py-4 text-xs font-semibold text-gray-500 dark:text-[var(--text-secondary)] bg-gray-50 dark:bg-[var(--white-5)] border-b border-[var(--border-color)]">
          <div>Company</div>
          {/* <div className="text-center">Trend</div> */}
          <div className="text-right">Market Price</div>
          <div className="text-right">Volume</div>
        </div>

        {/* ROWS */}
        {stocks.map((stock, i) => {
          const isPositive = stock.change >= 0;

          return (
            <div
  key={i}
  className={`grid grid-cols-3 items-center px-5 py-4 transition
    ${i !== stocks.length - 1 ? "border-b border-[var(--border-color)]" : ""}
    hover:bg-gray-50 dark:hover:bg-[var(--white-5)]
  `}
>
              {/* COMPANY */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold bg-blue-100 text-blue-900 dark:bg-[var(--white-10)] dark:text-[var(--text-primary)]">
                  {stock.symbol.slice(0, 2)}
                </div>

                <p className="text-sm font-medium text-gray-900 dark:text-[var(--text-primary)]">
                  {stock.name}
                </p>
              </div>

              {/* TREND */}
              {/* <div className="flex justify-center">
                <div
                  className={`h-6 w-20 rounded-full ${
                    isPositive ? "bg-green-500/20" : "bg-red-500/20"
                  }`}
                />
              </div> */}

              {/* PRICE */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-[var(--text-primary)]">
                  ₹{stock.price}
                </p>

                <p
                  className={`text-xs font-medium ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {stock.change} ({stock.percent}%)
                </p>
              </div>

              {/* VOLUME */}
              <div className="text-right text-sm text-gray-900 dark:text-[var(--text-primary)]">
                {stock.volume}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockList;