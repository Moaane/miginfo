import ImageCarouselSection from "@/components/sections/ImageCarouselSection";
import NewsCarouselSection from "@/components/sections/NewsCarouselSection";
import Navbar from "@/components/navigation/Navbar";
import FeatureSection from "@/components/sections/FeatureSection";
import QuestionSection from "@/components/sections/QuestionSection";
import Footer from "@/components/navigation/Footer";
import React from "react";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ClientSection from "@/components/sections/ClientSection";

export default async function Page() {
  return (
    <div>
      {/* <div className="space-y-12 md:space-y-20">
        </div> */}

      <Navbar />
      <div className="space-y-12 md:space-y-24 lg:space-y-32 xl:space-y-52">
        <div>
          <ImageCarouselSection />
          <ClientSection />
        </div>
        <AboutSection />
        <ServiceSection />
        <NewsCarouselSection />
        <FeatureSection />
        <QuestionSection />
      </div>

      <Footer />
    </div>
  );
}
