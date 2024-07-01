import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { CreateImage, DeleteImage, UpdateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const event = await prisma.news.findUnique({
      where: { id },
      include: {
        eventCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    if (!event) {
      return NextResponse.json({
        status: 404,
        error: "event not found",
      });
    }

    return NextResponse.json({
      data: event,
      status: 200,
      message: "Successfully fetch event",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Failed while fething event",
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
    const existingEvent = await prisma.news.findUnique({
      where: { slug: slug },
    });

    if (existingEvent && existingEvent.id !== id) {
      return NextResponse.json({
        status: 400,
        error: "Slug already been used",
      });
    }

    const eventCategories = await prisma.eventCategory.findFirst({
      where: { eventId: id },
    });

    if (!eventCategories) {
      await prisma.eventCategory.create({
        data: { eventId: id, categoryId },
      });
    }

    const event = await prisma.news.findUnique({ where: { id: id } });

    const imageData =
      image && image instanceof Blob
        ? event.image
          ? await UpdateImage(event.image.url, image, imageName)
          : await CreateImage(image, imageName)
        : event.image;

    const updatedEvent = await prisma.news.update({
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
      data: updatedEvent,
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
    const deletedEvent = await prisma.news.delete({ where: { id } });

    deletedEvent.image ? await DeleteImage(deletedEvent.image.url) : null;

    return NextResponse.json({
      status: 200,
      message: "Successfully fetch service",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Failed while fething service",
    });
  }
}
