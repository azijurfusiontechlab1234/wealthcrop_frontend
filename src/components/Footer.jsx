// Updated Footer Component
// (Attractive sections + copyright moved to last + extended sections only)
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  const amcs = [
    "Aditya Birla Sun Life",
    "Axis",
    "Baroda",
    "BNP Paribas",
    "Canara Robeco",
    "DSP",
    "Edelweiss",
    "Franklin Templeton",
    "HDFC",
    "ICICI Prudential",
    "Kotak",
    "L&T",
    "Mirae Asset",
    "Motilal Oswal",
    "Nippon India",
    "PPFAS",
    "Quant",
    "SBI",
    "Tata",
    "UTI",
  ];

  const mutualFunds = [
    "Mirae Asset Emerging Bluechip",
    "Axis Focused 25",
    "ICICI Value Discovery",
    "Axis Midcap",
    "ICICI Nifty Next 50",
    "Axis Long Term Equity",
    "Nippon Pharma",
    "ICICI Balanced Advantage",
    "DSP Quant Fund",
  ];

  const stocks = [
    "Reliance Industries",
    "TCS",
    "Infosys",
    "HDFC Bank",
    "ICICI Bank",
    "Kotak Bank",
    "Larsen & Toubro",
    "Asian Paints",
    "Tata Motors",
    "Maruti Suzuki",
    "Nestle",
    "HUL",
  ];

  const calculators = [
    "SIP Calculator",
    "Lumpsum Calculator",
    "Retirement Calculator",
    "FD Calculator",
    "NPS Calculator",
    "CAGR Calculator",
    "SWP Calculator",
    "PPF Calculator",
    "APY Calculator",
    "Inflation Calculator",
    "HRA Calculator",
  ];

  const fdPartners = [
    "HDFC",
    "Bajaj Finance",
    "Mahindra Finance",
    "PNB Housing",
    "Shriram Transport Finance",
    "National Housing Bank",
  ];

  const Section = ({ title, list, basePath }) => (
    <div>
      <h3 className="font-bold text-xl mb-4 text-blue-900">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {list.map((item, idx) => (
          <Link
            key={idx}
            to={`${basePath}/${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm py-2 px-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition shadow-sm"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* ---------------------------- */}
      {/* Main Footer Top Section */}
      {/* ---------------------------- */}
      <footer className="bg-white border-t-2 border-gray-300 py-10 hidden lg:block ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/">
              <img className="w-28 md:w-40" src={logo} alt="Logo" />
            </Link>

            <p className="text-sm font-semibold text-blue-950">Download the app</p>
            <div className="flex gap-3">
              <Link className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition">
                <FaGooglePlay className="text-lg text-blue-950" />
                <span className="text-sm font-medium text-blue-950">Google Play</span>
              </Link>

              <Link className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition">
                <FaApple className="text-lg text-blue-950" />
                <span className="text-sm font-medium text-blue-950">App Store</span>
              </Link>
            </div>
          </div>

          {/* Attractive middle navigation */}
        <div className="flex flex-col text-center md:text-left space-y-2 font-medium">
  <h3 className="text-xl font-bold text-blue-900 mb-1">
    Quick Navigation
  </h3>

  <Link 
    to="/" 
    className="text-blue-900 hover:text-blue-600 transition-all duration-150 hover:underline underline-offset-4"
  >
    Home
  </Link>

  <Link 
    to="/investments" 
    className="text-blue-900 hover:text-blue-600 transition-all duration-150 hover:underline underline-offset-4"
  >
    Investments
  </Link>

  <Link 
    to="/calculators" 
    className="text-blue-900 hover:text-blue-600 transition-all duration-150 hover:underline underline-offset-4"
  >
    Calculators
  </Link>

  <Link 
    to="/support" 
    className="text-blue-900 hover:text-blue-600 transition-all duration-150 hover:underline underline-offset-4"
  >
    Contact
  </Link>
</div>


          <div className="flex space-x-5 text-xl text-blue-950">
            <a className="hover:text-blue-700"><FaFacebookF /></a>
            <a className="hover:text-blue-700"><FaTwitter /></a>
            <a className="hover:text-blue-700"><FaLinkedinIn /></a>
            <a className="hover:text-blue-700"><FaInstagram /></a>
          </div>
        </div>
      </footer>

      {/* ---------------------------- */}
      {/* EXTENDED PROFESSIONAL FOOTER */}
      {/* ---------------------------- */}
      <section className="bg-white text-blue-950 border-gray-300 py-4 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <Section title="Asset Management Companies (AMCs)" list={amcs} basePath="/amc" />
          <Section title="Popular Mutual Funds" list={mutualFunds} basePath="/mutual_fund" />
          <Section title="Popular Stocks" list={stocks} basePath="/stocks" />
          <Section title="Financial Calculators" list={calculators} basePath="/calculator" />
          <Section title="Fixed Deposit Partners" list={fdPartners} basePath="/fd" />

          <div className="border-t border-gray-300 pt-6 text-sm text-gray-700">
            <p><strong>Disclaimer:</strong> Investments in securities and mutual funds are subject to market risks. Read scheme documents carefully.</p>
          </div>

          <div className="text-sm text-gray-700 leading-6">
            <p><strong>Registered Office:</strong> Wealthcrop Advisory Pvt Ltd, Chennai</p>
            <p><strong>Corporate Office:</strong> Bengaluru, Karnataka</p>
          </div>

          {/* COPYRIGHT AT LAST */}
          <div className="border-t border-gray-300 pt-4 text-center text-sm font-semibold text-blue-900">
            © {new Date().getFullYear()} Wealthcrop. All rights reserved.
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
