"use client";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [teams, setTeams] = useState([]);

  async function fetchAboutPage() {
    setLoading(true);
    try {
      const response = await fetch("../api/pages/about", {
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

  async function fetchTeams() {
    setLoading(true);
    try {
      const response = await fetch("../api/teams", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setTeams(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAboutPage();
    fetchTeams();
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
    <div className="mt-6 md:mt-20 flex justify-center min-h-screen items-center lg:mt-20 px-4 md:px-16 xl:px-20">
      <div className="w-full max-w-7xl space-y-20 md:space-y-20 lg:space-y-32 2xl:space-y-52 pb-32">
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
              className={`flex w-full flex-col gap-x-12 ${
                data.direction === "RIGHT"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              } text-black space-y-4`}
            >
              <div className="md:w-1/2 h-full flex flex-col justify-center md:pt-12">
                <h1 className="text-3xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
                  {data.title}
                </h1>
                <p className="text-sm py-2 xl:text-lg leading-loose">
                  {data.description}
                </p>
              </div>
              <div
                className={`md:w-1/2 h-full flex justify-center items-center ${
                  data.direction === "RIGHT"
                    ? "lg:justify-start"
                    : "lg:justify-end"
                }`}
              >
                <Image
                  width={300}
                  height={300}
                  src={data.image.url}
                  className="max-w-64 md:max-w-sm max-h-40 md:max-h-52 lg:max-w-md lg:max-h-64 2xl:max-w-lg w-full rounded-xl shadow-2xl object-cover"
                />
              </div>
            </div>
          ))
        )}
        {loading ? (
          <></>
        ) : (
          <div className="flex-col h-full justify-start w-full">
            <h1
              data-aos="fade-up"
              data-aos-offset="200"
              className="w-full text-center text-2xl md:text-4xl text-primary font-semibold mb-4"
            >
              Our Teams
            </h1>
            <div className="grid justify-items-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 w-full gap-y-12 pb-6">
              {teams?.map((team, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay={`${index * 250}`}
                  data-aos-duration={`${750 / index}`}
                  key={team.id}
                  className="max-w-64 w-full h-full md:max-w-full flex flex-col items-center shadow-xl rounded-lg"
                >
                  <figure className="px-6 pt-6 lg:px-8 xl:px-10 lg:pt-10">
                    <Image
                      height={160}
                      width={160}
                      src={team.image.url}
                      alt={team.image.name}
                      className="w-40 h-40 rounded-xl"
                    />
                  </figure>
                  <div className="w-full items-center text-center">
                    <h2 className="font-medium text-lg pt-4">{team.name}</h2>
                    <p className="text-lg font-semibold">{team.position}</p>
                    <div className="flex justify-between w-full px-6 py-6 lg:px-10 lg:py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        className="fill-primary h-8 w-8"
                      >
                        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        className="fill-primary h-8 w-8"
                      >
                        <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        className="fill-primary h-8 w-8"
                      >
                        <path d="M12 23.403V23.39 10.389L11.88 10.3h-.01L9.14 8.28C7.47 7.04 5.09 7.1 3.61 8.56 2.62 9.54 2 10.9 2 12.41v3.602L12 23.403zM38 23.39v.013l10-7.391V12.41c0-1.49-.6-2.85-1.58-3.83-1.46-1.457-3.765-1.628-5.424-.403L38.12 10.3 38 10.389V23.39zM14 24.868l10.406 7.692c.353.261.836.261 1.189 0L36 24.868V11.867L25 20l-11-8.133V24.868zM38 25.889V41c0 .552.448 1 1 1h6.5c1.381 0 2.5-1.119 2.5-2.5V18.497L38 25.889zM12 25.889L2 18.497V39.5C2 40.881 3.119 42 4.5 42H11c.552 0 1-.448 1-1V25.889z"></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        className="fill-primary h-8 w-8"
                      >
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
