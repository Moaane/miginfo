import NewsCard from "@/components/news/NewsCard";
import React from "react";
export default function page() {
  return (
    <>
      <div className="hero bg-white lg:min-h-[480px] text-black xl:px-24 lg:px-16 md:px-12 px-4 pb-4 lg:pb-0">
        <div className="hero-content flex justify-start p-0 bg-red-200 w-full max-w-[1440px]">
          <div className="a bg-red-300">
            <h1 className="text-2xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
              News
            </h1>
            <p className="text-sm py-2 pb-4 md:py-4 leading-loose">
              Miginfo company and culture are a lot like our product. They’re
              crafted, not cobbled, for a delightful experience.
            </p>
          </div>
        </div>
      </div>

      <NewsCard />
    </>
  );
}
