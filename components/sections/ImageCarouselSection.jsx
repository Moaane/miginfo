"use client";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Aos from "aos";
import "aos/dist/aos.css";

const carousels = [
  {
    imgUrl: "img_holder.png",
    title: "Title ",
  },
  {
    imgUrl: "img_holder.png",
    title: "Title 2",
  },
  {
    imgUrl: "img_holder.png",
    title: "Title 3",
  },
];

export default function ImageCarouselSection() {
  // const [carousels, setCarousels] = useState([]);

  // async function fetchCarousels() {
  //   try {
  //     const response = await fetch("/api/carousels", {
  //       method: "GET",
  //       cache: "no-store",
  //     });

  //     const result = await response.json();
  //     setCarousels(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchCarousels();
  // }, []);

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Carousel
        data-aos="slide-right"
        data-aos-duration="1200"
        opts={{
          duration: 60,
          loop: true,
          direction: "right",
        }}
        plugins={[
          Autoplay({
            delay: 14060,
            loop: true,
            stopOnInteraction: false,
            stopOnFocusIn: false,
            stopOnMouseEnter: false,
            stopOnLastSnap: false,
          }),
        ]}
        className="w-full h-[90vh] overflow-hidden"
      >
        <CarouselContent>
          <CarouselItem className="p-0 px-0">
            <div className="bg-red-100">
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover object-top"
              >
                <source src="/video-hero.mp4" type="video/mp4" />
              </video>
            </div>
          </CarouselItem>
          {carousels?.map((carousel, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  backgroundImage: `url(/${carousel.imgUrl})`,
                  objectFit: "cover",
                }}
                className="text-black bg-cover object-center"
              >
                <div className="flex h-screen backdrop-brightness-50 bg-white/30 bg-opacity-60 justify-center items-center text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                      {carousel.title}
                    </h1>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </>
  );
}
