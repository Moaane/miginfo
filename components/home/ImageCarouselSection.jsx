"use client";
import React, { useEffect } from "react";
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
            delay: 10000,
            loop: true,
            stopOnInteraction: false,
            stopOnFocusIn: false,
            stopOnMouseEnter: false,
            stopOnLastSnap: false,
          }),
        ]}
        className="w-full relative h-screen bg-white cs"
      >
        <CarouselContent>
          <CarouselItem>
            <video autoPlay loop muted className="w-full h-full max-h-screen max-w-none ">
              <source src="/video/video-hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
