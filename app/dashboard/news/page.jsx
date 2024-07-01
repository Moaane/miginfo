"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { File, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import NewsMenu from "@/components/dashboard/menu/NewsMenu";
import EmptyMenu from "@/components/dashboard/menu/EmptyMenu";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
  });

  const router = useRouter();

  async function fetchNews(page) {
    try {
      setLoading(true);
      const response = await fetch(`../../api/news?page=${page}`, {
        method: "GET",
      });

      const result = await response.json();

      setData(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log("Error while getting news");
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (page) => {
    setMeta((prevMeta) => ({
      ...prevMeta,
      currentPage: page,
    }));
  };

  async function handleDelete(id) {
    try {
      setLoading(true);
      const response = await fetch(`../../api/news/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === 200) {
        fetchNews(meta.currentPage);
      }
    } catch (error) {
      console.log("Error while deleting news : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(meta.currentPage);
  }, [meta.currentPage]);
  return (
    <>
      <main className="grid flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-hidden">
        <div className="ml-auto pt-4">
          <a onClick={() => router.push("/dashboard/news/new")}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add News
              </span>
            </Button>
          </a>
        </div>
        <div className="overflow-x-hidden">
          {loading ? (
            <Loader />
          ) : data.length === 0 ? (
            <EmptyMenu title={"news"} />
          ) : (
            <NewsMenu
              data={data}
              meta={meta}
              onPageChange={handlePageChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </>
  );
}
