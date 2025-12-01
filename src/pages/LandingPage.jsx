import React from "react";
import HeroSection from "../components/HeroSection";
import RoleImages from "../components/RoleImages";
import WhyAjiriSection from "../components/WhyAjiriSection";
import HowItWorksCarousel from "../components/HowItWorksCarousel";
import MissionVision from "../components/MissionVison"; // renamed from AdTeaser

const LandingPage = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* 1️⃣ Hero: Tagline + CTA */}
      <HeroSection />

      {/* 2️⃣ RoleImages: Fundis, Clients & Businesses */}
      <RoleImages />

      {/* 3️⃣ Why MO-jobs / Features */}
      <WhyAjiriSection />

      {/* 4️⃣ How It Works Carousel */}
      <HowItWorksCarousel />

      {/* 5️⃣ Mission & Vision: Our story, brand values */}
      <MissionVision />
    </main>
  );
};

export default LandingPage;
