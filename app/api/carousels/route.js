import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);

  try {
    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;
      const [data, total] = await Promise.all([
        prisma.carousel.findMany({
          skip: skip,
          take: 10,
        }),
        prisma.carousel.count(),
      ]);

      const lastPage = total > 10 ? Math.ceil(total / 10) : 1;

      return NextResponse.json({
        meta: {
          total,
          lastPage,
          currentPage: page || 1,
          perPage: 10,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: "Carousels retrieved successfully",
      });
    } else {
      const carousels = await prisma.carousel.findMany();

      return NextResponse.json({
        data: carousels,
        status: 200,
        message: "Carousels get successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while getting carousels",
    });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");
    const status = formData.get("status") === "true";

    const imageData =
      image && image instanceof Blob ? await CreateImage(image, title) : null;

    const newCarousels = await prisma.carousel.create({
      data: {
        title: title,
        image: imageData,
        status: status,
      },
    });

    return NextResponse.json({
      data: newCarousels,
      status: 201,
      message: "Carousel created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while create carousel",
    });
  }
}
