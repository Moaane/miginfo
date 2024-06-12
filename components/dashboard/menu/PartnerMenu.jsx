"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export default function PartnerMenu({ data, meta, onPageChange, onDelete }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  async function handleDelete(id) {
    onDelete(id);
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-hidden">
          <Table className="overflow-x-hidden">
            <TableHeader className="overflow-x-hidden">
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Logo</TableHead>
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
                  <TableCell className="font-medium">{prop.name}</TableCell>
                  <TableCell className="font-medium">
                    {prop.partnerCategories[0]?.categories?.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-auto rounded-md object-contain"
                      height="64"
                      width="64"
                      src={`/api/images/${prop.image.filename}`}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {prop.createdAt}
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
                            href={`partners/update/${prop.id}`}
                            className="z-20"
                          >
                            Update
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <p onClick={() => handleDelete(prop.id)}>Delete</p>
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
      </Card>
    </>
  );
}
