    import { Link } from "react-router-dom";

export default function BasketCard({ basket }) {
  return (
    <Link to={`/basket/${basket.id}`}>
      <div className="bg-white border border-[#e0e7ef] rounded-xl shadow-sm 
      hover:shadow-md transition p-5 cursor-pointer">

        {/* Light icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3208/3208750.png"
          className="w-9 mb-2 opacity-70"
          alt="icon"
        />

        <h2 className="font-semibold text-[16px] text-slate-800 leading-snug mb-1">
          {basket.name}
        </h2>

        <p className="text-[13px] text-gray-600 mt-1">
          Min SIP: <span className="font-medium">₹{basket.minSip}</span>
        </p>

        <p className="text-[13px] mt-1">
          1Y Returns:{" "}
          <span className="text-green-600 font-semibold">
            {basket.returns1Y}%
          </span>
        </p>

        <span className="mt-3 inline-block px-3 py-1 text-xs rounded-full 
        bg-blue-100 text-blue-700">
          {basket.risk}
        </span>
      </div>
    </Link>
  );
}
