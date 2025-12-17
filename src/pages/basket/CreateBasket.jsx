import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ===============================
   STATIC ASSET MASTER (MOCK DATA)
   =============================== */
const ASSETS = {
  stock: [
    { id: "RELIANCE", name: "Reliance Industries Ltd" },
    { id: "TCS", name: "Tata Consultancy Services" },
    { id: "INFY", name: "Infosys Ltd" },
    { id: "HDFCBANK", name: "HDFC Bank Ltd" },
  ],
  mutual_fund: [
    { id: "INF123456", name: "Axis Bluechip Fund" },
    { id: "INF654321", name: "Mirae Asset Large Cap Fund" },
    { id: "INF777888", name: "Parag Parikh Flexi Cap Fund" },
    { id: "INF999000", name: "HDFC Balanced Advantage Fund" },
  ],
};

export default function CreateBasket({ onSave }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [assets, setAssets] = useState([]);

  const [type, setType] = useState("stock");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [weight, setWeight] = useState("");

  /* ===============================
     WEIGHT CALCULATIONS
     =============================== */
  const totalWeight = useMemo(
    () => assets.reduce((sum, a) => sum + a.weight, 0),
    [assets]
  );
  const remainingWeight = 100 - totalWeight;

  /* ===============================
     SEARCH LOGIC (STATIC)
     =============================== */
  const searchAssets = (text) => {
    setQuery(text);
    setSelectedAsset(null);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    const matches = ASSETS[type]
      .filter((a) =>
        a.name.toLowerCase().includes(text.toLowerCase())
      )
      .slice(0, 4); // show max 4 results

    setResults(matches);
  };

  /* ===============================
     ADD ASSET
     =============================== */
  const addAsset = () => {
    if (!selectedAsset || !weight) return;

    const w = Number(weight);

    if (w <= 0) return;
    if (totalWeight + w > 100) {
      alert("Total allocation cannot exceed 100%");
      return;
    }

    setAssets([
      ...assets,
      {
        id: Date.now(),
        assetId: selectedAsset.id,
        name: selectedAsset.name,
        type,
        weight: w,
      },
    ]);

    setQuery("");
    setResults([]);
    setSelectedAsset(null);
    setWeight("");
  };

  /* ===============================
     REMOVE ASSET
     =============================== */
  const removeAsset = (id) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  /* ===============================
     SAVE
     =============================== */
  const saveBasket = () => {
    if (totalWeight !== 100) return;

    onSave({ name, assets });
    navigate("/baskets");
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb] p-6">
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Create New Basket
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Total allocation must be exactly <b>100%</b>
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white max-w-3xl mx-auto p-8 rounded-2xl shadow-md border border-[#e0e7ef]">

        {/* BASKET NAME */}
        <label className="text-sm font-medium text-slate-700 mb-1 block">
          Basket Name
        </label>
        <input
          className="border border-[#d4dbe5] p-3 rounded-xl w-full mb-5 bg-[#f9fbff]"
          placeholder="e.g., Long Term Wealth Basket"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ADD ASSET ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Asset Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setQuery("");
                setResults([]);
              }}
              className="border border-[#d4dbe5] p-3 rounded-xl w-full bg-[#f9fbff]"
            >
              <option value="stock">Stock</option>
              <option value="mutual_fund">Mutual Fund</option>
            </select>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Search Asset
            </label>
            <input
              className="border border-[#d4dbe5] p-3 rounded-xl w-full bg-[#f9fbff]"
              placeholder={
                type === "stock"
                  ? "Search stock (e.g. Reliance)"
                  : "Search mutual fund"
              }
              value={query}
              onChange={(e) => searchAssets(e.target.value)}
            />

            {results.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-[#e0e7ef] rounded-xl shadow mt-1 overflow-hidden">
                {results.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedAsset(asset);
                      setQuery(asset.name);
                      setResults([]);
                    }}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                  >
                    {asset.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* WEIGHT */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Weight (%)
            </label>
            <input
              className="border border-[#d4dbe5] p-3 rounded-xl w-full bg-[#f9fbff]"
              placeholder={`Max ${remainingWeight}%`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={addAsset}
          disabled={!selectedAsset || weight === 0}
          className={`mt-5 px-6 py-2.5 rounded-xl shadow transition
            ${
              selectedAsset && weight > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          + Add Asset
        </button>

        {/* WEIGHT STATUS */}
        <div className="mt-4 text-sm text-slate-600">
          Allocated: <b>{totalWeight}%</b> | Remaining:{" "}
          <b className={remainingWeight === 0 ? "text-green-600" : "text-blue-600"}>
            {remainingWeight}%
          </b>
        </div>

        {/* ASSET LIST */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Assets in Basket
          </h3>

          {assets.length === 0 && (
            <p className="text-gray-500 text-sm">
              No assets added yet.
            </p>
          )}

          {assets.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center border-b py-3 text-sm"
            >
              <div>
                <span className="font-medium text-slate-800">
                  {a.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  ({a.type})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-blue-600">
                  {a.weight}%
                </span>
                <button
                  onClick={() => removeAsset(a.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SAVE */}
        <button
          onClick={saveBasket}
          disabled={totalWeight !== 100 || !name}
          className={`w-full mt-8 py-3 rounded-xl text-lg font-semibold transition
            ${
              totalWeight === 100 && name
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Save Basket
        </button>
      </div>
    </div>
  );
}
