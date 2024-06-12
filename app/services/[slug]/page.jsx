"use client";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import React, {useLayoutEffect, useRef} from "react";

const lists = [
    {
        name: "Web Design",
    },
    {
        name: "Web Content Management System",
    },
    {
        name: "Web Application Development",
    },
    {
        name: "Portal Management",
    },
    {
        name: "Online Transaction",
    },
];

export default function page({params}) {
    const cleanSlug = params.slug.replace(/-/g, " ");
    const container = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    });

    useGSAP(
        () => {
            gsap.fromTo(
                ".a",
                {y: 300, opacity: 0},
                {y: 0, opacity: 1, duration: 1, ease: "power1.inOut", stagger: 0.3}
            );

            gsap.fromTo(
                ".l",
                {y: 300, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 3,
                    stagger: 0.5,
                    delay: 0.5,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        once: true,
                        trigger: ".list",
                        start: "top bottom",
                        end: "center bottom",
                        scrub: 2,
                    },
                }
            );
        },
        {scope: container}
    );

    return (
        <div ref={container} className="mt-32 lg:mt-16 space-y-24 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
            <div className="flex flex-col lg:flex-row items-center bg-white lg:min-h-[95vh] text-black">
                <div className="a lg:w-1/2">
                    <h1 className="text-xl text-primary md:text-4xl xl:text-5xl font-semibold capitalize">
                        {cleanSlug}
                    </h1>
                    <p className="text-sm py-2 pb-4 md:py-4 leading-loose">
                        Miginfo company and culture are a lot like our product. Theyre
                        crafted, not cobbled, for a delightful experience.
                    </p>
                </div>
                <div className="a lg:w-1/2 max-h-72 flex w-full justify-center lg:justify-end">
                    <img
                        src="/img_holder.png"
                        className="max-w-64 md:max-w-sm object-cover xl:max-w-lg w-full rounded-xl shadow-2xl"
                    />
                </div>
            </div>

            <div className="bg-white list pb-24 flex justify-center">
                <div className="2xl:max-w-[1440px] w-full">
                    <ul className="space-y-4">
                        {lists?.map((list, index) => (
                            <li key={index} className="flex l gap-4 items-center group w-fit">
                                <div
                                    className="border-primary border text-primary w-8 h-8 flex justify-center items-center rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-150 ease-linear">
                                    {index + 1}
                                </div>
                                <p className="font-medium2 group-hover:text-primary">
                                    {list.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
