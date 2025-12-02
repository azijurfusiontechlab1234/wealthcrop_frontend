import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApyCalculator = () => {
  const navigate = useNavigate();

  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const validateInputs = () => {
    if (!monthlyContribution || !interestRate || !years) {
      alert("Please fill all fields.");
      return false;
    }
    if (monthlyContribution <= 0 || interestRate <= 0 || years <= 0) {
      alert("Values must be greater than zero.");
      return false;
    }
    return true;
  };

  const calculateAPY = () => {
    if (!validateInputs()) return;

    const P = Number(monthlyContribution);
    const r = Number(interestRate) / 100 / 12;
    const n = Number(years) * 12;

    // Compound interest with monthly contribution formula
    const maturity = P * ((Math.pow(1 + r, n) - 1) / r);
    const totalDeposit = P * n;
    const interestEarned = maturity - totalDeposit;

    setResult({
      maturity: maturity.toFixed(0),
      interestEarned: interestEarned.toFixed(0),
      totalDeposit: totalDeposit.toFixed(0),
    });
  };

  const faqs = [
    { q: "What is APY?", a: "APY stands for Atal Pension Yojana, a pension scheme by the Government of India." },
    { q: "How much pension will I get?", a: "You can receive a pension of ₹1,000 to ₹5,000 per month after age 60 depending on contribution." },
    { q: "Is APY guaranteed?", a: "Yes, pension is guaranteed by the Government of India." },
    { q: "Can I exit APY early?", a: "Exit is allowed only for exceptional cases such as death or terminal illness." },
    { q: "Is APY tax exempt?", a: "Contributions may qualify for deductions under section 80CCD." },
    { q: "What affects APY contribution?", a: "Your entry age and chosen pension amount determines your monthly contribution." },
    { q: "Who can open APY?", a: "Any Indian citizen aged 18-40 with a bank account." },
    { q: "Is APY helpful for yearly investment?", a: "Yes if you invest through APY it will help you in future. "},
    { q: "How much should i invest yearly?", a: "You should invest more than 20,000 yearly."}
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 to-green-100">

      {/* HEADER */}
      <div className="py-14 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400 drop-shadow-lg">
          APY Calculator 📅
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg">
          Estimate your Atal Pension Yojana maturity and benefits instantly.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-200">

          {/* LEFT INPUTS */}
          <div className="p-8 bg-linear-to-br from-blue-50 to-cyan-100">
            <h2 className="text-2xl font-bold text-cyan-700 mb-6">Enter Details</h2>

            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="Ex: 500"
                  className="w-full border border-cyan-300 p-2 rounded-lg bg-white/80 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Ex: 8"
                  className="w-full border border-cyan-300 p-2 rounded-lg bg-white/80 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="Ex: 20"
                  className="w-full border border-cyan-300 p-2 rounded-lg bg-white/80 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <button
                onClick={calculateAPY}
                className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-bold text-sm transition"
              >
                Calculate APY
              </button>

            </div>
          </div>

          {/* RIGHT RESULT */}
          <div className="p-8 bg-linear-to-br from-blue-600 to-cyan-500 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📊 APY Summary</h3>

            {result ? (
              <div className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-sm">
                <p className="text-lg">
                  <strong>Maturity Amount:</strong> ₹{Number(result.maturity).toLocaleString()}
                </p>
                <p className="text-lg mt-2">
                  <strong>Total Deposit:</strong> ₹{Number(result.totalDeposit).toLocaleString()}
                </p>
                <p className="text-lg mt-2">
                  <strong>Interest Earned:</strong> ₹{Number(result.interestEarned).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="opacity-95">Fill details to calculate APY.</p>
            )}

            <p className="mt-6 text-sm opacity-90">
              💡 APY ensures guaranteed pension for your retirement life.
            </p>
          </div>

        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-linear-to-r from-blue-200 to-green-100 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQ — APY</h2>

        {faqs.map((item, index) => (
          <div key={index} className="border-b py-3">
            <button
              className="w-full flex justify-between items-center text-left text-gray-700 font-medium"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>

        <div className="flex gap-4 flex-wrap">
          <button onClick={() => navigate("/calculator/emi-calculator")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">EMI Calculator</button>
          <button onClick={() => navigate("/calculator/swp-calculator")} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">SWP Calculator</button>
          <button onClick={() => navigate("/calculator/lumpsum-calculator")} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow">Lumpsum Calculator</button>
          <button onClick={() => navigate("/calculator/ppf-calculator")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">PPF Calculator</button>
        </div>
      </div>

      <div className="pb-10"></div>
    </div>
  );
};

export default ApyCalculator;
