import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {
  deleteImage,
  renameImage,
  updateImage,
} from "../../images/[url]/route";
import { CreateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id: id },
    });

    return NextResponse.json({
      data: carousel,
      status: 200,
      message: "Carousel get successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting carousel",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");
    const status = formData.get("status") === "true";

    const carousel = await prisma.carousel.findUnique({
      where: { id: id },
    });

    if (!carousel) {
      return NextResponse.json({
        status: 404,
        message: "Carousel not found",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? carousel.image
          ? await updateImage(carousel.image.filename, image, title)
          : await CreateImage(image, title)
        : carousel.image
        ? title !== carousel.image.name
          ? await renameImage(carousel.image.filename, title)
          : carousel.image
        : carousel.image;

    const updatedCarousel = await prisma.carousel.update({
      where: { id: id },
      data: {
        title: title,
        image: imageData,
        status: status,
      },
    });

    return NextResponse.json({
      data: updatedCarousel,
      status: 200,
      message: "Carousel updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while updating carousel",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedCarousel = await prisma.carousel.delete({ where: { id: id } });

    deletedCarousel.image
      ? await deleteImage(deletedCarousel.image.filename)
      : null;

    return NextResponse.json({
      status: 200,
      message: "Carousel deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting carousel",
    });
  }
}
