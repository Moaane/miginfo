import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {
  deleteImage,
  renameImage,
  updateImage,
} from "../../images/[filename]/route";
import { getToken } from "next-auth/jwt";
import { CreateImage } from "../../images/route";

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

    return NextResponse.json({
      data: event,
      status: 200,
      message: "Successfully fetch event",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while fething event",
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
          ? await updateImage(event.image.filename, image, imageName)
          : await CreateImage(image, imageName)
        : event.image
        ? imageName !== event.image.name
          ? await renameImage(event.image.filename, imageName)
          : event.image
        : null;

    const updatedEvent = await prisma.news.update({
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
      data: updatedEvent,
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
    const deletedEvent = await prisma.news.delete({ where: { id } });

    deletedEvent.image ? await deleteImage(deletedEvent.image.filename) : null;

    return NextResponse.json({
      status: 200,
      message: "Successfully fetch service",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while fething service",
    });
  }
}
