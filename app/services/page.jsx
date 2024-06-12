"use client";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import React, {useLayoutEffect, useRef} from "react";
import ServiceCard from "@/components/service/ServiceCard";

const services = [
    {
        imgUrl: "manage-icon.png",
        whiteImgUrl: "manage-icon-white.png",
        title: "Project Management",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
    {
        imgUrl: "quality-icon.png",
        whiteImgUrl: "quality-icon-white.png",
        title: "Quality Testing",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
    {
        imgUrl: "architecture-icon.png",
        whiteImgUrl: "",
        title: "Architecture",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
    {
        imgUrl: "development-icon.png",
        whiteImgUrl: "",
        title: "Development",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
    {
        imgUrl: "bussiness-icon.png",
        whiteImgUrl: "",
        title: "Bussiness Analyst",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
    {
        imgUrl: "maintenance-icon.png",
        whiteImgUrl: "",
        title: "Maintenance",
        description:
            "At MIGINFO, all of our IT Project Managers go thru a rigorous training in managerial skills.",
    },
];

export default function page() {
    const container = useRef()
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    });

    useGSAP(() => {
        gsap.fromTo(
            ".a",
            {y: 300, opacity: 0},
            {
                y: 0,
                opacity: 1,
                stagger: 0.3,
                duration: 1,
                ease: "power1.inOut",
            }
        );

        gsap.fromTo(
            ".b",
            {y: 300, opacity: 0},
            {
                y: 0,
                delay: 0.5,
                stagger: 0.3,
                opacity: 1,
                duration: 1,
                ease: "power1.inOut",
            }
        );

        gsap.fromTo(
            ".s",
            {y: 300, opacity: 0},
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 10,
                ease: "power1.inOut",
                scrollTrigger: {
                    once: true,
                    trigger: ".service",
                    start: "top bottom",
                    end: "center bottom",
                    scrub: 2, // Lower scrub value for more immediate scroll response
                },
            }
        );
    }, {scope: container});

    return (
        <div className="pb-24">
            <div ref={container} className="mt-32 lg:mt-16 space-y-24 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
                <div
                    className="flex flex-col lg:flex-row items-center bg-white lg:min-h-[350px] text-black">
                    <div className="a lg:w-1/2">
                        <h1 className="text-2xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
                            Services
                        </h1>
                        <p className="text-sm py-2 pb-4 md:py-4 xl:text-lg leading-loose">
                            Miginfo company and culture are a lot like our product. They’re
                            crafted, not cobbled, for a delightful experience.
                        </p>
                    </div>
                    <div className="a lg:w-1/2 flex w-full justify-center lg:justify-end">
                        <img
                            src="/img_holder.png"
                            className="max-w-64 md:max-w-sm max-h-64 2xl:max-w-lg w-full rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
                <div
                    className="bg-white flex flex-col lg:flex-row-reverse lg:min-h-[350px] text-black">
                    <div className="c lg:w-1/2">
                        <h1 className="text-xl text-primary md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
                            The Company
                        </h1>
                        <p className="text-sm py-2 pb-4 md:py-4 xl:text-lg 2xl:text-xl leading-loose">
                            ICT Solutions integrates IT and communication technologies for
                            corporate clients. Its sister company, ICT Software, specializes
                            in MS SharePoint solutions. Both leverage expertise and
                            experienced management in complex IT and telecom projects.
                        </p>
                    </div>
                    <div className="c flex justify-center lg:justify-start lg:w-1/2 w-full">
                        <img
                            src="/img_holder.png"
                            className="max-w-64 max-h-64 md:max-w-sm 2xl:max-w-lg w-full rounded-xl shadow-2xl"
                        />
                    </div>
                </div>

            </div>
            <ServiceCard/>
        </div>

    );
}
