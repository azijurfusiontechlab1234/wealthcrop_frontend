import React from "react";
import emptyDashboardImg from "../../assets/mutualFund/emptyDashboard.svg";

const DashBoardMF = () => {
  // 🔥 Replace this with your real data later
  const hasInvestments = true; // if true → show invested dashboard

  const funds = [
    {
      name: "Axis Bluechip Fund",
      amount: 15000,
      returns: "+12.4%",
    },
    {
      name: "ICICI Value Discovery Fund",
      amount: 9200,
      returns: "+8.1%",
    },
    {
      name: "HDFC Midcap Opportunities",
      amount: 6100,
      returns: "-2.4%",
    },
  ];

  const handleExternal = () => {
    alert("External Funds Imported!");
  };

  return (
    <div className="p-4 min-h-screen bg-white">
      {/* ----------------------- */}
      {/*     EMPTY DASHBOARD     */}
      {/* ----------------------- */}
      {!hasInvestments ? (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <img
            src={emptyDashboardImg}
            alt="Empty Dashboard"
            className="w-64 h-64 mb-6"
          />

          <h2 className="text-blue-900 font-semibold mb-2 text-xl">
            Already invested somewhere?
          </h2>

          <p className="text-gray-500 mb-6 text-sm max-w-xs">
            Manage & analyse all your Mutual Fund holdings on one dashboard
          </p>

          <button
            onClick={handleExternal}
            className="bg-teal-600 text-white font-medium py-2 px-5 rounded-md"
          >
            Import External Funds
          </button>
        </div>
      ) : (
        /* ---------------------------- */
        /*  INVESTED DASHBOARD SECTION  */
        /* ---------------------------- */
        <div className="space-y-5">
          {/* Header Summary */}
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <h2 className="text-xl font-semibold text-blue-900 mb-1 flex justify-between">
              Your Mutual Funds
                 <button
            onClick={handleExternal}
            className="bg-teal-600 text-white font-medium text-xs sm:text-lg sm:py-2 sm:px-3 rounded-md cursor-pointer"
          >
            Import External Funds
          </button>
            </h2>
            <p className="text-gray-600 text-sm">
              Total invested:{" "}
              <span className="text-teal-700 font-semibold">
                ₹
                {funds
                  .reduce((acc, f) => acc + f.amount, 0)
                  .toLocaleString()}
              </span>
            </p>
          </div>

          {/* Fund List */}
          <div className="space-y-3">
            {funds.map((fund, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-sm border border-gray-200 bg-white flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-blue-900">{fund.name}</p>
                  <p className="text-sm text-gray-500">
                    Invested: ₹{fund.amount.toLocaleString()}
                  </p>
                </div>

                <p
                  className={`font-semibold ${
                    fund.returns.startsWith("-")
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {fund.returns}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardMF;
