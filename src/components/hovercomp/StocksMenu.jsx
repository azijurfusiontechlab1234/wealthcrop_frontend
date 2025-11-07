export default function StocksMenu() {
  return (
    <div className="grid grid-cols-3 gap-8 p-10">
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Invest in Stocks</h3>
        <p className="text-sm text-gray-500">
          Invest in stocks, ETFs, IPOs with fast orders. Track returns and real-time P&L.
        </p>
      </div>

      <div>
        <ul className="space-y-2">
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">Intraday</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">ETFs</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">IPO</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">MTFs</li>
        </ul>
      </div>

      <div>
        <ul className="space-y-2">
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">Stock Screener</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">Stock Events</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">Demat Account</li>
          <li className="text-gray-800 hover:text-blue-700 cursor-pointer">Share Market Today</li>
        </ul>
      </div>
    </div>
  );
}
