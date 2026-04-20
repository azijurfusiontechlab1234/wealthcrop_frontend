// Premium, long-form KYC flow (Groww-style)
// ✔ Compact steps + ✔ Left gradient illustration + ✔ Dark mode polish
// ✔ State management for all steps + ✔ Final API submit

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Upload,
  FileText,
  Video,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { postApiWithToken } from "../../api/api";
import { toastError, toastSuccess } from "../../utils/notifyCustom";
import axios from "axios";

const steps = ["Personal", "Bank", "Docs", "Nominee", "Video", "Review"];

export default function KYCFlow() {
  const [step, setStep] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [stepError, setStepError] = useState("");
  const [completedSteps, setCompletedSteps] = useState({});
const [loadingStep, setLoadingStep] = useState(false);

const [docUploaded, setDocUploaded] = useState({
  pan: false,
  aadhaar: false,
  selfie: false
});


  //  CENTRAL KYC STATE
  const [kycData, setKycData] = useState({
    pan: "",
    dob: "",
    name: "",
    gender: "",
    mStatus: "",
    addrss1: "",
    addrss2: "",
    // addrss3: "",
    occupation: "",
    income: "",
    city: "",
    state: "",
    pin: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineePercentage: "",
    documentA: null,
    documentP: null,
    video: null,
  });

  // pan Image,
  // add line 1, 2, 3
  // pin code,
  // marital status,
  // fathers name

  const update = (key, value) =>
    setKycData((prev) => ({ ...prev, [key]: value }));

//   const handlePrimaryAction = () => {
//   const error = validateStep(step, kycData);
//   if (error) {
//     setStepError(error);
//     return;
//   }

//   setStepError("");

//   if (step < 4) {
//     setStep(step + 1);
//   } else {
//     submitKYC();
//   }
// };

const handlePrimaryAction = async () => {
  const error = validateStep(step, kycData);
  if (error) {
    setStepError(error);
    return;
  }

  setStepError("");

  try {
    setLoadingStep(true);

    const res = await callStepApi(step, kycData); //  get response

    //  check API success properly
    if (res?.status === true || res?.status === 200) {
      
      //  mark step success (green)
      setCompletedSteps((prev) => ({
        ...prev,
        [step]: true,
      }));

      //  move to next step
      if (step < 5) {
        setStep(step + 1);
      } else {
        submitKYC();
      }

    } else {
      //  API responded but failed
      setStepError(res?.message || "Something went wrong");
    }

  } catch (e) {
    // network / server error
    setStepError("API failed. Try again.");
  } finally {
    setLoadingStep(false);
  }
};


  const validateStep = (step, data) => {
  switch (step) {
    // case 0: // PAN
    //   if (!data.pan) return "PAN is required";
    //   if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan))
    //     return "Invalid PAN format";
    //   if (!data.dob) return "Date of birth is required";
    //   return null;

    case 0: // Personal
      if (!data.name.trim()) return "Name is required";
      if (!data.pan) return "PAN is required";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan))
        return "Invalid PAN format";
     if (!data.dob) return "Date of birth is required";
if (!/^\d{4}-\d{2}-\d{2}$/.test(data.dob)) {
  return "Date must be in YYYY-MM-DD format (e.g. 2020-10-02)";
}
      if (!data.occupation) return "Occupation is required";
      if (!data.income) return "Income is required";
      if (!data.gender) return "Gender is required";
      if (!data.addrss1) return "Address 1 is required";
      if (!data.addrss2) return "Address 2 is required";
      if (!data.mStatus) return "Marital status is required";
      if (!data.fName) return "Father's name is required";
      if (!data.state) return "State name is required";
      if (!data.pin) return "Pin is required";
      if (!data.aadhar) return "Income is required";
      if (!data.city) return "City is required";
      return null;

    case 1: // Bank
      if (!data.accountNo) return "Account number is required";
      if (!/^\d{9,18}$/.test(data.accountNo))
        return "Invalid account number";
      if (!data.ifsc) return "IFSC is required";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc))
        return "Invalid IFSC code";
      return null;

 case 2: // Docs
  if (!data.documentP || !data.documentA) {
    return "Upload both PAN and Aadhaar";
  }
  return null;

    case 3: // Video
      if (!data.nomineeName) return "Please enter nominee name";
      if (!data.nomineeRelation) return "Please enter relation with nominee";
      if (!data.nomineePercentage) return "Please enter percentage";
      return null;

   case 4:
    if(!data.video) return "Please upload your selfie video"   

    default:
      return null;
  }
};


//! api url
const stepApiConfig = {
  // 0: {
  //   url: "/api/kyc/pan",
  //   getPayload: (data) => ({
  //     pan: data.pan,
  //     dob: data.dob,
  //   }),
  // },
  0: {
    url: `${import.meta.env.VITE_URL}/kyc/profile`,
    getPayload: (data) => ({
      // name: data.name,
      pan_number: data.pan,
      aadhaar_number: data.aadhar,
      dob: data.dob,
      gender: data.gender,
      occupation: data.occupation,
      marital_status: data.mStatus,
      fName: data.fName,
      address_line1: data.addrss1,
      address_line2: data.addrss2,
      income: data.income,
      city: data.city,
      state: data.state,
      pincode: data.pin,
    }),
  },
  1: {
     url: `${import.meta.env.VITE_URL}/kyc/bank`,
    getPayload: (data) => ({
      bank_name: data.bankName,
      account_holder_name: data.name,
      account_number: data.accountNo,
      ifsc_code: data.ifsc,
    }),
  },
  2: {
     url: `${import.meta.env.VITE_URL}/kyc/document`,
    getPayload: (data) => ({
      type: "aadhaar",
      file: data.document,
    }),
  },
  3: {
     url: `${import.meta.env.VITE_URL}/kyc/nominee`,
    getPayload: (data) => ({
      name: data.nomineeName,
      relation: data.nomineeRelation,
      percentage: data.nomineePercentage,
    }),
  },
  4: {
     url: `${import.meta.env.VITE_URL}/kyc/document`,
    getPayload: (data) => ({
      type: "video",
      file: data.video,
    }),
  },
};

const callStepApi = async (step, data) => {
  const config = stepApiConfig[step];
  if (!config) return true;

  const payload = config.getPayload(data);

  const res = await postApiWithToken(config.url, payload);

  if (res?.status === 200 || res?.status === true) {
    toastSuccess(res?.message);
  }

  return res;
};

//! For document only
const uploadDocument = async (type, file) => {
  try {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_URL}/kyc/document`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();

    if (data?.status === true || data?.status === 200) {
      toastSuccess(data?.message);

      // mark individual doc uploaded
      setDocUploaded((prev) => ({
        ...prev,
        [type]: true,
      }));

      return data;
    } else {
      toastError(data?.message || "Upload failed");
    }
  } catch (err) {
    toastError(err?.message)
    console.error(err);
    return null;
  }
};

useEffect(() => {
  //  replace 3 with your actual Docs step index
  if ((step === 2 && docUploaded.pan && docUploaded.aadhaar) || (step === 4 && docUploaded.selfie)) {
    
    //  mark step green
    setCompletedSteps((prev) => ({
      ...prev,
      [step]: true,
    }));

    //  move next
    setStep((prev) => prev + 1);
  }
}, [docUploaded, step]);

//! to fetch first name and last name
const getNameParts = (fullName = "") => {
  const parts = fullName.trim().split(" ").filter(Boolean);

  return {
    first_name: parts[0] || "",
    last_name: parts.slice(1).join(" ") || "", // handles middle names too
  };
};

  //  FINAL SUBMIT
  const submitKYC = async () => {
    setSubmitting(true);
    try {
      // Replace with real API
      await new Promise((r) => setTimeout(r, 2000));
      console.log("KYC SUBMITTED", kycData);
      setStep(5);
    } catch (e) {
      toastError("KYC submission failed");
    } finally {
      setSubmitting(false);
    }


  };

  //! Generate Client Code
  const generateClientCode = (name = "") => {

    const prefix = name.replace(/\s+/g, "").toUpperCase().slice(0, 3) || "USR"
    const timeStamp = Date.now().toString().slice(-5)
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}${timeStamp}${random}`
  }

useEffect(() => {
  if (step !== 5) return; // only run on step 5

  const createUCC = async () => {
    try {
      const { first_name, last_name } = getNameParts(kycData.name);

      // const payload = {
      //   source: "demo",
      //   // client_code: "ABC1002",
      //   holders: [
      //     {
      //       first_name,
      //       last_name,
      //       dob: kycData.dob,
      //       gender:
      //         kycData.gender === "male"
      //           ? "M"
      //           : kycData.gender === "female"
      //           ? "F"
      //           : "O",
      //       pan: kycData.pan,
      //       email: kycData.email,
      //       mobile: kycData.mobile,
      //     },
      //   ],

      //   address: {
      //     line1: kycData.addrss1,
      //     pincode: kycData.pin,
      //     city: kycData.city,
      //     state: kycData.state,
      //   },

      //   bank: {
      //     ifsc: kycData.ifsc,
      //     acc_no: kycData.accountNo,
      //     acc_type: "SB",
      //   },
      // };
      
        const payload = {
    source: "demo",
    client_code: "ABC1002",
    holders: [
      {
        first_name: "Amit",
        last_name: "Patel",
        dob: "1992-05-20",
        gender: "M",
        pan: "ABCDE5678G",
        email: "amit.patel@dummy.com",
        mobile: "9898989898",
      },
    ],
    address: {
      line1: "Flat 202, Sunshine Apts",
      pincode: "400053",
      city: "Mumbai",
      state: "Maharashtra",
    },
    bank: {
      ifsc: "ICIC0000123",
      acc_no: "0123456789",
      acc_type: "SB",
    },
  };


      const res = await axios.post(
        "http://65.2.121.33:5500/v2/add_ucc",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  createUCC();
}, [step]);

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
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col col-span-1 justify-between p-8 bg-gradient-to-br from-blue-950 to-indigo-900 text-white">
          <div>
            <h2 className="text-xl font-semibold mb-2">Why KYC?</h2>
            <p className="text-sm text-blue-100">
              Required by SEBI to keep your investments safe.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  // className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  //   i <= step ? "bg-white text-blue-950" : "bg-white/30"
                  // }`}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
  completedSteps[i]
    ? "bg-green-500 text-white"
    : i === step
    ? "bg-white text-blue-950"
    : "bg-white/30"
}`}
                >
                  {/* {i < step ? "✓" : i + 1} */}
                  {completedSteps[i] ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm ${
                    i === step ? "font-medium" : "opacity-70"
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          <div className="text-xs text-blue-200 space-y-2 mt-2">
            <p className="flex items-center gap-2">
              <ShieldCheck size={14} /> SEBI compliant
            </p>
            <p className="flex items-center gap-2">
              <Lock size={14} /> Bank-grade encryption
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 md:p-8 col-span-2">
          {/* Mobile step bar */}
          <div className="flex md:hidden mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 mx-0.5 rounded ${
                  i <= step ? "bg-blue-900" : "bg-gray-200"
                }`}
              />
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
              {/* {step === 0 && <PANStep data={kycData} onChange={update} />} */}
              {step === 0 && <PersonalStep data={kycData} onChange={update} />}
              {step === 1 && <BankStep data={kycData} onChange={update} />}
              {step === 2 && <DocsStep data={kycData} onChange={update} uploadDocument={uploadDocument} />}
              {step === 3 && <NomineeStep data={kycData} onChange={update} />}
              {step === 4 && <VideoKYCStep data={kycData} onChange={update} uploadDocument={uploadDocument} />}
              {step === 5 && <ReviewStep />}
            </motion.div>
          </AnimatePresence>

       {/* FOOTER */}
{step < 5 && (
  <div className="mt-6">
    {stepError && (
      <p className="mb-3 text-sm text-red-600 dark:text-red-500">
        {stepError}
      </p>
    )}

    <div className="flex justify-between">
      <button
        disabled={step === 0}
        onClick={() => {
          setStepError("");
          setStep(step - 1);
        }}
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

      {step < 5 ? (
        // <button
        //   onClick={handlePrimaryAction}
        //   className="text-sm px-5 py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-900"
        // >
        //   Continue
        // </button>
        <button
  onClick={handlePrimaryAction}
  disabled={loadingStep || step === 4}
  className={`
  text-sm px-5 py-2 rounded-lg
  bg-blue-950 text-white
  hover:bg-blue-900
  disabled:bg-gray-400
  disabled:cursor-not-allowed
`}
>
  {loadingStep ? "Saving..." : "Continue"}
</button>
      ) : (
        <button
          onClick={handlePrimaryAction}
          disabled={submitting}
          className="text-sm px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          {submitting ? "Submitting..." : "Submit KYC"}
        </button>
      )}
    </div>
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
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
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

function FieldSelect({label, value, onChange, options}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1" >
        {label}
      </label>

      <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0b1220]
      text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-800 outline-none"
      >
        <option value="" disabled>Select gender</option>
        {
          options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))
        }
      </select>
    </div>
  )
}

function PANStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">
        PAN Verification
      </h2>
      <Field
        label="PAN Number"
        value={data.pan}
        onChange={(v) => onChange("pan", v.toUpperCase())}
        placeholder="ABCDE1234F"
      />
      <Field
        label="Date of Birth"
        value={data.dob}
        onChange={(v) => onChange("dob", v)}
        placeholder="DD/MM/YYYY"
      />
    </div>
  );
}

function NomineeStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">
        Add Nominee
      </h2>
      <Field
        label="Nominee Name"
        value={data.nomineeName}
        onChange={(v) => onChange("nomineeName", v.toUpperCase())}
        placeholder="Nominee Name"
      />
      <Field
        label="Relation with Nominee"
        value={data.nomineeRelation}
        onChange={(v) => onChange("nomineeRelation", v)}
        placeholder="Relation with nominee"
      />
      <Field
        label="Percentage you want to give"
        value={data.nomineePercentage}
        onChange={(v) => onChange("nomineePercentage", v)}
        placeholder="50%"
      />
    </div>
  );
}

function PersonalStep({ data, onChange }) {
  return (
    <div className="space-y-4 h-[400px] overflow-y-auto p-2">
      <h2 className="text-lg font-semibold dark:text-white">
        Personal Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Full Name"
          value={data.name}
          onChange={(v) => onChange("name", v)}
          placeholder="As per PAN"
        />
         <Field
        label="PAN Number"
        value={data.pan}
        onChange={(v) => onChange("pan", v.toUpperCase())}
        placeholder="ABCDE1234F"
      />
         <Field
        label="Aadhar Number"
        value={data.aadhar}
        onChange={(v) => onChange("aadhar", v.toUpperCase())}
        placeholder="9722 0589 0456"
      />
      <Field
        label="Date of Birth"
        value={data.dob}
        onChange={(v) => onChange("dob", v)}
        placeholder="YYYY/MM/DD"
      />
        <FieldSelect
          label="Gender"
          value={data.gender}
          onChange={(v) => onChange("gender", v)}
          options={["male", "female", "other"]}
        />
        <Field
          label="Occupation"
          value={data.occupation}
          onChange={(v) => onChange("occupation", v)}
          placeholder="Salaried"
        />
        <Field
          label="Marital Status"
          value={data.mStatus}
          onChange={(v) => onChange("mStatus", v)}
          placeholder="Married"
        />
        <Field
          label="Father's Name"
          value={data.fName}
          onChange={(v) => onChange("fName", v)}
          placeholder="As per documents"
        />
        <Field
          label="Address Line 1"
          value={data.addrss1}
          onChange={(v) => onChange("addrss1", v)}
          placeholder="Address Line 1"
        />
        <Field
          label="Address Line 2"
          value={data.addrss2}
          onChange={(v) => onChange("addrss2", v)}
          placeholder="Address Line 2"
        />
        {/* <Field
          label="Address Line 3"
          value={data.addrss3}
          onChange={(v) => onChange("addrss3", v)}
          placeholder="Address Line 3"
        /> */}
        <Field
          label="Income"
          value={data.income}
          onChange={(v) => onChange("income", v)}
          placeholder="₹5–10 L"
        />
        <Field
          label="City"
          value={data.city}
          onChange={(v) => onChange("city", v)}
          placeholder="Mumbai"
        />
        <Field
          label="State"
          value={data.state}
          onChange={(v) => onChange("state", v)}
          placeholder="West Bengal"
        />
        <Field
          label="Pin"
          value={data.pin}
          onChange={(v) => onChange("pin", v)}
          placeholder="123654"
        />
      </div>
    </div>
  );
}

function BankStep({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Bank Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Bank name"
          value={data.bankName}
          onChange={(v) => onChange("bankName", v)}
          placeholder="Bank of India"
        />
        <Field
          label="Account No"
          value={data.accountNo}
          onChange={(v) => onChange("accountNo", v)}
          placeholder="XXXXXXXX"
        />
        <Field
          label="IFSC"
          value={data.ifsc}
          onChange={(v) => onChange("ifsc", v)}
          placeholder="SBIN0000"
        />
      </div>
    </div>
  );
}

function DocsStep({ data, onChange, uploadDocument }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Documents</h2>
      <label
        className="
      flex items-center justify-between gap-3 border border-dashed rounded-xl p-4 cursor-pointer border-gray-300
      dark:border-white/10 bg-gray-50 dark:bg-white/5 hove:bg-gray-100 dark:hover:bg-white/10 transition
      "
      >
        <div className="flex items-center gap-3 dark:text-white">
          <FileText size={20} />
          <div>
            <p className="text-sm font-medium ">Upload PAN</p>
            {data.documentP && (
              <p className="text-xs text-green-600">{data.documentP.name}</p>
            )}
          </div>
        </div>
        <Upload size={18} className="dark:text-white" />
<input
  type="file"
  className="hidden"
  onChange={async (e) => {
    const file = e.target.files[0];
    onChange("documentP", file);

    if (file) {
      await uploadDocument("pan", file);
    }
  }}
/>
      </label>
      <label
        className="
      flex items-center justify-between gap-3 border border-dashed rounded-xl p-4 cursor-pointer border-gray-300
      dark:border-white/10 bg-gray-50 dark:bg-white/5 hove:bg-gray-100 dark:hover:bg-white/10 transition
      "
      >
        <div className="flex items-center gap-3 dark:text-white">
          <FileText size={20} />
          <div>
            <p className="text-sm font-medium ">Upload Aadhaar</p>
            {data.documentA && (
              <p className="text-xs text-green-600">{data.documentA.name}</p>
            )}
          </div>
        </div>
        <Upload size={18} className="dark:text-white" />
<input
  type="file"
  className="hidden"
  onChange={async (e) => {
    const file = e.target.files[0];
    onChange("documentA", file);

    if (file) {
      await uploadDocument("aadhaar", file);
    }
  }}
/>
      </label>
    </div>
  );
}

function VideoKYCStep({ data, onChange, uploadDocument }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">Video KYC</h2>
      <label
        className="flex items-center justify-between gap-3 border rounded-xl p-4 cursor-pointer dark:text-white
      border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10
      "
      >
        <div className="flex items-center gap-3">
          <Video size={20} />
          <div>
            <p className="text-sm font-medium">Selfie Video (5–10 sec)</p>
            {data.video && (
              <p className="text-xs text-green-600">{data.video.name}</p>
            )}
          </div>
        </div>
        <Upload size={18} />
        <input
          type="file"
          accept="video/*"
          className="hidden"
           onChange={async (e) => {
    const file = e.target.files[0];
      const MAX_SIZE = 45 * 1024 * 1024; // 5MB

    if (file.size > MAX_SIZE) {
      toastError("Video must be less than 5MB");
      return;
    }
    onChange("video", file);

    if (file) {
      await uploadDocument("selfie", file);
    }
  }}
        />

      </label>
      {data.video && (
              <p className="text-xs text-red-600">Please wait, your video is uploading...</p>
            )}
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="text-center space-y-3 flex items-center flex-col justify-center h-80">
      <CheckCircle size={36} className="mx-auto text-green-600" />
      <h2 className="text-lg font-semibold dark:text-white">KYC Submitted</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We’ll notify you once approved.
      </p>
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
