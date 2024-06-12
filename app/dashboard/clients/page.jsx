"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ClientMenu from "@/components/dashboard/menu/ClientMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import EmptyMenu from "@/components/dashboard/menu/EmptyMenu";

export default function Page() {
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    page: 1,
    perPage: 3,
  });

  const router = useRouter();

  async function fetchClientCategories() {
    setLoading(true);
    try {
      const response = await fetch(`../../api/categories?filter=client`, {
        method: "GET",
      });
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.log("Failed while fetching categories");
    } finally {
      setLoading(false);
    }
  }

  async function fetchClients(page) {
    setLoading(true);
    try {
      const response = await fetch(
        `../../api/clients?page=${page}&filter=${filter}`,
        {
          method: "GET",
          cache: "no-cache",
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
      const res = await fetch(`../../api/clients/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchClients(meta.currentPage);
      }
    } catch (error) {
      console.log("Error while deleting service : ", error);
    }
  }

  useEffect(() => {
    fetchClientCategories();
    fetchClients(meta.currentPage, filter);
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
                <DropdownMenuRadioItem value="ALL">All</DropdownMenuRadioItem>
                {categories?.map((category, index) => (
                  <DropdownMenuRadioItem key={index} value={category.id}>
                    {category.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <a onClick={() => router.push("/dashboard/clients/new")}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Client
              </span>
            </Button>
          </a>
        </div>
        <div className="overflow-x-hidden">
          {loading ? (
            <Loader />
          ) : data.length == 0 ? (
            <EmptyMenu title={"clients"} />
          ) : (
            <ClientMenu
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
