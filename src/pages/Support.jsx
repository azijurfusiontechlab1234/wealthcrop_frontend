import React, { useState } from "react";
import { MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by going to the login page and clicking on ‘Forgot Password’. Follow the instructions sent to your registered email or mobile number.",
  },
  {
    question: "How can I update my KYC details?",
    answer:
      "Go to the ‘Profile’ section in your account settings, and under ‘KYC Details’ click on ‘Update’. You’ll need to upload your latest PAN and Aadhaar details.",
  },
  {
    question: "Where can I see my withdrawal status?",
    answer:
      "You can check the status of your withdrawal in the ‘Funds’ section → ‘Withdrawal History’.",
  },
  {
    question: "What are the market trading hours?",
    answer:
      "Equity and F&O markets are open from 9:15 AM to 3:30 PM, Monday to Friday, excluding holidays.",
  },
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      {/* 🔹 Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
          Support & Help Center
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          We’re here to help you with any questions or issues you may have.
        </p>
      </div>

      {/* 🔹 Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Chat Support */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
            <MessageCircle size={28} />
          </div>
          <h3 className="text-lg font-semibold text-blue-950">Live Chat</h3>
          <p className="text-gray-600 text-sm mt-1">
            Chat with our support team instantly.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Start Chat
          </button>
        </div>

        {/* Call Support */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
            <Phone size={28} />
          </div>
          <h3 className="text-lg font-semibold text-blue-950">Call Us</h3>
          <p className="text-gray-600 text-sm mt-1">
            Talk directly to our customer care team.
          </p>
          <p className="font-medium text-blue-950 mt-2 text-sm">
            +91 1800 123 4567
          </p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Call Now
          </button>
        </div>

        {/* Email Support */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full mb-3">
            <Mail size={28} />
          </div>
          <h3 className="text-lg font-semibold text-blue-950">Email Us</h3>
          <p className="text-gray-600 text-sm mt-1">
            Send us your query and we’ll get back soon.
          </p>
          <p className="font-medium text-blue-950 mt-2 text-sm">
            support@investify.com
          </p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Send Email
          </button>
        </div>
      </div>

      {/* 🔹 FAQ Section */}
      <div className="bg-white shadow-md rounded-xl p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-semibold text-blue-950 mb-5">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-gray-900 font-medium text-sm md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Footer CTA */}
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold text-blue-950">
          Still need help?
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Our team is always ready to assist you with any issue.
        </p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
          Raise a Ticket
        </button>
      </div>
    </div>
  );
};

export default Support;
