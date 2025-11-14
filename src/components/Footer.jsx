import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // update path as needed

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10 py-8 text-blue-950 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left - Logo + Download Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link to="/">
            <img className="w-28 md:w-32 h-auto" src={logo} alt="Logo" />
          </Link>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-sm font-semibold">Download the app on</p>
            <div className="flex gap-3">
              {/* Play Store */}
              <Link
                to="#"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
              >
                <FaGooglePlay className="text-lg text-blue-900" />
                <span className="text-sm font-medium">Google Play</span>
              </Link>

              {/* App Store */}
              <Link
                to="#"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
              >
                <FaApple className="text-lg text-blue-900" />
                <span className="text-sm font-medium">App Store</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Center - Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-700 transition">Home</Link>
          <Link to="/investments" className="hover:text-blue-700 transition">Investments</Link>
          <Link to="/calculators" className="hover:text-blue-700 transition">Calculators</Link>
          <Link to="/contact" className="hover:text-blue-700 transition">Contact</Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-5 text-lg">
          <a href="#" className="hover:text-blue-700 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-700 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-700 transition"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-blue-700 transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm font-semibold text-blue-950">
        © {new Date().getFullYear()} Wealthcrop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
