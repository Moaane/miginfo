"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "@/components/service/ServiceCard";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [services, setServices] = useState([]);

  async function fetchServicePage() {
    setLoading(true);
    try {
      const response = await fetch("/api/pages/services", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setDatas(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServicePage();
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
    <div className="mt-6 md:mt-20 min-h-screen">
      <div className="container w-full max-w-7xl space-y-20 lg:space-y-52 pb-32">
        {loading ? (
          <></>
        ) : (
          datas?.map((data, index) => (
            <div
              key={data.id}
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay={`${index * 250}`}
              data-aos-duration={`${750 / index}`}
              className={`flex w-full flex-col gap-x-12 md:${
                data.direction === "RIGHT" ? "flex-row-reverse" : "flex-row"
              } text-black space-y-4`}
            >
              <div className="md:w-1/2 flex flex-col justify-center">
                <h1 className="text-3xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
                  {data.title}
                </h1>
                <p className="text-sm py-2 xl:text-lg leading-loose">
                  {data.description}
                </p>
              </div>
              <div
                className={`md:w-1/2 flex justify-center items-center lg:${
                  data.direction === "LEFT"
                    ? "justify-end"
                    : data.direction === "RIGHT"
                    ? "justify-start"
                    : ""
                }`}
              >
                <Image
                  width={300}
                  height={300}
                  priority
                  src={`/api/images/${data.image.filename}`}
                  className="max-w-64 md:max-w-sm max-h-40 md:max-h-52 lg:max-w-md lg:max-h-64 2xl:max-w-lg w-full rounded-xl shadow-2xl object-cover"
                />
              </div>
            </div>
          ))
        )}
        {loading ? <></> : <ServiceCard />}
      </div>
    </div>
  );
}
