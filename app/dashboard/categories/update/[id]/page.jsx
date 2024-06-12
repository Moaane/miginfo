"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/loader/Loader";

const categoryTypes = ["SERVICE", "PARTNER", "CLIENT", "NEWS", "EVENT"];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type category is required"),
});

export default function page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);

      const res = await fetch(`../../../api/categories/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        router.back();
      }
    } catch (error) {
      console.log("Error while creating category : ", error);
    } 
  }

  async function fetchCategory(id) {
    try {
      const res = await fetch(`../../../api/categories/${id}`, {
        method: "GET",
      });

      const result = await res.json();

      form.setValue("name", result.data.name);
      form.setValue("type", result.data.type);
    } catch (error) {
      console.log("Error while getting category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft
                      onClick={() => router.back()}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 w-full shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Category
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {/* <Button variant="outline" size="sm">
              Discard
            </Button> */}
                    <Button variant="primary" size="sm">
                      Save Product
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] min-w-full lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max min-w-full items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="name"
                                      className="w-full"
                                      placeholder="name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Service Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="type"
                                        aria-label="Select category type"
                                      >
                                        <SelectValue placeholder="Select category type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categoryTypes?.map((prop, index) => (
                                        <SelectItem key={index} value={prop}>
                                          {prop}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8"></div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
