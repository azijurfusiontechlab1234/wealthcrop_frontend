import React, { useMemo, useState } from "react";

const IPO_DUMMY_DATA = [
  {
    id: 1,
    name: "ABC Technologies Ltd",
    symbol: "ABC",
    logoInitial: "A",
    logoBg: "bg-indigo-100",
    marketType: "MAINBOARD",
    status: "OPEN",
    openDate: "10 Dec 2025",
    closeDate: "12 Dec 2025",
    listingDate: "18 Dec 2025",
    issuePrice: "₹95 - ₹100",
    faceValue: "₹10",
    lotSize: 150,
    subscription: "3.25x",
  },
  {
    id: 2,
    name: "Bright Retail India Ltd",
    symbol: "BRIGHT",
    logoInitial: "B",
    logoBg: "bg-emerald-100",
    marketType: "SME",
    status: "OPEN",
    openDate: "9 Dec 2025",
    closeDate: "11 Dec 2025",
    listingDate: "17 Dec 2025",
    issuePrice: "₹55 - ₹60",
    faceValue: "₹10",
    lotSize: 2000,
    subscription: "1.78x",
  },
  {
    id: 3,
    name: "Crown Infra Projects Ltd",
    symbol: "CROWN",
    logoInitial: "C",
    logoBg: "bg-yellow-100",
    marketType: "MAINBOARD",
    status: "CLOSED",
    openDate: "2 Dec 2025",
    closeDate: "5 Dec 2025",
    listingDate: "10 Dec 2025",
    issuePrice: "₹150",
    faceValue: "₹10",
    lotSize: 100,
    subscription: "12.5x",
  },
  {
    id: 4,
    name: "Delta Foods & Beverages Ltd",
    symbol: "DELTA",
    logoInitial: "D",
    logoBg: "bg-red-100",
    marketType: "SME",
    status: "CLOSED",
    openDate: "28 Nov 2025",
    closeDate: "30 Nov 2025",
    listingDate: "6 Dec 2025",
    issuePrice: "₹80",
    faceValue: "₹10",
    lotSize: 1600,
    subscription: "5.2x",
  },
  {
    id: 5,
    name: "Evergreen Logistics Ltd",
    symbol: "EGL",
    logoInitial: "E",
    logoBg: "bg-blue-100",
    marketType: "MAINBOARD",
    status: "UPCOMING",
    openDate: "20 Dec 2025",
    closeDate: "23 Dec 2025",
    listingDate: "30 Dec 2025",
    issuePrice: "₹120 - ₹126",
    faceValue: "₹10",
    lotSize: 120,
    subscription: "--",
  },
  {
    id: 6,
    name: "Future Fintech Services Ltd",
    symbol: "FFS",
    logoInitial: "F",
    logoBg: "bg-pink-100",
    marketType: "SME",
    status: "UPCOMING",
    openDate: "22 Dec 2025",
    closeDate: "24 Dec 2025",
    listingDate: "31 Dec 2025",
    issuePrice: "₹65 - ₹70",
    faceValue: "₹10",
    lotSize: 1000,
    subscription: "--",
  },
];

const IpoDashboardPage = () => {
  const [marketFilter, setMarketFilter] = useState("ALL"); //All / Mainboard/ SME
  const [statusFilter, setStatusFilter] = useState("OPEN");  //Open / closed / upcoming
  const [search, setSearch] = useState(""); // ✅ NEW SEARCH STATE

  // Filter IPOs
  const filteredIpos = useMemo(() => {
    return IPO_DUMMY_DATA.filter((ipo) => {
      const marketMatch =
        marketFilter === "ALL" ? true : ipo.marketType === marketFilter;

      const statusMatch = ipo.status === statusFilter;

      const searchMatch =
        ipo.name.toLowerCase().includes(search.toLowerCase()) ||
        ipo.symbol.toLowerCase().includes(search.toLowerCase());

      return marketMatch && statusMatch && searchMatch; // ⭐ search applied
    });
  }, [marketFilter, statusFilter, search]);

  // Summary
  const summary = useMemo(() => {
    const openCount = IPO_DUMMY_DATA.filter((i) => i.status === "OPEN").length;
    const oldCounr = IPO_DUMMY_DATA.filter((i)=> i.status === "old").length;
    const closedCount = IPO_DUMMY_DATA.filter((i) => i.status === "CLOSED").length;
    const upcomingCount = IPO_DUMMY_DATA.filter((i) => i.status === "UPCOMING").length;
    return { openCount, closedCount, upcomingCount };
  }, []);

  const statusLabelMap = {
    OPEN: "Open IPOs",
    CLOSED: "Closed IPOs",
    UPCOMING: "Upcoming IPOs",
  };

  const statusBadgeClass = (status) => {
    if (status === "OPEN") return "bg-emerald-100 text-emerald-700";
    if (status === "OLD") return "bg-amber-100 text-amber-700";
    if (status === "CLOSED") return "bg-slate-100 text-slate-700";
    if (status === "UPCOMING") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-6">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-900">IPO Dashboard</h1>
          {/* <p className="text-xs text-slate-500">Markets / IPO</p> */}
        </div>

        {/* ✅ SEARCH BAR (ONLY NEW UI) */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search IPO by name or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 w-full max-w-xs rounded-xl border border-slate-300 bg-white text-xs outline-none"
          />
        </div>

        {/* Top filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-2 text-xs font-medium bg-slate-100 rounded-2xl p-1">
            {["ALL", "MAINBOARD", "SME"].map((item) => (
              <button
                key={item}
                onClick={() => setMarketFilter(item)}
                className={`px-3 py-1.5 rounded-xl ${
                  marketFilter === item ? "bg-slate-900 text-white" : "text-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Open IPOs</span>
              {/* <span className="font-semibold">{summary.openCount}</span> */}
              <span className="font-semibold">{summary.openCount}</span>
            </div>
            <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              <span>Closed</span>
              <span className="font-semibold">{summary.closedCount}</span>
            </div>
            <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Upcoming</span>
              {/* <span className="font-semibold">{summary.upcomingCount}</span> */}
              <span className="font-semibold">{summary.upcomingCount}</span>
            </div>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 text-xs font-medium border-b border-slate-200">
            {["OPEN", "CLOSED", "UPCOMING"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`pb-2 px-1 mr-3 border-b-2 ${
                  statusFilter === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-slate-500">
            Showing {filteredIpos.length} {statusLabelMap[statusFilter]}
          </p>
        </div>

        {/* Table container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-[11px] font-medium text-slate-500">
              <tr>
                <th className="text-left px-4 py-2">Company</th>

                {statusFilter === "CLOSED" ? (
                  <>
                    <th className="text-right px-4 py-2">Close date</th>
                    <th className="text-right px-4 py-2">Listing date</th>
                    <th className="text-right px-4 py-2">Issue price</th>
                    <th className="text-right px-4 py-2">Overall subscription</th>
                  </>
                ) : statusFilter === "OPEN" ? (
                  <>
                    <th className="text-right px-4 py-2">Open - Close</th>
                    <th className="text-right px-4 py-2">Issue price</th>
                    <th className="text-right px-4 py-2">Lot size</th>
                    <th className="text-right px-4 py-2">Subscription</th>
                  </>
                ) : (
                  <>
                    <th className="text-right px-4 py-2">Open - Close</th>
                    <th className="text-right px-4 py-2">Listing date</th>
                    <th className="text-right px-4 py-2">Issue price</th>
                    <th className="text-right px-4 py-2">Type</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredIpos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    No IPOs match your search.
                  </td>
                </tr>
              ) : (
                filteredIpos.map((ipo) => (
                  <tr
                    key={ipo.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    {/* Company column */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-bold ${ipo.logoBg}`}
                        >
                          {ipo.logoInitial}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{ipo.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {ipo.symbol} • {ipo.marketType}
                          </p>
                          <span
                            className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] ${statusBadgeClass(
                              ipo.status
                            )}`}
                          >
                            {ipo.status === "OPEN"
                              ? "Open for subscription"
                              : ipo.status === "CLOSED"
                              ? "Closed"
                              : "Upcoming"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Other columns */}
                    {statusFilter === "OPEN" && (
                      <>
                        <td className="text-right px-4 py-3">
                          {ipo.openDate} - {ipo.closeDate}
                        </td>
                        <td className="text-right px-4 py-3">{ipo.issuePrice}</td>
                        <td className="text-right px-4 py-3">{ipo.lotSize}</td>
                        <td className="text-right px-4 py-3 text-emerald-600 font-medium">
                          {ipo.subscription}
                        </td>
                      </>
                    )}

                    {statusFilter === "CLOSED" && (
                      <>
                        <td className="text-right px-4 py-3">{ipo.closeDate}</td>
                        <td className="text-right px-4 py-3">{ipo.listingDate}</td>
                        <td className="text-right px-4 py-3">{ipo.issuePrice}</td>
                        <td className="text-right px-4 py-3 text-emerald-600 font-medium">
                          {ipo.subscription}
                        </td>
                      </>
                    )}

                    {statusFilter === "UPCOMING" && (
                      <>
                        <td className="text-right px-4 py-3">
                          {ipo.openDate} - {ipo.closeDate}
                        </td>
                        <td className="text-right px-4 py-3">{ipo.listingDate}</td>
                        <td className="text-right px-4 py-3">{ipo.issuePrice}</td>
                        <td className="text-right px-4 py-3">
                          {ipo.marketType}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IpoDashboardPage;
