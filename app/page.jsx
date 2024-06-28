import ImageCarouselSection from "@/components/home/ImageCarouselSection";
import NewsCarouselSection from "@/components/home/NewsCarouselSection";
import Navbar from "@/components/navigation/Navbar";
import ServiceCard from "@/components/service/ServiceCard";
import FeatureSection from "@/components/home/FeatureSection";
import QuestionSection from "@/components/home/QuestionSection";
import Footer from "@/components/navigation/Footer";
import React from "react";
import Image from "next/image";
import { getNews } from "./api/news/route";

const PartnerLogos = [
  {
    logo: "aruba",
    alt: "Aruba Networks",
  },
  {
    logo: "benq",
    alt: "Benq",
  },
  {
    logo: "checkpoint",
    alt: "Checkpoint",
  },
  {
    logo: "cisco",
    alt: "Cisco",
  },
  {
    logo: "commscope",
    alt: "Commscope Connectivity",
  },
  {
    logo: "crestron",
    alt: "Crestron",
  },
  {
    logo: "epson",
    alt: "Epson",
  },
  {
    logo: "fortinet",
    alt: "Fortinet",
  },
  {
    logo: "hp",
    alt: "Hp",
  },
  {
    logo: "huawei",
    alt: "Huawei Technologies",
  },
  {
    logo: "ibm",
    alt: "IBM",
  },
  {
    logo: "lg",
    alt: "LG Electronics",
  },
  {
    logo: "microsoft",
    alt: "Microsoft Corporation",
  },
  {
    logo: "paloalto",
    alt: "Palo Alto Networks",
  },
  {
    logo: "samsung",
    alt: "Samsung Electronic",
  },
  {
    logo: "seagate",
    alt: "Seagate Technology",
  },
  {
    logo: "sophos",
    alt: "Sophos",
  },
  {
    logo: "supermicro",
    alt: "Super Micro Computer",
  },
  {
    logo: "vertiv",
    alt: "Vertiv",
  },
  {
    logo: "viewsonic",
    alt: "Viewsonic",
  },
  {
    logo: "western_digital",
    alt: "Western Digital",
  },
];

async function fetchNews() {
  const response = await getNews();
  const result = await response.json();
  return result.data;
}

export default async function Page() {
  const news = await fetchNews();

  return (
    <>
      <Navbar />
      <ImageCarouselSection />
      <div className="space-y-12 md:space-y-20">
        <div className="overflow-hidden">
          <div className="flex space-x-8 md:space-x-16 justify-center items-center animate-loop-scroll w-full z-10">
            {PartnerLogos?.map((prop, index) => (
              <Image
                key={index}
                className="w-full h-full max-w-none:"
                loading="lazy"
                src={`/partner/${prop.logo}_logo.png`}
                alt={prop.alt}
                width={128}
                height={64}
              />
            ))}
            {PartnerLogos?.map((prop, index) => (
              <Image
                key={index}
                className="w-full h-full max-w-none:"
                loading="lazy"
                src={`/partner/${prop.logo}_logo.png`}
                alt={prop.alt}
                width={128}
                height={64}
              />
            ))}
          </div>
        </div>
        <ServiceCard />
        <NewsCarouselSection news={news} />
        <FeatureSection />
        <QuestionSection />
      </div>

      <Footer />
    </>
  );
}
