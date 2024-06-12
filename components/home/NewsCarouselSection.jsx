"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import Aos from "aos";
import "aos/dist/aos.css";

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
        className="bg-white aos-animate flex justify-center items-center lg:min-h-[600px] text-black md:mt-8 px-4 lg:px-8 xl:px-20"
      >
        <div className="flex-col w-full h-full justify-items-center justify-center items-center max-w-7xl space-y-8 lg:space-y-16">
          <h1 className="n text-2xl md:text-4xl text-center font-semibold">
            Recent News & Events
          </h1>

          <Carousel opts={{}} className="px-4 lg:px-8 xl:px-0">
            <CarouselContent>
              {news.map((news, index) => (
                <CarouselItem
                  key={index}
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay={`${index * 250}`}
                  data-aos-duration={`${750 / index}`}
                  className="n lg:basis-1/3 n max-w-sm"
                >
                  <figure>
                    <img src={`/${news.imgUrl}`} alt="Shoes" />
                  </figure>
                  <div className="card-body p-4 space-y-4">
                    <h2 className="card-title text-base font-medium">
                      {news.title}
                    </h2>
                    <Badge className="bg-primary">{news.category}</Badge>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
