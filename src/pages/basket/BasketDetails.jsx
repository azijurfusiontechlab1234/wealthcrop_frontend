import { useParams, Link } from "react-router-dom";
import FundCard from "../../components/FundCard";
import Chart from "../../components/Chart";
import { FaArrowLeft } from 'react-icons/fa'; 




export default function BasketDetails({ baskets, basketDetails }) {
  const { id } = useParams();
  const basket = baskets[id];
  const details = basketDetails[id];

  return (
   <div
  className="
    min-h-screen py-6
    bg-[#f3f7fb]
    dark:bg-[var(--app-bg)]
  "
>
  {/* Top Header */}
  <div className="max-w-4xl mx-auto mb-4">
    <Link
      to="/baskets"
      className="
        flex items-center font-medium text-sm
        text-white bg-blue-500 hover:bg-blue-600
        rounded-lg px-4 py-2 transition
        shadow-lg hover:shadow-xl
      "
    >
      <FaArrowLeft className="mr-2" /> Back to Baskets
    </Link>

    <h1
      className="
        text-2xl font-bold mt-2
        text-slate-800 dark:text-[var(--text-primary)]
      "
    >
      {basket.name}
    </h1>

    <p
      className="
        text-sm mt-1
        text-gray-600 dark:text-[var(--text-secondary)]
      "
    >
      Expert curated mutual fund basket with auto diversification.
    </p>
  </div>

  <div className="max-w-4xl mx-auto space-y-5">

    {/* NAV PERFORMANCE */}
    <div
      className="
        bg-white border border-[#e0e7ef]
        rounded-xl shadow-sm p-4

        dark:bg-[var(--card-bg)]
        dark:border-[var(--border-color)]
      "
    >
      <div className="flex justify-between items-center mb-2">
        <h2
          className="
            font-semibold text-[15px]
            text-slate-800 dark:text-[var(--text-primary)]
          "
        >
          NAV Performance
        </h2>
        <span
          className="
            text-xs
            text-gray-500 dark:text-[var(--text-secondary)]
          "
        >
          1Y Trend
        </span>
      </div>

      <div className="h-40">
        <Chart type="line" data={details.navHistory} />
      </div>
    </div>

    {/* METRICS */}
    <div
      className="
        bg-white border border-[#e0e7ef]
        rounded-xl shadow-sm p-4

        dark:bg-[var(--card-bg)]
        dark:border-[var(--border-color)]
      "
    >
      <h2
        className="
          font-semibold text-[15px] mb-3
          text-slate-800 dark:text-[var(--text-primary)]
        "
      >
        Key Metrics
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          ["Sharpe Ratio", details.metrics.sharpe],
          ["Expense Ratio", `${details.metrics.expenseRatio}%`],
          ["Std Deviation", details.metrics.stdDev],
        ].map(([label, value]) => (
          <div
            key={label}
            className="
              p-2 rounded-lg
              bg-[#f9fbff] border border-[#e5ecf3]

              dark:bg-[var(--white-5)]
              dark:border-[var(--border-color)]
            "
          >
            <p className="text-xs text-gray-500 dark:text-[var(--text-secondary)]">
              {label}
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-[var(--text-primary)]">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* ALLOCATION */}
    <div
      className="
        bg-white border border-[#e0e7ef]
        rounded-xl shadow-sm p-4

        dark:bg-[var(--card-bg)]
        dark:border-[var(--border-color)]
      "
    >
      <h2
        className="
          font-semibold text-[15px] mb-2
          text-slate-800 dark:text-[var(--text-primary)]
        "
      >
        Asset Allocation
      </h2>

      <div className="w-48 mx-auto">
        <Chart
          type="pie"
          data={[
            details.allocation.equity,
            details.allocation.debt,
            details.allocation.commodity,
          ]}
        />
      </div>

      <div className="flex justify-center gap-4 text-xs mt-3">
        <span className="text-slate-700 dark:text-[var(--text-secondary)]">
          Equity: {details.allocation.equity}%
        </span>
        <span className="text-slate-700 dark:text-[var(--text-secondary)]">
          Debt: {details.allocation.debt}%
        </span>
        <span className="text-slate-700 dark:text-[var(--text-secondary)]">
          Commodity: {details.allocation.commodity}%
        </span>
      </div>
    </div>

    {/* FUNDS INSIDE BASKET */}
    <div
      className="
        bg-white border border-[#e0e7ef]
        rounded-xl shadow-sm p-4

        dark:bg-[var(--card-bg)]
        dark:border-[var(--border-color)]
      "
    >
      <h2
        className="
          font-semibold text-[15px] mb-3
          text-slate-800 dark:text-[var(--text-primary)]
        "
      >
        Funds in This Basket
      </h2>

      {details.funds.map((cat, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            <h3 className="font-medium text-slate-700 dark:text-[var(--text-secondary)] text-sm">
              {cat.category}
            </h3>
          </div>

          <div
            className="
              bg-[#f9fbff] border border-[#e5ecf3]
              rounded-xl p-3 space-y-2

              dark:bg-[var(--white-5)]
              dark:border-[var(--border-color)]
            "
          >
            {cat.list.map((fund, index) => (
              <FundCard key={index} fund={fund} />
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* BOTTOM CTA */}
    <Link to={`/invest/${id}`}>
      <button className="w-full py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition text-lg">
        Invest Now
      </button>
    </Link>
  </div>
</div>

  );
}
