import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

async function fetchNews(slug) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/news/item/${slug}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function page({ params }) {
  const { slug } = params;
  const news = await fetchNews(slug);
  return (
    <div className="mt-8">
      <div className="container max-w-7xl">
        <Image
          src={`/api/images/${news.image.filename}`}
          width={512}
          height={512}
          className="w-full max-h-[500px] object-cover"
        />
        <div className="py-6 space-y-4">
          <Badge>{news.newsCategories[0].categories.name}</Badge>
          <h1 className="text-2xl font-semibold">{news.title}</h1>
          {/* <div className="textarea-sm space-y-6">
            {content?.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div> */}
          <div dangerouslySetInnerHTML={{ __html: news.description }} />\
          <div className="space-y-4">
            <h3>Published by {news.users.username}</h3>
            <h3>{format(news.createdAt, "dd-MM-yyyy")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
