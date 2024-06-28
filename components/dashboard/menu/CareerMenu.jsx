"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

export default function CareerMenu({ data, meta, onPageChange, onDelete }) {
  const [id, setId] = useState(null);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  async function handleDelete() {
    onDelete(id);
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <AlertDialog>
          <CardHeader>
            <CardTitle>Careers</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-hidden">
            <Table className="overflow-x-hidden">
              <TableHeader className="overflow-x-hidden">
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Job Type</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Job Model
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Job Status
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((prop, index) => (
                  <TableRow className="max-w-full" key={prop.id}>
                    <TableCell className="font-medium">
                      {index + 1 + (meta.currentPage - 1) * meta.perPage}
                    </TableCell>
                    <TableCell className="font-medium">
                      <p className="line-clamp-1">{prop.position}</p>
                    </TableCell>
                    <TableCell className="font-medium">
                      {{
                        FULLTIME: "Full Time",
                        PARTTIME: "Part Time",
                        INTERN: "Intern",
                      }[prop.type] || ""}
                    </TableCell>
                    <TableCell className="font-medium">
                      {{
                        WFO: "Work From Office",
                        WFH: "Work From Home",
                        HYBRID: "Work Mix",
                      }[prop.model] || ""}
                    </TableCell>
                    <TableCell className="font-medium">
                      {prop.active ? "Active" : "Not Active"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(prop.createdAt, "dd-MM-yyyy")}
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
                            <Link
                              href={`careers/update/${prop.id}`}
                              className="z-20"
                            >
                              Update
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <AlertDialogTrigger onClick={() => setId(prop.id)}>
                              Delete
                            </AlertDialogTrigger>
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
            <PaginationComponent meta={meta} onPageChange={handlePageChange} />
          </CardFooter>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                category item and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setId(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </>
  );
}
