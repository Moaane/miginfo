"use client";
import ImageCarouselSection from "@/components/home/ImageCarouselSection";
import NewsCarouselSection from "@/components/home/NewsCarouselSection";
import Navbar from "@/components/navigation/Navbar";
import ServiceCard from "@/components/service/ServiceCard";
import FeatureSection from "@/components/home/FeatureSection";
import QuestionSection from "@/components/home/QuestionSection";
import Footer from "@/components/navigation/Footer";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import AutoScroll from "embla-carousel-auto-scroll";

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

export default function Home() {
  const [services, setServices] = useState([]);

  // async function getServices() {
  //   const response = await fetch(
  //     `/api/services?filter=onSection&page=1&perPage=6`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const result = await response.json();
  //   console.log(result);
  //   setServices(result.data);
  // }

  // useEffect(() => {
  //   getServices();
  // }, []);

  return (
    <>
      <Navbar />
      {/* <HomeSlider /> */}
      <ImageCarouselSection />
      <div className="bg-red-100 overflow-hidden mt-24">
        <div className="flex space-x-16 justify-center items-center animate-loop-scroll w-full z-10">
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

      <ServiceCard services={services} />
      <NewsCarouselSection />
      <FeatureSection />
      <QuestionSection />
    </>
  );
}
