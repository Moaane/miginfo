import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10);

  try {
    if (page) {
      const skip = page > 0 ? 10 * (page - 1) : 0;
      const [data, total] = await Promise.all([
        prisma.news.findMany({
          where: { type: "NEWS" },
          skip,
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            newsCategories: {
              select: {
                categories: {
                  select: { name: true },
                },
              },
            },
          },
        }),
        prisma.news.count({ where: { type: "NEWS" } }),
      ]);
      const lastPage = Math.ceil(total / 10);

      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page,
          perPage: 10,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
        data,
        status: 200,
        message: "News get successfully",
      });
    }

    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        newsCategories: {
          select: {
            categories: {
              select: { name: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      data: news,
      status: 200,
      message: "News is retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while getting news",
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
  const slug = (formData.get("slug") || title)
    .toLowerCase()
    .replace(/\s+/g, "-");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  const imageName = (formData.get("imageName") || title)
    .toLowerCase()
    .replace(/\s+/g, "-");
  const userId = token.sub;

  try {
    const existingNews = await prisma.news.findUnique({
      where: { slug: slug },
    });

    if (existingNews) {
      return NextResponse.json({
        status: 400,
        error: "Slug already been used",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : null;

    const newService = await prisma.news.create({
      data: {
        type: "NEWS",
        title: title,
        slug: slug,
        description: description,
        image: imageData,
        newsCategories: {
          create: {
            categoryId,
          },
        },
        userId,
      },
      include: {
        newsCategories: true,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while creating service",
    });
  }
}
