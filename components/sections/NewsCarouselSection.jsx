"use client";
import React, { useEffect, useState } from "react";
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

export default function NewsCarouselSection() {
  const [news, setNews] = useState([]);

  async function fetchNews() {
    try {
      const response = await fetch("/api/news", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();
      setNews(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

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
        <div className="container max-w-7xl space-y-6 md:space-y-12">
          <div className="text-center md:px-24 xl:px-52 space-y-4 md:space-y-6">
            <p className="text-base md:text-lg lg:text-base font-bold text-primary">
              Discover our activies
            </p>
            <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold">
              Explore in Detail What We Do and Our Service
            </h1>
          </div>

          <Carousel opts={{}} className="w-full">
            <CarouselContent className="px-4">
              {news?.map((news, index) => (
                <CarouselItem
                  key={news.id}
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay={`${index * 250}`}
                  data-aos-duration={`${750 / index}`}
                  className="md:basis-1/2 lg:basis-1/3 hover:card-wrapper hover:card-wrapper-right p-2"
                >
                  <Link href={`/news/${news.slug}`} className="rounded-md">
                    <figure>
                      <Image
                        height={200}
                        width={200}
                        src={`/api/images/${news.image.filename}`}
                        alt={news.image.name}
                        className="rounded-t-md object-cover w-full"
                      />
                    </figure>
                    <div className="p-4 bg-white rounded-b-md h-36 flex flex-col justify-between shadow-md">
                      <h2 className="text-balance font-medium line-clamp-3">
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
