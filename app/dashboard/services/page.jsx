"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ListFilter, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ServiceMenu from "@/components/dashboard/menu/ServiceMenu";
import EmptyMenu from "@/components/dashboard/menu/EmptyMenu";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [meta, setMeta] = useState({
    currentPage: 1,
    page: 1,
    perPage: 3,
  });

  const router = useRouter();

  async function fetchServices(page, filter) {
    try {
      setLoading(true);
      const response = await fetch(
        `../../api/services?page=${page}&perPage=${meta.perPage}&filter=${filter}`,
        {
          method: "GET",
        }
      );
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
    try {
      setLoading(true);
      const response = await fetch(`../../api/services/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchServices(meta.currentPage, filter);
      }
    } catch (error) {
      console.log("Error while deleting service : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices(meta.currentPage, filter);
  }, [meta.currentPage, filter]);
  return (
    <>
      <main className="grid flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-hidden">
        <div className="ml-auto pt-4">
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
                  Published
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="onSection">
                  On Section
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <a onClick={() => router.push("/dashboard/services/new")}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Services
              </span>
            </Button>
          </a>
        </div>
        <div className="overflow-x-hidden">
          {loading ? (
            <Loader />
          ) : data.length == 0 ? (
            <EmptyMenu title={"services"} />
          ) : (
            <ServiceMenu
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
