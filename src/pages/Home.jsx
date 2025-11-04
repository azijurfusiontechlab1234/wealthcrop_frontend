import React from "react";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FeaturedSection from "../components/home/FeaturedSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import HomeChart from "../components/home/HomeChart";
import InvestmentHighlights from "../components/home/InvestmentHighlights";
import SipCalculator from "../components/home/SipCalculator";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <InvestmentHighlights/>
      <AboutSection />
      <FeaturedSection />
      {/* <SipCalculator/> */}
      {/* <HomeChart/> */}
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
