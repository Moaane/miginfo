"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function AboutSection() {
  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="container max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
        <Image
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="600"
          data-aos-delay="200"
          width={300}
          height={300}
          src="/img_holder.png"
          priority
          className="w-full h-full rounded-md"
        />
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="600"
          data-aos-delay="500"
          className="space-y-8 md:space-y-6 md:px-24 lg:px-0"
        >
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left px-8 lg:px-0">
            <p className="text-base md:text-lg lg:text-base font-bold text-primary">
              Discover our company
            </p>
            <h1 className="text-3xl md:text-5xl font-bold">
              We are a best IT solution provider
            </h1>
            <p className="text-base md:text-lg lg:text-lg font-medium">
              Since 2010 our company has been providing leading custom IT
              services to companies all over the world outsourced
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl font-bold text-primary">2.5K</h1>
              <p className="text-lg font-medium">Customers worldwide</p>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-6xl font-bold text-primary">105+</h1>
              <p>Projects Completed</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Button
              variant="primary"
              className="text-lg px-8 py-8 font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
