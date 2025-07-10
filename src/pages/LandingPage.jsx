import React from "react";
import HeroSection from "../components/HeroSection";
import WhyAjiriSection from "../components/WhyAjiriSection";
import RoleImages from "../components/RoleImages";
import AdTeaser from "../components/AdTeaser";

const LandingPage = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <HeroSection />
      <WhyAjiriSection />
      <RoleImages />
      <AdTeaser />
    </main>
  );
};

export default LandingPage;
