import { useState } from "react";

export default function AddFundsModal({ onConfirm, onClose }) {
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

        <h2 className="text-xl font-bold text-blue-950 mb-3">
          Add Funds
        </h2>

        <input
          type="number"
          className="border p-3 rounded-xl w-full mb-4"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={() => onConfirm(Number(amount))}
          className="w-full bg-blue-950 py-3 text-white rounded-xl"
        >
          Continue
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
    