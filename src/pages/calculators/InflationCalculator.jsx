import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InflationCalculator = () => {
  const [currentPrice, setCurrentPrice] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const navigate = useNavigate();

  const calculateInflation = () => {
    if (!currentPrice || !inflationRate || !years) return;

    const inflation = inflationRate / 100;
    const futureValue = currentPrice * Math.pow(1 + inflation, years);

    setResult({
      futurePrice: futureValue.toFixed(0),
    });
  };

  const faqs = [
    {
      q: "What is an Inflation Calculator?",
      a: "It helps estimate how much a product or service will cost in the future because of inflation.",
    },
    {
      q: "Why should I calculate inflation?",
      a: "Inflation reduces purchasing power, so knowing future prices helps in budgeting and financial planning.",
    },
    {
      q: "What inflation rate should I use?",
      a: "For India, the long-term average inflation is around 5–6%.",
    },
    {
      q: "Does inflation affect long-term goals?",
      a: "Yes, inflation significantly impacts goals like retirement, education, and housing.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 to-green-100">
      {/* HEADER */}
      <div className=" py-14 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 drop-shadow">
          Inflation Calculator 📈💸
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg leading-relaxed">
          Estimate the future cost of goods and services based on inflation.
          Understand how rising prices impact your savings and purchasing power.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-200">
          
          {/* LEFT INPUT SECTION */}
          <div className="p-8 bg-linear-to-br from-yellow-50 to-white">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Current Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 1000"
                  className="w-full border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Inflation Rate (%)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 6"
                  className="w-full border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Years After
                </label>
                <input
                  type="number"
                  placeholder="Ex: 10"
                  className="w-full border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <button
                onClick={calculateInflation}
                className="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-bold text-sm transition"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* RIGHT RESULT SECTION */}
          <div className="p-8 bg-linear-to-br from-orange-600 to-red-600 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📊 Inflation Summary</h3>

            {result ? (
              <div className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-md">
                <p className="text-lg">
                  <strong>Future Price:</strong> ₹
                  {Number(result.futurePrice).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="opacity-90">
                Enter details and click calculate to view results.
              </p>
            )}

            <div className="mt-8 text-sm opacity-90">
              💡 Inflation compounds yearly and increases future prices.
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

      {/* RELATED CALCULATORS */}
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

export default InflationCalculator;
