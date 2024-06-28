import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import "aos/dist/aos.css";
import Image from "next/image";

const NewsCard = React.forwardRef(({ news, ...props }, ref) => {
  return (
    <Link
      href={`/news/${news.slug}`}
      className="group text-wrap hover:animate-border-animation inline-block rounded-md hover:bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-[8px]"
      {...props}
      ref={ref}
    >
      <div className="text-wrap">
        <figure className="overflow-hidden">
          <Image
            height={300}
            width={300}
            src={`/api/images/${news.image.filename}`}
            alt={news.image.name}
            priority
            className="rounded-t-md w-full min-h-[300px] group-hover:scale-110 transition-all duration-300 ease-out bg-white object-cover"
          />
        </figure>

        <div className="bg-white/95 shadow-md rounded-b-md min-h-[120px] p-4 space-y-4 text-wrap flex flex-col justify-between">
          <h2 className="text-base font-medium line-clamp-2">{news.title}</h2>
          <Badge className="bg-primary w-fit">
            {news.newsCategories[0]?.categories?.name}
          </Badge>
        </div>
      </div>
    </Link>
  );
});

export default NewsCard;
