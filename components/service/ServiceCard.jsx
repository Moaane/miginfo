"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";

const services = [
  {
    imgUrl: "icon/management-icon.svg",
    whiteImgUrl: "manage-icon-white.png",
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
    whiteImgUrl: "",
    title: "Architecture",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "development-icon.png",
    whiteImgUrl: "",
    title: "Development",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "bussiness-icon.png",
    whiteImgUrl: "",
    title: "Bussiness Analyst",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
  {
    imgUrl: "maintenance-icon.png",
    whiteImgUrl: "",
    title: "Maintenance",
    description:
      "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
  },
];
export default function ServiceCard() {
  const container = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });
  useGSAP(
    () => {
      gsap.fromTo(
        ".s",
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 10,
          ease: "power1.inOut",
          scrollTrigger: {
            once: true,
            trigger: ".service",
            start: "top bottom",
            end: "center bottom",
            scrub: 2, // Lower scrub value for more immediate scroll response
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-white">
      <div className="service xl:min-h-[600px] flex justify-center lg:min-h-[480px] text-black mt-12 px-4 lg:px-8 xl:px-0">
        <div className="w-full max-w-7xl flex flex-col h-full justify-center items-center space-y-16">
          <h1 className="s text-2xl md:text-4xl font-semibold">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10">
            {services?.map((service, index) => (
              <div
                key={index}
                className="s shadow-sm flex flex-col items-center gap-4 py-6 lg:py-16 hover:bg-primary group transition-all ease-out duration-500 rounded-xl"
              >
                <div className="relative">
                  <img
                    src={`/${service.imgUrl}`}
                    alt="Default"
                    className="w-10 h-10 md:w-14 md:h-14 group-hover:hidden"
                  />
                  <img
                    src={`/${service.whiteImgUrl}`}
                    alt="On Hover"
                    className="w-10 h-10 md:w-14 md:h-14 hidden group-hover:block"
                  />
                </div>
                <h3 className="text-lg md:text-xl xl:text-2xl font-medium text-primary group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base xl:text-lg text-center group-hover:text-white opacity-70 w-2/3">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
