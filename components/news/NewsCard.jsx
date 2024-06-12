import React from "react";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import Link from "next/link";
import PaginationComponent from "../navigation/PaginationComponent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

const news = [
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
    slug: "news-berita",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
];

export default function NewsCard() {
  return (
    <div className=" flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white min-w-full max-w-[1440px] gap-8 justify-items-stretch py-12">
        {news.map((news, index) => (
          <Link
            href={`/news/${news.slug}`}
            key={index}
            className="w-full bg-base-100 shadow-xl rounded-2xl hover:scale-110 transition-all ease-out"
          >
            <figure>
              <img
                src={`/${news.imgUrl}`}
                alt="Shoes"
                className="rounded-2xl"
              />
            </figure>
            <div className="p-4 space-y-4">
              <h2 className="text-base font-medium">{news.title}</h2>
              <div className="justify-end">
                <Badge>{news.category}</Badge>
              </div>
            </div>
          </Link>
        ))}
        <Pagination className="col-span-3 w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem></PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationContent>
        </Pagination>
      </div>
      {/* <PaginationComponent /> */}
    </div>
  );
}
