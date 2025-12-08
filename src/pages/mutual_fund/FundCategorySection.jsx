import React from "react";
import { useParams } from "react-router-dom";

/* ---------------------------------------------
   DEMO FUND DATA FOR ALL COLLECTIONS
--------------------------------------------- */
const FUND_DATA_BY_CATEGORY = {
  "high-return": [
    {
      id: 1,
      name: "HDFC Silver ETF FoF Direct Growth",
      subType: "Commodities • Silver",
      logoText: "H",
      logoBg: "bg-red-100",
      rating: 4,
      risk: "High",
      returns: { "1Y": 91.51, "3Y": 37.41, "5Y": null },
    },
    {
      id: 2,
      name: "Axis Silver FoF Direct Growth",
      subType: "Commodities • Silver",
      logoText: "A",
      logoBg: "bg-pink-100",
      rating: 4,
      risk: "High",
      returns: { "1Y": 90.16, "3Y": 36.87, "5Y": null },
    },
    {
      id: 3,
      name: "Quant Small Cap Fund Direct Growth",
      subType: "Equity • Small Cap",
      logoText: "Q",
      logoBg: "bg-purple-100",
      rating: 5,
      risk: "High",
      returns: { "1Y": 42.8, "3Y": 34.1, "5Y": 27.5 },
    },
  ],

  "gold-funds": [
    {
      id: 4,
      name: "Nippon India Gold Savings Fund Direct",
      subType: "Commodities • Gold",
      logoText: "N",
      logoBg: "bg-yellow-200",
      rating: 4,
      risk: "Moderate",
      returns: { "1Y": 19.7, "3Y": 12.3, "5Y": 11.2 },
    },
    {
      id: 5,
      name: "Kotak Gold Fund Direct Growth",
      subType: "Commodities • Gold",
      logoText: "K",
      logoBg: "bg-amber-200",
      rating: 4,
      risk: "Moderate",
      returns: { "1Y": 18.9, "3Y": 11.8, "5Y": 10.5 },
    },
  ],

  "5-star-funds": [
    {
      id: 6,
      name: "Parag Parikh Flexi Cap Fund Direct",
      subType: "Equity • Flexi Cap",
      logoText: "P",
      logoBg: "bg-blue-100",
      rating: 5,
      risk: "Moderate",
      returns: { "1Y": 32.1, "3Y": 22.8, "5Y": 20.4 },
    },
    {
      id: 7,
      name: "Mirae Asset Emerging Bluechip Direct",
      subType: "Equity • Large & Mid Cap",
      logoText: "M",
      logoBg: "bg-indigo-100",
      rating: 5,
      risk: "Moderate",
      returns: { "1Y": 29.4, "3Y": 24.7, "5Y": 18.1 },
    },
  ],

  "large_cap": [
    {
      id: 8,
      name: "SBI Bluechip Fund Direct Growth",
      subType: "Equity • Large Cap",
      logoText: "S",
      logoBg: "bg-indigo-100",
      rating: 4,
      risk: "Low",
      returns: { "1Y": 16.2, "3Y": 14.1, "5Y": 12.8 },
    },
    {
      id: 9,
      name: "ICICI Prudential Bluechip Fund Direct",
      subType: "Equity • Large Cap",
      logoText: "I",
      logoBg: "bg-cyan-100",
      rating: 5,
      risk: "Low",
      returns: { "1Y": 18.4, "3Y": 15.8, "5Y": 13.9 },
    },
  ],

  "mid_cap": [
    {
      id: 10,
      name: "Kotak Emerging Equity Fund Direct",
      subType: "Equity • Mid Cap",
      logoText: "K",
      logoBg: "bg-green-100",
      rating: 4,
      risk: "Moderate",
      returns: { "1Y": 27.1, "3Y": 20.3, "5Y": 16.5 },
    },
    {
      id: 11,
      name: "Axis Midcap Fund Direct",
      subType: "Equity • Mid Cap",
      logoText: "A",
      logoBg: "bg-teal-100",
      rating: 4,
      risk: "High",
      returns: { "1Y": 24.8, "3Y": 18.7, "5Y": 15.1 },
    },
  ],

  "small_cap": [
    {
      id: 12,
      name: "Quant Small Cap Fund Direct",
      subType: "Equity • Small Cap",
      logoText: "Q",
      logoBg: "bg-red-200",
      rating: 5,
      risk: "High",
      returns: { "1Y": 42.8, "3Y": 34.1, "5Y": 27.5 },
    },
    {
      id: 13,
      name: "Axis Small Cap Fund Direct",
      subType: "Equity • Small Cap",
      logoText: "A",
      logoBg: "bg-pink-200",
      rating: 4,
      risk: "High",
      returns: { "1Y": 38.4, "3Y": 30.2, "5Y": 24.7 },
    },
  ],
};

/* ---------------------------------------------
   SUBTITLES FOR ALL COLLECTIONS
--------------------------------------------- */
const CATEGORY_META = {
  "high-return": { subtitle: "Funds with highest historical returns." },
  "gold-funds": { subtitle: "Funds investing in Gold ETFs and gold assets." },
  "5-star-funds": { subtitle: "Top-rated mutual funds with 5-star rating." },
  "large_cap": { subtitle: "Stable bluechip companies with lower risk." },
  "mid_cap": { subtitle: "Funds investing in fast-growing mid-sized companies." },
  "small_cap": { subtitle: "High-growth potential small cap companies." },
};

// Convert slug → Title Case (handles "-" and "_")
const humanize = (slug = "") =>
  slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const Stars = ({ rating }) => (
  <span className="text-[11px] text-amber-500">
    {"★".repeat(rating)}
    <span className="text-slate-300">{"☆".repeat(5 - rating)}</span>
  </span>
);

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

const FundCategorySection = () => {
  const { categorySlug } = useParams();

  const title = humanize(categorySlug);
  const subtitle = CATEGORY_META[categorySlug]?.subtitle || "";

  const funds = FUND_DATA_BY_CATEGORY[categorySlug] || [];
  const periods = ["1Y", "3Y", "5Y"];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">

      {/* Title + Subtitle */}
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      )}

      <div className="space-y-2 mt-4">
        {funds.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
          >
            {/* LEFT: Fund Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold ${f.logoBg}`}>
                {f.logoText}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{f.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{f.subType}</p>
                <div className="mt-1 flex gap-2 text-[11px]">
                  <Stars rating={f.rating} />
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                    Risk : {f.risk}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Returns */}
            <div className="flex items-center gap-6 text-sm text-right">
              {periods.map((p) => {
                const val = f.returns[p];
                return (
                  <div key={p}>
                    <p className="text-[11px] text-slate-500">{p}</p>
                    {val == null ? (
                      <p className="text-slate-400">--</p>
                    ) : (
                      <p className={`font-medium ${val >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {val > 0 ? "+" : ""}
                        {val.toFixed(2)}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundCategorySection;
