import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage, DeleteImage } from "../../images/route";
import { getToken } from "next-auth/jwt";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        newsCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({
      data: news,
      status: 200,
      message: "Successfully get news",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while getting news",
    });
  }
}

export async function PUT(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

  const { id } = params;
  const formData = await req.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  const imageName = (formData.get("imageName") || title)
    .toLowerCase()
    .replace(/\s+/g, "-");
  const userId = token.sub;

  try {
    const existingSlug = await prisma.news.findUnique({
      where: { slug: slug },
    });

    if (existingSlug && existingSlug.id !== id) {
      return NextResponse.json({
        status: 400,
        error: "Slug already been used",
      });
    }

    const newsCategories = await prisma.newsCategory.findFirst({
      where: { newsId: id },
    });

    if (!newsCategories) {
      await prisma.newsCategory.create({
        data: { newsId: id, categoryId },
      });
    }

    const news = await prisma.news.findUnique({ where: { id: id } });

    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : news.image;

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: title,
        slug: slug,
        description: description,
        userId: userId,
        image: imageData,
        newsCategories: {
          updateMany: {
            where: { newsId: id },
            data: { categoryId: categoryId },
          },
        },
      },
      include: {
        newsCategories: true,
      },
    });

    return NextResponse.json({
      data: updatedNews,
      status: 200,
      message: "News updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while updating news",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedNews = await prisma.news.delete({ where: { id } });

    deletedNews.image ? await DeleteImage(deletedNews.image.url) : null;

    return NextResponse.json({
      status: 200,
      message: "Successfully deleting news",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Failed while deleting news",
    });
  }
}
