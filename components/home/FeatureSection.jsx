"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Aos from "aos";
import "aos/dist/aos.css";

const features = [
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
  {
    title: "Experience",
    description:
      " We have over fifteen years experience operating IT Solutions in challenging areas at Indonesia. Our experience takes the strain and pressure off the customer, delivering a viable solution",
  },
];

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function FeatureSection() {
  const featureChunks = chunkArray(features, 3);
  const half = Math.ceil(featureChunks.length / 2);
  const firstColumnChunks = featureChunks.slice(0, half);
  const secondColumnChunks = featureChunks.slice(half);

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-duration="600"
        className="bg-slate-100 choose xl:min-h-[480px] flex justify-center items-center lg:min-h-[600px] text-black px-4 lg:px-8 xl:px-16"
      >
        <div className="flex-col h-full justify-center items-center w-full max-w-7xl space-y-16">
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
