"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
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

export default function ServiceMenu({ data, meta, onPageChange, onDelete }) {
  const [id, setId] = useState(null);

  const router = useRouter();

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
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Click on row table to see service list
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-hidden">
            <Table className="overflow-x-hidden">
              <TableHeader className="overflow-x-hidden">
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>On Section</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Icon</TableHead>
                  <TableHead className="hidden md:table-cell">Image</TableHead>
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
                  <TableRow
                    className="max-w-full"
                    key={prop.id}
                    onClick={() => router.push(`services/lists/${prop.id}`)}
                  >
                    <TableCell className="font-medium">
                      {index + 1 + (meta.currentPage - 1) * meta.perPage}
                    </TableCell>
                    <TableCell className="font-medium">{prop.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {prop.description}
                    </TableCell>
                    <TableCell className="font-medium">{prop.slug}</TableCell>
                    <TableCell>
                      <Badge
                        variant={prop.onSection ? "default" : "destructive"}
                      >
                        {prop.onSection ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={prop.status ? "success" : "destructive"}>
                        {prop.status ? "Pusblished" : "Not Published"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {prop.serviceCategories[0]?.categories?.name}
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={prop.icon.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={`/api/images/${prop.icon.filename}`}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={prop.image.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={`/api/images/${prop.image.filename}`}
                        width="64"
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
                          <DropdownMenuItem
                            asChild
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Link
                              href={`services/update/${prop.id}`}
                              className="z-20"
                            >
                              Update
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
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
                This action cannot be undone. This will permanently delete your
                service item and remove your data from our servers.
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
