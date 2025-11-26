import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FDCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const calculateFD = () => {
    if (!amount || !rate || !years) return;
    const maturity = amount * Math.pow(1 + rate / 100, years);
    const interest = maturity - amount;
    setResult({
      maturity: maturity.toFixed(2),
      interest: interest.toFixed(2),
    });
  };

  const faqs = [
    {
      q: "What is a Fixed Deposit?",
      a: "A fixed deposit (FD) is a secure investment option where money is deposited for a fixed tenure at a fixed interest rate.",
    },
    {
      q: "What is the lock-in period of an FD?",
      a: "Most FDs have no lock-in except tax-saving FDs which have a 5-year lock-in.",
    },
    {
      q: "What is the minimum investment to open an FD?",
      a: "Minimum investment usually starts from ₹1,000 depending on the bank.",
    },
    {
      q: "What are the tax implications of an FD?",
      a: "FD interest is taxable and TDS is deducted if annual interest exceeds ₹40,000.",
    },
    {
      q: "What happens if I break my FD early?",
      a: "Banks may charge a penalty of 0.5% to 1% on premature withdrawal.",
    },
    ];
    
     const navigate = useNavigate();
     const handleRedirect = (url) => {
       navigate(url);
     };

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-r from-blue-100 to-green-100">
      {/* 🔷 FIXED DEPOSIT CALCULATOR HEADER */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 py-14 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow">
          Fixed Deposit Calculator
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg leading-relaxed">
          A Fixed Deposit (FD) is one of the safest and most popular investment
          options. It allows you to deposit a lump sum amount at a fixed
          interest rate for a specific tenure. Use this FD Calculator to
          estimate your maturity amount and interest earnings based on your
          investment, interest rate, and tenure.
        </p>
      </div>

      {/* 🔷 FD CALCULATOR MAIN BOX */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-200">
          {/* LEFT SIDE */}
          <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Enter Your FD Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Deposit Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full border border-blue-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 7.5"
                  className="w-full border border-blue-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Time (Years)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 5"
                  className="w-full border border-blue-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <button
                onClick={calculateFD}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📊 FD Result Summary</h3>

            {result ? (
              <div className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-md">
                <p className="text-lg">
                  <strong>Maturity Amount:</strong> ₹{result.maturity}
                </p>
                <p className="text-lg mt-1">
                  <strong>Interest Earned:</strong> ₹{result.interest}
                </p>
              </div>
            ) : (
              <p className="opacity-90">
                Enter details and click calculate to view results.
              </p>
            )}

            <div className="mt-8 text-sm opacity-90">
              💡 The calculation is based on yearly compounding interest.
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow bg-gradient-to-r from-blue-200 to-green-100">
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
              <p className="mt-2 text-gray-600">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* 🔷 RELATED CALCULATORS */}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Related Calculators
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => handleRedirect("/sip_cal")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Compound Interest Calculator
          </button>

          <button
            onClick={() => handleRedirect("/sip_cal")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Simple Interest Calculator
          </button>

          <button
            onClick={() => handleRedirect("/sip_cal")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          >
            SIP Calculator
          </button>

          <button
            onClick={() => handleRedirect("/sip_cal")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Gratuity Calculator
          </button>
        </div>
      </div>

      <div className="pb-10"></div>
    </div>
  );
};

export default FDCalculator;
