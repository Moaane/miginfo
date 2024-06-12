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
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.boolean({ required_error: "Publish status is required" }),
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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "",
      image: "",
    },
  });

  const imageRef = form.register("image");
  const watchedImage = form.watch("image");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("status", data.status);
      formData.append("image", data.image[0]);

      const response = await fetch("../../api/carousels", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      switch (result.status) {
        case 201:
          router.back();
          break;
        case 400:
          toast.error(result.message);
          break;
      }
    } catch (error) {
      console.log("Error while creating service : ", error);
    } finally {
      setLoading(false);
    }
  }

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
                    New Carousel
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="primary" size="sm">
                      Save Carousel
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Carousel Details</CardTitle>
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
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Status</FormLabel>
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
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card
                      className="overflow-hidden mb-6"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Carousel Image</CardTitle>
                        <CardDescription>
                          Carousel image will be used on carousels
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
