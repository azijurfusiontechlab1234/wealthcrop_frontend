// src/pages/IpoDetails.jsx

import { useParams } from "react-router-dom";
import { ipoStaticData } from "./ipoData";
import IpoFaq from "./IpoFaq";

const safe = (x) => (x ? x : "–");

export default function IpoDetails() {
  const { ipoName } = useParams();
  const ipo = ipoStaticData;

  if (!ipo)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">IPO not found.</p>
      </div>
    );

  const showListing = ipo.status === "listed";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}
        <header className="bg-white rounded-2xl shadow-sm px-6 py-6 mb-8">
          <div className="flex justify-between items-start flex-col md:flex-row">

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{ipoName}</h1>
              <p className="text-sm text-slate-500 mt-1">{ipo.about?.parent}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  ipo.status === "open"
                    ? "bg-emerald-100 text-emerald-700"
                    : ipo.status === "upcoming"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {ipo.status}
              </span>
            </div>

            <div className="text-right mt-4 md:mt-0">
              <p className="text-xl font-bold text-slate-900">₹{ipo.minInvestment}</p>
              <p className="text-slate-500 text-sm">{ipo.shares} shares</p>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* SECTION — IPO HIGHLIGHTS */}
        {/* ========================================================= */}
        <Section title="IPO Highlights" bg="bg-blue-50">
          <HighlightGrid>
            <HighlightCard label="Price Band" value={safe(ipo.ipoDetails?.priceRange)} color="bg-sky-100" />
            <HighlightCard label="GMP (Unofficial)" value={safe(ipo.gmp || "Not available")} color="bg-emerald-100" />
            <HighlightCard label="Market Cap" value={safe(ipo.marketCap || "–")} color="bg-indigo-100" />
            <HighlightCard label="Risk Level" value={safe(ipo.riskRating || "Moderate")} color="bg-teal-100" />
          </HighlightGrid>
        </Section>

        {/* ========================================================= */}
        {/* SECTION — COMPANY METRICS */}
        {/* ========================================================= */}
        <Section title="Company Metrics" bg="bg-teal-50">
          <DetailGrid>
            <Detail label="Revenue" value={safe(ipo.metrics?.revenue)} />
            <Detail label="Profit" value={safe(ipo.metrics?.profit)} />
            <Detail label="EBITDA Margin" value={safe(ipo.metrics?.ebitda)} />
            <Detail label="RoCE" value={safe(ipo.metrics?.roce)} />
            <Detail label="Debt / Equity" value={safe(ipo.metrics?.debtEquity)} />
          </DetailGrid>
        </Section>

        {/* ========================================================= */}
        {/* SECTION — STRENGTHS & RISKS */}
        {/* ========================================================= */}
        <Section title="Strengths & Risks" bg="bg-slate-100">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white shadow-sm rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Strengths</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {(ipo.strengths || ["Growing sector", "Healthy balance sheet", "Strong promoter background"])
                  .map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Risks</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {(ipo.risks || ["Competitive pressure", "Input cost volatility", "Market cyclicality"])
                  .map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </div>

          </div>
        </Section>

        {/* ========================================================= */}
        {/* SECTION — VALUATION SNAPSHOT */}
        {/* ========================================================= */}
        <Section title="Valuation Snapshot" bg="bg-blue-50">
          <DetailGrid>
            <Detail label="PE Ratio" value={safe(ipo.valuation?.pe)} />
            <Detail label="Industry PE" value={safe(ipo.valuation?.industryPE)} />
            <Detail label="Valuation View" value={safe(ipo.valuation?.view || "Neutral")} />
          </DetailGrid>
        </Section>

        {/* ========================================================= */}
        {/* SECTION — QUOTA ALLOCATION */}
        {/* ========================================================= */}
        <Section title="Investor Quota Allocation" bg="bg-slate-100">
          <DetailGrid>
            <Detail label="Retail" value={safe(ipo.retailQuota)} />
            <Detail label="QIB" value={safe(ipo.qibQuota)} />
            <Detail label="NII" value={safe(ipo.niiQuota)} />
          </DetailGrid>
        </Section>

        {/* ========================================================= */}
        {/* SECTION — IPO DETAILS */}
        {/* ========================================================= */}
        <Section title="IPO Details" bg="bg-white">
          <DetailGrid>
            <Detail label="Bidding dates" value={safe(ipo.ipoDetails?.biddingDates)} />
            <Detail label="Lot size" value={safe(ipo.ipoDetails?.lotSize)} />
            <Detail label="Min Investment" value={safe(ipo.ipoDetails?.minInvestment)} />
            <Detail label="Issue Size" value={safe(ipo.ipoDetails?.issueSize)} />
            <Detail label="Face Value" value={safe(ipo.ipoDetails?.faceValue)} />
            <Detail label="Sector" value={safe(ipo.sector)} />

            {/* RHP Link */}
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500 mb-1">RHP Document</p>
              {ipo.ipoDetails?.rhp ? (
                <a href={ipo.ipoDetails.rhp} className="text-blue-700 text-sm font-semibold hover:underline">
                  View RHP ↗
                </a>
              ) : <p className="text-sm">–</p>}
            </div>

            <Detail label="Allotment" value={safe(ipo.ipoDetails?.allotmentDate)} />
            <Detail label="Listing Date" value={safe(ipo.ipoDetails?.listingDate)} />
          </DetailGrid>
        </Section>

        {/* FAQ */}
        <IpoFaq />
      </div>
    </div>
  );
}

/* ========================================================= */
/* SHARED COMPONENTS */
/* ========================================================= */

function Section({ children, title, bg }) {
  return (
    <section className={`rounded-2xl shadow-sm px-6 py-6 mb-10 ${bg}`}>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function HighlightGrid({ children }) {
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{children}</div>;
}

function HighlightCard({ label, value, color }) {
  return (
    <div className={`rounded-xl px-4 py-3 shadow-sm ${color}`}>
      <p className="text-xs text-slate-600">{label}</p>
      <p className="text-sm font-semibold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function DetailGrid({ children }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>;
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
