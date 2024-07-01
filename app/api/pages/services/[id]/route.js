import {
  deleteImage,
  renameImage,
  updateImage,
} from "@/app/api/images/[url]/route";
import { CreateImage, DeleteImage, UpdateImage } from "@/app/api/images/route";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const servicePage = await prisma.servicePage.findUnique({
      where: { id: id },
    });

    if (!servicePage) {
      return NextResponse.json({
        status: 404,
        error: "Service page not found",
      });
    }

    return NextResponse.json({
      data: servicePage,
      status: 200,
      message: "Service page retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while getting servie pageF",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const direction = formData.get("direction").toUpperCase();
  const head = formData.get("head") === "true";

  try {
    const servicePage = await prisma.servicePage.findUnique({
      where: { id: id },
    });

    if (!servicePage) {
      return NextResponse.json({
        status: 404,
        message: "Service page not found",
      });
    }

    if (head === true) {
      const existingHeadPage = await prisma.servicePage.findFirst({
        where: { head: true },
      });

      if (existingHeadPage && existingHeadPage.id !== id) {
        return NextResponse.json({
          status: 400,
          error: "Head section already created",
        });
      }
    }

    const imageData =
      image && image instanceof Blob
        ? servicePage.image
          ? await UpdateImage(servicePage.image.url, image, title)
          : await CreateImage(image, title)
        : servicePage.image;

    const updatedServicePage = await prisma.servicePage.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        direction: direction,
        head: head,
        image: imageData,
      },
    });

    return NextResponse.json({
      data: updatedServicePage,
      status: 200,
      message: "Service page updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while updating service page",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedServicePage = await prisma.servicePage.delete({
      where: { id: id },
    });

    deletedServicePage.image
      ? await DeleteImage(deletedServicePage.image.url)
      : null;

    return NextResponse.json({
      status: 200,
      message: "Service page deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while deleting service page",
    });
  }
}
