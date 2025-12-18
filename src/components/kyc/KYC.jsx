// Premium, long-form KYC flow (Groww-style)
// ✔ Compact steps + ✔ Left gradient illustration + ✔ Dark mode polish
// ✔ State management for all steps + ✔ Final API submit

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Upload, FileText, Video, ShieldCheck, Lock } from "lucide-react";

const steps = ["PAN", "Personal", "Bank", "Docs", "Video", "Review"];

export default function KYCFlow() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 CENTRAL KYC STATE
  const [kycData, setKycData] = useState({
    pan: "",
    dob: "",
    name: "",
    occupation: "",
    income: "",
    city: "",
    accountNo: "",
    ifsc: "",
    document: null,
    video: null,
  });

  const update = (key, value) =>
    setKycData((prev) => ({ ...prev, [key]: value }));

  // 🚀 FINAL SUBMIT
  const submitKYC = async () => {
    setSubmitting(true);
    try {
      // Replace with real API
      await new Promise((r) => setTimeout(r, 2000));
      console.log("KYC SUBMITTED", kycData);
      setStep(5);
    } catch (e) {
      alert("KYC submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] flex flex-col items-center px-4 py-10">

      {/* TOP INFO */}
      <div className="max-w-5xl w-full mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-950 dark:text-white">
          Complete your KYC
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          One-time secure verification to start investing
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-blue-950 to-indigo-900 text-white">
          <div>
            <h2 className="text-xl font-semibold mb-2">Why KYC?</h2>
            <p className="text-sm text-blue-100">
              Required by SEBI to keep your investments safe.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i <= step ? "bg-white text-blue-950" : "bg-white/30"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${i === step ? "font-medium" : "opacity-70"}`}>{s}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-blue-200 space-y-2 mt-2">
            <p className="flex items-center gap-2"><ShieldCheck size={14}/> SEBI compliant</p>
            <p className="flex items-center gap-2"><Lock size={14}/> Bank-grade encryption</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 md:p-8">

          {/* Mobile step bar */}
          <div className="flex md:hidden mb-4">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 mx-0.5 rounded ${i <= step ? "bg-blue-900" : "bg-gray-200"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <PANStep data={kycData} onChange={update} />}
              {step === 1 && <PersonalStep data={kycData} onChange={update} />}
              {step === 2 && <BankStep data={kycData} onChange={update} />}
              {step === 3 && <DocsStep data={kycData} onChange={update} />}
              {step === 4 && <VideoKYCStep data={kycData} onChange={update} />}
              {step === 5 && <ReviewStep />}
            </motion.div>
          </AnimatePresence>

          {/* FOOTER */}
          {step < 5 && (
            <div className="flex justify-between mt-6">
              <button
  disabled={step === 0}
  onClick={() => setStep(step - 1)}
  className="
    text-sm px-4 py-2 rounded-lg
    border border-gray-300 dark:border-white/10
    text-gray-700 dark:text-gray-300
    bg-white dark:bg-transparent
    hover:bg-gray-100 dark:hover:bg-white/5
    disabled:opacity-40 disabled:cursor-not-allowed
    transition
  "
>
  Back
</button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="text-sm px-5 py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-900"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submitKYC}
                  disabled={submitting}
                  className="text-sm px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  {submitting ? "Submitting..." : "Submit KYC"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TRUST SECTION */}
      <div className="max-w-5xl w-full mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <TrustCard title="Secure" desc="256-bit encrypted data" />
        <TrustCard title="Fast" desc="KYC in under 5 minutes" />
        <TrustCard title="Trusted" desc="Used by 1M+ investors" />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
     <input
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder={placeholder}
  className="
    w-full px-3 py-2 rounded-lg border
    border-gray-300 dark:border-white/10
    bg-white dark:bg-[#0b1220]
    text-sm text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:ring-1 focus:ring-blue-800 outline-none
  "
/>

    </div>
  );
}

function PANStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">PAN Verification</h2>
      <Field label="PAN Number" value={data.pan} onChange={(v) => onChange("pan", v.toUpperCase())} placeholder="ABCDE1234F" />
      <Field label="Date of Birth" value={data.dob} onChange={(v) => onChange("dob", v)} placeholder="DD/MM/YYYY" />
    </div>
  );
}

function PersonalStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Personal Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full Name" value={data.name} onChange={(v) => onChange("name", v)} placeholder="As per PAN" />
        <Field label="Occupation" value={data.occupation} onChange={(v) => onChange("occupation", v)} placeholder="Salaried" />
        <Field label="Income" value={data.income} onChange={(v) => onChange("income", v)} placeholder="₹5–10 L" />
        <Field label="City" value={data.city} onChange={(v) => onChange("city", v)} placeholder="Mumbai" />
      </div>
    </div>
  );
}

function BankStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Bank Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Account No" value={data.accountNo} onChange={(v) => onChange("accountNo", v)} placeholder="XXXXXXXX" />
        <Field label="IFSC" value={data.ifsc} onChange={(v) => onChange("ifsc", v)} placeholder="SBIN0000" />
      </div>
    </div>
  );
}

function DocsStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Documents</h2>
      <label className="
      flex items-center justify-between gap-3 border border-dashed rounded-xl p-4 cursor-pointer border-gray-300
      dark:border-white/10 bg-gray-50 dark:bg-white/5 hove:bg-gray-100 dark:hover:bg-white/10 transition
      ">
        <div className="flex items-center gap-3 dark:text-white">
          <FileText size={20} />
          <div>
            <p className="text-sm font-medium ">Upload PAN / Aadhaar</p>
            {data.document && <p className="text-xs text-green-600">{data.document.name}</p>}
          </div>
        </div>
        <Upload size={18} className="dark:text-white"/>
        <input type="file" className="hidden" onChange={(e) => onChange("document", e.target.files[0])} />
      </label>
    </div>
  );
}

function VideoKYCStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Video KYC</h2>
      <label className="flex items-center justify-between gap-3 border rounded-xl p-4 cursor-pointer dark:text-white
      border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10
      ">
        <div className="flex items-center gap-3">
          <Video size={20} />
          <div>
            <p className="text-sm font-medium">Selfie Video (5–10 sec)</p>
            {data.video && <p className="text-xs text-green-600">{data.video.name}</p>}
          </div>
        </div>
        <Upload size={18} />
        <input type="file" accept="video/*" className="hidden" onChange={(e) => onChange("video", e.target.files[0])} />
      </label>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="text-center space-y-3">
      <CheckCircle size={36} className="mx-auto text-green-600" />
      <h2 className="text-lg font-semibold dark:text-white">KYC Submitted</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">We’ll notify you once approved.</p>
    </div>
  );
}

function TrustCard({ title, desc }) {
  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl p-4">
      <h4 className="font-medium text-blue-950 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
    </div>
  );
}
