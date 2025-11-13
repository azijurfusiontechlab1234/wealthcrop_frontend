import React, { useEffect, useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <Loader2 className="animate-spin" size={40} />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-950 mb-2">
            Generating Reports
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center">
            Please wait while we fetch your investment insights...
          </p>

          {/* Fake progress bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-blue-600 animate-[progress_3s_ease-in-out_infinite]" />
          </div>

          {/* Keyframes */}
          <style>
            {`
              @keyframes progress {
                0% { width: 0%; }
                50% { width: 90%; }
                100% { width: 0%; }
              }
            `}
          </style>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <BarChart3 size={40} />
          </div>
          <h2 className="text-2xl font-semibold text-blue-950 mb-2">
            No Reports Available
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-5 max-w-md">
            You haven’t generated any reports yet. Once you start investing,
            detailed performance insights will appear here.
          </p>
          <button onClick={() =>navigate("/user/stocks/explore")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
            Explore Investments
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;
