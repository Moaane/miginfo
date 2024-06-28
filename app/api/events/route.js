import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const skip = page > 0 ? 10 * (page - 1) : 0;

  let data;
  let total;
  let lastPage;

  try {
    [data, total] = await Promise.all([
      prisma.news.findMany({
        where: { type: "EVENT" },
        skip: skip,
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          eventCategories: {
            select: {
              categories: {
                select: { name: true },
              },
            },
          },
        },
      }),
      prisma.news.count({ where: { type: "EVENT" } }),
    ]);
    lastPage = Math.ceil(total / 10);

    return NextResponse.json({
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage: 10,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
      data,
      status: 200,
      message: "Events get successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while getting events",
    });
  }
}

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

  const formData = await req.formData();
  const title = formData.get("title");
  let slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  let imageName = formData.get("imageName");
  imageName = imageName || title;
  slug = slug || title.toLowerCase().replace(/\s+/g, "-");
  const userId = token.sub;

  try {
    const existingEvent = await prisma.news.findUnique({
      where: { slug: slug },
    });

    if (existingEvent) {
      return NextResponse.json({
        status: 400,
        message: "Slug already been used",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : null;

    const newEvent = await prisma.news.create({
      data: {
        type: "EVENT",
        title: title,
        slug: slug,
        description: description,
        image: imageData,
        eventCategories: {
          create: {
            categoryId: categoryId,
          },
        },
        userId: userId,
      },
      include: {
        eventCategories: {
          select: {
            categories: {
              select: { name: true },
            },
          },
        },
      },
    });
    return NextResponse.json({
      data: newEvent,
      status: 201,
      message: "Event created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating event",
    });
  }
}
