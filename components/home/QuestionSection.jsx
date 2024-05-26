"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function QuestionSection() {
  const container = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".q",
        { y: 500, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 5,
          ease: "power1.inOut",
          scrollTrigger: {
            once: true,
            trigger: ".question",
            start: "top bottom",
            end: "center bottom",
            scrub: 2,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="question bg-primary lg:min-h-[600px] text-black flex justify-center items-center px-4 lg:px-8 xl:px-0 py-6">
        <div className="w-full h-full flex flex-col-reverse lg:flex-row space-y-4 justify-center items-center px-0 max-w-7xl">
          <div className="q lg:w-1/2 w-full">
            <div className="pt-6">
              <h1 className="text-2xl text-center lg:text-left text-white md:text-3xl lg:text-4xl xl:text-6xl font-semibold">
                Got questions?
              </h1>
            </div>
            <p className="text-sm py-6 text-center lg:text-left text-white md:py-4 leading-loose">
              Contact us through our 24/7 live chat.We’re always happy to help!
            </p>
            <div className="flex justify-center lg:block">
              <Button asChild variant="outline">
                <Link href="/contact">Let's talk</Link>
              </Button>
            </div>
          </div>
          <div className="q lg:w-1/2 flex w-full justify-center lg:justify-end">
            <img
              src="/img_holder.png"
              className="md:max-w-lg w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
