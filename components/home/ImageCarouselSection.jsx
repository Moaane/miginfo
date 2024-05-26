"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
// import { EffectCreative, Autoplay } from " swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const container = useRef(null);
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, loop: true })
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".cs",
        { x: -500, opacity: 0 },
        { x: 0, opacity: 1, ease: "power1.inOut", duration: 1 }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full h-screen bg-red-100 cs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carousels?.map((carousel, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  backgroundImage: `url(/${carousel.imgUrl})`,
                  objectFit: "cover",
                }}
                className="h-screen text-black bg-cover object-center"
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
    </div>
  );
}
