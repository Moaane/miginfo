import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../../images/route";
import { deleteImage, renameImage } from "../../images/[filename]/route";
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
      message: "Error while getting news",
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
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  let imageName = formData.get("imageName");
  const userId = token.sub;

  try {
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
        ? (await CreateImage(image, imageName))
          ? imageName !== news.image.name
          : await renameImage(news.image.filename, imageName)
        : news.image;

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: title,
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
      message: "Error while updating news",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedNews = await prisma.news.delete({ where: { id } });

    deletedNews.image ? await deleteImage(deletedNews.image.filename) : null;

    return NextResponse.json({
      status: 200,
      message: "Successfully deleting news",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while deleting news",
    });
  }
}
