import { deleteImage, updateImage } from "@/app/api/images/[filename]/route";
import { CreateImage } from "@/app/api/images/route";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const aboutPage = await prisma.aboutPage.findUnique({ where: { id: id } });

    return NextResponse.json({
      data: aboutPage,
      status: 200,
      message: "About page retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting about page",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const direction = formData.get("direction");
  const head = formData.get("head");

  try {
    if (head === true) {
      const existingHeadPage = await prisma.aboutPage.findFirst({
        where: { head: true },
      });

      if (existingHeadPage) {
        return NextResponse.json({
          status: 400,
          message: "Head section already created",
        });
      }
    }

    const about = await prisma.aboutPage.findUnique({ where: { id: id } });

    const imageData =
      image && image instanceof Blob
        ? about.image
          ? await updateImage(about.image.filename, image, title)
          : await CreateImage(image, title)
        : about.image
        ? about.image
        : null;

    const updatedAbout = await prisma.aboutPage.update({
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
      data: updatedAbout,
      status: 200,
      message: "About page updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 200,
      message: "Error while updating about page",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedAboutPage = await prisma.aboutPage.delete({
      where: { id: id },
    });

    deletedAboutPage.image
      ? await deleteImage(deletedAboutPage.image.filename)
      : null;

    return NextResponse.json({
      status: 200,
      message: "About page deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting about page",
    });
  }
}
