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
import Link from "next/link";
import Image from "next/image";

export default function NewsCarouselSection({ news }) {
  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
      once: true,
    });
  });

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-duration="600"
        className="aos-animate text-black"
      >
        <div className="container max-w-7xl space-y-12">
          <h1 className="text-2xl md:text-4xl text-center font-semibold">
            Recent News & Events
          </h1>

          <Carousel opts={{}} className="w-full">
            <CarouselContent className="px-4">
              {news.map((news, index) => (
                <CarouselItem
                  key={news.id}
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay={`${index * 250}`}
                  data-aos-duration={`${750 / index}`}
                  className="md:basis-1/2 lg:basis-1/3 hover:card-wrapper p-2"
                >
                  <Link
                    href={`/news/${news.slug}`}
                    className="rounded-md"
                  >
                    <figure>
                      <Image
                        height={200}
                        width={200}
                        src={`/api/images/${news.image.filename}`}
                        alt={news.image.name}
                        className="rounded-t-md object-cover w-full"
                      />
                    </figure>
                    <div className="p-4 bg-white rounded-b-md h-36 flex flex-col justify-between">
                      <h2 className="text-base font-medium text line-clamp-3">
                        {news.title}
                      </h2>
                      <Badge className="bg-primary w-fit">
                        {news.newsCategories[0]?.categories?.name}
                      </Badge>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
