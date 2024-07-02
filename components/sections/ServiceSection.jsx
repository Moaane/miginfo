"use client";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import ServiceCard from "../cards/ServiceCard";

export default function ServiceSection() {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  async function fetchServiceCard() {
    setLoading(true);
    try {
      const response = await fetch("/api/services?filter=section", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();
      setDatas(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      Aos.refresh();
    }
  }

  useEffect(() => {
    fetchServiceCard();
  }, []);

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-duration="600"
      className="text-black"
    >
      <div className="container max-w-7xl space-y-6 md:space-y-12 lg:space-y-24">
        <div className="text-center px-8 md:px-24 xl:px-52 space-y-4 md:space-y-6">
          <p className="text-base md:text-lg lg:text-base font-bold text-primary">
            Discover our company
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">
            We are dedicated to serving you all the time
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-stretch gap-6">
          {datas?.map((data, index) => (
            <ServiceCard
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay={`${index * 50}`}
              data-aos-duration={`${500 / index}`}
              data={data}
              key={data.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
