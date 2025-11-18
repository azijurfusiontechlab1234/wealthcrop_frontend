import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useParams } from "react-router-dom";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const FundDetails = () => {

    const {name} = useParams();

  // ---------------- Dummy Fund Data ----------------
  const fund = {
    name: "SBI Gold Direct Plan Growth",
    category: "Gold",
    risk: "Very High Risk",
    nav: 37.67,
    fundSize: "₹8,456 Cr",
    expense: "0.35%",
    minSip: 500,
    minLumpsum: 1000,
    // annualRates: expected average annual return (decimal). Replace with real rates.
    annualRates: {
      1: 0.10,   // 10% p.a. for 1 year
      3: 0.27,   // 27% p.a. (annualised) for 3 years
      5: 0.18,   // 18% p.a. for 5 years
    },
    holdings: [{ name: "SBI Gold ETF", asset: "Mutual Fund", weight: 100.18 }],
  };

  // ---------------- Chart (unchanged) ----------------
  const chartData = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [
      {
        data: Array.from({ length: 20 }, () => Math.random() * 100 + 100),
        borderColor: "#00A66C",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: { x: { display: true }, y: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  // ---------------- Calculator state ----------------
  const [mode, setMode] = useState("sip"); // "sip" or "lumpsum"
  const [sipAmt, setSipAmt] = useState(5000);
  const [lumpAmt, setLumpAmt] = useState(10000);
  const [duration, setDuration] = useState(1); // 1 / 3 / 5 years
  const [hour, setHour] = useState(1)
  const [value, setValue] = useState(null)

  // ---------------- Calculation helpers ----------------

  // Future value of monthly SIP (contributions at month-end, monthly compounding)
  // P = monthly contribution, r = annual rate (decimal), n = months
  function futureValueSIP(P, annualR, years) {
    const i = annualR / 12; // monthly rate
    const n = years * 12;
    if (i === 0) return P * n;
    const fv = P * (Math.pow(1 + i, n) - 1) / i; // ordinary annuity
    return fv;
  }

  // Future value of lumpsum: PV * (1 + r)^years
  function futureValueLumpsum(PV, annualR, years) {
    return PV * Math.pow(1 + annualR, years);
  }

  // percent gain = (FV - invested)/invested * 100
  function percentGain(fv, invested) {
    if (invested === 0) return 0;
    return ((fv - invested) / invested) * 100;
  }

  // ---------------- Compute dynamic results ----------------

  // pick annual rate based on current selected duration
  const annualR_for_duration = fund.annualRates[duration] ?? fund.annualRates[3];

  // SIP results
  const totalSIPInvested = sipAmt * 12 * duration;
  const sipFV = Math.round(futureValueSIP(sipAmt, annualR_for_duration, duration));
  const sipGainPct = percentGain(sipFV, totalSIPInvested);

  // Lumpsum results (we will show 1 / 3 / 5 year breakdown)
  const lumpResults = [1, 3, 5].map((yr) => {
    const r = fund.annualRates[yr] ?? fund.annualRates[3];
    const invested = lumpAmt;
    const fv = Math.round(futureValueLumpsum(lumpAmt, r, yr));
    const gainPct = percentGain(fv, invested);
    return { yr, invested, fv, gainPct, r };
  });

  // Also compute lumpsum current selected duration (for the single-result section)
  const selectedLumpRate = fund.annualRates[duration] ?? fund.annualRates[3];
  const lumpFV_selected = Math.round(futureValueLumpsum(lumpAmt, selectedLumpRate, duration));
  const lumpGainPct_selected = percentGain(lumpFV_selected, lumpAmt);
  const totalCost = percentGain(1,2);
  const totalLoss = 100;

  // ---------------- Render ----------------
  return (
    <div className="w-full bg-white text-[#1A1A1A] py-5 px-15">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-blue-900">{name}</h1>
      <div className="flex gap-3 mt-2">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{fund.category}</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{fund.risk}</span>
      </div>
    
      {/* Chart */}
      <div className="mt-6 w-[70%] h-60">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="flex gap-18 mt-5 items-center">
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 text-xs font-semibold">1D</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300  p-2 text-xs font-semibold">1W</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300  font-semibold text-xs ">1M</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold text-xs ">6M</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold text-xs ">1Y</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold text-xs ">3Y</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold text-xs ">5Y</span>
        <span className="w-10 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold text-xs ">ALL</span>
      </div>

      {/* Return calculator (Groww style) */}
      <div className="mt-10 border border-gray-200 rounded-xl p-5 max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">Return calculator</h2>

        {/* Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("sip")}
            className={`px-4 py-2 rounded-full border ${
              mode === "sip" ? "bg-[#00A66C] text-white border-[#00A66C]" : "bg-white"
            }`}
          >
            Monthly SIP
          </button>

          <button
            onClick={() => setMode("lumpsum")}
            className={`px-4 py-2 rounded-full border ${
              mode === "lumpsum" ? "bg-[#00A66C] text-white border-[#00A66C]" : "bg-white"
            }`}
          >
            One-Time
          </button>
        </div>

        {/* SIP Mode */}
        {mode === "sip" && (
          <>
            <p className="font-semibold">₹{sipAmt.toLocaleString()} per month</p>

            {/* slider with step 500 */}
            <input
              type="range"
              min={fund.minSip}
              max={50000}
              step={500}
              value={sipAmt}
              onChange={(e) => setSipAmt(Number(e.target.value))}
              className="w-full mt-3"
            />

            {/* period buttons */}
            <div className="flex gap-3 mt-6">
              {[1, 3, 5].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setDuration(yr)}
                  className={`px-4 py-2 rounded-full border ${
                    duration === yr ? "border-[#00A66C] bg-[#E6F8F1]" : "bg-white"
                  }`}
                >
                  {yr} year
                </button>
              ))}
            </div>

            {/* result */}
            <div className="mt-6 border-t pt-4 text-sm">
              <p>Total investment of ₹{totalSIPInvested.toLocaleString()}</p>

              <p className="font-semibold mt-2">
                Would have become{" "}
                <span className="text-[#00A66C]">
                  ₹{sipFV.toLocaleString()} ({sipGainPct.toFixed(2)}%)
                </span>
              </p>
            </div>
          </>
        )}

        {/* Lumpsum Mode */}
        {mode === "lumpsum" && (
          <>
            <p className="font-semibold">₹{lumpAmt.toLocaleString()}</p>

            {/* slider */}
            <input
              type="range"
              min={fund.minLumpsum}
              max={200000}
              step={500}
              value={lumpAmt}
              onChange={(e) => setLumpAmt(Number(e.target.value))}
              className="w-full mt-3"
            />

            {/* year buttons */}
            <div className="flex gap-3 mt-6">
              {[1, 3, 5].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setDuration(yr)}
                  className={`px-4 py-2 rounded-full border ${
                    duration === yr ? "border-[#00A66C] bg-[#E6F8F1]" : "bg-white"
                  }`}
                >
                  {yr} years
                </button>
              ))}
            </div>

            {/* selected duration result */}
            <div className="mt-6 border-t pt-4 text-sm">
              <p>Investment of ₹{lumpAmt.toLocaleString()}</p>

              <p className="font-semibold mt-2">
                Would have become{" "}
                <span className="text-[#00A66C]">
                  ₹{lumpFV_selected.toLocaleString()} ({(lumpGainPct_selected * 100).toFixed(2)}%)
                </span>
              </p>

              {/* show 1/3/5 breakdown */}
              <div className="mt-4">
                <p className="text-gray-600 mb-2 font-medium">Breakdown</p>
                {lumpResults.map((res) => (
                  <div key={res.yr} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                    <div>
                      <div className="font-medium">{res.yr} year</div>
                      <div className="text-gray-500">Annual rate: {(res.r * 100).toFixed(2)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{res.fv.toLocaleString()}</div>
                      <div className="text-green-600">{(res.gainPct * 100).toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Additional information (below) */}
      <div className="mt-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">Fund Information</h2>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div>
            <p className="text-gray-500">NAV</p>
            <p className="font-semibold">₹{fund.nav}</p>
          </div>

          <div>
            <p className="text-gray-500">Fund Size</p>
            <p className="font-semibold">{fund.fundSize}</p>
          </div>

          <div>
            <p className="text-gray-500">Expense Ratio</p>
            <p className="font-semibold">{fund.expense}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-semibold">{fund.category}</p>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="mt-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">Holdings</h2>
        {fund.holdings.map((h, i) => (
          <div key={i} className="flex justify-between py-3 border-b border-[#E5E5E5]">
            <div>
              <p className="font-medium">{h.name}</p>
              <p className="text-gray-500 text-sm">{h.asset}</p>
            </div>
            <p className="font-semibold">{h.weight}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundDetails;
