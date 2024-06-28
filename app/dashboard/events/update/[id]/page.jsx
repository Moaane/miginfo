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
import Editor from "@/components/Editor";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  image: z
    .any()
    .optional()
    .refine((image) => {
      if (!image || image.length === 0) return true;
      return image[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 3MB.`)
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
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: null,
    name: null,
  });

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
    },
  });

  const imageRef = form.register("image");
  const watchedImage = form.watch("image");

  async function onSubmit(data) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", data.image[0]);
      formData.append("imageName", data.imageName);

      const response = await fetch(`../../../api/events/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 200) {
        router.back();
      }
    } catch (error) {
      console.log("Error while updating news : ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchEvent(id) {
    setLoading(true);
    try {
      const response = await fetch(`../../../api/events/${id}`, {
        method: "GET",
      });
      const result = await response.json();

      const categoryId = result.data.eventCategories[0]?.categoryId;
      const categoryName = result.data.eventCategories[0]?.categories?.name;
      setCategory({ id: categoryId, name: categoryName });

      form.setValue("title", result.data.title);
      form.setValue("slug", result.data.slug);
      form.setValue("description", result.data.description);
      form.setValue("imageName", result.data.image.name);
      if (categoryId) form.setValue("category", categoryId);

      setPreviewUrl(result.data.image.filename);
      fetchCategories(categoryId);
    } catch (error) {
      console.log("Error while getting news : ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories(categoryId) {
    setLoading(true);
    try {
      const response = await fetch("../../../api/categories?filter=event", {
        method: "GET",
      });
      const result = await response.json();
      let categories = result.data;

      if (categoryId) {
        const specificCategoryIndex = categories.findIndex(
          (cat) => cat.id === categoryId
        );
        if (specificCategoryIndex !== -1) {
          const [specificCategory] = categories.splice(
            specificCategoryIndex,
            1
          );
          categories = [specificCategory, ...categories];
        }
      }

      setCategories(categories);
    } catch (error) {
      console.log("Error while fetching categories : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const image = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedPreviewUrl(reader.result);
      };
      reader.readAsDataURL(image);
    }
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
                    Update Event
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="primary" size="sm">
                      Save Event
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Event Details</CardTitle>
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
                                      placeholder="Brand name"
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
                                  <FormLabel>Slug</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="slug"
                                      className="w-full"
                                      placeholder="Brand name"
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
                        <CardTitle>Event Category</CardTitle>
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
                                        <SelectValue
                                          defaultValue={category.id}
                                          placeholder={category.name}
                                        />
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
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Content</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="max-w-screen-sm">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <Editor
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
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
                              <CardTitle>Event Image</CardTitle>
                              <CardDescription>
                                Event image will be used on event thumbnail
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-2">
                                <Image
                                  alt="event image"
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
                                <FormControl>
                                  <Input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
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
                  <Button size="sm">Save Event</Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
