"use client";
import NewsCard from "@/components/news/NewsCard";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

export default function page() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="mt-32 lg:mt-32 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
      <div className="bg-white lg:min-h-full text-black pb-4 lg:pb-0">
        <div className="flex justify-between p-0 w-full max-w-[1440px]">
          <div className="a">
            <h1 className="text-2xl text-primary md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold">
              News & Events
            </h1>
            <p className="text-sm py-2 pb-4 md:py-4 leading-loose">
              miginfo company and culture are a lot like our product. They’re
              crafted, not cobbled, for a delightful experience.
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="published">
                  News
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="onSection">
                  Events
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <NewsCard />
    </div>
  );
}
