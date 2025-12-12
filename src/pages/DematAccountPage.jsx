import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DematAccountPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate()

  const faqs = [
    { q: 'What is a Demat account?', a: 'A Demat (Dematerialized) account holds your securities in electronic form, making buying, selling and managing shares simple and paperless.' },
    { q: 'Is opening a Demat account free?', a: 'Wealthcrop offers a free Demat account opening process (zero account opening charges). Some brokers may charge for annual maintenance — check the plan.' },
    { q: 'How long does it take to open?', a: 'Most accounts are opened within 24–72 hours after KYC documents are submitted and verified.' },
    { q: 'What documents are required?', a: 'PAN card, Aadhaar (or other identity proof), canceled cheque or bank details for linking, and a recent photograph.' },
    { q: 'Can I link multiple bank accounts?', a: 'Yes. You can link one or more bank accounts to enable seamless fund transfers and payouts.' },
    { q: 'Are my holdings safe?', a: 'Yes. Demat accounts are held with depositories (NSDL/CDSL) and Wealthcrop uses secure integration — your holdings are safe and regulated.' },
    { q: 'Can I transfer shares to another Demat?', a: 'Yes — you can transfer shares to another Demat using off-market transfer or by selling and buying via the exchange.' },
    { q: 'Does Demat support mutual funds and bonds?', a: 'Yes. Many mutual funds (ETF units) and bonds can be held in Demat form. Check specific instrument eligibility.' },
    { q: 'Is online trading enabled with Demat?', a: 'Yes. Demat + trading account enables online buy/sell of stocks and ETFs.' },
    { q: 'Who should open a Demat account?', a: 'Anyone planning to invest in stocks, ETFs, bonds or hold electronic securities should open a Demat account.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-12 mb-8">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight mb-3">Open a free Demat account</h1>
              <p className="text-lg text-blue-700 mb-6">Start investing in stocks, ETFs and more — paperless, secure and fast. Open your Demat account on <span className="font-semibold text-red-600">Wealthcrop</span> today.</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={()=> navigate("/signup")} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md">Open Free Demat</button>
                {/* <button className="px-6 py-3 bg-white text-blue-700 border border-blue-200 rounded-xl font-semibold hover:bg-blue-50">Learn More</button> */}
              </div>
            </div>

            <div className="md:w-80 mt-6 md:mt-0 ">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100 shadow-md">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Overview</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Instant electronic holdings</li>
                  <li>• Link bank for UPI / transfers</li>
                  <li>• Trusted & regulated custody</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to open */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">How to open</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li><span className="font-semibold">Start Application:</span> Click “Open Free Demat” and begin your application.</li>
              <li><span className="font-semibold">KYC:</span> Upload PAN, Aadhaar and a cancelled cheque or bank details.</li>
              <li><span className="font-semibold">e-Sign:</span> Complete e-Sign with Aadhaar OTP (paperless).</li>
              <li><span className="font-semibold">Verification:</span> We process and verify within 24–72 hours.</li>
              <li><span className="font-semibold">Account Ready:</span> Your Demat & trading credentials arrive via email/SMS.</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Documents required</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• PAN card (mandatory)</li>
              <li>• Aadhaar / other identity proof</li>
              <li>• Cancelled cheque / bank statement</li>
              <li>• Recent passport photo</li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-white border border-blue-100 shadow-sm">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Tip</h4>
              <p className="text-sm text-gray-600">Keep scanned copies of documents ready to speed up the process — mobile camera photos work fine.</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Benefits of opening Demat on Wealthcrop</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-blue-800 mb-2">Paperless & Fast</h4>
              <p className="text-gray-700 text-sm">Complete the account opening online with e-Sign and mobile KYC.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-red-700 mb-2">Low Fees</h4>
              <p className="text-gray-700 text-sm">Competitive brokerage & transparent charges — no hidden costs.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-purple-700 mb-2">Safe & Regulated</h4>
              <p className="text-gray-700 text-sm">Holdings are with registered depositories (NSDL/CDSL) and subject to regulation.</p>
            </div>
          </div>
        </div>

        {/* More info */}
        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Why Demat matters</h3>
          <p className="text-gray-700">Demat accounts remove paperwork, eliminate physical share certificates and reduce settlement risk. They make corporate actions (dividends, splits) seamless and faster.</p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-2xl border border-blue-100 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-4 py-4 flex justify-between items-center font-medium text-gray-800"
                >
                  {f.q}
                  <span className="text-xl">{openIndex === i ? '−' : '+'}</span>
                </button>

                {openIndex === i && (
                  <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
