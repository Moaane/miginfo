"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import EventMenu from "@/components/dashboard/menu/EventMenu";
import EmptyMenu from "@/components/dashboard/menu/EmptyMenu";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    page: 1,
  });

  const router = useRouter();

  async function fetchEvents(page) {
    try {
      setLoading(true);
      const response = await fetch(`/api/events?page=${page}`, {
        method: "GET",
      });

      const result = await response.json();

      setData(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log("Error while getting services");
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
    setLoading(true);
    try {
      const response = await fetch(`../../api/events/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === 200) {
        fetchEvents(meta.currentPage);
      }
    } catch (error) {
      console.log("Error while deleting service : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents(meta.currentPage);
  }, [meta.currentPage]);
  return (
    <>
      <main className="grid flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-hidden">
        <div className="ml-auto pt-4">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <a onClick={() => router.push("/dashboard/events/new")}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Events
              </span>
            </Button>
          </a>
        </div>
        <div className="overflow-x-hidden">
          {loading ? (
            <Loader />
          ) : data.length == 0 ? (
            <EmptyMenu title={"events"} />
          ) : (
            <EventMenu
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
