import React from "react";
import { motion } from "framer-motion";

const InvestmentHighlights = () => {
  const investmentTerms = [
    "Mutual Funds",
    "SIP Plans",
    "Government Bonds",
    "Stock Market",
    "Fixed Deposits",
    "ETFs",
    "Retirement Plans",
    "Wealth Management",
    "Tax Saving Funds",
    "Commodities",
  ];

  return (
    <section className="bg-linear-to-r from-sky-50 via-gray-50 to-sky-100 py-16 px-6 text-center overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="text-3xl font-bold text-blue-950 mb-8"
      >
        Explore Diverse Investment Options
      </motion.h2>

      {/* Marquee Row 1 */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap text-lg font-medium text-red-600 mb-8"
      >
        {investmentTerms.map((term, i) => (
          <span
            key={i}
            className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-sky-100 transition"
          >
            {term}
          </span>
        ))}
      </motion.div>

      {/* Marquee Row 2 (Opposite direction) */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap text-lg font-medium text-blue-950"
      >
        {investmentTerms.reverse().map((term, i) => (
          <span
            key={i}
            className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-red-100 transition"
          >
            {term}
          </span>
        ))}
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="mt-12 text-gray-700 max-w-2xl mx-auto"
      >
        Stay informed and diversify your portfolio with India’s leading
        investment categories. Explore a range of products curated for your
        growth — from secure government bonds to high-return SIPs.
      </motion.p>
    </section>
  );
};

export default InvestmentHighlights;
