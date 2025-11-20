import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-linear-to-r from-blue-950 to-red-600 text-white text-center py-16 px-6 overflow-hidden">
      <h2 className="text-3xl font-semibold mb-4">Ready to Begin Your Wealth Journey?</h2>
      <p className="mb-6 text-gray-200">
        Start investing today with a platform that understands your goals.
      </p>
      <Link
        to="/signup"
        className="bg-white text-blue-950 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
      >
        Join Now
      </Link>
    </section>
  );
};

export default CTASection;
