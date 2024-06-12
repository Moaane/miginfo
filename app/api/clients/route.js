import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const filter = searchParams.get("filter");

  try {
    const whereCondition =
      filter && filter !== "ALL"
        ? { clientCategories: { every: { categoryId: filter } } }
        : {};

    let dataPromise, totalPromise;

    if (page) {
      const skip = page > 0 ? 10 * (page - 1) : 0;
      dataPromise = prisma.client.findMany({
        where: whereCondition,
        skip,
        take: 10,
        orderBy: { name: "asc" },
        include: {
          clientCategories: {
            select: {
              categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    } else {
      dataPromise = prisma.client.findMany({
        where: whereCondition,
        orderBy: { name: "asc" },
        include: {
          clientCategories: {
            select: {
              categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }

    totalPromise = prisma.client.count({ where: whereCondition });

    const [data, total] = await Promise.all([dataPromise, totalPromise]);

    const lastPage = total > 10 ? Math.ceil(total / 10) : 1;

    return NextResponse.json({
      meta: {
        total: total,
        lastPage: lastPage,
        currentPage: page,
        perPage: 10 || total,
        prev: page && page > 1 ? page - 1 : null,
        next: page && page < lastPage ? page + 1 : null,
      },
      data,
      status: 200,
      message: "Clients retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while getting clients",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const categoryId = formData.get("category");
  let image = formData.get("image");
  let imageName = formData.get("imageName");
  imageName = imageName || name;

  try {
    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : null;

    const newClient = await prisma.client.create({
      data: {
        name: name,
        image: imageData,
        clientCategories: {
          create: {
            categoryId: categoryId,
          },
        },
      },
      include: {
        clientCategories: true,
      },
    });
    return NextResponse.json({
      data: newClient,
      status: 201,
      message: "Client created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating client",
    });
  }
}
