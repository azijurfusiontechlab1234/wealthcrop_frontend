import { useParams, Link } from "react-router-dom";
import FundCard from "../../components/FundCard";
import Chart from "../../components/Chart";
import { FaArrowLeft } from 'react-icons/fa'; 




export default function BasketDetails({ baskets, basketDetails }) {
  const { id } = useParams();
  const basket = baskets[id];
  const details = basketDetails[id];

  return (
    <div className="min-h-screen bg-[#f3f7fb] py-6">

      {/* Top Header */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link to="/baskets" className="flex items-center font-medium text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
  <FaArrowLeft className="mr-2" /> Back to Baskets
</Link>

        <h1 className="text-2xl font-bold text-slate-800 mt-2">
          {basket.name}
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          Expert curated mutual fund basket with auto diversification.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">

        {/* NAV PERFORMANCE SMALL CARD */}
        <div className="bg-white border border-[#e0e7ef] rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-slate-800 text-[15px]">NAV Performance</h2>
            <span className="text-gray-500 text-xs">1Y Trend</span>
          </div>

          {/* Smaller Chart */}
          <div className="h-40">
            <Chart type="line" data={details.navHistory} />
          </div>
        </div>

        {/* METRICS */}
        <div className="bg-white border border-[#e0e7ef] rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-slate-800 text-[15px] mb-3">Key Metrics</h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 rounded-lg bg-[#f9fbff] border border-[#e5ecf3]">
              <p className="text-xs text-gray-500">Sharpe Ratio</p>
              <p className="text-lg font-semibold text-slate-900">{details.metrics.sharpe}</p>
            </div>

            <div className="p-2 rounded-lg bg-[#f9fbff] border border-[#e5ecf3]">
              <p className="text-xs text-gray-500">Expense Ratio</p>
              <p className="text-lg font-semibold text-slate-900">{details.metrics.expenseRatio}%</p>
            </div>

            <div className="p-2 rounded-lg bg-[#f9fbff] border border-[#e5ecf3]">
              <p className="text-xs text-gray-500">Std Deviation</p>
              <p className="text-lg font-semibold text-slate-900">{details.metrics.stdDev}</p>
            </div>
          </div>
        </div>

        {/* ALLOCATION - SMALL PIE */}
        <div className="bg-white border border-[#e0e7ef] rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-slate-800 text-[15px] mb-2">Asset Allocation</h2>

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
            <span className="text-slate-700">Equity: {details.allocation.equity}%</span>
            <span className="text-slate-700">Debt: {details.allocation.debt}%</span>
            <span className="text-slate-700">Commodity: {details.allocation.commodity}%</span>
          </div>
        </div>

        {/* FUNDS INSIDE BASKET */}
        <div className="bg-white border border-[#e0e7ef] rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-slate-800 text-[15px] mb-3">
            Funds in This Basket
          </h2>

          {details.funds.map((cat, idx) => (
            <div key={idx} className="mb-4">

              {/* Category Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <h3 className="font-medium text-slate-700 text-sm">{cat.category}</h3>
              </div>

              <div className="bg-[#f9fbff] border border-[#e5ecf3] rounded-xl p-3 space-y-2">
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
