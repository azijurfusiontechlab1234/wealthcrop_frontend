import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EducationCalculator = () => {
  const [currentCost, setCurrentCost] = useState("");
  const [yearsLeft, setYearsLeft] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [result, setResult] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const navigate = useNavigate();

  const calculateEducationGoal = () => {
    if (!currentCost || !yearsLeft || !inflationRate || !expectedReturn) return;

    const costNow = Number(currentCost);
    const years = Number(yearsLeft);
    const infl = Number(inflationRate) / 100;
    const ret = Number(expectedReturn) / 100;

    // Future cost of education
    const futureCost = costNow * Math.pow(1 + infl, years);

    // Monthly SIP required to reach futureCost
    const monthlyRate = ret / 12;
    const months = years * 12;

    let sip = 0;
    if (monthlyRate > 0) {
      sip = (futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      sip = futureCost / months;
    }

    setResult({
      futureCost: futureCost.toFixed(0),
      monthlySIP: sip.toFixed(0),
    });
  };

  const faqs = [
    {
      q: "Why is education inflation higher?",
      a: "Education costs usually increase faster than general inflation, often 8–12% per year.",
    },
    {
      q: "What does expected return mean?",
      a: "It is the annual return you expect from your investments like mutual funds or equities.",
    },
    {
      q: "Should I invest via SIP?",
      a: "SIP helps you spread investments over time and benefit from rupee cost averaging.",
    },
    {
      q: "Is this calculator exact?",
      a: "It provides an estimate based on the numbers you enter and assumed constant rates.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 to-green-100">
      {/* HEADER */}
      <div className="py-14 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow">
          Education Cost Calculator 🎓📚
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg leading-relaxed">
          Estimate future education expenses and the monthly SIP needed to reach
          your goal in time.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-200">
          {/* LEFT INPUTS */}
          <div className="p-8 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Current Education Cost (₹)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 10,00,000"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Years Left
                </label>
                <input
                  type="number"
                  placeholder="Ex: 10"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={yearsLeft}
                  onChange={(e) => setYearsLeft(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Education Inflation Rate (%)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 10"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Expected Return on Investment (%)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 12"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <button
                onClick={calculateEducationGoal}
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold text-sm transition"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* RIGHT RESULT */}
          <div className="p-8 bg-linear-to-br from-indigo-600 to-sky-700 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📊 Education Goal Summary</h3>

            {result ? (
              <div className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-md space-y-2">
                <p className="text-lg">
                  <strong>Future Education Cost:</strong> ₹
                  {Number(result.futureCost).toLocaleString()}
                </p>
                <p className="text-lg">
                  <strong>Required Monthly SIP:</strong> ₹
                  {Number(result.monthlySIP).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="opacity-80">
                Enter details and click calculate to view your goal.
              </p>
            )}

            <div className="mt-6 text-sm opacity-80">
              💡 Assumes constant inflation and returns for the full period.
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-linear-to-r from-blue-200 to-green-100 rounded-2xl shadow">
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

      {/* RELATED */}
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
            onClick={() => navigate("/calculator/inflation-calculator")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Inflation Calculator
          </button>
          <button
            onClick={() => navigate("/calculator/retirement-calculator")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Retirement Calculator
          </button>
          <button
            onClick={() => navigate("/calculator/nps-calculator")}
            className="bg-orange-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            NPS Calculator
          </button>
        </div>
      </div>

      <div className="pb-10" />
    </div>
  );
};

export default EducationCalculator;
