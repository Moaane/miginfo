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

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function FeatureSection() {
  const [firstColumnChunks, setFirstColumnChunks] = useState([]);
  const [secondColumnChunks, setSecondColumnChunks] = useState([]);
  const [half, setHalf] = useState(0);

  async function fetchFeatures() {
    try {
      const response = await fetch("/api/features", {
        method: "GET",
      });
      const result = await response.json();
      const featureChunks = chunkArray(result.data, 2);
      const halfLength = Math.ceil(featureChunks.length / 2);
      setFirstColumnChunks(featureChunks.slice(0, halfLength));
      setSecondColumnChunks(featureChunks.slice(halfLength));
      setHalf(halfLength);
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
    <>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-duration="600"
        className="text-black"
      >
        <div className="container max-w-7xl space-y-12 py-12">
          <h1 className="c text-2xl text-center md:text-4xl font-semibold">
            Why Choose us?
          </h1>
          <Accordion type="single" collapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 2xl:gap-6">
              <div className="space-y-4">
                {firstColumnChunks.map((chunk, chunkIndex) => (
                  <div key={chunkIndex}>
                    {chunk.map((item, index) => (
                      <AccordionItem
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay={`${index * 50}`}
                        data-aos-duration={`${500 / index}`}
                        value={`item-${chunkIndex}-${index}`}
                        key={index}
                      >
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.description}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {secondColumnChunks.map((chunk, chunkIndex) => (
                  <div key={chunkIndex}>
                    {chunk.map((item, index) => (
                      <AccordionItem
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay={`${index * 100}`}
                        data-aos-duration={`${1000 / index}`}
                        value={`item-${half + chunkIndex}-${index}`}
                        key={index}
                      >
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.description}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
}
