"use client";
import NewsCard from "@/components/news/NewsCard";
import React, { useEffect, useState } from "react";
import PaginationComponent from "@/components/navigation/PaginationComponent";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState();
  const [meta, setMeta] = useState({
    currentPage: 1,
  });

  async function fetchNews(page) {
    try {
      setLoading(true);
      const response = await fetch(`../api/news?page=${page}`, {
        method: "GET",
      });

      const result = await response.json();

      setDatas(result.data);
      console.log(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log("Error while getting news");
    } finally {
      setLoading(false);
      Aos.refresh();
    }
  }

  async function fetchNewsPage() {
    setLoading(true);
    try {
      const response = await fetch("../api/pages/news", {
        method: "GET",
      });
      const result = await response.json();
      setPage(result.data[0]);
    } catch (error) {
    } finally {
      setLoading(false);
      Aos.refresh();
    }
  }

  const handlePageChange = (page) => {
    setMeta((prevMeta) => ({
      ...prevMeta,
      currentPage: page,
    }));
  };

  useEffect(() => {
    fetchNewsPage();
    fetchNews(meta.currentPage);
  }, [meta.currentPage]);

  useEffect(() => {
    Aos.init({
      startEvent: "DOMContentLoaded",
      animatedClassName: "aos-animate",
      useClassNames: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="mt-10 md:mt-20 min-h-screen">
      <div className="container max-w-7xl space-y-12">
        <div>
          {page && (
            <div
              className="text-center lg:text-left"
              data-aos="fade-up"
              data-aos-offset="200"
            >
              <h1 className="text-3xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
                {page.title}
              </h1>
              <p className="text-sm py-2 pb-4 md:py-4 leading-loose">
                {page.description}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md: min-w-full gap-8">
          {datas.map((data, index) => (
            <NewsCard
              data-aos="fade-up"
              data-aos-delay={`${index * 500}`}
              data-aos-duration={`${500 * index}`}
              news={data}
              key={data.id}
            />
          ))}
        </div>
        <div className="py-6">
          <PaginationComponent meta={meta} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
