import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { year: "2019", investment: 10, growth: 14 },
  { year: "2020", investment: 15, growth: 20 },
  { year: "2021", investment: 22, growth: 30 },
  { year: "2022", investment: 30, growth: 42 },
  { year: "2023", investment: 35, growth: 50 },
  { year: "2024", investment: 45, growth: 63 },
];

const HomeChart = () => {
  return (
    <div className="bg-gray-50 text-blue-950 overflow-hidden mt-2">
      {/* 📊 Investment Growth Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className="text-3xl font-bold text-blue-950 mb-6"
          >
            See Your Wealth Grow Over Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Visualize how your investments can grow year over year with
            consistent planning and expert guidance.
          </motion.p>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#dc2626" // red-600
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="investment"
                stroke="#1e3a8a" // blue-950
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 💬 Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-blue-950 mb-10"
          >
            What Our Investors Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rohit Sharma",
                feedback:
                  "Wealthcrop made investing so simple! My SIPs are now automatic, and I can track everything live.",
              },
              {
                name: "Aditi Mehta",
                feedback:
                  "The UI is amazing and the analytics are powerful. I doubled my savings in 2 years!",
              },
              {
                name: "Kunal Verma",
                feedback:
                  "Great support team and a clean app. I feel confident managing all my mutual funds here.",
              },
            ].map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: false }}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
              >
                <p className="text-gray-600 italic mb-4">“{user.feedback}”</p>
                <h4 className="font-semibold text-blue-950">{user.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeChart;
