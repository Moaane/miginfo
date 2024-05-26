"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect } from "react";

const services = [
  {
    imgUrl: "manage-icon.png",
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

export default function page() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useGSAP(() => {
    gsap.fromTo(
      ".a",
      { y: 300, opacity: 0 },
      {
        y: 0,
        stagger: 0.3,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }
    );

    gsap.fromTo(
      ".b",
      { y: 300, opacity: 0 },
      {
        y: 0,
        delay: 0.5,
        stagger: 0.3,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }
    );

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
  });
  return (
    <>
      <div className="hero bg-white lg:min-h-[480px] text-black xl:px-24 lg:px-16 md:px-12 px-4 pb-4 lg:pb-0">
        <div className="hero-content w-full flex-col lg:flex-row space-y-4 md:space-y-4 px-0 2xl:min-w-[1440px]">
          <div className="a lg:w-1/2">
            <h1 className="text-2xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
              Services
            </h1>
            <p className="text-sm py-2 pb-4 md:py-4 xl:text-lg leading-loose">
              Miginfo company and culture are a lot like our product. They’re
              crafted, not cobbled, for a delightful experience.
            </p>
          </div>
          <div className="a lg:w-1/2 flex w-full justify-center lg:justify-end">
            <img
              src="/img_holder.png"
              className="max-w-64 md:max-w-sm 2xl:max-w-lg w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="hero bg-white lg:min-h-[480px] text-black xl:px-24 lg:px-16 md:px-12 px-4">
        <div className="hero-content flex-col lg:flex-row-reverse space-y-4 md:space-y-4 px-0 2xl:min-w-[1440px]">
          <div className="b lg:w-1/2">
            <h1 className="text-xl text-primary md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              The Company
            </h1>
            <p className="text-sm py-2 pb-4 md:py-4 xl:text-lg 2xl:text-xl leading-loose">
              ICT Solutions integrates IT and communication technologies for
              corporate clients. Its sister company, ICT Software, specializes
              in MS SharePoint solutions. Both leverage expertise and
              experienced management in complex IT and telecom projects.
            </p>
          </div>
          <div className="b lg:w-1/2 flex w-full justify-center lg:justify-start">
            <img
              src="/img_holder.png"
              className="max-w-64 md:max-w-sm 2xl:max-w-lg w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="hero service bg-white service xl:min-h-[80vh] flex justify-center items-center lg:min-h-[480px] text-black xl:px-24 lg:px-16 md:px-8 px-2 pb-16">
        <div className="hero-content flex-col h-full justify-start w-full md:space-y-4 px-0 gap-16">
          <h1 className="s text-2xl md:text-4xl font-semibold">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:min-w-[1440px] 2xl:gap-10">
            {services?.map((service, index) => (
              <div
                key={index}
                className="s glass shadow-sm flex flex-col items-center gap-4 py-6 lg:py-16 hover:bg-primary group transition-all ease-out duration-500 rounded-xl"
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
    </>
  );
}
