import { useState } from "react";
import { Link } from "react-router-dom";
import BasketCard from "../../components/BasketCard";
// import basket_dashboard from "../../assets/basket/basket_dashboard.png"
import basket_dashboard from "../../assets/basket/basket_dashboard.png"

export default function BasketList({ baskets }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Equity", "Hybrid", "Debt", "Commodity"];

  let filtered = [...baskets];
  if (filter !== "All") {
    filtered = baskets.filter((b) => b.category === filter);
  }

  return (
    <div className="min-h-screen bg-[#f3f7fb] px-12 py-8">

      {/* 🌤️ LIGHT BANNER */}
      <div className="bg-linear-to-r from-[#e8f2ff] to-[#f4faff] 
      rounded-2xl p-8 shadow-md border border-[#e0e7ef] 
      flex items-center justify-between mb-10">

        <div className="max-w-lg">
          <h1 className="text-3xl font-bold text-slate-800 leading-tight">
            Mutual Fund Baskets
          </h1>

          <p className="mt-2 text-slate-600 text-[15px] leading-relaxed">
            Explore expert-curated investment baskets designed for stable and 
            long-term wealth creation. 
          </p>

          <Link to="/create-basket">
            <button className="mt-5 px-6 py-2.5 bg-blue-500 text-white 
            rounded-lg shadow hover:bg-blue-600 transition">
              + Create Basket
            </button>
          </Link>
        </div>

        {/* LIGHT ILLUSTRATION */}
        <img
          src={basket_dashboard}
          className="w-36 opacity-80 hidden sm:block"
          alt="Investment"
        />
      </div>

      {/* CATEGORY CHIPS — LIGHT STYLE */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition border 
              ${
                filter === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-slate-700 border-[#d2dae3] hover:bg-blue-50"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-[#e0e7ef] 
        p-10 text-center max-w-lg mx-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            className="w-24 mx-auto mb-4 opacity-80"
            alt="Empty"
          />
          <h2 className="text-xl font-semibold text-slate-800">No baskets found</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Start by creating your first custom basket.
          </p>

          <Link to="/create-basket">
            <button className="mt-5 px-6 py-3 bg-blue-500 text-white 
            rounded-xl shadow hover:bg-blue-600">
              + Create Basket
            </button>
          </Link>
        </div>
      )}
      {/* {filtered.length !== 0 &&(
<div className="text-blue text-2xl border border-b bg-blue-950 my-3 px-5 rounded-3xl">
    <p className="text-white font-medium text-sm"> Basket List{" "}({filtered.length})</p>
</div>
        )
      } */}
      {/* BASKET CARD GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((basket) => (
          <BasketCard key={basket.id} basket={basket} />
        ))}
      </div>
    </div>
  );
}
