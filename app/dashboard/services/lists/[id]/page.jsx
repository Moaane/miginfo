"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "@/components/navigation/PaginationComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import EmptyMenu from "@/components/dashboard/menu/EmptyMenu";

export default function Page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    page: 1,
    perPage: 3,
  });

  const router = useRouter();

  async function fetchServices(page, id) {
    try {
      setLoading(true);
      const res = await fetch(
        `../../../api/services/${id}/lists?page=${page}&perPage=${meta.perPage}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setData(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log("Error while getting service lists");
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

  async function handleDelete(listId) {
    try {
      setLoading(true);
      const res = await fetch(`../../../api/services/${id}/lists/${listId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices(meta.currentPage, id);
      }
    } catch (error) {
      console.log("Error while deleting service : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices(meta.currentPage, id);
  }, [meta.currentPage, id]);
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
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <a onClick={() => router.push(`${id}/new`)}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add List
              </span>
            </Button>
          </a>
        </div>

        {loading ? (
          <Loader />
        ) : data.length == 0 ? (
          <EmptyMenu title={"lists"} />
        ) : (
          <div className="overflow-x-hidden">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>{data[0]?.Services?.name} lists </CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.map((prop) => (
                      <TableRow key={prop.id}>
                        <TableCell className="font-medium">
                          {prop.order}
                        </TableCell>
                        <TableCell className="font-medium">
                          {prop.title}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`update/${prop.id}`}>Update</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(prop.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <PaginationComponent
                  meta={meta}
                  onPageChange={handlePageChange}
                />
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
