import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I start investing with Wealthcrop?",
    answer:
      "Simply sign up, complete your KYC verification, and explore our curated mutual fund options based on your goals and risk appetite.",
  },
  {
    question: "Are my investments safe on this platform?",
    answer:
      "Yes, all transactions are handled through secure, SEBI-registered partners with bank-level encryption to protect your data and investments.",
  },
  {
    question: "Can I withdraw my investments anytime?",
    answer:
      "Most mutual funds allow withdrawals at any time, though exit load and tax implications may apply depending on your holding period.",
  },
  {
    question: "Do I get personalized investment recommendations?",
    answer:
      "Yes, once you set your goals and risk preferences, our system recommends the best-performing mutual funds suited to your profile.",
  },
  {
    question: "Is there any minimum investment amount?",
    answer:
      "You can start investing with as little as ₹500 in most SIPs. We believe wealth building should be accessible to everyone.",
  },
  {
    question: "How can I track the performance of my funds?",
    answer:
      "You can view live NAV updates, growth charts, and detailed performance reports anytime from your dashboard.",
  },
];


const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-blue-950 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <button
              className="w-full flex justify-between items-center text-left text-blue-950 font-medium"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.question}
              {open === i ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {open === i && (
              <p className="text-gray-600 mt-2 border-t pt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
