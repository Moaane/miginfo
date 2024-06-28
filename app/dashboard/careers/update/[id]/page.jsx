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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";

const formSchema = z.object({
  position: z.string().min(1, "Job position is required"),
  requirement: z.string().optional(),
  description: z.string().optional(),
  responsibility: z.string().optional(),
  benefit: z.string().optional(),
  howToApply: z.string().optional(),
  type: z.string().min(1, "Type job is required"),
  model: z.string().min(1, "Model job is required"),
  active: z.boolean({ required_error: "Job status is required" }),
});

export default function page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      requirement: "",
      description: "",
      responsibility: "",
      benefit: "",
      howToApply: "",
      type: "",
      model: "",
      active: "",
    },
  });

  async function fetchCareer() {
    setLoading(true);
    try {
      const response = await fetch(`/api/career/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();
      form.setValue("position", result.data.position);
      form.setValue("description", result.data.description);
      form.setValue("requirement", result.data.requirement);
      form.setValue("responsibility", result.data.responsibility);
      form.setValue("benefit", result.data.benefit);
      form.setValue("howToApply", result.data.howToApply);
      form.setValue("type", result.data.type);
      form.setValue("model", result.data.model);
      form.setValue("active", result.data.active);

      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("position", data.position);
      formData.append("description", data.description);
      formData.append("requirement", data.requirement);
      formData.append("responsibility", data.responsibility);
      formData.append("benefit", data.benefit);
      formData.append("howToApply", data.howToApply);
      formData.append("type", data.type);
      formData.append("model", data.model);
      formData.append("active", data.active);

      const response = await fetch(`/api/career/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      switch (result.status) {
        case 200:
          toast.success("Career created successfully");
          router.push("/dashboard/careers");
          break;
        case 400:
        case 500:
          toast.error(result.message);
          break;
      }
    } catch (error) {
      console.log("Error while creating events : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCareer();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto w-full grid flex-1 auto-rows-max gap-4">
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
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Career
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="primary" size="sm">
                      Save Career
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Career Details</CardTitle>
                        {/* <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription> */}
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                  <Input
                                    name="position"
                                    className="w-full"
                                    placeholder="enter for job position"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Career Lists</CardTitle>
                        <CardDescription>
                          Every new line is new list!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <Textarea
                                    name="description"
                                    className="w-full"
                                    placeholder="enter job description"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="requirement"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Requirement</FormLabel>
                                  <Textarea
                                    name="requirement"
                                    className="w-full"
                                    placeholder="enter job requirement"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="responsibility"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Responsibility</FormLabel>
                                  <Textarea
                                    name="responsibility"
                                    className="w-full"
                                    placeholder="enter job responsibility"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="benefit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Benefit</FormLabel>
                                  <Textarea
                                    name="benefit"
                                    className="w-full"
                                    placeholder="enter job benefit"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="howToApply"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>How To Apply</FormLabel>
                                  <FormDescription>
                                    This is not list
                                  </FormDescription>
                                  <Textarea
                                    name="howToApply"
                                    className="w-full"
                                    placeholder="enter job how to apply"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Job Settings</CardTitle>
                        {/* <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                                </CardDescription> */}
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-3 ">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Job Type{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      id="type"
                                      aria-label="Select Job Type"
                                    >
                                      <SelectValue placeholder="Select Job Type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="FULLTIME">
                                      Full Time
                                    </SelectItem>
                                    <SelectItem value="PARTTIME">
                                      Part Time
                                    </SelectItem>
                                    <SelectItem value="INTERN">
                                      Intern
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3">
                          <FormField
                            className="col-span-3 w-full"
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Model</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Job Model" />
                                    </SelectTrigger>
                                  </FormControl>

                                  <SelectContent>
                                    <SelectItem value="WFO">
                                      Work From Office
                                    </SelectItem>
                                    <SelectItem value="WFH">
                                      Work From House
                                    </SelectItem>
                                    <SelectItem value="HYBRID">
                                      Work Mix
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3">
                          <FormField
                            className="col-span-3 w-full"
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Active Status</FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                  value={field.value ? "true" : "false"}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Active Status" />
                                    </SelectTrigger>
                                  </FormControl>

                                  <SelectContent>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">
                                      Not Active
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
