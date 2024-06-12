"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const services = [
  {
    imgUrl: "icon/management-icon.svg",
    whiteImgUrl: "quality-icon-white.png",
    title: "Project Management",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "quality-icon.png",
    whiteImgUrl: "quality-icon-white.png",
    title: "Quality Testing",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "architecture-icon.png",
    whiteImgUrl: "quality-icon-white.png",
    title: "Architecture",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "development-icon.png",
    whiteImgUrl: "quality-icon-white.png",
    title: "Development",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "bussiness-icon.png",
    whiteImgUrl: "quality-icon-white.png",
    title: "Bussiness Analyst",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "maintenance-icon.png",
    whiteImgUrl: "quality-icon-white.png",
    title: "Maintenance",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
];
export default function ServiceCard() {
  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  });
  {
    /* <span className="absolute m-auto -top-[120px] md:-top-32 lg:-top-[158px] left-1/2 transform -translate-x-1/2 xl:top-[62px] -z-10 h-20 w-20 rounded-full bg-sky-500 transition-all duration-500 group-hover:scale-[10]"></span> */
  }

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-duration="600"
        className="bg-white service xl:min-h-[600px] flex justify-center lg:min-h-[480px] text-black mt-12 px-4 md:px-12 lg:px-8 xl:px-20"
      >
        <div className="w-full max-w-7xl flex flex-col h-full justify-center items-center space-y-8 lg:space-y-16">
          <h1 className="s text-2xl md:text-4xl font-semibold">Our Services</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 2xl:gap-10">
            {services?.map((service, index) => (
              <>
                <div
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay={`${index * 50}`}
                  data-aos-duration={`${500 / index}`}
                  className="hover:card-wrapper bg-white bg-opacity-30 backdrop-blur-3xl rounded-xl w-full h-full p-2 transition delay-150 duration-300 ease-in-out"
                >
                  <div
                    key={index}
                    className="group backdrop-blur-3xl overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-sm rounded-xl"
                  >
                    <div className="flex flex-col items-center gap-4 py-6 lg:py-16 transition-all ease-linear duration-500 rounded-xl">
                      <div className="h-20 w-20 flex items-center justify-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                        <img
                          src={`/${service.whiteImgUrl}`}
                          alt="On Hover"
                          className="w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <h3 className="text-lg md:text-xl xl:text-2xl font-medium text-primary">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base xl:text-lg text-center opacity-70 w-2/3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
