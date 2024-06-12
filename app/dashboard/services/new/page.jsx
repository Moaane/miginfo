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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().nullable(),
  description: z.string().nullable(),
  category: z.string().min(1, "Category is required"),
  onSection: z.boolean({ required_error: "On section status is required" }),
  status: z.boolean({ required_error: "Publish status is required" }),
  icon: z
    .any()
    .optional()
    .refine(
      (icon) => {
        if (!icon || icon.length === 0) return true; // File is optional
        return icon[0]?.size <= MAX_FILE_SIZE;
      },
      { message: `Max image size is 5MB.` }
    )
    .refine(
      (icon) => {
        if (!icon || icon.length === 0) return true; // File is optional
        return ACCEPTED_IMAGE_TYPES.includes(icon[0]?.type);
      },
      { message: "Only .jpg, .jpeg, .png and .webp formats are supported." }
    ),
  image: z
    .any()
    .refine((image) => {
      if (image.length === 0) return false; // File is required
      return true;
    }, "Image is required.")
    .refine((image) => {
      return image[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((image) => {
      return ACCEPTED_IMAGE_TYPES.includes(image[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  imageName: z.string().optional(),
});

export default function page() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewIconUrl, setPreivewIconUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "",
      image: "",
      imageName: "",
      icon: "",
    },
  });

  const imageRef = form.register("image");
  const watchedImage = form.watch("image");
  const iconRef = form.register("icon");
  const watchedIcon = form.watch("icon");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("onSection", data.onSection);
      formData.append("status", data.status);
      formData.append("icon", data.icon[0]);
      formData.append("image", data.image[0]);
      formData.append("imageName", data.imageName);

      const response = await fetch("../../api/services", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      switch (result.status) {
        case 201:
          router.back();
          break;
        case 400:
          form.setError("slug", {
            type: "custom",
            message: "Slug is already been used",
          });
          break;
      }
    } catch (error) {
      console.log("Error while creating service : ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await fetch("../../api/categories?filter=service", {
        method: "GET",
      });
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.log("Error while fetching categories : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setPreview(watchedImage, setPreviewUrl);
  }, [watchedImage]);

  useEffect(() => {
    setPreview(watchedIcon, setPreivewIconUrl);
  }, [watchedIcon]);

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
                      onClick={() => router.back()}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Services
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="primary" size="sm">
                      Save Product
                    </Button>
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
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="title"
                                      className="w-full"
                                      placeholder="title"
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
                              name="slug"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Slug (optional) if blank will use from the
                                    title instead
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="slug"
                                      type="text"
                                      className="w-full"
                                      placeholder="slug"
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
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description (optional)</FormLabel>
                                  <Textarea
                                    id="description"
                                    className="min-h-32"
                                    placeholder="description"
                                    {...field}
                                  />
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
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="category"
                                        aria-label="Select category"
                                      >
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categories?.map((prop) => (
                                        <SelectItem
                                          key={prop.id}
                                          value={prop.id}
                                        >
                                          {prop.name}
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
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Service Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="onSection"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Display On Section</FormLabel>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value === "true")
                                    }
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="onSection"
                                        aria-label="Select status"
                                      >
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="true">Yes</SelectItem>
                                      <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Published</FormLabel>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value === "true")
                                    }
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="status"
                                        aria-label="Select status"
                                      >
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="true">Yes</SelectItem>
                                      <SelectItem value="false">No</SelectItem>
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
                    <Card
                      className="overflow-hidden mb-6"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Icon Image (optional)</CardTitle>
                        <CardDescription>
                          Icon image will used on display section, and the icon
                          must be white color
                        </CardDescription>
                      </CardHeader>
                      <FormField
                        className="col-span-3 w-full"
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                          <FormItem>
                            <CardContent>
                              <div className="grid gap-2">
                                <Image
                                  alt="Icon Image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="300"
                                  src={
                                    previewIconUrl
                                      ? previewIconUrl
                                      : "/img_holder.png"
                                  }
                                  width="300"
                                />
                                <FormControl>
                                  <Input
                                    id="icon"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    {...iconRef}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </CardContent>
                          </FormItem>
                        )}
                      />
                    </Card>
                    <Card
                      className="overflow-hidden mb-6"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Service Image</CardTitle>
                        <CardDescription>
                          Service image will be used on service pages
                        </CardDescription>
                      </CardHeader>
                      <FormField
                        className="col-span-3 w-full"
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <CardContent>
                              <div className="grid gap-2">
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="300"
                                  src={
                                    previewUrl ? previewUrl : "/img_holder.png"
                                  }
                                  width="300"
                                />
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
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="imageName"
                          render={({ field }) => (
                            <FormItem>
                              <CardContent>
                                <FormLabel>Image Name</FormLabel>
                                <FormControl>
                                  <Input
                                    name="imageName"
                                    className="w-full"
                                    placeholder="image name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </CardContent>
                            </FormItem>
                          )}
                        />
                      </div>
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
