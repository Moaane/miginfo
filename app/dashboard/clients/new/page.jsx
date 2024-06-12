"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  image: z
    .any()
    .refine((image) => {
      if (image.length === 0) return false; // File is required
      return true;
    }, "Client logo is required.")
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("image", data.image[0]);
      formData.append("imageName", data.imageName);

      const response = await fetch("../../api/clients", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      switch (result.status) {
        case 201:
          router.back();
        case 400:
        case 500:
          form.setError("imageName", {
            type: "custom",
            message: result.message,
          });
          break;
      }
    } catch (error) {
      console.log("Error while creating news : ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch("../../api/categories?filter=client", {
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

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const image = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
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
                      onClick={() => router.back()}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Client
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {/* <Button variant="outline" size="sm">
              Discard
            </Button> */}
                    <Button variant="primary" size="sm">
                      Save Client
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Client Details</CardTitle>
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
                                  <FormLabel>Client Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      name="name"
                                      className="w-full"
                                      placeholder="Client name"
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
                        <CardTitle>Client Category</CardTitle>
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
                              <CardTitle>Client Logo</CardTitle>
                              {/* <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                              </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-2">
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-contain"
                                  height="300"
                                  src={
                                    previewUrl ? previewUrl : "/img_holder.png"
                                  }
                                  width="300"
                                />
                                <FormLabel>Logo</FormLabel>
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
                                <FormLabel>Logo name (optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    name="imageName"
                                    className="w-full"
                                    placeholder="Logo name"
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
