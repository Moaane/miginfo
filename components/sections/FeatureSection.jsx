"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Aos from "aos";
import "aos/dist/aos.css";

export default function FeatureSection() {
  const [features, setFeatures] = useState([]);

  async function fetchFeatures() {
    try {
      const response = await fetch("/api/features", {
        method: "GET",
      });
      const result = await response.json();
      setFeatures(result.data);
    } catch (error) {
      console.log("Error while retrieving features");
    }
  }

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-duration="600"
      className="text-black"
    >
      <div className="container max-w-7xl space-y-6 md:space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="600"
            data-aos-delay="500"
            className="space-y-8 md:space-y-6 md:px-24 lg:px-0"
          >
            <div className="space-y-4 md:space-y-6 text-center lg:space-y-4 lg:text-left">
              <p className="text-base md:text-lg lg:text-base font-bold text-primary">
                Need more information
              </p>
              <h1 className="text-3xl md:text-5xl font-bold">
                Frequently asked questions
              </h1>
              <p className="text-base md:text-lg lg:text-lg font-medium">
                When we talk to clients about our IT services for their company,
                a few of the same questions come up.
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {features.map((feature, index) => (
              <AccordionItem
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay={`${index * 50}`}
                data-aos-duration={`${500 / index}`}
                value={index + 1}
                key={index}
                className="border-2 rounded-md"
              >
                <AccordionTrigger className="text-left lg:text-xl font-bold h-20">
                  <p className="pr-2">{feature.title}</p>
                </AccordionTrigger>
                <AccordionContent className="text-sm lg:text-base">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
