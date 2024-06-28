"use client";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function page({ params }) {
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState({});

  async function fetchService() {
    setLoading(true);
    try {
      const response = await fetch(`/api/pages/services/slug/${slug}`);
      const result = await response.json();
      console.log(result);
      setService(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div className="mt-6 md:mt-20 justify-center min-h-screen items-center lg:mt-20 px-4 md:px-16 xl:px-20">
      <div className="max-w-7xl w-full space-y-20 md:space-y-12 lg:space-y-6">
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay={150}
          data-aos-duration={550}
          className=" flex flex-col lg:flex-row items-center bg-white text-black"
        >
          <div className="a lg:w-1/2">
            <h1 className="text-xl text-primary md:text-4xl xl:text-5xl font-semibold capitalize">
              {service.name}
            </h1>
            <p className="text-sm py-2 pb-4 md:py-4 leading-loose">
              {service.description}
            </p>
          </div>
          <div className="a lg:w-1/2 max-h-72 flex w-full justify-center lg:justify-end">
            <Image
              height={350}
              width={350}
              src={`/api/images/${service?.image?.filename}`}
              className="max-w-64 md:max-w-sm object-cover xl:max-w-lg w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-white list pb-24 flex justify-center">
          <div className="2xl:max-w-[1440px] w-full">
            <ul className="space-y-4">
              {service.serviceLists?.map((list, index) => (
                <li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 250}`}
                  data-aos-duration={`${750 / index}`}
                  className="flex l gap-4 items-center group w-fit"
                >
                  <div className="border-primary border text-primary w-8 h-8 flex justify-center items-center rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-150 ease-linear">
                    {index + 1}
                  </div>
                  <p className="font-medium group-hover:text-primary">
                    {list.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
