import { FaLandmark, FaCoins, FaChartLine, FaChartPie } from "react-icons/fa";
import account_setup from "../../assets/mutualFund/account_setup.webp";

// Logos
import sbi from "../../assets/mutualFund/sbi.webp";
import parag from "../../assets/mutualFund/ppfas.webp";
import motilal from "../../assets/mutualFund/motilal.webp";
import bandhan from "../../assets/mutualFund/idfc.webp";
import { useNavigate } from "react-router-dom";

const ExploreMF = () => {

  const navigate = useNavigate()

 const showFundPage = (fundName) => {
  const cleanName = fundName.replace(/\s+/g, "");
  navigate(`/mutual_fund/${cleanName}`);
};


  const popularFunds = [
    { name: "SBI Gold Fund", return: "+32.9%", years: "3Y", img: sbi },
    { name: "Parag Parikh Flexi Cap Fund", return: "+21.6%", years: "3Y", img: parag },
    { name: "Motilal Oswal Midcap Fund", return: "+27.4%", years: "3Y", img: motilal },
    { name: "Bandhan Small Cap Fund", return: "+33.0%", years: "3Y", img: bandhan },
  ];

  const collections = [
    { name: "High Return", icon: <FaChartLine size={32} className="text-green-600" /> },
    { name: "Gold Funds", icon: <FaCoins size={32} className="text-yellow-500" /> },
    { name: "5 Star Funds", icon: <FaLandmark size={32} className="text-blue-500" /> },
    { name: "Large Cap", icon: <FaChartPie size={32} className="text-indigo-600" /> },
    { name: "Mid Cap", icon: <FaChartLine size={32} className="text-cyan-600" /> },
    { name: "Small Cap", icon: <FaChartPie size={32} className="text-pink-600" /> },
  ];

  const growwFunds = [
    { name: "Groww Nifty 50 Index Fund", return: "+18.4%", years: "3Y", img: motilal },
    { name: "Groww Large Cap Fund", return: "+25.1%", years: "3Y", img: bandhan },
    { name: "Groww Midcap Fund", return: "+29.5%", years: "3Y", img: parag },
    { name: "Groww Balanced Fund", return: "+16.2%", years: "3Y", img: sbi },
  ];

  const trending = [
    { name: "Axis Small Cap Fund", return: "+42.1%", years: "3Y", img: sbi },
    { name: "Kotak Flexicap Fund", return: "+28.3%", years: "3Y", img: motilal },
    { name: "HDFC Midcap Opportunities", return: "+35.7%", years: "3Y", img: bandhan },
    { name: "ICICI Bluechip Fund", return: "+22.9%", years: "3Y", img: parag },
  ];

  return (
    <div className="w-full py-6 px-5 md:px-10 lg:px-14">

      {/* GRID — RIGHT SIDE FIRST ON MOBILE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RIGHT SECTION SHOWS FIRST IN MOBILE */}
        <div className="order-1 lg:order-2 rounded-xl py-4 px-6 shadow-sm border border-gray-200 text-center bg-white h-full lg:h-[70%]">
          <img src={account_setup} alt="setup" className="w-[65%] mx-auto rounded-lg" />
          <h3 className="text-lg font-semibold text-gray-800 mt-4">Attention required!</h3>
          <p className="text-sm text-gray-500 mt-1 px-2">
            Complete setting up your account to start investing on Wealthcrop
          </p>
          <button className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            COMPLETE SETUP
          </button>
        </div>

        {/* LEFT SECTION */}
        <div className="order-2 lg:order-1 lg:col-span-2">

          {/* Popular Funds */}
          <h2 className="text-xl font-semibold">Popular Funds</h2>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
            {popularFunds.map((fund, index) => (
              <div key={index} className="rounded-xl p-4 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow  transition"
              onClick={()=> showFundPage(fund.name)}>
                <div className="flex gap-3 flex-col text-left">
                  <img src={fund.img} className="w-10 h-10 rounded-md" />
                  <p className="text-sm font-medium">{fund.name}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-green-600 font-semibold">{fund.return}</p>
                  <p className="text-gray-500 text-sm">{fund.years}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Collections */}
          <h2 className="text-xl font-semibold mt-10 mb-3">Collections</h2>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 overflow-x-auto pb-2">
            {collections.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 bg-gray-50 shadow-sm hover:bg-gray-100 transition cursor-pointer flex flex-col items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-center mt-2">{item.name}</p>
              </div>
            ))}
          </div>

          {/* High Returns Funds */}
          <h2 className="text-xl font-semibold mt-10">High Returns Funds</h2>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
            {growwFunds.map((fund, index) => (
              <div key={index} onClick={()=> showFundPage(fund.name)}
               className="rounded-xl p-4 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow  transition">
                <div className="flex flex-col text-left gap-3">
                  <img src={fund.img} className="w-10 h-10 rounded-md" />
                  <p className="text-sm font-medium">{fund.name}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-green-600 font-semibold">{fund.return}</p>
                  <p className="text-gray-500 text-sm">{fund.years}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trending Funds */}
          <h2 className="text-xl font-semibold mt-10">Trending Funds</h2>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
            {trending.map((fund, index) => (
              <div key={index} onClick={()=> showFundPage(fund.name)}
               className="rounded-xl p-4 bg-white hover:bg-gray-50 hover:shadow border border-gray-200 transition">
                <div className="flex flex-col text-left gap-3">
                  <img src={fund.img} className="w-10 h-10 rounded-md" />
                  <p className="text-sm font-medium">{fund.name}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-green-600 font-semibold">{fund.return}</p>
                  <p className="text-gray-500 text-sm">{fund.years}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreMF;
