"use client";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function ServiceCard() {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  async function fetchServiceCard() {
    setLoading(true);
    try {
      const response = await fetch("/api/pages/services/card", {
        method: "GET",
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
      <div className="container max-w-7xl space-y-6 md:space-y-12">
        <h1 className="text-2xl text-center md:text-4xl font-semibold">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 2xl:gap-10">
          {datas?.map((data, index) => (
            <>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay={`${index * 50}`}
                data-aos-duration={`${500 / index}`}
                key={data.id}
                className="group backdrop-blur-3xl overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-sm rounded-xl"
              >
                <span className="absolute -left-52 top-[-6em]  h-[52em] w-64 rotate-[25deg] group-hover:bg-white/30 transition-all"></span>
                <span className="absolute bg-transparent h-2 w-2 m-auto inset-0 -top-10 -z-10 rounded-full group-hover:bg-sky-500 transition-all duration-500 group-hover:scale-[120]"></span>{" "}
                <div className="flex flex-col items-center gap-4 py-6 lg:py-16 transition-all ease-linear duration-500 rounded-xl">
                  <div className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <img
                      src={`/api/images/${data.icon.filename}`}
                      alt="On Hover"
                      className="w-10 h-10 md:w-14 md:h-14"
                    />
                  </div>
                  <h3 className="text-lg font-semibold md:text-xl xl:text-2xl text-primary group-hover:text-white">
                    {data.name}
                  </h3>
                  <p className="text-sm md:text-base xl:text-lg text-center opacity-70 w-2/3 group-hover:text-white">
                    {data.description}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
