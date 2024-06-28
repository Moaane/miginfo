"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

export default function QuestionSection() {
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
        className="bg-primary lg:min-h-[600px] text-black flex items-center"
      >
        <div className="container max-w-7xl flex flex-col-reverse md:flex-row space-y-4 space-x-6 items-center">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="300"
            data-aos-duration="800"
            className="q md:w-1/2 w-full"
          >
            <div className="pt-6 text-center md:text-left text-wrap">
              <h1 className="text-2xl text-white md:text-3xl lg:text-4xl xl:text-6xl font-semibold">
                Got questions?
              </h1>
              <p className="text-sm py-6 text-white md:py-4 leading-loose">
                Contact us through our 24/7 live chat.We’re always happy to
                help!
              </p>
              <div className="flex justify-center md:block">
                <Button asChild variant="outline">
                  <Link href="/contact">Let's talk</Link>
                </Button>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="600"
            data-aos-duration="800"
            className="md:w-1/2 flex w-full justify-center lg:justify-end"
          >
            <img
              src="/img_holder.png"
              className="md:max-w-md w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
