import ImageCarouselSection from "@/components/home/ImageCarouselSection";
import NewsCarouselSection from "@/components/home/NewsCarouselSection";
import Navbar from "@/components/navigation/Navbar";
import ServiceCard from "@/components/service/ServiceCard";
import FeatureSection from "@/components/home/FeatureSection";
import QuestionSection from "@/components/home/QuestionSection";
import Footer from "@/components/navigation/Footer";
import React from "react";

export default function Home() {

  return (
    <div className="bg-white">
      
      <Navbar />
      <ImageCarouselSection />,
      <ServiceCard />,
      <NewsCarouselSection />,
      <FeatureSection />,
      <QuestionSection />,
      <Footer />
    </div>
  );
}
