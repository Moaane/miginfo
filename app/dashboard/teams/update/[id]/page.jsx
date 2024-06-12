"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/loader/Loader";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  order: z.number().min(1, "order is required"),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Email not valid"),
  linkedin: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((image) => {
      if (!image || image.length === 0) return true;
      return image[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((image) => {
      if (!image || image.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(image[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  imageName: z.string().optional(),
});

export default function page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updatedPreviewUrl, setUpdatedPreviewUrl] = useState(null);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      order: 1,
      twitter: "",
      facebook: "",
      email: "",
      linkedin: "",
      image: "",
    },
  });

  const imageRef = form.register("image");
  const watchedImage = form.watch("image");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("order", data.order);
      formData.append("twitter", data.twitter);
      formData.append("facebook", data.facebook);
      formData.append("email", data.email);
      formData.append("linkedin", data.linkedin);
      formData.append("image", data.image[0]);

      const response = await fetch(`../../../api/teams/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 200) {
        router.back();
      }
    } catch (error) {
      console.log("Error while creating service : ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeam(id) {
    try {
      setLoading(true);
      const response = await fetch(`../../../api/teams/${id}`, {
        method: "GET",
      });

      const result = await response.json();

      form.setValue("name", result.data.name);
      form.setValue("position", result.data.position);
      form.setValue("order", result.data.order);
      form.setValue("twitter", result.data.twitter || "");
      form.setValue("facebook", result.data.facebook || "");
      form.setValue("email", result.data.email);
      form.setValue("linkedin", result.data.linkedin || "");

      setPreviewUrl(result.data.image.filename);
    } catch (error) {
      console.log("Error while getting team : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeam(id);
  }, [id]);

  const setPreview = (files, setPreviewUrl) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPreview(watchedImage, setUpdatedPreviewUrl);
  }, [watchedImage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft
                      onClick={() => router.push("/dashboard/services")}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Services
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {loading ? (
                      <Button variant="primary" size="sm">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Save Product
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm">
                        Save Product
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                        {/* <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription> */}
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
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="position"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Poisition</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="position"
                                      className="w-full"
                                      placeholder="position"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="order"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Poisition</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="order"
                                      className="w-full"
                                      placeholder="position"
                                      {...field}
                                      type="number"
                                      min="1"
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
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Social Media (link)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="twitter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Twitter (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="twitter"
                                      className="w-full"
                                      placeholder="twitter"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="facebook"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Facebook (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="facebook"
                                      className="w-full"
                                      placeholder="facebook"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="email"
                                      className="w-full"
                                      placeholder="email"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Linkedin (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="linkedin"
                                      className="w-full"
                                      placeholder="linkedin"
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

                    <Card
                      className="overflow-hidden mb-6"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <FormField
                        className="col-span-3 w-full"
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <CardHeader>
                              <CardTitle>Team Image</CardTitle>
                              <CardDescription>
                                Team image will be used on about page
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-2">
                                <Image
                                  alt="Team image"
                                  className="aspect-square w-full rounded-md object-contain"
                                  height="300"
                                  src={
                                    updatedPreviewUrl
                                      ? updatedPreviewUrl
                                      : `/api/images/${previewUrl}`
                                  }
                                  width="300"
                                  priority
                                />
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                  <Input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    {...imageRef}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </CardContent>
                          </FormItem>
                        )}
                      />
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
