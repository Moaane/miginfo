"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";

const news = [
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      " Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
];

export default function NewsCarouselSection() {
  const container = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".n",
        { y: 500, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 10,
          scrollTrigger: {
            once: true,
            trigger: ".news",
            start: "top bottom",
            end: "center bottom ",
            scrub: 2, // Lower scrub value for more immediate scroll response
          },
        }
      );
    },
    { scope: container }
  );
  return (
    <div ref={container}>
      <div className="bg-white news flex justify-center items-center lg:min-h-[600px] text-black md:mt-8">
        <div className="flex-col w-full h-full justify-items-center justify-center items-center max-w-7xl space-y-16">
          <h1 className="n text-2xl md:text-4xl text-center font-semibold">
            Recent News & Events
          </h1>

          <Carousel
            className="px-4 lg:px-8 xl:px-0"
          >
            <CarouselContent>
              {news.map((news, index) => (
                <CarouselItem key={index} className="lg:basis-1/3 n">
                  <figure>
                    <img src={`/${news.imgUrl}`} alt="Shoes" />
                  </figure>
                  <div className="card-body p-4 space-y-4">
                    <h2 className="card-title text-base font-medium">
                      {news.title}
                    </h2>
                    <div className="card-actions justify-end">
                      <Badge className="bg-primary">{news.category}</Badge>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
