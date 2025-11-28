import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [result, setResult] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const navigate = useNavigate();

  const calculateRetirement = () => {
    if (!currentAge || !retirementAge || !monthlyExpense || !inflationRate)
      return;

    const yearsToRetire = retirementAge - currentAge;
    const inflation = inflationRate / 100;

    // Future Monthly Expense after inflation
    const futureExpense =
      monthlyExpense * Math.pow(1 + inflation, yearsToRetire);

    // Retirement Corpus needed (Assume 30 years post retirement life, 6% return)
    const postReturnRate = 0.06;
    const corpus =
      (futureExpense * 12 * (1 - Math.pow(1 / (1 + postReturnRate), 30))) /
      postReturnRate;

    setResult({
      futureExpense: futureExpense.toFixed(0),
      corpus: corpus.toFixed(0),
    });
  };

  const faqs = [
    {
      q: "What is a Retirement Calculator?",
      a: "A retirement calculator estimates how much money you need to save to continue your lifestyle after retirement.",
    },
    {
      q: "Why is inflation important in retirement planning?",
      a: "Inflation increases expenses every year; hence, future costs will be much higher than today.",
    },
    {
      q: "How long should retirement corpus last?",
      a: "Typically 25–30 years post-retirement life should be planned depending on life expectancy.",
    },
    {
      q: "Does retirement corpus include pension?",
      a: "Yes, corpus includes total value of savings, schemes, pension, investments, etc.",
    },
  ];

  return (
    <div className="min-h-screen  bg-linear-to-r from-blue-100 to-green-100">
      {/* HEADER */}
      <div className="bg-linear-to-r from-blue-100 to-green-100 py-14 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-purple-600 drop-shadow">
          Retirement Calculator 🧓💰
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg leading-relaxed">
          Plan your dream retirement by calculating how much money you need to
          save. Account your lifestyle expenses and inflation to get future
          financial needs.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-200">
          {/* LEFT SIDE INPUTS */}
          <div className="p-8 bg-linear-to-br from-blue-50 to-white">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Current Age (Years)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 25"
                  className="w-full border border-purple-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Retirement Age (Years)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 60"
                  className="w-full border border-purple-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Monthly Expense Today (₹)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 20000"
                  className="w-full border border-purple-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Expected Inflation Rate (%)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 6"
                  className="w-full border border-purple-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>

              <button
                onClick={calculateRetirement}
                className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-bold text-sm transition"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* RIGHT SIDE RESULT */}
          <div className="p-8 bg-linear-to-br from-purple-600 to-indigo-600 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📊 Retirement Summary</h3>

            {result ? (
              <div className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-md">
                <p className="text-lg">
                  <strong>Monthly Expense at Retirement:</strong> ₹
                  {Number(result.futureExpense).toLocaleString()}
                </p>
                <p className="text-lg mt-1">
                  <strong>Retirement Corpus Required:</strong> ₹
                  {Number(result.corpus).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="opacity-90">
                Enter details and click calculate to view results.
              </p>
            )}

            <div className="mt-8 text-sm opacity-90">
              💡 Calculation assumes 6% post-retirement return for 30 years.
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow bg-linear-to-r from-blue-200 to-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>

        {faqs.map((item, index) => (
          <div key={index} className="border-b py-3">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center text-left text-gray-700 font-medium"
            >
              {item.q}
              <span>{openFAQ === index ? "−" : "+"}</span>
            </button>

            {openFAQ === index && (
              <p className="mt-2 text-gray-700">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* REDIRECT BUTTONS */}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Related Calculators
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/calculator/sip-calculator")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            SIP Calculator
          </button>

          <button
            onClick={() => navigate("/calculator/fd-calculator")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            FD Calculator
          </button>

          <button
            onClick={() => navigate("/calculator/nps-calculator")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          >
            NPS Calculator
          </button>

          <button
            onClick={() => navigate("/calculator/hra-calculator")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
          >
            HRA Calculator
          </button>
        </div>
      </div>

      <div className="pb-10"></div>
    </div>
  );
};

export default RetirementCalculator;
