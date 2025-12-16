export default function FundCard({ fund }) {
  return (
    <div className="bg-white border border-[#e1e8f0] rounded-lg p-3 flex justify-between hover:shadow transition">
      
      <div>
        <p className="font-medium text-[15px] text-slate-800">{fund.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">Weight: {fund.weight}%</p>
      </div>

      {/* Returns Breakdown */}
      <div className="text-right">
        <p className="text-green-600 font-semibold text-sm">{fund.returns3Y}%</p>
        <div className="flex gap-1 text-[11px] justify-end mt-1">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            1Y: {fund.returns1Y}%
          </span>
          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
            3Y: {fund.returns3Y}%
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
            5Y: {fund.returns5Y}%
          </span>
        </div>
      </div>

    </div>
  );
}
